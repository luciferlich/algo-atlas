import { Button } from "@/components/ui/button";
import { BarChart3, Brain, TrendingUp, AlertTriangle, Menu } from "lucide-react";
import { Link } from "wouter";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AlgoAtlas
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/price-prediction" className="text-foreground hover:text-primary transition-colors">
              Price Prediction
            </Link>
            <Link href="/volatility-modeling" className="text-foreground hover:text-primary transition-colors">
              Volatility Modeling
            </Link>
            <Link href="/portfolio-forecasting" className="text-foreground hover:text-primary transition-colors">
              Portfolio Forecasting
            </Link>
            <Link href="/anomaly-detection" className="text-foreground hover:text-primary transition-colors">
              Anomaly Detection
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="analytics">
              Get Started
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;