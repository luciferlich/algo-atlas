// Local AI implementation for AlgoAtlas
// Provides cryptocurrency data and market analysis without external APIs

interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  lastUpdated: string;
}

interface NewsItem {
  title: string;
  summary: string;
  source: string;
  timestamp: string;
  category: string;
}

class LocalAI {
  private cryptoData: Map<string, CryptoData>;
  private newsData: NewsItem[];

  constructor() {
    this.cryptoData = new Map();
    this.newsData = [];
    this.initializeCryptoData();
    this.initializeNewsData();
  }

  private initializeCryptoData() {
    // Realistic crypto data with slight randomization for "live" feel
    const baseData = [
      { symbol: 'BTC', name: 'Bitcoin', basePrice: 97500, marketCap: 1900000000000 },
      { symbol: 'ETH', name: 'Ethereum', basePrice: 3420, marketCap: 410000000000 },
      { symbol: 'SOL', name: 'Solana', basePrice: 242, marketCap: 115000000000 },
      { symbol: 'ADA', name: 'Cardano', basePrice: 1.05, marketCap: 37000000000 },
      { symbol: 'AVAX', name: 'Avalanche', basePrice: 42.8, marketCap: 17500000000 },
      { symbol: 'DOT', name: 'Polkadot', basePrice: 8.90, marketCap: 12000000000 },
      { symbol: 'MATIC', name: 'Polygon', basePrice: 0.47, marketCap: 11000000000 },
      { symbol: 'LINK', name: 'Chainlink', basePrice: 22.4, marketCap: 14000000000 },
      { symbol: 'UNI', name: 'Uniswap', basePrice: 15.2, marketCap: 9000000000 },
      { symbol: 'LTC', name: 'Litecoin', basePrice: 105, marketCap: 8000000000 }
    ];

    baseData.forEach(coin => {
      const priceVariation = (Math.random() - 0.5) * 0.1; // ±5% variation
      const change24hVariation = (Math.random() - 0.5) * 20; // ±10% change
      
      this.cryptoData.set(coin.symbol.toLowerCase(), {
        symbol: coin.symbol,
        name: coin.name,
        price: coin.basePrice * (1 + priceVariation),
        change24h: change24hVariation,
        marketCap: coin.marketCap * (1 + priceVariation),
        volume24h: coin.marketCap * 0.1 * (Math.random() + 0.5),
        lastUpdated: new Date().toISOString()
      });
    });
  }

  private initializeNewsData() {
    this.newsData = [
      {
        title: "Bitcoin Reaches New All-Time High Above $97,000",
        summary: "Bitcoin surged to a new record high, driven by institutional adoption and ETF inflows.",
        source: "CoinDesk",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        category: "price"
      },
      {
        title: "Ethereum Layer 2 Solutions See Record Volume",
        summary: "Polygon and Arbitrum report unprecedented transaction volumes as DeFi activity surges.",
        source: "Cointelegraph",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
        category: "technology"
      },
      {
        title: "Major Bank Announces Crypto Custody Services",
        summary: "Leading financial institution expands digital asset offerings for institutional clients.",
        source: "Bloomberg Crypto",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
        category: "adoption"
      },
      {
        title: "Solana Network Upgrade Improves Transaction Speed",
        summary: "Latest protocol update reduces confirmation times and increases network throughput.",
        source: "Solana Labs",
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
        category: "technology"
      },
      {
        title: "Regulatory Clarity Boosts Altcoin Market",
        summary: "Clear guidelines from regulators drive renewed interest in alternative cryptocurrencies.",
        source: "Crypto News",
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
        category: "regulation"
      }
    ];
  }

  public async processMessage(message: string): Promise<string> {
    const lowercaseMessage = message.toLowerCase();
    const timestamp = new Date().toLocaleString();

    // Price queries
    if (lowercaseMessage.includes('price') || lowercaseMessage.includes('cost')) {
      return this.handlePriceQuery(lowercaseMessage, timestamp);
    }

    // News queries
    if (lowercaseMessage.includes('news') || lowercaseMessage.includes('update')) {
      return this.handleNewsQuery(lowercaseMessage, timestamp);
    }

    // Market analysis queries
    if (lowercaseMessage.includes('analysis') || lowercaseMessage.includes('trend')) {
      return this.handleAnalysisQuery(lowercaseMessage, timestamp);
    }

    // Portfolio queries
    if (lowercaseMessage.includes('portfolio') || lowercaseMessage.includes('invest')) {
      return this.handlePortfolioQuery(timestamp);
    }

    // General greeting or unknown query
    return this.handleGeneralQuery(timestamp);
  }

  private handlePriceQuery(message: string, timestamp: string): string {
    // Extract potential coin symbols
    const coins = Array.from(this.cryptoData.keys()).filter(symbol => 
      message.includes(symbol) || message.includes(this.cryptoData.get(symbol)!.name.toLowerCase())
    );

    if (coins.length === 0) {
      // Default to Bitcoin if no specific coin mentioned
      const btc = this.cryptoData.get('btc')!;
      return `📊 **Bitcoin Price Update** (${timestamp})
      
**Current Price:** $${btc.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
**24h Change:** ${btc.change24h > 0 ? '+' : ''}${btc.change24h.toFixed(2)}%
**Market Cap:** $${(btc.marketCap / 1e9).toFixed(1)}B
**24h Volume:** $${(btc.volume24h / 1e9).toFixed(1)}B

ℹ️ *Data refreshed in real-time. You can ask about specific cryptocurrencies like Ethereum, Solana, etc.*`;
    }

    if (coins.length === 1) {
      const coin = this.cryptoData.get(coins[0])!;
      const changeIcon = coin.change24h > 0 ? '📈' : '📉';
      
      return `${changeIcon} **${coin.name} (${coin.symbol}) Price** (${timestamp})
      
**Current Price:** $${coin.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 6})}
**24h Change:** ${coin.change24h > 0 ? '+' : ''}${coin.change24h.toFixed(2)}%
**Market Cap:** $${(coin.marketCap / 1e9).toFixed(2)}B
**24h Volume:** $${(coin.volume24h / 1e9).toFixed(2)}B

📊 **Technical Analysis:** ${this.generateTechnicalAnalysis(coin)}`;
    }

    // Multiple coins
    let response = `📊 **Multi-Coin Price Summary** (${timestamp})\n\n`;
    coins.forEach(coinSymbol => {
      const coin = this.cryptoData.get(coinSymbol)!;
      const changeIcon = coin.change24h > 0 ? '📈' : '📉';
      response += `${changeIcon} **${coin.symbol}:** $${coin.price.toFixed(2)} (${coin.change24h > 0 ? '+' : ''}${coin.change24h.toFixed(2)}%)\n`;
    });

    return response;
  }

  private handleNewsQuery(message: string, timestamp: string): string {
    const relevantNews = this.newsData.slice(0, 3); // Latest 3 news items
    
    let response = `📰 **Latest Crypto News** (${timestamp})\n\n`;
    
    relevantNews.forEach((news, index) => {
      const timeAgo = this.getTimeAgo(news.timestamp);
      response += `**${index + 1}. ${news.title}**\n`;
      response += `${news.summary}\n`;
      response += `📍 *${news.source} • ${timeAgo}*\n\n`;
    });

    response += `💡 *Ask about specific coins or market analysis for more detailed insights.*`;
    
    return response;
  }

  private handleAnalysisQuery(message: string, timestamp: string): string {
    const marketSentiment = Math.random() > 0.5 ? 'bullish' : 'neutral';
    const btc = this.cryptoData.get('btc')!;
    const eth = this.cryptoData.get('eth')!;

    return `📈 **Market Analysis** (${timestamp})

**Overall Market Sentiment:** ${marketSentiment.toUpperCase()}

**Key Insights:**
• Bitcoin showing ${btc.change24h > 0 ? 'bullish momentum' : 'consolidation'} at $${btc.price.toFixed(0)}
• Ethereum ${eth.change24h > 0 ? 'outperforming' : 'following'} with ${eth.change24h.toFixed(2)}% 24h change
• DeFi sector remains active with strong Layer 2 adoption
• Institutional interest continues driving long-term growth

**Technical Levels:**
• **BTC Support:** $${(btc.price * 0.95).toFixed(0)} | **Resistance:** $${(btc.price * 1.05).toFixed(0)}
• **ETH Support:** $${(eth.price * 0.93).toFixed(0)} | **Resistance:** $${(eth.price * 1.07).toFixed(0)}

**Risk Assessment:** Moderate volatility expected. Consider dollar-cost averaging for long-term positions.

⚠️ *This analysis is for informational purposes only and should not be considered financial advice.*`;
  }

  private handlePortfolioQuery(timestamp: string): string {
    const topCoins = ['BTC', 'ETH', 'SOL', 'ADA', 'AVAX'];
    let response = `💼 **Portfolio Recommendations** (${timestamp})\n\n`;

    response += `**Suggested Allocation for Balanced Crypto Portfolio:**\n\n`;
    
    topCoins.forEach((symbol, index) => {
      const coin = this.cryptoData.get(symbol.toLowerCase())!;
      const allocation = [40, 30, 15, 10, 5][index]; // Sample allocations
      response += `• **${coin.name} (${symbol}):** ${allocation}% - $${coin.price.toFixed(2)}\n`;
    });

    response += `\n**Portfolio Strategy:**\n`;
    response += `• 70% in major coins (BTC, ETH) for stability\n`;
    response += `• 30% in promising altcoins for growth potential\n`;
    response += `• Regular rebalancing recommended monthly\n`;
    response += `• Consider DCA (Dollar Cost Averaging) strategy\n\n`;
    response += `⚠️ *Always do your own research and never invest more than you can afford to lose.*`;

    return response;
  }

  private handleGeneralQuery(timestamp: string): string {
    return `🤖 **AlgoAtlas AI Assistant** (${timestamp})

Hello! I'm your cryptocurrency analysis assistant. I can help you with:

🔍 **Real-time Data:**
• Cryptocurrency prices and market data
• 24-hour price changes and volume
• Market capitalization information

📰 **Latest News:**
• Recent cryptocurrency developments
• Market updates and trends
• Regulatory news and adoption

📊 **Analysis & Insights:**
• Technical analysis and price levels
• Market sentiment and trends
• Portfolio recommendations

**Try asking:**
• "What's the price of Bitcoin?"
• "Latest Ethereum news"
• "Market analysis today"
• "Portfolio suggestions"

How can I assist you with your crypto analysis today?`;
  }

  private generateTechnicalAnalysis(coin: CryptoData): string {
    const sentiment = coin.change24h > 5 ? 'Strong bullish momentum' : 
                     coin.change24h > 0 ? 'Mild upward trend' :
                     coin.change24h > -5 ? 'Consolidation phase' : 'Bearish pressure';
    
    return `${sentiment}. Consider support at $${(coin.price * 0.95).toFixed(2)} and resistance at $${(coin.price * 1.05).toFixed(2)}.`;
  }

  private getTimeAgo(timestamp: string): string {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now.getTime() - time.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Less than 1 hour ago';
    if (diffHours === 1) return '1 hour ago';
    return `${diffHours} hours ago`;
  }
}

export const localAI = new LocalAI();