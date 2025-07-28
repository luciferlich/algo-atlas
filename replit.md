# AlgoAtlas - Financial Analytics Platform

## Overview
AlgoAtlas is an advanced financial analytics platform that provides machine learning models for:
- Price Prediction (LSTM, ARIMA, Random Forest, Linear Regression)
- Volatility Modeling (LSTM, GARCH, Attention Models)
- Portfolio Forecasting (VaR, DeepAR, Transformer Models)
- Anomaly Detection (Autoencoders, Isolation Forest, HDBSCAN)

## Project Architecture
- **Frontend**: React with TypeScript, Wouter for routing, Tailwind CSS + shadcn/ui
- **Backend**: Express.js with TypeScript, Drizzle ORM
- **Database**: PostgreSQL (migrated from Supabase)
- **Build Tool**: Vite with custom server setup

## Recent Changes
*Date: 2025-01-28*

### Migration from Lovable to Replit
1. **Routing Migration**: Converted from React Router DOM to Wouter for Replit compatibility
2. **Database Migration**: Migrated from Supabase to PostgreSQL with Drizzle ORM
3. **Environment Setup**: Configured proper client/server separation for security
4. **CSS Fixes**: Updated custom CSS classes to remove undefined shadow-glow class
5. **Asset Optimization**: Replaced hero background image with CSS gradient for better performance
6. **Dependencies**: Installed missing packages (react-router-dom, sonner)

### Security Improvements
- Removed Supabase client-side database access
- Set up server-side PostgreSQL queries using Drizzle
- Proper environment variable handling for database credentials

## User Preferences
- None specified yet

## Development Notes
- Uses port 5000 for both frontend and backend
- Vite dev server runs in middleware mode with Express
- Database schema automatically synced with `npm run db:push`
- All routes properly configured with wouter navigation