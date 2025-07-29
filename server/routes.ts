import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { mlTrainingService, mlPredictionService, PredictionRequest } from "./ml/index";
import { monteCarloService, portfolioOptimizer, MonteCarloConfig, PortfolioOptimizationConfig } from "./simulations/monteCarlo";
import { priceModelService } from "./ml/models/priceModels";
import { volatilityModelService } from "./ml/models/volatilityModels";
import { portfolioModelService } from "./ml/models/portfolioModels";
import { anomalyDetectionService, MarketData } from "./ml/models/anomalyModels";

export async function registerRoutes(app: Express): Promise<Server> {
  // ML Training Routes
  const TrainingConfigSchema = z.object({
    modelType: z.enum(['lstm', 'arima', 'random_forest', 'linear_regression', 'garch', 'transformer']),
    dataSource: z.string(),
    parameters: z.record(z.any()),
    epochs: z.number().optional(),
    batchSize: z.number().optional(),
    validationSplit: z.number().optional()
  });

  app.post("/api/training/start", async (req, res) => {
    try {
      const config = TrainingConfigSchema.parse(req.body);
      const sessionId = await mlTrainingService.startTraining(config);
      res.json({ sessionId, status: 'started' });
    } catch (error) {
      res.status(400).json({ error: 'Invalid training configuration' });
    }
  });

  app.get("/api/training/status/:id", async (req, res) => {
    try {
      const sessionId = req.params.id;
      const status = await mlTrainingService.getTrainingStatus(sessionId);
      
      if (!status) {
        return res.status(404).json({ error: 'Training session not found' });
      }
      
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get training status' });
    }
  });

  app.get("/api/training/sessions", async (req, res) => {
    try {
      const sessions = await mlTrainingService.getAllSessions();
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get training sessions' });
    }
  });

  // ML Prediction Routes
  const PredictionSchema = z.object({
    modelType: z.string(),
    inputData: z.array(z.number()),
    symbol: z.string().optional(),
    timeframe: z.string().optional()
  });

  app.post("/api/models/predict", async (req, res) => {
    try {
      const request: PredictionRequest = PredictionSchema.parse(req.body);
      const result = await mlPredictionService.predict(request);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: 'Invalid prediction request' });
    }
  });

  // Monte Carlo Simulation Routes
  const MonteCarloConfigSchema = z.object({
    iterations: z.number().min(1000).max(100000),
    timeHorizon: z.number().min(1).max(1000),
    initialValue: z.number().positive(),
    expectedReturn: z.number(),
    volatility: z.number().positive(),
    confidence: z.number().min(0.9).max(0.99),
    simulationType: z.enum(['geometric_brownian', 'jump_diffusion', 'mean_reversion', 'portfolio']),
    assets: z.array(z.object({
      symbol: z.string(),
      weight: z.number(),
      expectedReturn: z.number(),
      volatility: z.number().positive(),
      correlation: z.array(z.array(z.number())).optional()
    })).optional()
  });

  app.post("/api/simulations/monte-carlo", async (req, res) => {
    try {
      const config: MonteCarloConfig = MonteCarloConfigSchema.parse(req.body);
      const simulationId = await monteCarloService.runSimulation(config);
      res.json({ simulationId, status: 'running' });
    } catch (error) {
      res.status(400).json({ error: 'Invalid simulation configuration' });
    }
  });

  app.get("/api/simulations/results/:id", async (req, res) => {
    try {
      const simulationId = req.params.id;
      const result = await monteCarloService.getSimulationResult(simulationId);
      
      if (!result) {
        return res.status(404).json({ error: 'Simulation not found' });
      }
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get simulation result' });
    }
  });

  app.get("/api/simulations", async (req, res) => {
    try {
      const simulations = await monteCarloService.getAllSimulations();
      res.json(simulations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get simulations' });
    }
  });

  // Portfolio Optimization Routes
  const PortfolioOptimizationSchema = z.object({
    assets: z.array(z.object({
      symbol: z.string(),
      weight: z.number(),
      expectedReturn: z.number(),
      volatility: z.number().positive(),
      correlation: z.array(z.array(z.number())).optional()
    })),
    riskFreeRate: z.number(),
    targetReturn: z.number().optional(),
    constraintType: z.enum(['min_variance', 'max_sharpe', 'target_return', 'risk_parity']),
    iterations: z.number().min(1000).max(50000)
  });

  app.post("/api/portfolio/optimize", async (req, res) => {
    try {
      const config: PortfolioOptimizationConfig = PortfolioOptimizationSchema.parse(req.body);
      const result = await portfolioOptimizer.optimize(config);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: 'Invalid optimization configuration' });
    }
  });

  // Advanced Model Routes - Price Prediction
  const PriceModelConfigSchema = z.object({
    symbol: z.string(),
    timeframe: z.enum(['1m', '5m', '15m', '1h', '4h', '1d']),
    lookbackPeriod: z.number(),
    features: z.array(z.enum(['price', 'volume', 'rsi', 'macd', 'bb', 'sma', 'ema'])),
    modelParams: z.record(z.any()).optional()
  });

  app.post("/api/models/price/predict", async (req, res) => {
    try {
      const { modelType, data, config } = req.body;
      const validatedConfig = PriceModelConfigSchema.parse(config);
      const prediction = await priceModelService.predict(modelType, data, validatedConfig);
      res.json(prediction);
    } catch (error) {
      res.status(400).json({ error: 'Invalid price model request' });
    }
  });

  // Volatility Model Routes
  const VolatilityModelConfigSchema = z.object({
    symbol: z.string(),
    timeframe: z.enum(['1m', '5m', '15m', '1h', '4h', '1d']),
    lookbackPeriod: z.number(),
    modelParams: z.record(z.any()).optional()
  });

  app.post("/api/models/volatility/predict", async (req, res) => {
    try {
      const { modelType, returns, config } = req.body;
      const validatedConfig = VolatilityModelConfigSchema.parse(config);
      const prediction = await volatilityModelService.predict(modelType, returns, validatedConfig);
      res.json(prediction);
    } catch (error) {
      res.status(400).json({ error: 'Invalid volatility model request' });
    }
  });

  // Portfolio Model Routes
  const PortfolioModelConfigSchema = z.object({
    assets: z.array(z.object({
      symbol: z.string(),
      weight: z.number(),
      expectedReturn: z.number(),
      volatility: z.number(),
      beta: z.number(),
      priceHistory: z.array(z.number())
    })),
    timeHorizon: z.number(),
    confidenceLevel: z.number(),
    rebalanceFrequency: z.enum(['daily', 'weekly', 'monthly', 'quarterly']),
    benchmarkSymbol: z.string().optional(),
    riskFreeRate: z.number()
  });

  app.post("/api/models/portfolio/forecast", async (req, res) => {
    try {
      const { modelType, config } = req.body;
      const validatedConfig = PortfolioModelConfigSchema.parse(config);
      const forecast = await portfolioModelService.predict(modelType, validatedConfig);
      res.json(forecast);
    } catch (error) {
      res.status(400).json({ error: 'Invalid portfolio model request' });
    }
  });

  // Anomaly Detection Routes
  const AnomalyModelConfigSchema = z.object({
    symbol: z.string(),
    features: z.array(z.enum(['price', 'volume', 'returns', 'volatility', 'rsi', 'macd', 'volume_profile'])),
    sensitivity: z.enum(['low', 'medium', 'high']),
    lookbackPeriod: z.number(),
    contaminationRate: z.number()
  });

  const MarketDataSchema = z.object({
    timestamp: z.string().transform(str => new Date(str)),
    price: z.number(),
    volume: z.number(),
    high: z.number(),
    low: z.number(),
    open: z.number(),
    close: z.number()
  });

  app.post("/api/models/anomaly/detect", async (req, res) => {
    try {
      const { modelType, data, config } = req.body;
      const validatedConfig = AnomalyModelConfigSchema.parse(config);
      const validatedData: MarketData[] = z.array(MarketDataSchema).parse(data);
      const detection = await anomalyDetectionService.detect(modelType, validatedData, validatedConfig);
      res.json(detection);
    } catch (error) {
      res.status(400).json({ error: 'Invalid anomaly detection request' });
    }
  });

  app.post("/api/models/anomaly/train", async (req, res) => {
    try {
      const { modelType, data, config } = req.body;
      const validatedConfig = AnomalyModelConfigSchema.parse(config);
      const validatedData: MarketData[] = z.array(MarketDataSchema).parse(data);
      await anomalyDetectionService.trainModel(modelType, validatedData, validatedConfig);
      res.json({ status: 'training_completed' });
    } catch (error) {
      res.status(400).json({ error: 'Invalid anomaly training request' });
    }
  });

  // Model Information Routes
  app.get("/api/models", (req, res) => {
    const models = {
      priceModels: priceModelService.getSupportedModels().map(model => ({
        id: model,
        category: 'price_prediction',
        capabilities: ['prediction', 'trend_analysis', 'technical_signals']
      })),
      volatilityModels: volatilityModelService.getSupportedModels().map(model => ({
        id: model,
        category: 'volatility_modeling',
        capabilities: ['volatility_forecast', 'risk_assessment', 'regime_detection']
      })),
      portfolioModels: portfolioModelService.getSupportedModels().map(model => ({
        id: model,
        category: 'portfolio_forecasting',
        capabilities: ['portfolio_optimization', 'risk_metrics', 'scenario_analysis']
      })),
      anomalyModels: anomalyDetectionService.getSupportedModels().map(model => ({
        id: model,
        category: 'anomaly_detection',
        capabilities: ['anomaly_detection', 'risk_assessment', 'pattern_analysis']
      }))
    };
    
    res.json(models);
  });

  // AI Chat endpoint for real-time crypto data and news (Local AI)
  app.post('/api/ai-chat', async (req, res) => {
    try {
      const { message } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }

      // Import and use local AI
      const { localAI } = await import('./ai/localAI');
      const aiResponse = await localAI.processMessage(message);

      res.json({ 
        response: aiResponse,
        timestamp: new Date().toISOString(),
        sources: []
      });

    } catch (error) {
      console.error('Local AI Error:', error);
      res.status(500).json({ 
        error: 'AI service temporarily unavailable. Please try again.' 
      });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      services: {
        ml_training: 'operational',
        monte_carlo: 'operational',
        portfolio_optimization: 'operational',
        ai_chat: 'operational'
      }
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
