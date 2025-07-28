const DataProviders = () => {
  const cryptoProviders = [
    { 
      name: "Binance",
      logo: (
        <div className="flex items-center">
          <div className="w-8 h-8 mr-3">
            <svg viewBox="0 0 126.61 126.61" className="w-full h-full text-primary">
              <g fill="currentColor">
                <path d="M38.67 68.25L63.3 43.63l24.63 24.62L100.48 55.7L63.3 18.52L26.12 55.7l12.55 12.55z"/>
                <path d="M13.06 63.3l12.55-12.55L38.16 63.3L25.61 75.85L13.06 63.3z"/>
                <path d="M38.67 58.35L63.3 83l24.63-24.65L100.48 70.9L63.3 108.08L26.12 70.9l12.55-12.55z"/>
                <path d="M113.54 63.3L101 75.85L88.44 63.3L101 50.75l12.54 12.55z"/>
                <path d="M77.83 63.3L63.3 48.77L52.36 59.71L48.77 63.3l14.53 14.53L77.83 63.3z"/>
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