import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3, Brain, Shield, ChevronRight } from "lucide-react";

const models = [
  {
    id: "prediction",
    title: "Price Prediction Models",
    icon: TrendingUp,
    description: "Advanced neural networks and statistical models for accurate price forecasting",
    techniques: ["LSTM Networks", "ARIMA", "Linear Regression", "Random Forest"],
    color: "text-red-400",
    gradient: "from-red/20 to-red/5",
    borderColor: "border-red/20",
    hoverBorder: "hover:border-red/40"
  },
  {
    id: "volatility", 
    title: "Volatility Modeling",
    icon: BarChart3,
    description: "Sophisticated models to capture and predict market volatility patterns",
    techniques: ["LSTM Networks", "GARCH Models", "Attention-Based Models", "Stochastic Volatility"],
    color: "text-blue-400",
    gradient: "from-blue/20 to-blue/5",
    borderColor: "border-blue/20",
    hoverBorder: "hover:border-blue/40"
  },
  {
    id: "portfolio",
    title: "Portfolio Forecasting", 
    icon: Brain,
    description: "Risk assessment and portfolio optimization using cutting-edge ML techniques",
    techniques: ["Value at Risk (VaR)", "DeepAR", "Transformer Models", "Monte Carlo"],
    color: "text-green-400",
    gradient: "from-green/20 to-green/5",
    borderColor: "border-green/20",
    hoverBorder: "hover:border-green/40"
  },
  {
    id: "anomaly",
    title: "Anomaly Detection",
    icon: Shield,
    description: "Identify market irregularities and unusual patterns in real-time",
    techniques: ["Autoencoders", "Isolation Forest", "HDBSCAN", "One-Class SVM"],
    color: "text-yellow-400",
    gradient: "from-yellow/20 to-yellow/5",
    borderColor: "border-yellow/20",
    hoverBorder: "hover:border-yellow/40"
  }
];

const ModelShowcase = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Advanced ML Models
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our comprehensive suite of machine learning models designed 
            for sophisticated financial analysis and risk management.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {models.map((model) => {
            const Icon = model.icon;
            return (
              <Card 
                key={model.id}
                className={`p-8 bg-gradient-to-br ${model.gradient} ${model.borderColor} ${model.hoverBorder} transition-all duration-300 group card-hover`}
              >
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-gradient-dark ${model.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{model.title}</h3>
                      <p className="text-muted-foreground">{model.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
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
                  
                  <Button 
                    variant="analytics" 
                    className="w-full group-hover:bg-primary/20"
                  >
                    Explore Model
                    <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ModelShowcase;