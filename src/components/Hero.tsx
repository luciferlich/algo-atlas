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
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
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
            <Button variant="default" size="lg">
              View Demo
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <Card className="p-6 bg-gradient-dark border-primary/20 hover:border-primary/40 transition-all duration-300 group">
              <div className="text-center space-y-3">
                <TrendingUp className="h-8 w-8 text-primary mx-auto group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold">Price Prediction</h3>
                <p className="text-sm text-muted-foreground">LSTM, ARIMA, Random Forest</p>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-dark border-primary/20 hover:border-primary/40 transition-all duration-300 group">
              <div className="text-center space-y-3">
                <BarChart3 className="h-8 w-8 text-primary mx-auto group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold">Volatility Modeling</h3>
                <p className="text-sm text-muted-foreground">GARCH, Attention Models</p>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-dark border-primary/20 hover:border-primary/40 transition-all duration-300 group">
              <div className="text-center space-y-3">
                <Brain className="h-8 w-8 text-primary mx-auto group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold">Portfolio Forecasting</h3>
                <p className="text-sm text-muted-foreground">VaR, DeepAR, Transformers</p>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-dark border-primary/20 hover:border-primary/40 transition-all duration-300 group">
              <div className="text-center space-y-3">
                <Shield className="h-8 w-8 text-primary mx-auto group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold">Anomaly Detection</h3>
                <p className="text-sm text-muted-foreground">Autoencoders, HDBSCAN</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;