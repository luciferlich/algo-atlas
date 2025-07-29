import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3, Brain, Shield, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const models = [
  {
    id: "prediction",
    title: "Price Prediction Models",
    icon: TrendingUp,
    description: "Advanced neural networks and statistical models for accurate price forecasting",
    techniques: ["LSTM Networks", "ARIMA", "Linear Regression", "Random Forest"],
    color: "text-red-400",
    gradient: "from-red-950/40 to-red-900/20",
    borderColor: "border-red-800/30",
    hoverBorder: "hover:border-red-600",
    route: "/price-prediction"
  },
  {
    id: "volatility", 
    title: "Volatility Modeling",
    icon: BarChart3,
    description: "Sophisticated models to capture and predict market volatility patterns",
    techniques: ["LSTM Networks", "GARCH Models", "Attention-Based Models", "Stochastic Volatility"],
    color: "text-blue-400",
    gradient: "from-blue-950/40 to-blue-900/20",
    borderColor: "border-blue-800/30",
    hoverBorder: "hover:border-blue-600",
    route: "/volatility-modeling"
  },
  {
    id: "portfolio",
    title: "Portfolio Forecasting", 
    icon: Brain,
    description: "Risk assessment and portfolio optimization using cutting-edge ML techniques",
    techniques: ["Value at Risk (VaR)", "DeepAR", "Transformer Models", "Monte Carlo"],
    color: "text-green-400",
    gradient: "from-green-950/40 to-green-900/20",
    borderColor: "border-green-800/30",
    hoverBorder: "hover:border-green-600",
    route: "/portfolio-forecasting"
  },
  {
    id: "anomaly",
    title: "Anomaly Detection",
    icon: Shield,
    description: "Identify market irregularities and unusual patterns in real-time",
    techniques: ["Autoencoders", "Isolation Forest", "HDBSCAN", "One-Class SVM"],
    color: "text-yellow-400",
    gradient: "from-yellow-950/40 to-amber-900/20",
    borderColor: "border-yellow-800/30",
    hoverBorder: "hover:border-yellow-600",
    route: "/anomaly-detection"
  }
];

const ModelShowcase = () => {
  const [, setLocation] = useLocation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleExploreModel = (route: string) => {
    setLocation(route);
  };

  return (
    <section id="models-section" className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          ref={ref}
          className="text-center space-y-4 mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Advanced ML Models
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our comprehensive suite of machine learning models designed 
            for sophisticated financial analysis and risk management.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {models.map((model, index) => {
            const Icon = model.icon;
            return (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ 
                  duration: 0.6, 
                  ease: "easeOut",
                  delay: index * 0.15
                }}
              >
                <Card 
                  className={`p-8 bg-gradient-to-br ${model.gradient} ${model.borderColor} ${model.hoverBorder} transition-all duration-300 group card-hover card-${
                    model.id === 'prediction' ? 'red' :
                    model.id === 'volatility' ? 'blue' :
                    model.id === 'portfolio' ? 'green' :
                    'yellow'
                  } h-full`}
                >
                <div className="space-y-6 flex flex-col h-full">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-gradient-dark ${model.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{model.title}</h3>
                      <p className="text-muted-foreground">{model.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 flex-grow">
                    <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
                      Techniques
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {model.techniques.map((technique) => (
                        <Badge 
                          key={technique}
                          variant="secondary" 
                          className={`bg-secondary/50 hover:bg-secondary/70 transition-colors border border-opacity-30 ${
                            model.id === 'prediction' ? 'border-red-400 text-red-300' :
                            model.id === 'volatility' ? 'border-blue-400 text-blue-300' :
                            model.id === 'portfolio' ? 'border-green-400 text-green-300' :
                            'border-yellow-400 text-yellow-300'
                          }`}
                        >
                          {technique}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <Button 
                      variant="analytics" 
                      className="w-full group-hover:bg-primary/20"
                      onClick={() => handleExploreModel(model.route)}
                    >
                      Explore Model
                      <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ModelShowcase;