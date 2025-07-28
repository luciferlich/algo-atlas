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
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
