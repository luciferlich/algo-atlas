export interface MonteCarloConfig {
  iterations: number;
  timeHorizon: number; // in days
  initialValue: number;
  expectedReturn: number; // annual expected return
  volatility: number; // annual volatility
  confidence: number; // confidence level (e.g., 0.95 for 95%)
  simulationType: 'geometric_brownian' | 'jump_diffusion' | 'mean_reversion' | 'portfolio';
  assets?: AssetConfig[];
}

export interface AssetConfig {
  symbol: string;
  weight: number;
  expectedReturn: number;
  volatility: number;
  correlation?: number[][];
}

export interface MonteCarloResult {
  id: string;
  config: MonteCarloConfig;
  results: {
    finalValues: number[];
    percentiles: Record<string, number>;
    var: number; // Value at Risk
    cvar: number; // Conditional Value at Risk
    sharpeRatio: number;
    maxDrawdown: number;
    probabilityOfLoss: number;
    expectedValue: number;
    standardDeviation: number;
  };
  paths: number[][]; // Sample paths for visualization
  timestamp: Date;
  duration: number; // execution time in ms
}

class MonteCarloSimulation {
  private simulations: Map<string, MonteCarloResult> = new Map();

  async runSimulation(config: MonteCarloConfig): Promise<string> {
    const startTime = Date.now();
    const simulationId = this.generateSimulationId();

    const result = await this.executeSimulation(config);
    const duration = Date.now() - startTime;

    const simulation: MonteCarloResult = {
      id: simulationId,
      config,
      results: result,
      paths: this.generateSamplePaths(config, 10), // Store 10 sample paths for visualization
      timestamp: new Date(),
      duration
    };

    this.simulations.set(simulationId, simulation);
    return simulationId;
  }

  async getSimulationResult(id: string): Promise<MonteCarloResult | null> {
    return this.simulations.get(id) || null;
  }

  async getAllSimulations(): Promise<MonteCarloResult[]> {
    return Array.from(this.simulations.values());
  }

  private async executeSimulation(config: MonteCarloConfig): Promise<MonteCarloResult['results']> {
    const finalValues: number[] = [];
    
    for (let i = 0; i < config.iterations; i++) {
      const path = this.generatePath(config);
      finalValues.push(path[path.length - 1]);
    }

    // Sort for percentile calculations
    finalValues.sort((a, b) => a - b);

    const results = {
      finalValues,
      percentiles: this.calculatePercentiles(finalValues),
      var: this.calculateVaR(finalValues, config.confidence),
      cvar: this.calculateCVaR(finalValues, config.confidence),
      sharpeRatio: this.calculateSharpeRatio(finalValues, config),
      maxDrawdown: this.calculateMaxDrawdown(finalValues, config.initialValue),
      probabilityOfLoss: this.calculateProbabilityOfLoss(finalValues, config.initialValue),
      expectedValue: this.calculateMean(finalValues),
      standardDeviation: this.calculateStandardDeviation(finalValues)
    };

    return results;
  }

  private generatePath(config: MonteCarloConfig): number[] {
    const path: number[] = [config.initialValue];
    const dt = 1 / 252; // Daily time step (252 trading days per year)

    switch (config.simulationType) {
      case 'geometric_brownian':
        return this.generateGeometricBrownianPath(config, dt);
      
      case 'jump_diffusion':
        return this.generateJumpDiffusionPath(config, dt);
      
      case 'mean_reversion':
        return this.generateMeanReversionPath(config, dt);
      
      case 'portfolio':
        return this.generatePortfolioPath(config, dt);
      
      default:
        return this.generateGeometricBrownianPath(config, dt);
    }
  }

  private generateGeometricBrownianPath(config: MonteCarloConfig, dt: number): number[] {
    const path: number[] = [config.initialValue];
    const drift = config.expectedReturn - 0.5 * config.volatility * config.volatility;

    for (let t = 1; t <= config.timeHorizon; t++) {
      const randomShock = this.normalRandom();
      const dW = randomShock * Math.sqrt(dt);
      const dS = path[t - 1] * (drift * dt + config.volatility * dW);
      path.push(path[t - 1] + dS);
    }

    return path;
  }

  private generateJumpDiffusionPath(config: MonteCarloConfig, dt: number): number[] {
    const path: number[] = [config.initialValue];
    const drift = config.expectedReturn - 0.5 * config.volatility * config.volatility;
    const jumpIntensity = 0.1; // 10% chance of jump per year
    const jumpMean = -0.05; // Average jump size -5%
    const jumpVol = 0.2; // Jump volatility 20%

    for (let t = 1; t <= config.timeHorizon; t++) {
      const randomShock = this.normalRandom();
      const dW = randomShock * Math.sqrt(dt);
      
      // Check for jump
      let jumpComponent = 0;
      if (Math.random() < jumpIntensity * dt) {
        jumpComponent = jumpMean + jumpVol * this.normalRandom();
      }

      const dS = path[t - 1] * (drift * dt + config.volatility * dW + jumpComponent);
      path.push(Math.max(0, path[t - 1] + dS)); // Ensure non-negative values
    }

    return path;
  }

  private generateMeanReversionPath(config: MonteCarloConfig, dt: number): number[] {
    const path: number[] = [config.initialValue];
    const meanReversionSpeed = 2.0; // Speed of mean reversion
    const longTermMean = config.initialValue; // Long-term mean

    for (let t = 1; t <= config.timeHorizon; t++) {
      const randomShock = this.normalRandom();
      const dW = randomShock * Math.sqrt(dt);
      const meanReversionTerm = meanReversionSpeed * (longTermMean - path[t - 1]) * dt;
      const dS = meanReversionTerm + config.volatility * path[t - 1] * dW;
      path.push(Math.max(0, path[t - 1] + dS));
    }

    return path;
  }

  private generatePortfolioPath(config: MonteCarloConfig, dt: number): number[] {
    if (!config.assets || config.assets.length === 0) {
      return this.generateGeometricBrownianPath(config, dt);
    }

    const path: number[] = [config.initialValue];
    const assetPaths: number[][] = config.assets.map(() => [config.initialValue]);

    // Generate correlated random numbers for assets
    for (let t = 1; t <= config.timeHorizon; t++) {
      const randomShocks = this.generateCorrelatedRandoms(config.assets.length);
      let portfolioValue = 0;

      config.assets.forEach((asset, i) => {
        const drift = asset.expectedReturn - 0.5 * asset.volatility * asset.volatility;
        const dW = randomShocks[i] * Math.sqrt(dt);
        const dS = assetPaths[i][t - 1] * (drift * dt + asset.volatility * dW);
        assetPaths[i].push(Math.max(0, assetPaths[i][t - 1] + dS));
        portfolioValue += asset.weight * assetPaths[i][t];
      });

      path.push(portfolioValue);
    }

    return path;
  }

  private generateSamplePaths(config: MonteCarloConfig, numPaths: number): number[][] {
    const paths: number[][] = [];
    for (let i = 0; i < numPaths; i++) {
      paths.push(this.generatePath(config));
    }
    return paths;
  }

  private calculatePercentiles(sortedValues: number[]): Record<string, number> {
    const percentiles = [1, 5, 10, 25, 50, 75, 90, 95, 99];
    const result: Record<string, number> = {};

    percentiles.forEach(p => {
      const index = Math.floor((p / 100) * (sortedValues.length - 1));
      result[`p${p}`] = sortedValues[index];
    });

    return result;
  }

  private calculateVaR(sortedValues: number[], confidence: number): number {
    const index = Math.floor((1 - confidence) * sortedValues.length);
    return sortedValues[0] - sortedValues[index];
  }

  private calculateCVaR(sortedValues: number[], confidence: number): number {
    const varIndex = Math.floor((1 - confidence) * sortedValues.length);
    const tailValues = sortedValues.slice(0, varIndex + 1);
    const tailMean = tailValues.reduce((sum, val) => sum + val, 0) / tailValues.length;
    return sortedValues[0] - tailMean;
  }

  private calculateSharpeRatio(finalValues: number[], config: MonteCarloConfig): number {
    const returns = finalValues.map(val => (val - config.initialValue) / config.initialValue);
    const meanReturn = this.calculateMean(returns);
    const stdReturn = this.calculateStandardDeviation(returns);
    const riskFreeRate = 0.02; // Assume 2% risk-free rate
    
    return stdReturn > 0 ? (meanReturn - riskFreeRate) / stdReturn : 0;
  }

  private calculateMaxDrawdown(finalValues: number[], initialValue: number): number {
    const returns = finalValues.map(val => (val - initialValue) / initialValue);
    let maxDrawdown = 0;
    let peak = 0;

    returns.forEach(ret => {
      if (ret > peak) peak = ret;
      const drawdown = peak - ret;
      if (drawdown > maxDrawdown) maxDrawdown = drawdown;
    });

    return maxDrawdown;
  }

  private calculateProbabilityOfLoss(finalValues: number[], initialValue: number): number {
    const lossCount = finalValues.filter(val => val < initialValue).length;
    return lossCount / finalValues.length;
  }

  private calculateMean(values: number[]): number {
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }

  private calculateStandardDeviation(values: number[]): number {
    const mean = this.calculateMean(values);
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
  }

  private normalRandom(): number {
    // Box-Muller transformation for normal distribution
    const u1 = Math.random();
    const u2 = Math.random();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  }

  private generateCorrelatedRandoms(n: number): number[] {
    // Simple case: generate independent random numbers
    // In practice, you'd use Cholesky decomposition for correlation
    return Array.from({ length: n }, () => this.normalRandom());
  }

  private generateSimulationId(): string {
    return `mc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export const monteCarloService = new MonteCarloSimulation();

// Portfolio optimization using Monte Carlo
export interface PortfolioOptimizationConfig {
  assets: AssetConfig[];
  riskFreeRate: number;
  targetReturn?: number;
  constraintType: 'min_variance' | 'max_sharpe' | 'target_return' | 'risk_parity';
  iterations: number;
}

export interface OptimizationResult {
  weights: number[];
  expectedReturn: number;
  volatility: number;
  sharpeRatio: number;
  diversificationRatio: number;
}

export class PortfolioOptimizer {
  async optimize(config: PortfolioOptimizationConfig): Promise<OptimizationResult> {
    let bestWeights: number[] = [];
    let bestMetric = config.constraintType === 'min_variance' ? Infinity : -Infinity;

    for (let i = 0; i < config.iterations; i++) {
      const weights = this.generateRandomWeights(config.assets.length);
      const metrics = this.calculatePortfolioMetrics(weights, config.assets, config.riskFreeRate);

      let currentMetric: number;
      switch (config.constraintType) {
        case 'min_variance':
          currentMetric = metrics.volatility;
          if (currentMetric < bestMetric) {
            bestMetric = currentMetric;
            bestWeights = [...weights];
          }
          break;
        case 'max_sharpe':
          currentMetric = metrics.sharpeRatio;
          if (currentMetric > bestMetric) {
            bestMetric = currentMetric;
            bestWeights = [...weights];
          }
          break;
        default:
          currentMetric = metrics.sharpeRatio;
          if (currentMetric > bestMetric) {
            bestMetric = currentMetric;
            bestWeights = [...weights];
          }
      }
    }

    return this.calculatePortfolioMetrics(bestWeights, config.assets, config.riskFreeRate);
  }

  private generateRandomWeights(n: number): number[] {
    const weights = Array.from({ length: n }, () => Math.random());
    const sum = weights.reduce((s, w) => s + w, 0);
    return weights.map(w => w / sum); // Normalize to sum to 1
  }

  private calculatePortfolioMetrics(weights: number[], assets: AssetConfig[], riskFreeRate: number): OptimizationResult {
    const expectedReturn = weights.reduce((sum, w, i) => sum + w * assets[i].expectedReturn, 0);
    
    // Calculate portfolio volatility (simplified - assumes no correlation)
    const variance = weights.reduce((sum, w, i) => sum + w * w * assets[i].volatility * assets[i].volatility, 0);
    const volatility = Math.sqrt(variance);
    
    const sharpeRatio = volatility > 0 ? (expectedReturn - riskFreeRate) / volatility : 0;
    
    // Diversification ratio (simplified)
    const weightedAvgVol = weights.reduce((sum, w, i) => sum + w * assets[i].volatility, 0);
    const diversificationRatio = volatility > 0 ? weightedAvgVol / volatility : 1;

    return {
      weights,
      expectedReturn,
      volatility,
      sharpeRatio,
      diversificationRatio
    };
  }
}

export const portfolioOptimizer = new PortfolioOptimizer();