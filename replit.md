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
*Date: 2025-01-30*

### ChatGPT-Generated Crypto API Integration
29. **Enhanced AI Backend**: Replaced local AI with comprehensive ChatGPT-generated cryptocurrency API:
    - **Real-time Data Sources**: CoinGecko API, Binance API, Fear & Greed Index, Ethereum gas tracker
    - **Advanced Features**: ATH/ATL tracking, top gainers/losers, trending coins, market sentiment analysis
    - **Order Book Analysis**: Live Binance order book data with human-readable summaries
    - **Smart Caching**: 30-second cache system for optimal performance and API rate limiting
    - **Error Handling**: Graceful fallbacks and detailed error messages for service unavailability
    - **Market Intelligence**: Bitcoin dominance, gas fee tracking, portfolio recommendations
    - **Enhanced Queries**: Support for price, sentiment, gas, dominance, trending, news, and portfolio analysis
    - **Professional Responses**: Structured output with emojis, timestamps, and actionable insights

### Neural AI Assistant Implementation
28. **MRKT AI Interface Redesign**: Updated AI assistant to match sleek circular design:
    - **Gold/Amber Theme**: Converted from purple to AlgoAtlas signature gold color scheme
    - **Circular Loading Animation**: Full-screen overlay with rotating rings and pulsing brain icon
    - **Professional MRKT AI Branding**: "MRKT AI is generating analysis..." with bouncing dots
    - **Enhanced Visual Effects**: Multiple ring animations with different delays and opacity levels
    - **Dark Overlay**: Black backdrop with blur for dramatic effect during loading states
    - **Consistent Color Palette**: All UI elements now use amber/yellow gradients matching site theme

27. **Neural AI Interface**: Created cutting-edge AI assistant with modern design:
    - **Updated crypto prices**: Bitcoin at $119k, Ethereum $4,180, and current market rates
    - **Neural network design**: Purple/violet gradient theme with animated brain icons
    - **Beautiful loading states**: Bouncing dots, pulsing indicators, and "neural processing" messages
    - **Professional chat bubbles**: Rounded design with gradients, shadows, and proper avatars
    - **Grid background pattern**: Subtle neural network visualization behind chat
    - **Animated brain button**: Purple gradient with pulsing animation and glow effects
    - **Enhanced typography**: Gradient text for titles and improved readability
    - **Status indicators**: Real-time "AI is generating analysis" with animated elements
    - **Backdrop blur effects**: Modern glassmorphism design throughout interface
    - **Local AI Engine**: Custom cryptocurrency intelligence without external API dependencies

### Technology Pages Implementation
26. **Individual Technology Pages**: Created comprehensive pages for each technology section:
    - Machine Learning: Blue/Purple/Cyan gradient theme with ML algorithms, pattern recognition, and performance metrics
    - Deep Learning: Orange/Red/Pink gradient theme featuring neural networks, LSTM, transformers, and attention mechanisms
    - Statistical Models: Green/Emerald/Teal gradient theme showcasing ARIMA, GARCH, linear regression, and VAR models
    - Real-time Analytics: Yellow/Amber/Orange gradient theme highlighting sub-millisecond processing and stream analytics
    - Each page includes: hero sections, how-it-works explanations, key features, performance metrics, and call-to-action sections

### Footer Text Centering Enhancement
25. **Footer Layout Update**: Centered all section headings (Connect, Quick Links, Legal) and disclaimer paragraph text for better visual alignment and professional appearance

### Migration to Replit Environment - Complete
20. **Project Migration**: Successfully migrated from Replit Agent to Replit environment
21. **Navigation Fix**: Fixed "Explore Model" buttons to properly navigate to respective pages
22. **Performance Metrics**: Added comprehensive MetricsShowcase component with:
    - Realistic model accuracy percentages (Price Prediction: 62-73%, Volatility: 69-77%, Portfolio: 65-72%, Anomaly: 70-79%)
    - Technology efficiency ratings (ML: 78.4%, Deep Learning: 75.2%, Statistical: 81.6%, Real-time: 85.3%)
    - Overall platform performance summary (70.8% avg accuracy, 80.1% efficiency, 99.7% uptime)
    - Comprehensive risk disclaimer addressing black swan events and model limitations
23. **Navigation Verification**: Confirmed AlgoAtlas logo navigation returns users to homepage
24. **Data Providers Section**: Added dynamic "DATA POWERED BY" marquee with:
    - True infinite scroll animation (no pauses or restarts)
    - Crypto-focused data providers (KuCoin, Binance, CoinGecko, CoinMarketCap, Crypto.com, Coinbase)
    - Professional gold-styled logos with gradient fade edges
    - Positioned above ML models section for crypto trading focus

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
15. **Complete ML Model Suite**: Implemented all four model categories with comprehensive backends:
    - Price Prediction: LSTM, ARIMA, Random Forest, Linear Regression
    - Volatility Modeling: GARCH, LSTM, Attention-based models
    - Portfolio Forecasting: VaR, DeepAR, Transformer models
    - Anomaly Detection: Autoencoders, Isolation Forest, HDBSCAN, One-Class SVM
16. **Advanced Monte Carlo Engine**: Multiple simulation types with sophisticated risk metrics
17. **Portfolio Optimization**: Multi-objective optimization with various constraint types
18. **Professional API Architecture**: RESTful endpoints for all model types with full validation
19. **Production-Ready Documentation**: Complete README with direct demo URL and comprehensive API docs

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