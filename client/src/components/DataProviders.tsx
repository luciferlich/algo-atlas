const DataProviders = () => {
  const cryptoProviders = [
    {
      name: "Binance",
      textStyle: "font-black text-2xl tracking-tight"
    },
    {
      name: "KuCoin", 
      textStyle: "font-bold text-2xl tracking-wide"
    },
    {
      name: "CoinGecko",
      textStyle: "font-bold text-2xl tracking-normal"
    },
    {
      name: "CoinMarketCap",
      textStyle: "font-semibold text-xl tracking-wide"
    },
    {
      name: "Coinbase",
      textStyle: "font-medium text-2xl tracking-wide"
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
              className="flex items-center whitespace-nowrap flex-shrink-0 mx-12"
            >
              <span className={`text-primary ${provider.textStyle}`}>
                {provider.name}
              </span>
            </div>
          ))}
          {/* Second set for seamless loop */}
          {cryptoProviders.map((provider, index) => (
            <div 
              key={`set2-${index}`}
              className="flex items-center whitespace-nowrap flex-shrink-0 mx-12"
            >
              <span className={`text-primary ${provider.textStyle}`}>
                {provider.name}
              </span>
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