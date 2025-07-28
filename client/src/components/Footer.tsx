import { Link } from "wouter";
import { BarChart3 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black/50 border-t border-border/50 py-16">
      <div className="container mx-auto px-6">
        {/* Logo Section - Centered */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <BarChart3 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">AlgoAtlas</span>
          </Link>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Advanced financial analytics powered by machine learning and artificial intelligence.
          </p>
        </div>

        {/* Links Section - Centered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="font-semibold mb-4">Models</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/price-prediction" className="hover:text-primary transition-colors">
                  Price Prediction
                </Link>
              </li>
              <li>
                <Link href="/volatility-modeling" className="hover:text-primary transition-colors">
                  Volatility Modeling
                </Link>
              </li>
              <li>
                <Link href="/portfolio-forecasting" className="hover:text-primary transition-colors">
                  Portfolio Forecasting
                </Link>
              </li>
              <li>
                <Link href="/anomaly-detection" className="hover:text-primary transition-colors">
                  Anomaly Detection
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <h3 className="font-semibold mb-4">Technology</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Machine Learning</li>
              <li>Deep Learning</li>
              <li>Statistical Models</li>
              <li>Real-time Analytics</li>
            </ul>
          </div>

          <div className="text-center">
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-primary transition-colors">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/documentation" className="hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 AlgoAtlas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;