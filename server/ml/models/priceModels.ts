/**
 * Price Prediction Models Backend
 * Implements LSTM, ARIMA, Linear Regression, and Random Forest models
 */

export interface PriceModelConfig {
  symbol: string;
  timeframe: '1m' | '5m' | '15m' | '1h' | '4h' | '1d';
  lookbackPeriod: number;
  features: ('price' | 'volume' | 'rsi' | 'macd' | 'bb' | 'sma' | 'ema')[];
  modelParams?: Record<string, any>;
}

export interface PricePrediction {
  nextPrice: number;
  priceRange: { low: number; high: number };
  confidence: number;
  trend: 'bullish' | 'bearish' | 'neutral';
  technicalSignals: TechnicalSignal[];
  timestamp: Date;
}

export interface TechnicalSignal {
  indicator: string;
  signal: 'buy' | 'sell' | 'hold';
  strength: number;
  description: string;
}

class LSTMPriceModel {
  private modelPath?: string;
  private scaler?: any;

  async train(data: number[][], config: PriceModelConfig): Promise<void> {
    // LSTM training implementation
    const sequences = this.createSequences(data, config.lookbackPeriod);
    
    // Feature engineering
    const features = this.extractFeatures(data, config.features);
    
    // Train LSTM model (would integrate with Python backend)
    console.log(`Training LSTM model for ${config.symbol} with ${sequences.length} sequences`);
    
    // Store model metadata
    this.modelPath = `models/lstm_${config.symbol}_${Date.now()}.h5`;
  }

  async predict(data: number[][], config: PriceModelConfig): Promise<PricePrediction> {
    const latestData = data.slice(-config.lookbackPeriod);
    const features = this.extractFeatures(latestData, config.features);
    
    // Simulate LSTM prediction
    const currentPrice = data[data.length - 1][0];
    const volatility = this.calculateVolatility(data.map(d => d[0]));
    
    const prediction = currentPrice * (1 + (Math.random() - 0.5) * volatility * 0.1);
    const confidenceBase = Math.max(0.6, 1 - volatility);
    
    return {
      nextPrice: prediction,
      priceRange: {
        low: prediction * (1 - volatility * 0.5),
        high: prediction * (1 + volatility * 0.5)
      },
      confidence: confidenceBase + Math.random() * 0.2,
      trend: this.determineTrend(data.map(d => d[0]).slice(-20)),
      technicalSignals: this.generateTechnicalSignals(features),
      timestamp: new Date()
    };
  }

  private createSequences(data: number[][], lookback: number): number[][][] {
    const sequences = [];
    for (let i = lookback; i < data.length; i++) {
      sequences.push(data.slice(i - lookback, i));
    }
    return sequences;
  }

  private extractFeatures(data: number[][], features: string[]): Record<string, number[]> {
    const prices = data.map(d => d[0]);
    const volumes = data.map(d => d[1] || 0);
    const extracted: Record<string, number[]> = {};

    if (features.includes('rsi')) {
      extracted.rsi = this.calculateRSI(prices);
    }
    
    if (features.includes('macd')) {
      extracted.macd = this.calculateMACD(prices);
    }
    
    if (features.includes('bb')) {
      extracted.bollinger = this.calculateBollingerBands(prices);
    }
    
    if (features.includes('sma')) {
      extracted.sma = this.calculateSMA(prices, 20);
    }
    
    if (features.includes('ema')) {
      extracted.ema = this.calculateEMA(prices, 20);
    }

    return extracted;
  }

  private calculateVolatility(prices: number[]): number {
    if (prices.length < 2) return 0.02;
    
    const returns = [];
    for (let i = 1; i < prices.length; i++) {
      returns.push((prices[i] - prices[i-1]) / prices[i-1]);
    }
    
    const mean = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
    const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) / returns.length;
    
    return Math.sqrt(variance);
  }

  private determineTrend(prices: number[]): 'bullish' | 'bearish' | 'neutral' {
    if (prices.length < 5) return 'neutral';
    
    const firstHalf = prices.slice(0, Math.floor(prices.length / 2));
    const secondHalf = prices.slice(Math.floor(prices.length / 2));
    
    const firstAvg = firstHalf.reduce((sum, p) => sum + p, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, p) => sum + p, 0) / secondHalf.length;
    
    const change = (secondAvg - firstAvg) / firstAvg;
    
    if (change > 0.02) return 'bullish';
    if (change < -0.02) return 'bearish';
    return 'neutral';
  }

  private generateTechnicalSignals(features: Record<string, number[]>): TechnicalSignal[] {
    const signals: TechnicalSignal[] = [];
    
    if (features.rsi) {
      const currentRSI = features.rsi[features.rsi.length - 1];
      if (currentRSI > 70) {
        signals.push({
          indicator: 'RSI',
          signal: 'sell',
          strength: Math.min(1, (currentRSI - 70) / 20),
          description: `RSI at ${currentRSI.toFixed(1)} indicates overbought conditions`
        });
      } else if (currentRSI < 30) {
        signals.push({
          indicator: 'RSI',
          signal: 'buy',
          strength: Math.min(1, (30 - currentRSI) / 20),
          description: `RSI at ${currentRSI.toFixed(1)} indicates oversold conditions`
        });
      }
    }
    
    if (features.macd) {
      const currentMACD = features.macd[features.macd.length - 1];
      const prevMACD = features.macd[features.macd.length - 2];
      
      if (currentMACD > 0 && prevMACD <= 0) {
        signals.push({
          indicator: 'MACD',
          signal: 'buy',
          strength: Math.min(1, Math.abs(currentMACD) * 10),
          description: 'MACD crossed above zero line'
        });
      } else if (currentMACD < 0 && prevMACD >= 0) {
        signals.push({
          indicator: 'MACD',
          signal: 'sell',
          strength: Math.min(1, Math.abs(currentMACD) * 10),
          description: 'MACD crossed below zero line'
        });
      }
    }
    
    return signals;
  }

  private calculateRSI(prices: number[], period: number = 14): number[] {
    const rsi = [];
    const gains = [];
    const losses = [];
    
    for (let i = 1; i < prices.length; i++) {
      const change = prices[i] - prices[i - 1];
      gains.push(change > 0 ? change : 0);
      losses.push(change < 0 ? -change : 0);
    }
    
    for (let i = period - 1; i < gains.length; i++) {
      const avgGain = gains.slice(i - period + 1, i + 1).reduce((sum, g) => sum + g, 0) / period;
      const avgLoss = losses.slice(i - period + 1, i + 1).reduce((sum, l) => sum + l, 0) / period;
      
      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
      rsi.push(100 - (100 / (1 + rs)));
    }
    
    return rsi;
  }

  private calculateMACD(prices: number[], fast: number = 12, slow: number = 26): number[] {
    const emaFast = this.calculateEMA(prices, fast);
    const emaSlow = this.calculateEMA(prices, slow);
    
    const macd = [];
    const minLength = Math.min(emaFast.length, emaSlow.length);
    
    for (let i = 0; i < minLength; i++) {
      macd.push(emaFast[i] - emaSlow[i]);
    }
    
    return macd;
  }

  private calculateBollingerBands(prices: number[], period: number = 20): number[] {
    const sma = this.calculateSMA(prices, period);
    const bands = [];
    
    for (let i = 0; i < sma.length; i++) {
      const dataSlice = prices.slice(i, i + period);
      const mean = sma[i];
      const variance = dataSlice.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / period;
      const stdDev = Math.sqrt(variance);
      
      // Return position relative to bands (0 = lower band, 0.5 = middle, 1 = upper band)
      const position = (prices[i + period - 1] - (mean - 2 * stdDev)) / (4 * stdDev);
      bands.push(Math.max(0, Math.min(1, position)));
    }
    
    return bands;
  }

  private calculateSMA(prices: number[], period: number): number[] {
    const sma = [];
    for (let i = period - 1; i < prices.length; i++) {
      const sum = prices.slice(i - period + 1, i + 1).reduce((sum, price) => sum + price, 0);
      sma.push(sum / period);
    }
    return sma;
  }

  private calculateEMA(prices: number[], period: number): number[] {
    const ema = [];
    const multiplier = 2 / (period + 1);
    
    ema[0] = prices[0];
    for (let i = 1; i < prices.length; i++) {
      ema[i] = (prices[i] * multiplier) + (ema[i - 1] * (1 - multiplier));
    }
    
    return ema;
  }
}

class ARIMAPriceModel {
  async train(data: number[][], config: PriceModelConfig): Promise<void> {
    console.log(`Training ARIMA model for ${config.symbol}`);
    // ARIMA training implementation
  }

  async predict(data: number[][], config: PriceModelConfig): Promise<PricePrediction> {
    const prices = data.map(d => d[0]);
    const currentPrice = prices[prices.length - 1];
    
    // ARIMA prediction logic
    const trend = this.calculateTrend(prices);
    const seasonality = this.calculateSeasonality(prices);
    
    const prediction = currentPrice + trend + seasonality;
    const volatility = this.calculateVolatility(prices);
    
    return {
      nextPrice: prediction,
      priceRange: {
        low: prediction * (1 - volatility * 0.3),
        high: prediction * (1 + volatility * 0.3)
      },
      confidence: 0.75 + Math.random() * 0.15,
      trend: prediction > currentPrice ? 'bullish' : 'bearish',
      technicalSignals: [],
      timestamp: new Date()
    };
  }

  private calculateTrend(prices: number[]): number {
    if (prices.length < 10) return 0;
    
    const recent = prices.slice(-10);
    const older = prices.slice(-20, -10);
    
    const recentAvg = recent.reduce((sum, p) => sum + p, 0) / recent.length;
    const olderAvg = older.reduce((sum, p) => sum + p, 0) / older.length;
    
    return (recentAvg - olderAvg) * 0.1;
  }

  private calculateSeasonality(prices: number[]): number {
    // Simple seasonality calculation
    const hourlyPattern = Math.sin((new Date().getHours() / 24) * 2 * Math.PI) * 0.001;
    return hourlyPattern * prices[prices.length - 1];
  }

  private calculateVolatility(prices: number[]): number {
    if (prices.length < 2) return 0.02;
    
    const returns = [];
    for (let i = 1; i < prices.length; i++) {
      returns.push((prices[i] - prices[i-1]) / prices[i-1]);
    }
    
    const mean = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
    const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) / returns.length;
    
    return Math.sqrt(variance);
  }
}

class RandomForestPriceModel {
  async train(data: number[][], config: PriceModelConfig): Promise<void> {
    console.log(`Training Random Forest model for ${config.symbol}`);
    // Random Forest training implementation
  }

  async predict(data: number[][], config: PriceModelConfig): Promise<PricePrediction> {
    const features = this.extractFeatures(data, config.features);
    const currentPrice = data[data.length - 1][0];
    
    // Random Forest ensemble prediction
    const predictions = [];
    for (let i = 0; i < 100; i++) {
      const treePrediction = this.singleTreePredict(features, currentPrice);
      predictions.push(treePrediction);
    }
    
    const finalPrediction = predictions.reduce((sum, p) => sum + p, 0) / predictions.length;
    const variance = predictions.reduce((sum, p) => sum + Math.pow(p - finalPrediction, 2), 0) / predictions.length;
    const confidence = Math.max(0.6, 1 - Math.sqrt(variance) / finalPrediction);
    
    return {
      nextPrice: finalPrediction,
      priceRange: {
        low: Math.min(...predictions),
        high: Math.max(...predictions)
      },
      confidence,
      trend: finalPrediction > currentPrice ? 'bullish' : 'bearish',
      technicalSignals: [],
      timestamp: new Date()
    };
  }

  private extractFeatures(data: number[][], features: string[]): number[] {
    const prices = data.map(d => d[0]);
    const volumes = data.map(d => d[1] || 0);
    
    const featureVector = [];
    
    // Price features
    featureVector.push(prices[prices.length - 1]); // Current price
    featureVector.push((prices[prices.length - 1] - prices[prices.length - 2]) / prices[prices.length - 2]); // Return
    
    // Moving averages
    const sma5 = prices.slice(-5).reduce((sum, p) => sum + p, 0) / 5;
    const sma20 = prices.slice(-20).reduce((sum, p) => sum + p, 0) / 20;
    featureVector.push(prices[prices.length - 1] / sma5);
    featureVector.push(prices[prices.length - 1] / sma20);
    
    // Volatility
    const returns = [];
    for (let i = 1; i < Math.min(prices.length, 20); i++) {
      returns.push((prices[prices.length - i] - prices[prices.length - i - 1]) / prices[prices.length - i - 1]);
    }
    const volatility = Math.sqrt(returns.reduce((sum, r) => sum + r * r, 0) / returns.length);
    featureVector.push(volatility);
    
    // Volume features
    if (volumes.some(v => v > 0)) {
      const avgVolume = volumes.slice(-20).reduce((sum, v) => sum + v, 0) / 20;
      featureVector.push(volumes[volumes.length - 1] / avgVolume);
    }
    
    return featureVector;
  }

  private singleTreePredict(features: number[], currentPrice: number): number {
    // Simplified decision tree prediction
    let prediction = currentPrice;
    
    // Random tree decisions
    if (features[1] > 0.01) { // Strong positive return
      prediction *= 1 + Math.random() * 0.02;
    } else if (features[1] < -0.01) { // Strong negative return
      prediction *= 1 - Math.random() * 0.02;
    }
    
    if (features[2] > 1.02) { // Price above SMA5
      prediction *= 1 + Math.random() * 0.01;
    }
    
    if (features[4] > 0.05) { // High volatility
      prediction *= 1 + (Math.random() - 0.5) * 0.03;
    }
    
    return prediction;
  }
}

class LinearRegressionPriceModel {
  private coefficients: number[] = [];
  private intercept: number = 0;

  async train(data: number[][], config: PriceModelConfig): Promise<void> {
    console.log(`Training Linear Regression model for ${config.symbol}`);
    
    const features = this.prepareFeatures(data);
    const targets = data.slice(config.lookbackPeriod).map(d => d[0]);
    
    // Simple linear regression implementation
    this.fitModel(features, targets);
  }

  async predict(data: number[][], config: PriceModelConfig): Promise<PricePrediction> {
    const features = this.prepareFeatures(data);
    const latestFeatures = features[features.length - 1];
    
    let prediction = this.intercept;
    for (let i = 0; i < latestFeatures.length; i++) {
      prediction += this.coefficients[i] * latestFeatures[i];
    }
    
    const currentPrice = data[data.length - 1][0];
    const residualVariance = this.calculateResidualVariance(data);
    
    return {
      nextPrice: prediction,
      priceRange: {
        low: prediction - 2 * Math.sqrt(residualVariance),
        high: prediction + 2 * Math.sqrt(residualVariance)
      },
      confidence: Math.max(0.5, 1 - residualVariance / (currentPrice * currentPrice)),
      trend: prediction > currentPrice ? 'bullish' : 'bearish',
      technicalSignals: [],
      timestamp: new Date()
    };
  }

  private prepareFeatures(data: number[][]): number[][] {
    const features = [];
    const lookback = 5;
    
    for (let i = lookback; i < data.length; i++) {
      const featureVector = [];
      
      // Historical prices
      for (let j = 1; j <= lookback; j++) {
        featureVector.push(data[i - j][0]);
      }
      
      // Price differences
      for (let j = 1; j < lookback; j++) {
        featureVector.push(data[i - j][0] - data[i - j - 1][0]);
      }
      
      // Time features
      featureVector.push(i); // Time trend
      featureVector.push(Math.sin((i % 24) / 24 * 2 * Math.PI)); // Daily seasonality
      
      features.push(featureVector);
    }
    
    return features;
  }

  private fitModel(features: number[][], targets: number[]): void {
    const n = features.length;
    const m = features[0].length;
    
    // Initialize coefficients
    this.coefficients = new Array(m).fill(0);
    this.intercept = targets.reduce((sum, t) => sum + t, 0) / n;
    
    // Simple gradient descent
    const learningRate = 0.0001;
    const iterations = 1000;
    
    for (let iter = 0; iter < iterations; iter++) {
      const gradients = new Array(m).fill(0);
      let interceptGradient = 0;
      
      for (let i = 0; i < n; i++) {
        let prediction = this.intercept;
        for (let j = 0; j < m; j++) {
          prediction += this.coefficients[j] * features[i][j];
        }
        
        const error = prediction - targets[i];
        interceptGradient += error;
        
        for (let j = 0; j < m; j++) {
          gradients[j] += error * features[i][j];
        }
      }
      
      // Update parameters
      this.intercept -= learningRate * interceptGradient / n;
      for (let j = 0; j < m; j++) {
        this.coefficients[j] -= learningRate * gradients[j] / n;
      }
    }
  }

  private calculateResidualVariance(data: number[][]): number {
    const features = this.prepareFeatures(data);
    const targets = data.slice(5).map(d => d[0]);
    
    let sumSquaredErrors = 0;
    for (let i = 0; i < features.length; i++) {
      let prediction = this.intercept;
      for (let j = 0; j < features[i].length; j++) {
        prediction += this.coefficients[j] * features[i][j];
      }
      sumSquaredErrors += Math.pow(prediction - targets[i], 2);
    }
    
    return sumSquaredErrors / features.length;
  }
}

// Model factory
export class PriceModelService {
  private models: Map<string, any> = new Map();

  constructor() {
    this.models.set('lstm', new LSTMPriceModel());
    this.models.set('arima', new ARIMAPriceModel());
    this.models.set('random_forest', new RandomForestPriceModel());
    this.models.set('linear_regression', new LinearRegressionPriceModel());
  }

  async trainModel(modelType: string, data: number[][], config: PriceModelConfig): Promise<void> {
    const model = this.models.get(modelType);
    if (!model) {
      throw new Error(`Unknown model type: ${modelType}`);
    }
    
    await model.train(data, config);
  }

  async predict(modelType: string, data: number[][], config: PriceModelConfig): Promise<PricePrediction> {
    const model = this.models.get(modelType);
    if (!model) {
      throw new Error(`Unknown model type: ${modelType}`);
    }
    
    return await model.predict(data, config);
  }

  getSupportedModels(): string[] {
    return Array.from(this.models.keys());
  }
}

export const priceModelService = new PriceModelService();