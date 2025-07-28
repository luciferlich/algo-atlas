import { Button } from "@/components/ui/button";
import { BarChart3, Brain, TrendingUp, AlertTriangle, Menu, ChevronDown } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [, setLocation] = useLocation();

  const handleGetStarted = () => {
    setLocation('/contact');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AlgoAtlas
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-0 focus:border-none">
                Models <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/95 backdrop-blur-md border border-primary/20 shadow-xl rounded-lg p-1 min-w-[200px]">
                <DropdownMenuItem asChild className="hover:bg-primary/10 rounded-md transition-colors cursor-pointer focus:bg-primary/10 focus:outline-none">
                  <Link href="/price-prediction" className="w-full px-3 py-2 text-sm text-foreground hover:text-primary">
                    <TrendingUp className="w-4 h-4 mr-2 inline-block" />
                    Price Prediction
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-primary/10 rounded-md transition-colors cursor-pointer focus:bg-primary/10 focus:outline-none">
                  <Link href="/volatility-modeling" className="w-full px-3 py-2 text-sm text-foreground hover:text-primary">
                    <BarChart3 className="w-4 h-4 mr-2 inline-block" />
                    Volatility Modeling
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-primary/10 rounded-md transition-colors cursor-pointer focus:bg-primary/10 focus:outline-none">
                  <Link href="/portfolio-forecasting" className="w-full px-3 py-2 text-sm text-foreground hover:text-primary">
                    <Brain className="w-4 h-4 mr-2 inline-block" />
                    Portfolio Forecasting
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-primary/10 rounded-md transition-colors cursor-pointer focus:bg-primary/10 focus:outline-none">
                  <Link href="/anomaly-detection" className="w-full px-3 py-2 text-sm text-foreground hover:text-primary">
                    <AlertTriangle className="w-4 h-4 mr-2 inline-block" />
                    Anomaly Detection
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-0 focus:border-none">
                Technology <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/95 backdrop-blur-md border border-primary/20 shadow-xl rounded-lg p-1 min-w-[200px]">
                <DropdownMenuItem className="hover:bg-primary/10 rounded-md transition-colors cursor-pointer focus:bg-primary/10 focus:outline-none px-3 py-2 text-sm text-foreground hover:text-primary">
                  <Brain className="w-4 h-4 mr-2" />
                  Machine Learning
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/10 rounded-md transition-colors cursor-pointer focus:bg-primary/10 focus:outline-none px-3 py-2 text-sm text-foreground hover:text-primary">
                  <Brain className="w-4 h-4 mr-2" />
                  Deep Learning
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/10 rounded-md transition-colors cursor-pointer focus:bg-primary/10 focus:outline-none px-3 py-2 text-sm text-foreground hover:text-primary">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Statistical Models
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/10 rounded-md transition-colors cursor-pointer focus:bg-primary/10 focus:outline-none px-3 py-2 text-sm text-foreground hover:text-primary">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Real-time Analytics
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-0 focus:border-none">
                Company <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/95 backdrop-blur-md border border-primary/20 shadow-xl rounded-lg p-1 min-w-[200px]">
                <DropdownMenuItem asChild className="hover:bg-primary/10 rounded-md transition-colors cursor-pointer focus:bg-primary/10 focus:outline-none">
                  <Link href="/about" className="w-full px-3 py-2 text-sm text-foreground hover:text-primary flex items-center">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    About
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-primary/10 rounded-md transition-colors cursor-pointer focus:bg-primary/10 focus:outline-none">
                  <Link href="/research" className="w-full px-3 py-2 text-sm text-foreground hover:text-primary flex items-center">
                    <Brain className="w-4 h-4 mr-2" />
                    Research
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-primary/10 rounded-md transition-colors cursor-pointer focus:bg-primary/10 focus:outline-none">
                  <Link href="/contact" className="w-full px-3 py-2 text-sm text-foreground hover:text-primary flex items-center">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Contact
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-primary/10 rounded-md transition-colors cursor-pointer focus:bg-primary/10 focus:outline-none">
                  <Link href="/documentation" className="w-full px-3 py-2 text-sm text-foreground hover:text-primary flex items-center">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Documentation
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="analytics" onClick={handleGetStarted}>
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