import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { mlTrainingService, mlPredictionService, PredictionRequest } from "./ml/index";
import { monteCarloService, portfolioOptimizer, MonteCarloConfig, PortfolioOptimizationConfig } from "./simulations/monteCarlo";

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

  // Model Information Routes
  app.get("/api/models", (req, res) => {
    const models = [
      {
        id: 'lstm',
        name: 'LSTM Neural Network',
        description: 'Long Short-Term Memory networks for time series prediction',
        category: 'deep_learning',
        inputFeatures: ['price', 'volume', 'technical_indicators'],
        outputType: 'continuous'
      },
      {
        id: 'arima',
        name: 'ARIMA',
        description: 'Autoregressive Integrated Moving Average for time series forecasting',
        category: 'statistical',
        inputFeatures: ['price'],
        outputType: 'continuous'
      },
      {
        id: 'random_forest',
        name: 'Random Forest',
        description: 'Ensemble learning method for classification and regression',
        category: 'machine_learning',
        inputFeatures: ['price', 'volume', 'technical_indicators', 'fundamentals'],
        outputType: 'continuous'
      },
      {
        id: 'garch',
        name: 'GARCH',
        description: 'Generalized Autoregressive Conditional Heteroskedasticity for volatility modeling',
        category: 'statistical',
        inputFeatures: ['returns'],
        outputType: 'volatility'
      }
    ];
    
    res.json(models);
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      services: {
        ml_training: 'operational',
        monte_carlo: 'operational',
        portfolio_optimization: 'operational'
      }
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
