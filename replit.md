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
7. **Visual Design**: Enhanced golden and black color scheme with improved card hover effects
8. **Navigation**: Fixed routing issues and added logo navigation to home page
9. **Error Handling**: Removed 404 console errors and fixed route configuration

### UI/UX Enhancements
10. **Complete Navigation System**: Added dropdown menus for Models, Technology, and Company sections
11. **Full Page Structure**: Created About, Research, Contact, and Documentation pages
12. **Footer Integration**: Added footer with "© 2025 AlgoAtlas. All rights reserved."
13. **Text Selection Control**: Disabled text selection and cursor animations across the site
14. **Custom Scrollbar**: Implemented black and gold themed scrollbar design

### Backend Infrastructure
15. **ML Training Pipeline**: Built comprehensive machine learning training service with Python integration
16. **Monte Carlo Simulations**: Implemented advanced Monte Carlo simulation engine with multiple models
17. **Portfolio Optimization**: Added portfolio optimization algorithms with risk analysis
18. **API Architecture**: Created RESTful API endpoints for all ML and simulation services
19. **Documentation**: Comprehensive README.md with deployment instructions and API documentation

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