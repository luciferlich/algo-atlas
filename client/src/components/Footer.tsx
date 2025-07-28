import { BarChart3 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-gradient-dark">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                AlgoAtlas
              </span>
            </div>
            <p className="text-muted-foreground">
              Advanced financial analytics powered by machine learning and artificial intelligence.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Models</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Price Prediction</li>
              <li>Volatility Modeling</li>
              <li>Portfolio Forecasting</li>
              <li>Anomaly Detection</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Technology</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Machine Learning</li>
              <li>Deep Learning</li>
              <li>Statistical Models</li>
              <li>Real-time Analytics</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>About</li>
              <li>Research</li>
              <li>Contact</li>
              <li>Documentation</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 AlgoAtlas. Advanced financial analytics platform.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;