const DataProviders = () => {
  const cryptoProviders = [
    { 
      name: "Binance",
      logo: (
        <div className="flex items-center">
          <div className="w-8 h-8 mr-3 relative">
            {/* Binance logo recreation */}
            <svg viewBox="0 0 32 32" className="w-full h-full">
              <g fill="currentColor" className="text-primary">
                {/* Top diamond */}
                <polygon points="16,2 20,6 16,10 12,6" />
                {/* Left diamond */}
                <polygon points="6,12 10,8 14,12 10,16" />
                {/* Center diamond */}
                <polygon points="16,12 20,8 24,12 20,16" />
                {/* Right diamond */}
                <polygon points="26,12 30,8 26,4 22,8" />
                {/* Bottom diamond */}
                <polygon points="16,22 20,18 24,22 20,26" />
                <polygon points="16,22 12,18 8,22 12,26" />
              </g>
            </svg>
          </div>
          <span className="font-bold text-primary tracking-wide">Binance</span>
        </div>
      )
    },
    { 
      name: "KuCoin",
      logo: (
        <div className="flex items-center">
          <div className="w-8 h-8 mr-3 relative">
            {/* KuCoin K logo recreation - white part only, colored gold */}
            <svg viewBox="0 0 32 32" className="w-full h-full">
              <g fill="currentColor" className="text-primary">
                <path d="M8,4 L8,28 L12,28 L12,18 L18,24 L22,24 L16,18 L22,12 L18,12 L12,18 L12,8 L20,8 L20,4 Z" />
                <circle cx="24" cy="8" r="2" />
                <path d="M20,20 L24,24 L28,20 L24,16 Z" />
              </g>
            </svg>
          </div>
          <span className="font-bold text-primary tracking-wide">KuCoin</span>
        </div>
      )
    },
    { 
      name: "CoinGecko",
      logo: (
        <div className="flex items-center">
          <div className="w-8 h-8 mr-3 relative">
            {/* CoinGecko gecko recreation - body and eyes in gold */}
            <svg viewBox="0 0 32 32" className="w-full h-full">
              <circle cx="16" cy="16" r="14" fill="currentColor" className="text-primary opacity-20" />
              {/* Gecko head shape */}
              <path d="M8,12 Q8,8 12,8 Q20,8 24,12 Q24,20 20,24 Q16,26 12,24 Q8,20 8,16 Z" fill="currentColor" className="text-primary" />
              {/* Eye */}
              <circle cx="18" cy="14" r="3" fill="currentColor" className="text-background" />
              <circle cx="19" cy="13" r="1.5" fill="currentColor" className="text-primary" />
            </svg>
          </div>
          <span className="font-bold text-primary tracking-wide">CoinGecko</span>
        </div>
      )
    },
    { 
      name: "CoinMarketCap",
      logo: (
        <div className="flex items-center">
          <div className="w-8 h-8 mr-3 relative">
            {/* CMC logo recreation */}
            <svg viewBox="0 0 32 32" className="w-full h-full">
              <circle cx="16" cy="16" r="14" fill="currentColor" className="text-primary opacity-20" />
              <path d="M12,8 Q8,8 8,12 L8,20 Q8,24 12,24 Q16,24 16,20 L16,12 Q16,8 12,8 Z" fill="currentColor" className="text-primary" />
              <path d="M20,12 Q24,12 24,16 L24,20 Q24,24 20,24 Q16,24 16,20 L16,16 Q16,12 20,12 Z" fill="currentColor" className="text-primary" />
            </svg>
          </div>
          <span className="font-bold text-primary tracking-wide">CoinMarketCap</span>
        </div>
      )
    },
    { 
      name: "Coinbase",
      logo: (
        <div className="flex items-center">
          <div className="w-8 h-8 mr-3 relative">
            {/* Coinbase C logo recreation */}
            <svg viewBox="0 0 32 32" className="w-full h-full">
              <circle cx="16" cy="16" r="14" fill="currentColor" className="text-primary opacity-20" />
              <path d="M16,6 Q24,6 24,14 L24,18 Q24,26 16,26 Q8,26 8,18 L8,14 Q8,6 16,6 Z M16,10 Q12,10 12,14 L12,18 Q12,22 16,22 Q20,22 20,18 L20,14 Q20,10 16,10 Z" fill="currentColor" className="text-primary" />
            </svg>
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