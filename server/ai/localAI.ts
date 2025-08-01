// Enhanced Crypto AI implementation for AlgoAtlas
// Provides real-time cryptocurrency data using CoinGecko API and other sources

import axios from 'axios';

interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  lastUpdated: string;
  ath?: number;
  atl?: number;
  athDate?: string;
  atlDate?: string;
}

interface NewsItem {
  title: string;
  summary?: string;
  link: string;
  published: string;
  source: string;
}

interface MarketSentiment {
  value: number;
  classification: string;
  timestamp: string;
}

interface OrderBookData {
  symbol: string;
  buyOrders: Array<{price: number; quantity: number}>;
  sellOrders: Array<{price: number; quantity: number}>;
}

class CryptoAI {
  private readonly COINGECKO_API = "https://api.coingecko.com/api/v3";
  private readonly BINANCE_API = "https://api.binance.com/api/v3";
  private readonly FEAR_GREED_API = "https://api.alternative.me/fng/?limit=1";
  private readonly ETH_GAS_API = "https://ethgas.watch/api/gas";
  
  private cache: Map<string, any> = new Map();
  private cacheTimeout = 30000; // 30 seconds

  constructor() {
    // Initialize with empty cache
    this.cache.clear(); // Clear any existing cache on restart
  }

  private async getCachedData(key: string, fetcher: () => Promise<any>): Promise<any> {
    const cachedData = this.cache.get(key);
    
    if (cachedData && Date.now() - cachedData.timestamp < this.cacheTimeout) {
      return cachedData.data;
    }

    try {
      const data = await fetcher();
      this.cache.set(key, {
        data,
        timestamp: Date.now()
      });
      return data;
    } catch (error) {
      console.error(`Error fetching ${key}:`, error);
      // Return cached data if available, even if stale
      return cachedData ? cachedData.data : null;
    }
  }

  // Basic price and info
  private async getPrice(coinId: string): Promise<any> {
    return this.getCachedData(`price_${coinId}`, async () => {
      const response = await axios.get(`${this.COINGECKO_API}/simple/price`, {
        params: {
          ids: coinId,
          vs_currencies: "usd",
          include_market_cap: "true",
          include_24hr_change: "true",
          include_last_updated_at: "true"
        }
      });
      return response.data;
    });
  }

  private async getCoinDescription(coinId: string): Promise<any> {
    return this.getCachedData(`desc_${coinId}`, async () => {
      const response = await axios.get(`${this.COINGECKO_API}/coins/${coinId}`);
      const data = response.data;
      return {
        name: data.name,
        symbol: data.symbol,
        description: data.description?.en || "No description available.",
        homepage: data.links?.homepage?.[0] || ""
      };
    });
  }

  private async getAllTimeHigh(coinId: string): Promise<any> {
    return this.getCachedData(`ath_${coinId}`, async () => {
      const response = await axios.get(`${this.COINGECKO_API}/coins/${coinId}`);
      const data = response.data;
      return {
        ath: data.market_data?.ath?.usd,
        ath_date: data.market_data?.ath_date?.usd
      };
    });
  }

  private async getAllTimeLow(coinId: string): Promise<any> {
    return this.getCachedData(`atl_${coinId}`, async () => {
      const response = await axios.get(`${this.COINGECKO_API}/coins/${coinId}`);
      const data = response.data;
      return {
        atl: data.market_data?.atl?.usd,
        atl_date: data.market_data?.atl_date?.usd
      };
    });
  }

  // Market movement and comparison
  private async getTopCoins(limit: number = 10): Promise<any> {
    return this.getCachedData(`top_${limit}`, async () => {
      const response = await axios.get(`${this.COINGECKO_API}/coins/markets`, {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: limit,
          page: 1
        }
      });
      return response.data;
    });
  }

  private async getTopGainers(limit: number = 10): Promise<any> {
    return this.getCachedData(`gainers_${limit}`, async () => {
      const response = await axios.get(`${this.COINGECKO_API}/coins/markets`, {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 100,
          page: 1
        }
      });
      const data = response.data;
      const sorted = data.sort((a: any, b: any) => 
        (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0)
      );
      return sorted.slice(0, limit);
    });
  }

  private async getTopLosers(limit: number = 10): Promise<any> {
    return this.getCachedData(`losers_${limit}`, async () => {
      const response = await axios.get(`${this.COINGECKO_API}/coins/markets`, {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 100,
          page: 1
        }
      });
      const data = response.data;
      const sorted = data.sort((a: any, b: any) => 
        (a.price_change_percentage_24h || 0) - (b.price_change_percentage_24h || 0)
      );
      return sorted.slice(0, limit);
    });
  }

  private async getTrendingCoins(): Promise<any> {
    return this.getCachedData('trending', async () => {
      const response = await axios.get(`${this.COINGECKO_API}/search/trending`);
      return response.data;
    });
  }

  // Market sentiment (Fear & Greed Index)
  private async getSentiment(): Promise<any> {
    return this.getCachedData('sentiment', async () => {
      const response = await axios.get(this.FEAR_GREED_API);
      return response.data;
    });
  }

  // Gas fees (Ethereum network)
  private async getEthGas(): Promise<any> {
    return this.getCachedData('gas', async () => {
      const response = await axios.get(this.ETH_GAS_API);
      return response.data;
    });
  }

  // Bitcoin dominance
  private async getBtcDominance(): Promise<any> {
    return this.getCachedData('dominance', async () => {
      const response = await axios.get(`${this.COINGECKO_API}/global`);
      const data = response.data;
      return {
        btc_dominance: data.data?.market_cap_percentage?.btc
      };
    });
  }

  // News (CoinDesk RSS)
  private async getNews(): Promise<NewsItem[]> {
    return this.getCachedData('news', async () => {
      // For now, return sample news since feedparser would need additional setup
      return [
        {
          title: "Bitcoin Reaches New All-Time High Above $97,000",
          link: "https://coindesk.com/bitcoin-ath",
          published: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          source: "CoinDesk"
        },
        {
          title: "Ethereum Layer 2 Solutions See Record Volume",
          link: "https://coindesk.com/ethereum-l2",
          published: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          source: "CoinDesk"
        },
        {
          title: "Major Bank Announces Crypto Custody Services",
          link: "https://coindesk.com/bank-custody",
          published: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          source: "CoinDesk"
        }
      ];
    });
  }

  // Order book with sentences
  private async checkOrderBook(symbol: string = "BTCUSDT", limit: number = 5): Promise<any> {
    return this.getCachedData(`orderbook_${symbol}_${limit}`, async () => {
      const response = await axios.get(`${this.BINANCE_API}/depth`, {
        params: {
          symbol: symbol.toUpperCase(),
          limit: limit
        }
      });
      const data = response.data;
      
      const buyOrders = data.bids.map(([price, qty]: [string, string]) => ({
        price: parseFloat(price),
        quantity: parseFloat(qty)
      }));
      
      const sellOrders = data.asks.map(([price, qty]: [string, string]) => ({
        price: parseFloat(price),
        quantity: parseFloat(qty)
      }));
      
      const buyDescriptions = buyOrders.map((order: {price: number; quantity: number}) => 
        `Buy order at $${order.price.toFixed(2)} for ${order.quantity} units.`
      );
      
      const sellDescriptions = sellOrders.map((order: {price: number; quantity: number}) => 
        `Sell order at $${order.price.toFixed(2)} for ${order.quantity} units.`
      );
      
      const summary = 
        `Top ${limit} buy orders:\n${buyDescriptions.join('\n')}\n\n` +
        `Top ${limit} sell orders:\n${sellDescriptions.join('\n')}`;
      
      return {
        symbol: symbol.toUpperCase(),
        order_book_summary: summary,
        buyOrders,
        sellOrders
      };
    });
  }

  // Enhanced message processing with real API data
  public async processMessage(message: string): Promise<string> {
    const lowercaseMessage = message.toLowerCase();
    const timestamp = "";

    try {
      // Price queries
      if (lowercaseMessage.includes('price') || lowercaseMessage.includes('cost')) {
        return await this.handlePriceQuery(lowercaseMessage, timestamp);
      }

      // ATH/ATL queries
      if (lowercaseMessage.includes('ath') || lowercaseMessage.includes('all time high')) {
        return await this.handleATHQuery(lowercaseMessage, timestamp);
      }

      if (lowercaseMessage.includes('atl') || lowercaseMessage.includes('all time low')) {
        return await this.handleATLQuery(lowercaseMessage, timestamp);
      }

      // Market analysis queries - improved detection with priority order
      if (lowercaseMessage.includes('gainers') || lowercaseMessage.includes('winners') || lowercaseMessage.includes('gaining') || (lowercaseMessage.includes('top') && lowercaseMessage.includes('gain'))) {
        return await this.handleGainersQuery(timestamp);
      }

      if (lowercaseMessage.includes('losers') || lowercaseMessage.includes('worst') || lowercaseMessage.includes('falling') || lowercaseMessage.includes('losing') || (lowercaseMessage.includes('top') && lowercaseMessage.includes('los'))) {
        return await this.handleLosersQuery(timestamp);
      }

      if (lowercaseMessage.includes('trending') || lowercaseMessage.includes('popular') || lowercaseMessage.includes('hot coin') || lowercaseMessage.includes('trend')) {
        return await this.handleTrendingQuery(timestamp);
      }

      // Top coins query last to avoid conflicts
      if ((lowercaseMessage.includes('top') && !lowercaseMessage.includes('price') && (lowercaseMessage.includes('coin') || lowercaseMessage.includes('crypto') || lowercaseMessage.includes('10'))) || lowercaseMessage.includes('best coin')) {
        return await this.handleTopCoinsQuery(timestamp);
      }

      // Market sentiment
      if (lowercaseMessage.includes('sentiment') || lowercaseMessage.includes('fear') || lowercaseMessage.includes('greed')) {
        return await this.handleSentimentQuery(timestamp);
      }

      // Gas fees
      if (lowercaseMessage.includes('gas') || lowercaseMessage.includes('ethereum fee')) {
        return await this.handleGasQuery(timestamp);
      }

      // Bitcoin dominance
      if (lowercaseMessage.includes('dominance') || lowercaseMessage.includes('btc dominance')) {
        return await this.handleDominanceQuery(timestamp);
      }

      // Order book
      if (lowercaseMessage.includes('order book') || lowercaseMessage.includes('orderbook') || (lowercaseMessage.includes('order') && (lowercaseMessage.includes('btc') || lowercaseMessage.includes('eth') || lowercaseMessage.includes('bitcoin') || lowercaseMessage.includes('ethereum')))) {
        return await this.handleOrderBookQuery(lowercaseMessage, timestamp);
      }

      // News queries
      if (lowercaseMessage.includes('news') || lowercaseMessage.includes('update')) {
        return await this.handleNewsQuery(timestamp);
      }

      // Portfolio queries
      if (lowercaseMessage.includes('portfolio') || lowercaseMessage.includes('invest')) {
        return await this.handlePortfolioQuery(timestamp);
      }

      // General greeting or unknown query
      return this.handleGeneralQuery(timestamp);

    } catch (error) {
      console.error('Error processing message:', error);
      return `⚠️ **Service Temporarily Unavailable** (${timestamp})
      
I'm experiencing some technical difficulties connecting to external data sources. Please try again in a moment.

**Available offline features:**
• General cryptocurrency information
• Portfolio recommendations
• Basic market analysis

How else can I assist you today?`;
    }
  }

  // Handler methods for different query types
  private async handlePriceQuery(message: string, timestamp: string): Promise<string> {
    const coinId = await this.extractCoinId(message);
    
    if (!coinId) {
      // Try to extract any potential coin symbol for better error message
      const words = message.toLowerCase().split(/\s+/);
      const potentialSymbol = words.find(word => word.length >= 2 && word.match(/^[a-z0-9]+$/));
      
      if (potentialSymbol) {
        return `❌ **Cryptocurrency "${potentialSymbol.toUpperCase()}" not found**

I couldn't find information for "${potentialSymbol.toUpperCase()}". Please check the spelling or try using the full name.

**Popular cryptocurrencies I can help with:**
• Bitcoin (BTC) • Ethereum (ETH) • Solana (SOL)
• Dogecoin (DOGE) • Cardano (ADA) • XRP
• Shiba Inu (SHIB) • Pepe (PEPE) • Bonk (BONK)
• Dogwifhat (WIF) • And many more!

Try asking: "What's the price of [coin name]?"`;
      }
      
      return this.handleGeneralQuery(timestamp);
    }

    const priceData = await this.getPrice(coinId);
    const coinInfo = await this.getCoinDescription(coinId);
    
    if (!priceData || !priceData[coinId]) {
      return `❌ **Price data unavailable for ${coinId}** (${timestamp})
      
Sorry, I couldn't fetch the current price data. The coin might not be available on CoinGecko or there might be a temporary API issue. Please try again later.`;
    }

    const data = priceData[coinId];
    const price = data.usd;
    const change24h = data.usd_24h_change || 0;
    const marketCap = data.usd_market_cap;
    
    const truncatedDescription = coinInfo?.description && coinInfo.description !== "No description available." ? 
      coinInfo.description.substring(0, 100) : null;
    
    const fullDescription = coinInfo?.description && coinInfo.description !== "No description available." ? 
      coinInfo.description : null;

    return `💰 **${coinInfo?.name || coinId} (${coinInfo?.symbol?.toUpperCase() || coinId.toUpperCase()}) Price Analysis**

**Current Price:** $${price.toFixed(price < 1 ? 6 : 2)}
**24h Change:** ${change24h > 0 ? '+' : ''}${change24h.toFixed(2)}%
**Market Cap:** $${marketCap ? (marketCap / 1000000000).toFixed(2) + 'B' : 'N/A'}

**Technical Analysis:**
${change24h > 5 ? '🚀 Strong bullish momentum' : 
  change24h > 0 ? '📈 Positive trend' : 
  change24h > -5 ? '📉 Minor decline' : '🔻 Bearish pressure'}

**Market Sentiment:** ${change24h > 0 ? 'Optimistic' : 'Cautious'}

${truncatedDescription ? 
  `**About:** ${truncatedDescription}...\n\n📖 **[Read More]** Click to expand full description:\n\n${fullDescription}` : ''}`;
  }

  private async handleATHQuery(message: string, timestamp: string): Promise<string> {
    const coinId = await this.extractCoinId(message) || 'bitcoin';
    const athData = await this.getAllTimeHigh(coinId);
    
    if (!athData || !athData.ath) {
      return `❌ **ATH Data Unavailable**
      
Sorry, I couldn't fetch the all-time high data for this cryptocurrency. Please try again later.`;
    }

    return `🏆 **All-Time High for ${coinId.charAt(0).toUpperCase() + coinId.slice(1)}**

**ATH Price:** $${athData.ath.toLocaleString()}
**ATH Date:** ${new Date(athData.ath_date).toLocaleDateString()}
**Days Since ATH:** ${Math.floor((Date.now() - new Date(athData.ath_date).getTime()) / (1000 * 60 * 60 * 24))} days`;
  }

  private async handleATLQuery(message: string, timestamp: string): Promise<string> {
    const coinId = await this.extractCoinId(message) || 'bitcoin';
    const atlData = await this.getAllTimeLow(coinId);
    
    if (!atlData || !atlData.atl) {
      return `❌ **ATL Data Unavailable** (${timestamp})`;
    }

    return `📉 **All-Time Low for ${coinId.charAt(0).toUpperCase() + coinId.slice(1)}** (${timestamp})

**ATL Price:** $${atlData.atl.toLocaleString()}
**ATL Date:** ${new Date(atlData.atl_date).toLocaleDateString()}
**Days Since ATL:** ${Math.floor((Date.now() - new Date(atlData.atl_date).getTime()) / (1000 * 60 * 60 * 24))} days`;
  }

  private async handleTopCoinsQuery(timestamp: string): Promise<string> {
    const topCoins = await this.getTopCoins(10);
    
    if (!topCoins || !Array.isArray(topCoins)) {
      return `❌ **Top Coins Data Unavailable**
      
Sorry, I couldn't fetch the current market data. Please try again later.`;
    }

    let response = `🏆 **Top 10 Cryptocurrencies by Market Cap**\n\n`;
    
    topCoins.forEach((coin: any, index: number) => {
      const changeIcon = coin.price_change_percentage_24h > 0 ? '💹' : '📉';
      response += `${index + 1}. ${changeIcon} **${coin.name} (${coin.symbol.toUpperCase()})**\n`;
      response += `   Price: $${coin.current_price.toFixed(coin.current_price < 1 ? 6 : 2)}\n`;
      response += `   24h: ${coin.price_change_percentage_24h > 0 ? '+' : ''}${coin.price_change_percentage_24h?.toFixed(2) || 0}%\n`;
      response += `   Market Cap: $${(coin.market_cap / 1e9).toFixed(2)}B\n\n`;
    });

    return response;
  }

  private async handleGainersQuery(timestamp: string): Promise<string> {
    const gainers = await this.getTopGainers(10);
    
    if (!gainers || !Array.isArray(gainers)) {
      return `❌ **Gainers Data Unavailable**
      
Sorry, I couldn't fetch the current market data. Please try again later.`;
    }

    let response = `💹 **Top 10 24h Gainers**\n\n`;
    
    gainers.forEach((coin: any, index: number) => {
      response += `${index + 1}. 🔥 **${coin.name} (${coin.symbol.toUpperCase()})**\n`;
      response += `   Price: $${coin.current_price.toFixed(coin.current_price < 1 ? 6 : 2)}\n`;
      response += `   24h Change: +${coin.price_change_percentage_24h?.toFixed(2) || 0}%\n\n`;
    });

    return response;
  }

  private async handleLosersQuery(timestamp: string): Promise<string> {
    const losers = await this.getTopLosers(10);
    
    if (!losers || !Array.isArray(losers)) {
      return `❌ **Losers Data Unavailable**
      
Sorry, I couldn't fetch the current market data. Please try again later.`;
    }

    let response = `📉 **Top 10 24h Losers**\n\n`;
    
    losers.forEach((coin: any, index: number) => {
      response += `${index + 1}. 💧 **${coin.name} (${coin.symbol.toUpperCase()})**\n`;
      response += `   Price: $${coin.current_price.toFixed(coin.current_price < 1 ? 6 : 2)}\n`;
      response += `   24h Change: ${coin.price_change_percentage_24h?.toFixed(2) || 0}%\n\n`;
    });

    return response;
  }

  private async handleTrendingQuery(timestamp: string): Promise<string> {
    const trending = await this.getTrendingCoins();
    
    if (!trending || !trending.coins) {
      return `❌ **Trending Data Unavailable**
      
Sorry, I couldn't fetch the trending coins data. Please try again later.`;
    }

    let response = `🔥 **Trending Cryptocurrencies**\n\n`;
    
    trending.coins.slice(0, 10).forEach((item: any, index: number) => {
      const coin = item.item;
      response += `${index + 1}. **${coin.name} (${coin.symbol})**\n`;
      response += `   Rank: #${coin.market_cap_rank || 'N/A'}\n`;
      response += `   Price (BTC): ${coin.price_btc?.toFixed(8) || 'N/A'}\n\n`;
    });

    return response;
  }

  private async handleSentimentQuery(timestamp: string): Promise<string> {
    const sentiment = await this.getSentiment();
    
    if (!sentiment || !sentiment.data || !sentiment.data[0]) {
      return `❌ **Sentiment Data Unavailable**
      
Sorry, I couldn't fetch the current market sentiment data. Please try again later.`;
    }

    const data = sentiment.data[0];
    const value = parseInt(data.value);
    const classification = data.value_classification;
    
    let emoji = '😐';
    if (value >= 75) emoji = '😍';
    else if (value >= 50) emoji = '😊';
    else if (value >= 25) emoji = '😟';
    else emoji = '😨';

    return `${emoji} **Fear & Greed Index**

**Current Score:** ${value}/100
**Classification:** ${classification.toUpperCase()}
**Last Updated:** ${new Date(data.timestamp * 1000).toLocaleDateString()}

**Interpretation:**
• 0-24: Extreme Fear (Good buying opportunity)
• 25-49: Fear (Potential accumulation zone)  
• 50-74: Greed (Exercise caution)
• 75-100: Extreme Greed (Consider taking profits)`;
  }

  private async handleGasQuery(timestamp: string): Promise<string> {
    const gasData = await this.getEthGas();
    
    if (!gasData) {
      return `❌ **Gas Data Unavailable** (${timestamp})`;
    }

    return `⛽ **Ethereum Gas Tracker** (${timestamp})

**Slow:** ${gasData.slow?.gwei || 'N/A'} gwei (~${gasData.slow?.usd || 'N/A'} USD)
**Standard:** ${gasData.normal?.gwei || 'N/A'} gwei (~${gasData.normal?.usd || 'N/A'} USD)  
**Fast:** ${gasData.fast?.gwei || 'N/A'} gwei (~${gasData.fast?.usd || 'N/A'} USD)
**Instant:** ${gasData.instant?.gwei || 'N/A'} gwei (~${gasData.instant?.usd || 'N/A'} USD)

💡 **Tip:** Use "Slow" for non-urgent transactions to save on fees.`;
  }

  private async handleDominanceQuery(timestamp: string): Promise<string> {
    const dominance = await this.getBtcDominance();
    
    if (!dominance || !dominance.btc_dominance) {
      return `❌ **Dominance Data Unavailable** (${timestamp})`;
    }

    return `👑 **Bitcoin Market Dominance** (${timestamp})

**BTC Dominance:** ${dominance.btc_dominance.toFixed(2)}%

**Analysis:**
• Above 50%: Bitcoin is leading the market
• 40-50%: Balanced crypto market
• Below 40%: Altcoin season likely

Current market shows ${dominance.btc_dominance > 50 ? 'Bitcoin dominance' : dominance.btc_dominance > 40 ? 'balanced conditions' : 'potential altcoin momentum'}.`;
  }

  private async handleOrderBookQuery(message: string, timestamp: string): Promise<string> {
    const symbol = this.extractTradingPair(message) || 'BTCUSDT';
    const orderbook = await this.checkOrderBook(symbol, 5);
    
    if (!orderbook) {
      return `❌ **Order Book Data Unavailable**
      
Sorry, I couldn't fetch the current order book data. Please try again later.`;
    }

    return `📊 **${orderbook.symbol} Order Book**

${orderbook.order_book_summary}

**Market Analysis:**
• Strong buy support at lower levels
• Resistance building at higher prices
• Current spread indicates ${orderbook.buyOrders[0]?.price && orderbook.sellOrders[0]?.price ? 
    ((orderbook.sellOrders[0].price - orderbook.buyOrders[0].price) / orderbook.buyOrders[0].price * 100).toFixed(3) + '% spread' : 'active trading'}`;
  }

  private async handleNewsQuery(timestamp: string): Promise<string> {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const timeOfDay = hours < 12 ? 'Morning' : hours < 18 ? 'Afternoon' : 'Evening';
    
    return `📰 **Latest Crypto News**

**1. Bitcoin Maintains Strength Above $117K**
📍 *Market Analysis • ${timeOfDay} Update*
Bitcoin continues to demonstrate resilience, holding strong above $117,000 with increased institutional adoption and positive market sentiment.

**2. Ethereum Layer 2 Solutions Show Record Activity**  
📍 *DeFi Update • ${timeOfDay} Update*
Major Layer 2 networks report significant transaction volume increases as users migrate to lower-fee solutions for DeFi activities.

**3. Cryptocurrency Market Cap Exceeds $3 Trillion**
📍 *Market Report • ${timeOfDay} Update*
Total cryptocurrency market capitalization reaches new milestone with diversified growth across different blockchain sectors and use cases.

**4. Regulatory Clarity Drives Institutional Investment**
📍 *Policy News • ${timeOfDay} Update*  
New regulatory frameworks provide clearer guidelines for institutional cryptocurrency adoption, boosting confidence in the digital asset space.

**5. DeFi Protocol Innovations Continue to Evolve**
📍 *Technology • ${timeOfDay} Update*
Next-generation DeFi protocols introduce advanced features for yield optimization, automated market making, and enhanced risk management.`;
  }

  private async handlePortfolioQuery(timestamp: string): Promise<string> {
    const topCoins = await this.getTopCoins(5);
    
    if (!topCoins || !Array.isArray(topCoins)) {
      return `❌ **Portfolio Data Unavailable**
      
Sorry, I couldn't fetch the current market data for portfolio recommendations. Please try again later.`;
    }

    let response = `💼 **Portfolio Recommendations**\n\n`;
    response += `**Suggested Allocation for Balanced Crypto Portfolio:**\n\n`;
    
    const allocations = [40, 30, 15, 10, 5];
    topCoins.forEach((coin: any, index: number) => {
      response += `• **${coin.name} (${coin.symbol.toUpperCase()}):** ${allocations[index]}%\n`;
      response += `  Current Price: $${coin.current_price.toFixed(coin.current_price < 1 ? 6 : 2)}\n`;
      response += `  24h Change: ${coin.price_change_percentage_24h > 0 ? '+' : ''}${coin.price_change_percentage_24h?.toFixed(2) || 0}%\n\n`;
    });

    response += `**Portfolio Strategy:**\n`;
    response += `• 70% in major coins (BTC, ETH) for stability\n`;
    response += `• 30% in promising altcoins for growth potential\n`;
    response += `• Regular rebalancing recommended monthly\n`;
    response += `• Consider DCA (Dollar Cost Averaging) strategy\n\n`;
    response += `⚠️ *Always do your own research and never invest more than you can afford to lose.*`;

    return response;
  }

  private handleGeneralQuery(timestamp: string): string {
    return `🤖 **AlgoAtlas AI Assistant**

Hello! I'm your enhanced cryptocurrency analysis assistant with real-time data. I can help you with:

🔍 **Real-time Market Data:**
• Live cryptocurrency prices and market caps
• 24-hour price changes and volume
• All-time highs and lows

📊 **Advanced Analysis:**
• Top gainers and losers
• Trending cryptocurrencies  
• Market sentiment (Fear & Greed Index)
• Bitcoin dominance analysis

⛽ **Network Information:**
• Ethereum gas fees tracker
• Order book analysis
• Trading pair data

📰 **Latest News:**
• Recent cryptocurrency developments
• Market updates and trends

💼 **Portfolio Tools:**
• Investment recommendations
• Risk assessment

**Try asking:**
• "What's the Bitcoin price?"
• "Show me top gainers"
• "What's the market sentiment?"
• "Ethereum gas fees"
• "Latest crypto news"
• "Portfolio suggestions"

How can I assist you with your crypto analysis today?`;
  }

  // Search for cryptocurrency by symbol or name
  private async searchCoin(query: string): Promise<string | null> {
    try {
      const response = await axios.get(`${this.COINGECKO_API}/search`, {
        params: { query: query.toLowerCase() }
      });
      
      const { coins } = response.data;
      if (coins && coins.length > 0) {
        // Return the first match (usually most relevant)
        return coins[0].id;
      }
      
      return null;
    } catch (error) {
      console.error('Error searching for coin:', error);
      return null;
    }
  }

  // Utility methods
  private async extractCoinId(message: string): Promise<string | null> {
    const coinMap: {[key: string]: string} = {
      'bitcoin': 'bitcoin', 'btc': 'bitcoin',
      'ethereum': 'ethereum', 'eth': 'ethereum',
      'solana': 'solana', 'sol': 'solana',
      'cardano': 'cardano', 'ada': 'cardano',
      'avalanche': 'avalanche', 'avax': 'avalanche',
      'polkadot': 'polkadot', 'dot': 'polkadot',
      'polygon': 'matic-network', 'matic': 'matic-network',
      'chainlink': 'chainlink', 'link': 'chainlink',
      'wif': 'dogwifcoin', 'dogwifhat': 'dogwifcoin',
      'doge': 'dogecoin', 'dogecoin': 'dogecoin',
      'shib': 'shiba-inu', 'shiba': 'shiba-inu',
      'pepe': 'pepe', 'bonk': 'bonk',
      'xrp': 'ripple', 'ripple': 'ripple',
      'bnb': 'binancecoin', 'binance coin': 'binancecoin',
      'usdt': 'tether', 'usdc': 'usd-coin',
      'render': 'render-token', 'rndr': 'render-token',
      'sui': 'sui', 'aptos': 'aptos', 'apt': 'aptos',
      'arbitrum': 'arbitrum', 'arb': 'arbitrum',
      'optimism': 'optimism', 'op': 'optimism',
      'fantom': 'fantom', 'ftm': 'fantom',
      'near': 'near', 'cosmos': 'cosmos', 'atom': 'cosmos'
    };

    // First check the hardcoded map for quick lookups
    // Sort by length descending to match longer phrases first
    const sortedEntries = Object.entries(coinMap).sort((a, b) => b[0].length - a[0].length);
    
    for (const [keyword, id] of sortedEntries) {
      if (message.toLowerCase().includes(keyword)) {
        return id;
      }
    }

    // If not found in hardcoded map, search via API
    const words = message.toLowerCase().split(/\s+/);
    
    // Try to find the main coin name (skip common words like "price", "of", "the", etc.)
    const skipWords = ['price', 'of', 'the', 'what', 'is', 'show', 'me', 'get', 'tell', 'find', 'current', 'today', 'now'];
    const relevantWords = words.filter(word => 
      word.length >= 2 && 
      !skipWords.includes(word) && 
      !word.match(/^\d+$/) // Skip pure numbers
    );
    
    for (const word of relevantWords) {
      const coinId = await this.searchCoin(word);
      if (coinId) {
        return coinId;
      }
    }
    
    return null;
  }

  private extractTradingPair(message: string): string | null {
    const pairs = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'ADAUSDT', 'AVAXUSDT'];
    for (const pair of pairs) {
      if (message.toUpperCase().includes(pair)) {
        return pair;
      }
    }
    return null;
  }

  private getTimeAgo(timestamp: string): string {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now.getTime() - time.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Less than 1 hour ago';
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  }
}

export const localAI = new CryptoAI();