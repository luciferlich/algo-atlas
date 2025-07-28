import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, TrendingUp, BarChart3, Shield } from "lucide-react";
import { motion } from "framer-motion";
// import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  const scrollToModels = () => {
    const modelsSection = document.getElementById('models-section');
    if (modelsSection) {
      modelsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 pt-32">
        <div className="text-center space-y-8">
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
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
          </motion.div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" onClick={scrollToModels}>
              Start Analysis
            </Button>
            <Button variant="outline" size="lg" className="border-slate-400 text-slate-300 hover:bg-slate-400/10 hover:text-white button-demo">
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