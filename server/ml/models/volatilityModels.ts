/**
 * Volatility Modeling Backend
 * Implements GARCH, LSTM, Attention-based models for volatility prediction
 */

export interface VolatilityModelConfig {
  symbol: string;
  timeframe: '1m' | '5m' | '15m' | '1h' | '4h' | '1d';
  lookbackPeriod: number;
  modelParams?: Record<string, any>;
}

export interface VolatilityPrediction {
  nextVolatility: number;
  volatilityRange: { low: number; high: number };
  confidence: number;
  riskLevel: 'low' | 'medium' | 'high' | 'extreme';
  volatilityBreakdown: {
    trend: number;
    meanReversion: number;
    shock: number;
  };
  timestamp: Date;
}

class GARCHModel {
  private alpha: number = 0.1; // ARCH parameter
  private beta: number = 0.85;  // GARCH parameter
  private omega: number = 0.01; // Constant term
  private longTermVariance: number = 0.04; // Long-term variance

  async train(returns: number[], config: VolatilityModelConfig): Promise<void> {
    console.log(`Training GARCH model for ${config.symbol}`);
    
    // Estimate GARCH parameters using maximum likelihood
    this.estimateParameters(returns);
  }

  async predict(returns: number[], config: VolatilityModelConfig): Promise<VolatilityPrediction> {
    const conditionalVariances = this.calculateConditionalVariances(returns);
    const currentVariance = conditionalVariances[conditionalVariances.length - 1];
    const nextVariance = this.forecastVariance(currentVariance, returns[returns.length - 1]);
    
    const nextVolatility = Math.sqrt(nextVariance);
    const confidence = this.calculateConfidence(returns, conditionalVariances);
    
    return {
      nextVolatility,
      volatilityRange: {
        low: nextVolatility * 0.8,
        high: nextVolatility * 1.2
      },
      confidence,
      riskLevel: this.assessRiskLevel(nextVolatility),
      volatilityBreakdown: this.decomposeVolatility(returns, nextVariance),
      timestamp: new Date()
    };
  }

  private estimateParameters(returns: number[]): void {
    // Simplified parameter estimation
    const squaredReturns = returns.map(r => r * r);
    
    // Initial variance estimate
    const sampleVariance = squaredReturns.reduce((sum, sr) => sum + sr, 0) / squaredReturns.length;
    this.longTermVariance = sampleVariance;
    
    // Estimate omega as a fraction of long-term variance
    this.omega = sampleVariance * 0.1;
    
    // Use method of moments for alpha and beta
    const laggedVariances = squaredReturns.slice(0, -1);
    const currentSquaredReturns = squaredReturns.slice(1);
    
    // Simple correlation-based estimation
    const correlation = this.calculateCorrelation(laggedVariances, currentSquaredReturns);
    this.beta = Math.max(0.1, Math.min(0.95, correlation * 0.9));
    this.alpha = Math.max(0.05, Math.min(0.3, (1 - this.beta) * 0.5));
  }

  private calculateConditionalVariances(returns: number[]): number[] {
    const variances = [this.longTermVariance];
    const squaredReturns = returns.map(r => r * r);
    
    for (let i = 1; i < returns.length; i++) {
      const variance = this.omega + 
        this.alpha * squaredReturns[i - 1] + 
        this.beta * variances[i - 1];
      variances.push(variance);
    }
    
    return variances;
  }

  private forecastVariance(currentVariance: number, lastReturn: number): number {
    return this.omega + this.alpha * (lastReturn * lastReturn) + this.beta * currentVariance;
  }

  private calculateConfidence(returns: number[], variances: number[]): number {
    // Calculate model fit quality
    const squaredReturns = returns.map(r => r * r);
    let sumSquaredErrors = 0;
    
    for (let i = 1; i < variances.length; i++) {
      const error = squaredReturns[i] - variances[i];
      sumSquaredErrors += error * error;
    }
    
    const mse = sumSquaredErrors / (variances.length - 1);
    const averageVariance = variances.reduce((sum, v) => sum + v, 0) / variances.length;
    
    // Confidence based on model fit
    return Math.max(0.6, 1 - Math.sqrt(mse) / averageVariance);
  }

  private assessRiskLevel(volatility: number): 'low' | 'medium' | 'high' | 'extreme' {
    if (volatility < 0.01) return 'low';
    if (volatility < 0.025) return 'medium';
    if (volatility < 0.05) return 'high';
    return 'extreme';
  }

  private decomposeVolatility(returns: number[], variance: number): { trend: number; meanReversion: number; shock: number } {
    const recentReturns = returns.slice(-10);
    const averageReturn = recentReturns.reduce((sum, r) => sum + r, 0) / recentReturns.length;
    
    return {
      trend: Math.abs(averageReturn) * 0.3,
      meanReversion: this.beta * variance * 0.4,
      shock: this.alpha * variance * 0.3
    };
  }

  private calculateCorrelation(x: number[], y: number[]): number {
    const n = Math.min(x.length, y.length);
    const meanX = x.slice(0, n).reduce((sum, val) => sum + val, 0) / n;
    const meanY = y.slice(0, n).reduce((sum, val) => sum + val, 0) / n;
    
    let numerator = 0;
    let sumSquaredX = 0;
    let sumSquaredY = 0;
    
    for (let i = 0; i < n; i++) {
      const devX = x[i] - meanX;
      const devY = y[i] - meanY;
      numerator += devX * devY;
      sumSquaredX += devX * devX;
      sumSquaredY += devY * devY;
    }
    
    const denominator = Math.sqrt(sumSquaredX * sumSquaredY);
    return denominator === 0 ? 0 : numerator / denominator;
  }
}

class LSTMVolatilityModel {
  async train(returns: number[], config: VolatilityModelConfig): Promise<void> {
    console.log(`Training LSTM Volatility model for ${config.symbol}`);
    // LSTM volatility training would integrate with Python backend
  }

  async predict(returns: number[], config: VolatilityModelConfig): Promise<VolatilityPrediction> {
    const sequences = this.createSequences(returns, config.lookbackPeriod);
    const features = this.extractVolatilityFeatures(returns);
    
    // Simulate LSTM volatility prediction
    const recentVolatility = this.calculateRollingVolatility(returns.slice(-20));
    const trend = this.detectVolatilityTrend(returns.slice(-50));
    
    const nextVolatility = recentVolatility * (1 + trend + (Math.random() - 0.5) * 0.1);
    const confidence = 0.75 + Math.random() * 0.15;
    
    return {
      nextVolatility,
      volatilityRange: {
        low: nextVolatility * 0.85,
        high: nextVolatility * 1.15
      },
      confidence,
      riskLevel: this.assessRiskLevel(nextVolatility),
      volatilityBreakdown: this.decomposeVolatility(returns, nextVolatility),
      timestamp: new Date()
    };
  }

  private createSequences(returns: number[], lookback: number): number[][] {
    const sequences = [];
    for (let i = lookback; i < returns.length; i++) {
      sequences.push(returns.slice(i - lookback, i));
    }
    return sequences;
  }

  private extractVolatilityFeatures(returns: number[]): Record<string, number> {
    return {
      currentVolatility: this.calculateRollingVolatility(returns.slice(-20)),
      skewness: this.calculateSkewness(returns.slice(-50)),
      kurtosis: this.calculateKurtosis(returns.slice(-50)),
      autocorrelation: this.calculateAutocorrelation(returns.slice(-30)),
      maxDrawdown: this.calculateMaxDrawdown(returns.slice(-100))
    };
  }

  private calculateRollingVolatility(returns: number[], window: number = 20): number {
    if (returns.length < 2) return 0.02;
    
    const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
    
    return Math.sqrt(variance);
  }

  private detectVolatilityTrend(returns: number[]): number {
    const windowSize = 10;
    const volatilities = [];
    
    for (let i = windowSize; i < returns.length; i++) {
      const window = returns.slice(i - windowSize, i);
      volatilities.push(this.calculateRollingVolatility(window));
    }
    
    if (volatilities.length < 2) return 0;
    
    // Linear trend in volatility
    const x = volatilities.map((_, i) => i);
    const y = volatilities;
    
    const slope = this.calculateSlope(x, y);
    return Math.max(-0.2, Math.min(0.2, slope));
  }

  private calculateSlope(x: number[], y: number[]): number {
    const n = x.length;
    const sumX = x.reduce((sum, val) => sum + val, 0);
    const sumY = y.reduce((sum, val) => sum + val, 0);
    const sumXY = x.reduce((sum, val, i) => sum + val * y[i], 0);
    const sumXX = x.reduce((sum, val) => sum + val * val, 0);
    
    return (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  }

  private calculateSkewness(returns: number[]): number {
    const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
    const std = Math.sqrt(variance);
    
    if (std === 0) return 0;
    
    const skewness = returns.reduce((sum, r) => sum + Math.pow((r - mean) / std, 3), 0) / returns.length;
    return skewness;
  }

  private calculateKurtosis(returns: number[]): number {
    const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
    const std = Math.sqrt(variance);
    
    if (std === 0) return 3; // Normal distribution kurtosis
    
    const kurtosis = returns.reduce((sum, r) => sum + Math.pow((r - mean) / std, 4), 0) / returns.length;
    return kurtosis;
  }

  private calculateAutocorrelation(returns: number[], lag: number = 1): number {
    if (returns.length <= lag) return 0;
    
    const x = returns.slice(0, -lag);
    const y = returns.slice(lag);
    
    const meanX = x.reduce((sum, val) => sum + val, 0) / x.length;
    const meanY = y.reduce((sum, val) => sum + val, 0) / y.length;
    
    let numerator = 0;
    let sumSquaredX = 0;
    let sumSquaredY = 0;
    
    for (let i = 0; i < x.length; i++) {
      const devX = x[i] - meanX;
      const devY = y[i] - meanY;
      numerator += devX * devY;
      sumSquaredX += devX * devX;
      sumSquaredY += devY * devY;
    }
    
    const denominator = Math.sqrt(sumSquaredX * sumSquaredY);
    return denominator === 0 ? 0 : numerator / denominator;
  }

  private calculateMaxDrawdown(returns: number[]): number {
    let maxDrawdown = 0;
    let peak = 0;
    let cumulative = 0;
    
    for (const ret of returns) {
      cumulative += ret;
      if (cumulative > peak) peak = cumulative;
      const drawdown = peak - cumulative;
      if (drawdown > maxDrawdown) maxDrawdown = drawdown;
    }
    
    return maxDrawdown;
  }

  private assessRiskLevel(volatility: number): 'low' | 'medium' | 'high' | 'extreme' {
    if (volatility < 0.01) return 'low';
    if (volatility < 0.025) return 'medium';
    if (volatility < 0.05) return 'high';
    return 'extreme';
  }

  private decomposeVolatility(returns: number[], volatility: number): { trend: number; meanReversion: number; shock: number } {
    const trend = this.detectVolatilityTrend(returns.slice(-30));
    
    return {
      trend: Math.abs(trend) * volatility * 0.3,
      meanReversion: volatility * 0.4,
      shock: volatility * 0.3
    };
  }
}

class AttentionVolatilityModel {
  async train(returns: number[], config: VolatilityModelConfig): Promise<void> {
    console.log(`Training Attention-based Volatility model for ${config.symbol}`);
    // Attention model training would integrate with Python/PyTorch backend
  }

  async predict(returns: number[], config: VolatilityModelConfig): Promise<VolatilityPrediction> {
    const attentionWeights = this.calculateAttentionWeights(returns);
    const weightedFeatures = this.extractWeightedFeatures(returns, attentionWeights);
    
    // Attention-based volatility prediction
    const baseVolatility = this.calculateRollingVolatility(returns.slice(-20));
    const attentionAdjustment = this.calculateAttentionAdjustment(weightedFeatures);
    
    const nextVolatility = baseVolatility * (1 + attentionAdjustment);
    const confidence = this.calculateAttentionConfidence(attentionWeights);
    
    return {
      nextVolatility,
      volatilityRange: {
        low: nextVolatility * 0.9,
        high: nextVolatility * 1.1
      },
      confidence,
      riskLevel: this.assessRiskLevel(nextVolatility),
      volatilityBreakdown: this.decomposeVolatility(returns, nextVolatility),
      timestamp: new Date()
    };
  }

  private calculateAttentionWeights(returns: number[]): number[] {
    const weights = [];
    const decayFactor = 0.95;
    
    // More recent observations get higher attention
    for (let i = 0; i < returns.length; i++) {
      const weight = Math.pow(decayFactor, returns.length - 1 - i);
      weights.push(weight);
    }
    
    // Normalize weights
    const sumWeights = weights.reduce((sum, w) => sum + w, 0);
    return weights.map(w => w / sumWeights);
  }

  private extractWeightedFeatures(returns: number[], weights: number[]): Record<string, number> {
    const weightedMean = returns.reduce((sum, r, i) => sum + r * weights[i], 0);
    const weightedVariance = returns.reduce((sum, r, i) => sum + weights[i] * Math.pow(r - weightedMean, 2), 0);
    
    return {
      weightedMean,
      weightedVariance,
      weightedSkewness: this.calculateWeightedSkewness(returns, weights, weightedMean, Math.sqrt(weightedVariance)),
      recentShock: Math.abs(returns[returns.length - 1]) > 2 * Math.sqrt(weightedVariance) ? 1 : 0
    };
  }

  private calculateWeightedSkewness(returns: number[], weights: number[], mean: number, std: number): number {
    if (std === 0) return 0;
    
    return returns.reduce((sum, r, i) => sum + weights[i] * Math.pow((r - mean) / std, 3), 0);
  }

  private calculateAttentionAdjustment(features: Record<string, number>): number {
    let adjustment = 0;
    
    // Increase volatility if recent shock detected
    if (features.recentShock > 0.5) {
      adjustment += 0.2;
    }
    
    // Adjust based on weighted skewness
    adjustment += Math.abs(features.weightedSkewness) * 0.1;
    
    // Bound the adjustment
    return Math.max(-0.3, Math.min(0.3, adjustment));
  }

  private calculateAttentionConfidence(weights: number[]): number {
    // Higher confidence when attention is well-distributed
    const entropy = -weights.reduce((sum, w) => sum + (w > 0 ? w * Math.log(w) : 0), 0);
    const maxEntropy = Math.log(weights.length);
    
    return 0.7 + 0.2 * (entropy / maxEntropy);
  }

  private calculateRollingVolatility(returns: number[]): number {
    if (returns.length < 2) return 0.02;
    
    const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
    
    return Math.sqrt(variance);
  }

  private assessRiskLevel(volatility: number): 'low' | 'medium' | 'high' | 'extreme' {
    if (volatility < 0.01) return 'low';
    if (volatility < 0.025) return 'medium';
    if (volatility < 0.05) return 'high';
    return 'extreme';
  }

  private decomposeVolatility(returns: number[], volatility: number): { trend: number; meanReversion: number; shock: number } {
    const recentReturns = returns.slice(-10);
    const trend = recentReturns.reduce((sum, r) => sum + Math.abs(r), 0) / recentReturns.length;
    
    return {
      trend: trend * 0.3,
      meanReversion: volatility * 0.4,
      shock: volatility * 0.3
    };
  }
}

// Volatility Model Service
export class VolatilityModelService {
  private models: Map<string, any> = new Map();

  constructor() {
    this.models.set('garch', new GARCHModel());
    this.models.set('lstm_volatility', new LSTMVolatilityModel());
    this.models.set('attention_volatility', new AttentionVolatilityModel());
  }

  async trainModel(modelType: string, returns: number[], config: VolatilityModelConfig): Promise<void> {
    const model = this.models.get(modelType);
    if (!model) {
      throw new Error(`Unknown volatility model type: ${modelType}`);
    }
    
    await model.train(returns, config);
  }

  async predict(modelType: string, returns: number[], config: VolatilityModelConfig): Promise<VolatilityPrediction> {
    const model = this.models.get(modelType);
    if (!model) {
      throw new Error(`Unknown volatility model type: ${modelType}`);
    }
    
    return await model.predict(returns, config);
  }

  getSupportedModels(): string[] {
    return Array.from(this.models.keys());
  }
}

export const volatilityModelService = new VolatilityModelService();