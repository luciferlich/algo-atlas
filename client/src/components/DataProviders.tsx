const DataProviders = () => {
  const dataProviders = [
    {
      name: "REUTERS",
      icon: "🗞️",
      color: "text-orange-400"
    },
    {
      name: "NASDAQ",
      icon: "📊",
      color: "text-blue-400"
    },
    {
      name: "CME Group",
      icon: "🏛️",
      color: "text-green-400"
    },
    {
      name: "BLOOMBERG",
      icon: "📈",
      color: "text-yellow-400"
    },
    {
      name: "S&P Global",
      icon: "🌐",
      color: "text-purple-400"
    },
    {
      name: "REFINITIV",
      icon: "💹",
      color: "text-cyan-400"
    }
  ];

  // Duplicate for seamless loop
  const duplicatedProviders = [...dataProviders, ...dataProviders, ...dataProviders];

  return (
    <section className="py-12 bg-black/50 border-y border-primary/10 overflow-hidden">
      <div className="text-center mb-8">
        <h3 className="text-sm font-semibold text-muted-foreground tracking-wider uppercase">
          Data Powered By
        </h3>
      </div>
      
      <div className="relative">
        <div className="flex space-x-16 animate-marquee">
          {duplicatedProviders.map((provider, index) => (
            <div 
              key={index}
              className="flex items-center space-x-3 whitespace-nowrap flex-shrink-0"
            >
              <span className={`text-2xl ${provider.color}`}>
                {provider.icon}
              </span>
              <span className={`text-lg font-semibold ${provider.color} tracking-wide`}>
                {provider.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DataProviders;