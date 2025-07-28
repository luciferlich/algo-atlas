# AlgoAtlas - Financial Analytics Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-gold?style=for-the-badge)](https://algoatlas.replit.app)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)

## 🚀 Live Demo

**[View Live Demo](https://algoatlas.replit.app)**

> Experience the full AlgoAtlas financial analytics platform with real-time ML models and Monte Carlo simulations

## 📊 Overview

AlgoAtlas is an advanced financial analytics platform powered by machine learning and artificial intelligence. The platform provides sophisticated models for price prediction, volatility modeling, portfolio forecasting, and anomaly detection in financial markets.

### Key Features

- **🔮 Price Prediction Models**: LSTM Networks, ARIMA, Linear Regression, Random Forest
- **📈 Volatility Modeling**: GARCH Models, Attention-Based Models, Stochastic Volatility
- **📋 Portfolio Forecasting**: Value at Risk (VaR), DeepAR, Transformer Models, Monte Carlo
- **🛡️ Anomaly Detection**: Autoencoders, Isolation Forest, HDBSCAN, One-Class SVM
- **⚡ Real-time Analytics**: Sub-second latency market analysis
- **🎨 Modern UI**: Golden and black theme with responsive design

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Wouter** for routing
- **Tailwind CSS** + **shadcn/ui** for styling
- **TanStack Query** for data fetching
- **Framer Motion** for animations

### Backend
- **Express.js** with TypeScript
- **PostgreSQL** with **Drizzle ORM**
- **ML Training Pipeline** (Python/TensorFlow integration ready)
- **Monte Carlo Simulation Engine**

### Infrastructure
- **Vite** for development and building
- **Replit** for deployment
- **PostgreSQL** database

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/algoatlas.git
cd algoatlas
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Database configuration (automatically provided in Replit)
DATABASE_URL=your_postgresql_url
PGHOST=your_host
PGPORT=your_port
PGDATABASE=your_database
PGUSER=your_user
PGPASSWORD=your_password
```

4. **Initialize database**
```bash
npm run db:push
```

5. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 📁 Project Structure

```
algoatlas/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   └── lib/           # Utilities and configurations
├── server/                # Backend Express application
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   ├── ml/               # ML training pipeline
│   └── simulations/      # Monte Carlo simulations
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schema
└── README.md
```

## 🔗 API Endpoints

### Price Prediction Models
- `POST /api/models/price/predict` - LSTM, ARIMA, Random Forest, Linear Regression predictions
- Features: Technical analysis, trend detection, confidence intervals

### Volatility Modeling
- `POST /api/models/volatility/predict` - GARCH, LSTM, Attention-based volatility forecasting
- Capabilities: Risk assessment, regime detection, volatility decomposition

### Portfolio Forecasting
- `POST /api/models/portfolio/forecast` - VaR, DeepAR, Transformer portfolio analysis
- Metrics: Sharpe ratio, VaR/CVaR, scenario analysis, risk attribution

### Anomaly Detection
- `POST /api/models/anomaly/detect` - Autoencoder, Isolation Forest, HDBSCAN, One-Class SVM
- `POST /api/models/anomaly/train` - Train anomaly detection models
- Detection: Price spikes, volume surges, pattern breaks, market stress

### Monte Carlo Simulations
- `POST /api/simulations/monte-carlo` - Advanced portfolio simulations
- `GET /api/simulations/results/:id` - Get simulation results
- Models: Geometric Brownian Motion, Jump Diffusion, Mean Reversion

### ML Training Pipeline
- `POST /api/training/start` - Start model training sessions
- `GET /api/training/status/:id` - Monitor training progress
- `GET /api/training/sessions` - List all training sessions

### Portfolio Optimization
- `POST /api/portfolio/optimize` - Multi-objective portfolio optimization
- Constraints: Min variance, max Sharpe, risk parity, target return

### System Health
- `GET /api/health` - System status and service health
- `GET /api/models` - Complete model catalog with capabilities

## 🧪 ML Models & Simulations

### Price Prediction Models
- **LSTM Neural Networks**: Deep learning for complex temporal patterns
- **ARIMA**: Statistical time series forecasting with trend and seasonality
- **Random Forest**: Ensemble learning with feature importance analysis
- **Linear Regression**: Baseline model with interpretable coefficients

### Volatility Modeling
- **GARCH**: Heteroskedastic time series for volatility clustering
- **LSTM Volatility**: Neural networks for regime-dependent volatility
- **Attention Models**: Transformer-based volatility with temporal attention

### Portfolio Forecasting
- **Value at Risk (VaR)**: Risk metrics with confidence intervals
- **DeepAR**: Probabilistic forecasting with uncertainty quantification
- **Transformer Models**: Multi-asset attention mechanisms for portfolio dynamics

### Anomaly Detection
- **Autoencoders**: Neural reconstruction for pattern anomalies
- **Isolation Forest**: Tree-based outlier detection for financial data
- **HDBSCAN**: Density-based clustering for regime changes
- **One-Class SVM**: Support vector machines for normal behavior modeling

### Advanced Simulations
- **Geometric Brownian Motion**: Standard financial modeling
- **Jump Diffusion**: Market stress and shock modeling
- **Mean Reversion**: Long-term equilibrium models
- **Portfolio Simulation**: Multi-asset correlated scenarios

## 🎨 Design System

AlgoAtlas features a custom design system with:
- **Golden (#D4AF37)** and **Black (#000000)** color scheme
- Subtle colored accents for different model categories
- Custom scrollbars and hover effects
- Responsive grid layouts
- Smooth animations and transitions

## 📱 Pages

- **Home**: Hero section and model showcase
- **Price Prediction**: LSTM and statistical models
- **Volatility Modeling**: Advanced volatility analysis
- **Portfolio Forecasting**: Risk assessment tools
- **Anomaly Detection**: Market irregularity identification
- **About**: Company information and mission
- **Research**: Publications and active research
- **Contact**: Contact form and information
- **Documentation**: API docs and guides

## 🚀 Deployment

### Replit Deployment

1. Fork or import this repository to Replit
2. Configure environment variables
3. Run `npm run db:push` to set up database
4. Deploy using Replit's deployment feature

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by quantitative finance research
- UI components from shadcn/ui
- Icons from Lucide React

## 📞 Support

For support, email contact@algoatlas.com or join our Discord community.

---

© 2025 AlgoAtlas. All rights reserved.