const DataProviders = () => {
  const dataProviders = [
    { 
      name: "REUTERS",
      logo: (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary rounded mr-3 flex items-center justify-center">
            <span className="text-black font-black text-xs">R</span>
          </div>
          <span className="font-bold text-primary tracking-wider">REUTERS</span>
        </div>
      )
    },
    { 
      name: "Nasdaq",
      logo: (
        <div className="flex items-center">
          <div className="flex items-center mr-3">
            <div className="w-2 h-8 bg-primary mr-1"></div>
            <div className="w-2 h-6 bg-primary mr-1"></div>
            <div className="w-2 h-8 bg-primary mr-1"></div>
            <div className="w-2 h-4 bg-primary"></div>
          </div>
          <span className="font-bold text-primary tracking-wide">Nasdaq</span>
        </div>
      )
    },
    { 
      name: "CME Group",
      logo: (
        <div className="flex items-center">
          <div className="w-8 h-8 border-2 border-primary rounded-full mr-3 flex items-center justify-center">
            <span className="text-primary font-black text-xs">CME</span>
          </div>
          <span className="font-bold text-primary tracking-wide">CME Group</span>
        </div>
      )
    }
  ];

  // Create seamless loop by duplicating providers
  const loopedProviders = [...dataProviders, ...dataProviders, ...dataProviders, ...dataProviders];

  return (
    <section className="py-6 bg-black/20 border-y border-primary/10 overflow-hidden">
      <div className="text-center mb-6">
        <h3 className="text-xs font-medium text-muted-foreground/60 tracking-widest uppercase">
          Data Powered By
        </h3>
      </div>
      
      <div className="relative">
        <div className="flex items-center space-x-16 animate-marquee-endless">
          {loopedProviders.map((provider, index) => (
            <div 
              key={`${provider.name}-${index}`}
              className="flex items-center whitespace-nowrap flex-shrink-0 min-w-[200px] justify-center"
            >
              {provider.logo}
            </div>
          ))}
        </div>
        
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
};

export default DataProviders;