import coinGeckoLogo from "@/assets/coingecko-logo.png";
import coinMarketCapLogo from "@/assets/coinmarketcap-logo.png";
import kucoinLogo from "@/assets/kucoin-logo.png";
import coinbaseLogo from "@/assets/coinbase-logo.png";
import binanceLogo from "@/assets/binance-logo.png";

const DataProviders = () => {
  const cryptoProviders = [
    {
      name: "Binance",
      logo: binanceLogo
    },
    {
      name: "KuCoin", 
      logo: kucoinLogo
    },
    {
      name: "CoinGecko",
      logo: coinGeckoLogo
    },
    {
      name: "CoinMarketCap",
      logo: coinMarketCapLogo
    },
    {
      name: "Coinbase",
      logo: coinbaseLogo
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
              <img 
                src={provider.logo} 
                alt={provider.name}
                className="h-8 w-auto"
                style={{
                  filter: 'brightness(0) invert(1) sepia(1) saturate(2) hue-rotate(5deg) brightness(0.9) contrast(1.2)'
                }}
              />
            </div>
          ))}
          {/* Second set for seamless loop */}
          {cryptoProviders.map((provider, index) => (
            <div 
              key={`set2-${index}`}
              className="flex items-center whitespace-nowrap flex-shrink-0 mx-12"
            >
              <img 
                src={provider.logo} 
                alt={provider.name}
                className="h-8 w-auto"
                style={{
                  filter: 'brightness(0) invert(1) sepia(1) saturate(2) hue-rotate(5deg) brightness(0.9) contrast(1.2)'
                }}
              />
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