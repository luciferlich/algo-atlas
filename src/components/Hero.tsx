import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, TrendingUp, BarChart3, Shield } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
              <span className="terminal-text block text-lg md:text-xl mb-2 uppercase tracking-[0.2em]">
                /// ALGOATLAS v2.1.4
              </span>
              Advanced Financial
              <span className="bg-gradient-primary bg-clip-text text-transparent block">
                Analytics Platform
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Harness the power of machine learning for price prediction, volatility modeling, 
              portfolio forecasting, and anomaly detection in financial markets.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg">
              Start Analysis
            </Button>
            <Button variant="terminal" size="lg" className="animate-pulse-slow">
              VIEW DEMO
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <Card className="financial-card p-6 transition-all duration-300 group hover:aladdin-glow">
              <div className="text-center space-y-3">
                <TrendingUp className="h-8 w-8 text-red-400 mx-auto group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold">Price Prediction</h3>
                <p className="text-xs text-muted-foreground data-grid">LSTM • ARIMA • RF</p>
                <div className="terminal-text text-xs">ACTIVE</div>
              </div>
            </Card>
            
            <Card className="financial-card p-6 transition-all duration-300 group hover:aladdin-glow">
              <div className="text-center space-y-3">
                <BarChart3 className="h-8 w-8 text-blue-400 mx-auto group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold">Volatility Modeling</h3>
                <p className="text-xs text-muted-foreground data-grid">GARCH • ATTENTION</p>
                <div className="terminal-text text-xs">ACTIVE</div>
              </div>
            </Card>
            
            <Card className="financial-card p-6 transition-all duration-300 group hover:aladdin-glow">
              <div className="text-center space-y-3">
                <Brain className="h-8 w-8 text-green-400 mx-auto group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold">Portfolio Forecasting</h3>
                <p className="text-xs text-muted-foreground data-grid">VAR • DEEPAR • TXF</p>
                <div className="terminal-text text-xs">ACTIVE</div>
              </div>
            </Card>
            
            <Card className="financial-card p-6 transition-all duration-300 group hover:aladdin-glow">
              <div className="text-center space-y-3">
                <Shield className="h-8 w-8 text-yellow-400 mx-auto group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold">Anomaly Detection</h3>
                <p className="text-xs text-muted-foreground data-grid">AE • HDBSCAN • ISOF</p>
                <div className="terminal-text text-xs">ACTIVE</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;