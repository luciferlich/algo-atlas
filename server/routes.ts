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

  // AI Chat endpoint for real-time crypto data and news
  app.post('/api/ai-chat', async (req, res) => {
    try {
      const { message } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }

      const apiKey = process.env.TOGETHER_API_KEY || "80698aa1af7a38f9953d6e20750abb4fc83a4906392f0c1ea1aab9cc73124434";
      if (!apiKey) {
        return res.status(500).json({ 
          error: 'AI service not configured. Please add TOGETHER_API_KEY to environment variables.' 
        });
      }

      // Enhanced system prompt for crypto-focused AI with real-time data simulation
      const systemPrompt = `You are AlgoAtlas AI, an expert cryptocurrency and financial AI assistant. Your responses should be:

1. REAL-TIME FOCUSED: Provide current, live-style data when asked about prices or market conditions
2. PRECISE: Give exact numbers, percentages, and timestamps when available  
3. COMPREHENSIVE: Include relevant context like 24h changes, market cap, volume
4. NEWS-AWARE: For news queries, provide the latest headlines with sources and timestamps
5. ANALYTICAL: Offer brief technical analysis or market insights when appropriate

When asked about prices:
- Provide realistic current price in USD with recent timestamp
- Include 24h change (percentage and dollar amount)
- Add market cap and volume when relevant
- Mention any significant price movements or events
- Use realistic data that reflects current market conditions

When asked about news:
- Provide latest headlines (within last 24-48 hours)
- Include brief summaries
- Mention sources and approximate timestamps
- Focus on major developments, regulations, partnerships, or market events

Keep responses concise but informative. Always indicate timestamp for data freshness.`;

      const response = await fetch('https://api.together.xyz/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 1000,
          temperature: 0.3,
          top_p: 0.9,
          stream: false,
          presence_penalty: 0,
          frequency_penalty: 0.1
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('AI API Error:', response.status, errorText);
        return res.status(500).json({ 
          error: 'Failed to get AI response. Please try again.' 
        });
      }

      const data = await response.json();
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        return res.status(500).json({ 
          error: 'Invalid response from AI service' 
        });
      }

      const aiResponse = data.choices[0].message.content;

      res.json({ 
        response: aiResponse,
        timestamp: new Date().toISOString(),
        sources: data.citations || []
      });

    } catch (error) {
      console.error('AI Chat Error:', error);
      res.status(500).json({ 
        error: 'Internal server error. Please try again.' 
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
