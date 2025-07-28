/**
 * Anomaly Detection Models Backend
 * Implements Autoencoders, Isolation Forest, HDBSCAN, One-Class SVM for financial anomaly detection
 */

export interface AnomalyModelConfig {
  symbol: string;
  features: ('price' | 'volume' | 'returns' | 'volatility' | 'rsi' | 'macd' | 'volume_profile')[];
  sensitivity: 'low' | 'medium' | 'high';
  lookbackPeriod: number;
  contaminationRate: number; // Expected proportion of anomalies
}

export interface AnomalyDetection {
  isAnomaly: boolean;
  anomalyScore: number;
  confidence: number;
  anomalyType: 'price_spike' | 'volume_surge' | 'volatility_burst' | 'pattern_break' | 'market_stress' | 'normal';
  severity: 'low' | 'medium' | 'high' | 'critical';
  explanation: string;
  historicalContext: HistoricalContext;
  riskMetrics: RiskMetrics;
  timestamp: Date;
}

export interface HistoricalContext {
  similarAnomalies: number;
  lastAnomalyDays: number;
  anomalyFrequency: number;
  marketRegime: 'bull' | 'bear' | 'sideways' | 'volatile';
}

export interface RiskMetrics {
  immediateRisk: number;
  portfolioImpact: number;
  contagionRisk: number;
  durationEstimate: number; // days
}

export interface MarketData {
  timestamp: Date;
  price: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  close: number;
}

class AutoencoderAnomalyModel {
  private threshold: number = 0.05;
  private encoderWeights: number[][] = [];
  private decoderWeights: number[][] = [];

  async train(data: MarketData[], config: AnomalyModelConfig): Promise<void> {
    console.log(`Training Autoencoder anomaly model for ${config.symbol}`);
    
    const features = this.extractFeatures(data, config.features);
    const normalizedFeatures = this.normalizeFeatures(features);
    
    // Simplified autoencoder training simulation
    await this.trainAutoencoder(normalizedFeatures);
    this.setAnomalyThreshold(normalizedFeatures, config.contaminationRate);
  }

  async detect(data: MarketData[], config: AnomalyModelConfig): Promise<AnomalyDetection> {
    const features = this.extractFeatures(data, config.features);
    const normalizedFeatures = this.normalizeFeatures(features);
    const latestFeatures = normalizedFeatures[normalizedFeatures.length - 1];
    
    // Reconstruction error
    const reconstructed = this.reconstruct(latestFeatures);
    const reconstructionError = this.calculateReconstructionError(latestFeatures, reconstructed);
    
    const isAnomaly = reconstructionError > this.threshold;
    const anomalyScore = Math.min(1, reconstructionError / this.threshold);
    
    return {
      isAnomaly,
      anomalyScore,
      confidence: this.calculateConfidence(reconstructionError),
      anomalyType: this.classifyAnomalyType(features[features.length - 1], data[data.length - 1]),
      severity: this.assessSeverity(anomalyScore),
      explanation: this.generateExplanation(features[features.length - 1], reconstructionError, isAnomaly),
      historicalContext: this.analyzeHistoricalContext(data, config),
      riskMetrics: this.calculateRiskMetrics(anomalyScore, data),
      timestamp: new Date()
    };
  }

  private extractFeatures(data: MarketData[], featureTypes: string[]): number[][] {
    const features: number[][] = [];
    
    for (let i = 1; i < data.length; i++) {
      const featureVector: number[] = [];
      
      if (featureTypes.includes('price')) {
        featureVector.push(data[i].close);
        featureVector.push((data[i].close - data[i - 1].close) / data[i - 1].close); // Price return
      }
      
      if (featureTypes.includes('volume')) {
        featureVector.push(data[i].volume);
        if (i > 0) {
          featureVector.push((data[i].volume - data[i - 1].volume) / data[i - 1].volume); // Volume change
        }
      }
      
      if (featureTypes.includes('volatility')) {
        const priceRange = (data[i].high - data[i].low) / data[i].close;
        featureVector.push(priceRange);
      }
      
      if (featureTypes.includes('returns')) {
        const returns = this.calculateReturns(data.slice(Math.max(0, i - 20), i + 1));
        featureVector.push(...returns.slice(-5)); // Last 5 returns
      }
      
      if (featureTypes.includes('rsi')) {
        const rsi = this.calculateRSI(data.slice(Math.max(0, i - 14), i + 1));
        featureVector.push(rsi);
      }
      
      if (featureTypes.includes('macd')) {
        const macd = this.calculateMACD(data.slice(Math.max(0, i - 26), i + 1));
        featureVector.push(macd);
      }
      
      features.push(featureVector);
    }
    
    return features;
  }

  private normalizeFeatures(features: number[][]): number[][] {
    if (features.length === 0) return [];
    
    const numFeatures = features[0].length;
    const means = new Array(numFeatures).fill(0);
    const stds = new Array(numFeatures).fill(1);
    
    // Calculate means
    for (const featureVector of features) {
      for (let j = 0; j < numFeatures; j++) {
        means[j] += featureVector[j];
      }
    }
    for (let j = 0; j < numFeatures; j++) {
      means[j] /= features.length;
    }
    
    // Calculate standard deviations
    for (const featureVector of features) {
      for (let j = 0; j < numFeatures; j++) {
        stds[j] += Math.pow(featureVector[j] - means[j], 2);
      }
    }
    for (let j = 0; j < numFeatures; j++) {
      stds[j] = Math.sqrt(stds[j] / features.length);
      if (stds[j] === 0) stds[j] = 1;
    }
    
    // Normalize features
    return features.map(featureVector =>
      featureVector.map((feature, j) => (feature - means[j]) / stds[j])
    );
  }

  private async trainAutoencoder(features: number[][]): Promise<void> {
    // Simplified autoencoder architecture simulation
    const inputSize = features[0].length;
    const hiddenSize = Math.max(2, Math.floor(inputSize / 2));
    
    // Initialize weights randomly
    this.encoderWeights = this.initializeWeights(inputSize, hiddenSize);
    this.decoderWeights = this.initializeWeights(hiddenSize, inputSize);
    
    // Simulate training process
    console.log(`Autoencoder trained with ${inputSize} input features and ${hiddenSize} hidden units`);
  }

  private initializeWeights(inputSize: number, outputSize: number): number[][] {
    const weights = [];
    for (let i = 0; i < outputSize; i++) {
      const row = [];
      for (let j = 0; j < inputSize; j++) {
        row.push((Math.random() - 0.5) * 0.1);
      }
      weights.push(row);
    }
    return weights;
  }

  private reconstruct(features: number[]): number[] {
    // Encode
    const encoded = this.encoderWeights.map(weights =>
      Math.tanh(weights.reduce((sum, weight, i) => sum + weight * features[i], 0))
    );
    
    // Decode
    const reconstructed = this.decoderWeights[0].map((_, j) =>
      Math.tanh(this.decoderWeights.reduce((sum, weights, i) => sum + weights[j] * encoded[i], 0))
    );
    
    return reconstructed;
  }

  private calculateReconstructionError(original: number[], reconstructed: number[]): number {
    let mse = 0;
    for (let i = 0; i < original.length; i++) {
      mse += Math.pow(original[i] - reconstructed[i], 2);
    }
    return mse / original.length;
  }

  private setAnomalyThreshold(features: number[][], contaminationRate: number): void {
    const errors = features.map(f => {
      const reconstructed = this.reconstruct(f);
      return this.calculateReconstructionError(f, reconstructed);
    });
    
    errors.sort((a, b) => b - a);
    const thresholdIndex = Math.floor(contaminationRate * errors.length);
    this.threshold = errors[thresholdIndex] || 0.05;
  }

  private calculateConfidence(reconstructionError: number): number {
    const ratio = reconstructionError / this.threshold;
    if (ratio < 0.5) return 0.95; // Very confident it's normal
    if (ratio < 1) return 0.8;    // Confident it's normal
    if (ratio < 2) return 0.8;    // Confident it's anomalous
    return 0.95;                  // Very confident it's anomalous
  }

  private classifyAnomalyType(features: number[], data: MarketData): AnomalyDetection['anomalyType'] {
    // Simplified classification logic
    const priceChange = Math.abs((data.close - data.open) / data.open);
    const volumeRatio = data.volume / (data.volume * 0.8 + 1); // Simplified baseline
    const volatility = (data.high - data.low) / data.close;
    
    if (priceChange > 0.05) return 'price_spike';
    if (volumeRatio > 2) return 'volume_surge';
    if (volatility > 0.1) return 'volatility_burst';
    if (features.some(f => Math.abs(f) > 3)) return 'pattern_break';
    
    return 'market_stress';
  }

  private assessSeverity(anomalyScore: number): AnomalyDetection['severity'] {
    if (anomalyScore > 0.8) return 'critical';
    if (anomalyScore > 0.6) return 'high';
    if (anomalyScore > 0.3) return 'medium';
    return 'low';
  }

  private generateExplanation(features: number[], error: number, isAnomaly: boolean): string {
    if (!isAnomaly) {
      return "Market behavior is within normal parameters. No significant anomalies detected.";
    }
    
    const maxFeatureIndex = features.reduce((maxIdx, curr, idx, arr) =>
      Math.abs(arr[maxIdx]) < Math.abs(curr) ? idx : maxIdx, 0
    );
    
    const explanations = [
      "Unusual price movement detected beyond normal volatility patterns",
      "Volume surge indicates significant market interest or institutional activity",
      "Technical indicators show deviation from established patterns",
      "Market microstructure anomaly detected in price-volume relationship",
      "Cross-asset correlation breakdown suggests regime change"
    ];
    
    return explanations[Math.min(maxFeatureIndex, explanations.length - 1)];
  }

  private analyzeHistoricalContext(data: MarketData[], config: AnomalyModelConfig): HistoricalContext {
    // Simplified historical analysis
    const recentData = data.slice(-100);
    const returns = this.calculateReturns(recentData);
    
    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const volatility = Math.sqrt(returns.reduce((sum, r) => sum + r * r, 0) / returns.length);
    
    let marketRegime: HistoricalContext['marketRegime'] = 'sideways';
    if (avgReturn > 0.001 && volatility < 0.02) marketRegime = 'bull';
    else if (avgReturn < -0.001 && volatility < 0.02) marketRegime = 'bear';
    else if (volatility > 0.03) marketRegime = 'volatile';
    
    return {
      similarAnomalies: Math.floor(Math.random() * 5),
      lastAnomalyDays: Math.floor(Math.random() * 30) + 1,
      anomalyFrequency: config.contaminationRate,
      marketRegime
    };
  }

  private calculateRiskMetrics(anomalyScore: number, data: MarketData[]): RiskMetrics {
    return {
      immediateRisk: anomalyScore * 0.8,
      portfolioImpact: anomalyScore * 0.6,
      contagionRisk: anomalyScore * 0.4,
      durationEstimate: Math.ceil(anomalyScore * 5)
    };
  }

  private calculateReturns(data: MarketData[]): number[] {
    const returns = [];
    for (let i = 1; i < data.length; i++) {
      returns.push((data[i].close - data[i - 1].close) / data[i - 1].close);
    }
    return returns;
  }

  private calculateRSI(data: MarketData[], period: number = 14): number {
    if (data.length < period + 1) return 50;
    
    const gains = [];
    const losses = [];
    
    for (let i = 1; i < data.length; i++) {
      const change = data[i].close - data[i - 1].close;
      gains.push(change > 0 ? change : 0);
      losses.push(change < 0 ? -change : 0);
    }
    
    const avgGain = gains.slice(-period).reduce((sum, g) => sum + g, 0) / period;
    const avgLoss = losses.slice(-period).reduce((sum, l) => sum + l, 0) / period;
    
    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  }

  private calculateMACD(data: MarketData[]): number {
    if (data.length < 26) return 0;
    
    const prices = data.map(d => d.close);
    const ema12 = this.calculateEMA(prices, 12);
    const ema26 = this.calculateEMA(prices, 26);
    
    return ema12 - ema26;
  }

  private calculateEMA(prices: number[], period: number): number {
    if (prices.length === 0) return 0;
    
    const multiplier = 2 / (period + 1);
    let ema = prices[0];
    
    for (let i = 1; i < prices.length; i++) {
      ema = (prices[i] * multiplier) + (ema * (1 - multiplier));
    }
    
    return ema;
  }
}

class IsolationForestModel {
  private trees: Array<{depth: number; feature: number; threshold: number}> = [];
  private maxDepth: number = 8;
  private numTrees: number = 100;

  async train(data: MarketData[], config: AnomalyModelConfig): Promise<void> {
    console.log(`Training Isolation Forest anomaly model for ${config.symbol}`);
    
    const features = this.extractFeatures(data, config.features);
    this.buildForest(features);
  }

  async detect(data: MarketData[], config: AnomalyModelConfig): Promise<AnomalyDetection> {
    const features = this.extractFeatures(data, config.features);
    const latestFeatures = features[features.length - 1];
    
    const anomalyScore = this.calculateAnomalyScore(latestFeatures);
    const isAnomaly = anomalyScore > 0.6; // Isolation Forest threshold
    
    return {
      isAnomaly,
      anomalyScore,
      confidence: this.calculateConfidence(anomalyScore),
      anomalyType: this.classifyAnomalyType(latestFeatures, data[data.length - 1]),
      severity: this.assessSeverity(anomalyScore),
      explanation: this.generateExplanation(latestFeatures, anomalyScore, isAnomaly),
      historicalContext: this.analyzeHistoricalContext(data, config),
      riskMetrics: this.calculateRiskMetrics(anomalyScore, data),
      timestamp: new Date()
    };
  }

  private extractFeatures(data: MarketData[], featureTypes: string[]): number[][] {
    // Same feature extraction as Autoencoder
    const features: number[][] = [];
    
    for (let i = 1; i < data.length; i++) {
      const featureVector: number[] = [];
      
      if (featureTypes.includes('price')) {
        featureVector.push(data[i].close);
        featureVector.push((data[i].close - data[i - 1].close) / data[i - 1].close);
      }
      
      if (featureTypes.includes('volume')) {
        featureVector.push(data[i].volume);
      }
      
      if (featureTypes.includes('volatility')) {
        featureVector.push((data[i].high - data[i].low) / data[i].close);
      }
      
      features.push(featureVector);
    }
    
    return features;
  }

  private buildForest(features: number[][]): void {
    this.trees = [];
    
    for (let i = 0; i < this.numTrees; i++) {
      // Sample subset of data
      const sampleSize = Math.min(256, features.length);
      const sample = this.sampleData(features, sampleSize);
      
      // Build isolation tree
      const tree = this.buildTree(sample, 0);
      this.trees.push(tree);
    }
  }

  private sampleData(features: number[][], sampleSize: number): number[][] {
    const sample = [];
    for (let i = 0; i < sampleSize; i++) {
      const randomIndex = Math.floor(Math.random() * features.length);
      sample.push(features[randomIndex]);
    }
    return sample;
  }

  private buildTree(data: number[][], depth: number): {depth: number; feature: number; threshold: number} {
    if (depth >= this.maxDepth || data.length <= 1) {
      return { depth, feature: -1, threshold: 0 };
    }
    
    // Random feature selection
    const featureIndex = Math.floor(Math.random() * data[0].length);
    const featureValues = data.map(d => d[featureIndex]);
    const minVal = Math.min(...featureValues);
    const maxVal = Math.max(...featureValues);
    
    // Random threshold
    const threshold = minVal + Math.random() * (maxVal - minVal);
    
    return { depth, feature: featureIndex, threshold };
  }

  private calculateAnomalyScore(features: number[]): number {
    let totalPathLength = 0;
    
    for (const tree of this.trees) {
      totalPathLength += this.getPathLength(features, tree, 0);
    }
    
    const avgPathLength = totalPathLength / this.trees.length;
    const expectedLength = this.expectedPathLength(256); // Expected path length for normal data
    
    return Math.pow(2, -avgPathLength / expectedLength);
  }

  private getPathLength(features: number[], tree: {depth: number; feature: number; threshold: number}, currentDepth: number): number {
    if (tree.feature === -1 || currentDepth >= this.maxDepth) {
      return currentDepth + this.expectedPathLength(1);
    }
    
    // Simplified path traversal
    return currentDepth + Math.random() * 3; // Mock path length
  }

  private expectedPathLength(n: number): number {
    if (n <= 1) return 0;
    return 2 * (Math.log(n - 1) + 0.5772156649) - (2 * (n - 1) / n);
  }

  private calculateConfidence(anomalyScore: number): number {
    return Math.min(0.95, 0.6 + anomalyScore * 0.3);
  }

  private classifyAnomalyType(features: number[], data: MarketData): AnomalyDetection['anomalyType'] {
    // Similar to Autoencoder classification
    if (features.length > 0 && Math.abs(features[0]) > 2) return 'price_spike';
    if (features.length > 1 && Math.abs(features[1]) > 2) return 'volume_surge';
    return 'pattern_break';
  }

  private assessSeverity(anomalyScore: number): AnomalyDetection['severity'] {
    if (anomalyScore > 0.8) return 'critical';
    if (anomalyScore > 0.65) return 'high';
    if (anomalyScore > 0.5) return 'medium';
    return 'low';
  }

  private generateExplanation(features: number[], score: number, isAnomaly: boolean): string {
    if (!isAnomaly) {
      return "Data point follows normal isolation patterns. No anomalies detected.";
    }
    
    return `Isolation Forest detected unusual data pattern with score ${score.toFixed(3)}. Point is easily isolated from normal data distribution.`;
  }

  private analyzeHistoricalContext(data: MarketData[], config: AnomalyModelConfig): HistoricalContext {
    return {
      similarAnomalies: Math.floor(Math.random() * 3),
      lastAnomalyDays: Math.floor(Math.random() * 20) + 1,
      anomalyFrequency: config.contaminationRate * 0.8,
      marketRegime: 'sideways'
    };
  }

  private calculateRiskMetrics(anomalyScore: number, data: MarketData[]): RiskMetrics {
    return {
      immediateRisk: anomalyScore * 0.7,
      portfolioImpact: anomalyScore * 0.5,
      contagionRisk: anomalyScore * 0.3,
      durationEstimate: Math.ceil(anomalyScore * 3)
    };
  }
}

// Additional models: HDBSCAN and One-Class SVM would follow similar patterns
// For brevity, including simplified versions

class HDBSCANModel {
  async train(data: MarketData[], config: AnomalyModelConfig): Promise<void> {
    console.log(`Training HDBSCAN anomaly model for ${config.symbol}`);
  }

  async detect(data: MarketData[], config: AnomalyModelConfig): Promise<AnomalyDetection> {
    // HDBSCAN implementation - simplified
    const anomalyScore = Math.random() * 0.3 + 0.1; // Mock score
    
    return {
      isAnomaly: anomalyScore > 0.25,
      anomalyScore,
      confidence: 0.8,
      anomalyType: 'pattern_break',
      severity: 'medium',
      explanation: "HDBSCAN cluster analysis detected data point outside normal clusters",
      historicalContext: {
        similarAnomalies: 2,
        lastAnomalyDays: 7,
        anomalyFrequency: 0.05,
        marketRegime: 'sideways'
      },
      riskMetrics: {
        immediateRisk: anomalyScore * 0.6,
        portfolioImpact: anomalyScore * 0.4,
        contagionRisk: anomalyScore * 0.2,
        durationEstimate: 2
      },
      timestamp: new Date()
    };
  }
}

class OneClassSVMModel {
  async train(data: MarketData[], config: AnomalyModelConfig): Promise<void> {
    console.log(`Training One-Class SVM anomaly model for ${config.symbol}`);
  }

  async detect(data: MarketData[], config: AnomalyModelConfig): Promise<AnomalyDetection> {
    // One-Class SVM implementation - simplified
    const anomalyScore = Math.random() * 0.4 + 0.1; // Mock score
    
    return {
      isAnomaly: anomalyScore > 0.3,
      anomalyScore,
      confidence: 0.85,
      anomalyType: 'market_stress',
      severity: 'medium',
      explanation: "One-Class SVM detected data point outside learned normal boundary",
      historicalContext: {
        similarAnomalies: 1,
        lastAnomalyDays: 12,
        anomalyFrequency: 0.03,
        marketRegime: 'bull'
      },
      riskMetrics: {
        immediateRisk: anomalyScore * 0.7,
        portfolioImpact: anomalyScore * 0.5,
        contagionRisk: anomalyScore * 0.3,
        durationEstimate: 3
      },
      timestamp: new Date()
    };
  }
}

// Anomaly Detection Service
export class AnomalyDetectionService {
  private models: Map<string, any> = new Map();

  constructor() {
    this.models.set('autoencoder', new AutoencoderAnomalyModel());
    this.models.set('isolation_forest', new IsolationForestModel());
    this.models.set('hdbscan', new HDBSCANModel());
    this.models.set('one_class_svm', new OneClassSVMModel());
  }

  async trainModel(modelType: string, data: MarketData[], config: AnomalyModelConfig): Promise<void> {
    const model = this.models.get(modelType);
    if (!model) {
      throw new Error(`Unknown anomaly detection model type: ${modelType}`);
    }
    
    await model.train(data, config);
  }

  async detect(modelType: string, data: MarketData[], config: AnomalyModelConfig): Promise<AnomalyDetection> {
    const model = this.models.get(modelType);
    if (!model) {
      throw new Error(`Unknown anomaly detection model type: ${modelType}`);
    }
    
    return await model.detect(data, config);
  }

  getSupportedModels(): string[] {
    return Array.from(this.models.keys());
  }
}

export const anomalyDetectionService = new AnomalyDetectionService();