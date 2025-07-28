import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Router } from "wouter";
import Index from "./pages/Index";

import PricePrediction from "./pages/PricePrediction";
import VolatilityModeling from "./pages/VolatilityModeling";
import PortfolioForecasting from "./pages/PortfolioForecasting";
import AnomalyDetection from "./pages/AnomalyDetection";
import About from "./pages/About";
import Research from "./pages/Research";
import Contact from "./pages/Contact";
import Documentation from "./pages/Documentation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Route path="/" component={Index} />
        <Route path="/price-prediction" component={PricePrediction} />
        <Route path="/volatility-modeling" component={VolatilityModeling} />
        <Route path="/portfolio-forecasting" component={PortfolioForecasting} />
        <Route path="/anomaly-detection" component={AnomalyDetection} />
        <Route path="/about" component={About} />
        <Route path="/research" component={Research} />
        <Route path="/contact" component={Contact} />
        <Route path="/documentation" component={Documentation} />
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
