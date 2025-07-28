import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/price-prediction" element={<PricePrediction />} />
          <Route path="/volatility-modeling" element={<VolatilityModeling />} />
          <Route path="/portfolio-forecasting" element={<PortfolioForecasting />} />
          <Route path="/anomaly-detection" element={<AnomalyDetection />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
