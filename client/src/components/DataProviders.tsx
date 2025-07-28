const DataProviders = () => {
  const cryptoProviders = [
    { 
      name: "KuCoin",
      logo: (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary rounded mr-3 flex items-center justify-center">
            <span className="text-black font-black text-xs">K</span>
          </div>
          <span className="font-bold text-primary tracking-wide">KuCoin</span>
        </div>
      )
    },
    { 
      name: "Binance",
      logo: (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary rounded mr-3 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-1 border-2 border-black transform rotate-45"></div>
          </div>
          <span className="font-bold text-primary tracking-wide">Binance</span>
        </div>
      )
    },
    { 
      name: "CoinGecko",
      logo: (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary rounded-full mr-3 flex items-center justify-center">
            <span className="text-black font-black text-xs">CG</span>
          </div>
          <span className="font-bold text-primary tracking-wide">CoinGecko</span>
        </div>
      )
    },
    { 
      name: "CoinMarketCap",
      logo: (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary rounded mr-3 flex items-center justify-center">
            <span className="text-black font-black text-xs">CMC</span>
          </div>
          <span className="font-bold text-primary tracking-wide">CoinMarketCap</span>
        </div>
      )
    },
    { 
      name: "Crypto.com",
      logo: (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary rounded mr-3 flex items-center justify-center">
            <span className="text-black font-black text-xs">₵</span>
          </div>
          <span className="font-bold text-primary tracking-wide">Crypto.com</span>
        </div>
      )
    },
    { 
      name: "Coinbase",
      logo: (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary rounded-full mr-3 flex items-center justify-center">
            <div className="w-4 h-4 bg-black rounded-full"></div>
          </div>
          <span className="font-bold text-primary tracking-wide">Coinbase</span>
        </div>
      )
    }
  ];

  return (
    <section className="py-6 bg-black/20 border-y border-primary/10 overflow-hidden">
      <div className="text-center mb-6">
        <h3 className="text-xs font-medium text-muted-foreground/60 tracking-widest uppercase">
          Data Powered By
        </h3>
      </div>
      
      <div className="relative">
        <div className="flex items-center animate-scroll-infinite">
          {/* First set */}
          {cryptoProviders.map((provider, index) => (
            <div 
              key={`set1-${index}`}
              className="flex items-center whitespace-nowrap flex-shrink-0 mx-8"
            >
              {provider.logo}
            </div>
          ))}
          {/* Second set for seamless loop */}
          {cryptoProviders.map((provider, index) => (
            <div 
              key={`set2-${index}`}
              className="flex items-center whitespace-nowrap flex-shrink-0 mx-8"
            >
              {provider.logo}
            </div>
          ))}
        </div>
        
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10"></div>
      </div>
    </section>
  );
};

export default DataProviders;