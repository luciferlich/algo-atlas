import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs/promises';

export interface MLTrainingConfig {
  modelType: 'lstm' | 'arima' | 'random_forest' | 'linear_regression' | 'garch' | 'transformer';
  dataSource: string;
  parameters: Record<string, any>;
  epochs?: number;
  batchSize?: number;
  validationSplit?: number;
}

export interface TrainingResult {
  id: string;
  status: 'pending' | 'training' | 'completed' | 'failed';
  modelType: string;
  accuracy?: number;
  loss?: number;
  modelPath?: string;
  error?: string;
  startTime: Date;
  endTime?: Date;
}

class MLTrainingService {
  private trainingSessions: Map<string, TrainingResult> = new Map();

  async startTraining(config: MLTrainingConfig): Promise<string> {
    const sessionId = this.generateSessionId();
    
    const session: TrainingResult = {
      id: sessionId,
      status: 'pending',
      modelType: config.modelType,
      startTime: new Date()
    };

    this.trainingSessions.set(sessionId, session);

    // Start training in background
    this.runTraining(sessionId, config).catch(error => {
      this.updateSession(sessionId, {
        status: 'failed',
        error: error.message,
        endTime: new Date()
      });
    });

    return sessionId;
  }

  async getTrainingStatus(sessionId: string): Promise<TrainingResult | null> {
    return this.trainingSessions.get(sessionId) || null;
  }

  async getAllSessions(): Promise<TrainingResult[]> {
    return Array.from(this.trainingSessions.values());
  }

  private async runTraining(sessionId: string, config: MLTrainingConfig): Promise<void> {
    this.updateSession(sessionId, { status: 'training' });

    // Create training data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'ml_data');
    await fs.mkdir(dataDir, { recursive: true });

    // Prepare training script path
    const scriptPath = path.join(process.cwd(), 'server/ml/scripts', `${config.modelType}.py`);
    
    // Prepare configuration file
    const configPath = path.join(dataDir, `config_${sessionId}.json`);
    await fs.writeFile(configPath, JSON.stringify(config, null, 2));

    return new Promise((resolve, reject) => {
      // Spawn Python training process
      const pythonProcess = spawn('python3', [scriptPath, configPath, sessionId], {
        cwd: process.cwd(),
        stdio: ['ignore', 'pipe', 'pipe']
      });

      let output = '';
      let errorOutput = '';

      pythonProcess.stdout?.on('data', (data) => {
        output += data.toString();
        console.log(`Training ${sessionId}: ${data}`);
      });

      pythonProcess.stderr?.on('data', (data) => {
        errorOutput += data.toString();
        console.error(`Training ${sessionId} error: ${data}`);
      });

      pythonProcess.on('close', async (code) => {
        if (code === 0) {
          // Training successful, parse results
          try {
            const resultPath = path.join(dataDir, `result_${sessionId}.json`);
            const resultData = await fs.readFile(resultPath, 'utf-8');
            const result = JSON.parse(resultData);

            this.updateSession(sessionId, {
              status: 'completed',
              accuracy: result.accuracy,
              loss: result.loss,
              modelPath: result.modelPath,
              endTime: new Date()
            });

            resolve();
          } catch (error) {
            this.updateSession(sessionId, {
              status: 'failed',
              error: 'Failed to parse training results',
              endTime: new Date()
            });
            reject(new Error('Failed to parse training results'));
          }
        } else {
          this.updateSession(sessionId, {
            status: 'failed',
            error: errorOutput || `Training process exited with code ${code}`,
            endTime: new Date()
          });
          reject(new Error(`Training failed with exit code ${code}`));
        }
      });
    });
  }

  private updateSession(sessionId: string, updates: Partial<TrainingResult>): void {
    const session = this.trainingSessions.get(sessionId);
    if (session) {
      Object.assign(session, updates);
      this.trainingSessions.set(sessionId, session);
    }
  }

  private generateSessionId(): string {
    return `training_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export const mlTrainingService = new MLTrainingService();

// Model prediction interface
export interface PredictionRequest {
  modelType: string;
  inputData: number[];
  symbol?: string;
  timeframe?: string;
}

export interface PredictionResult {
  prediction: number | number[];
  confidence: number;
  timestamp: Date;
  modelUsed: string;
  metadata?: Record<string, any>;
}

class MLPredictionService {
  async predict(request: PredictionRequest): Promise<PredictionResult> {
    // This would integrate with trained models
    // For now, returning mock structure
    return {
      prediction: this.generateMockPrediction(request.modelType, request.inputData),
      confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
      timestamp: new Date(),
      modelUsed: request.modelType,
      metadata: {
        symbol: request.symbol,
        timeframe: request.timeframe,
        inputFeatures: request.inputData.length
      }
    };
  }

  private generateMockPrediction(modelType: string, inputData: number[]): number | number[] {
    const lastValue = inputData[inputData.length - 1];
    const volatility = this.calculateVolatility(inputData);
    
    switch (modelType) {
      case 'lstm':
        // LSTM typically predicts next values
        return lastValue * (1 + (Math.random() - 0.5) * volatility * 0.1);
      
      case 'arima':
        // ARIMA predicts time series continuation
        return lastValue * (1 + (Math.random() - 0.5) * volatility * 0.05);
      
      case 'random_forest':
        // Random Forest can predict classification or regression
        return lastValue * (1 + (Math.random() - 0.5) * volatility * 0.08);
      
      case 'garch':
        // GARCH predicts volatility
        return volatility * (1 + (Math.random() - 0.5) * 0.2);
      
      default:
        return lastValue * (1 + (Math.random() - 0.5) * 0.05);
    }
  }

  private calculateVolatility(prices: number[]): number {
    if (prices.length < 2) return 0.02; // Default 2% volatility
    
    const returns = [];
    for (let i = 1; i < prices.length; i++) {
      returns.push((prices[i] - prices[i-1]) / prices[i-1]);
    }
    
    const mean = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
    const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) / returns.length;
    
    return Math.sqrt(variance);
  }
}

export const mlPredictionService = new MLPredictionService();