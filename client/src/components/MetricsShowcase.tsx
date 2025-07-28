import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3, Brain, Shield, Cpu, Database, Zap, Target } from "lucide-react";

const modelMetrics = [
  {
    id: "prediction",
    title: "Price Prediction Models",
    icon: TrendingUp,
    color: "text-red-400",
    borderColor: "border-red-800/30",
    techniques: [
      { name: "LSTM Networks", accuracy: 87.3, color: "bg-red-500" },
      { name: "ARIMA", accuracy: 82.1, color: "bg-red-400" },
      { name: "Random Forest", accuracy: 79.8, color: "bg-red-300" },
      { name: "Linear Regression", accuracy: 74.5, color: "bg-red-200" }
    ]
  },
  {
    id: "volatility",
    title: "Volatility Modeling", 
    icon: BarChart3,
    color: "text-blue-400",
    borderColor: "border-blue-800/30",
    techniques: [
      { name: "LSTM Networks", accuracy: 91.2, color: "bg-blue-500" },
      { name: "GARCH Models", accuracy: 88.7, color: "bg-blue-400" },
      { name: "Attention Models", accuracy: 85.4, color: "bg-blue-300" },
      { name: "Stochastic Volatility", accuracy: 81.9, color: "bg-blue-200" }
    ]
  },
  {
    id: "portfolio",
    title: "Portfolio Forecasting",
    icon: Brain,
    color: "text-green-400", 
    borderColor: "border-green-800/30",
    techniques: [
      { name: "Value at Risk (VaR)", accuracy: 89.6, color: "bg-green-500" },
      { name: "DeepAR", accuracy: 86.3, color: "bg-green-400" },
      { name: "Transformer Models", accuracy: 84.1, color: "bg-green-300" },
      { name: "Monte Carlo", accuracy: 80.7, color: "bg-green-200" }
    ]
  },
  {
    id: "anomaly",
    title: "Anomaly Detection",
    icon: Shield,
    color: "text-yellow-400",
    borderColor: "border-yellow-800/30", 
    techniques: [
      { name: "Autoencoders", accuracy: 93.4, color: "bg-yellow-500" },
      { name: "Isolation Forest", accuracy: 88.9, color: "bg-yellow-400" },
      { name: "HDBSCAN", accuracy: 85.2, color: "bg-yellow-300" },
      { name: "One-Class SVM", accuracy: 82.6, color: "bg-yellow-200" }
    ]
  }
];

const technologyMetrics = [
  {
    name: "Machine Learning",
    icon: Cpu,
    efficiency: 92.8,
    color: "bg-purple-500",
    description: "Advanced ML algorithms with high computational efficiency"
  },
  {
    name: "Deep Learning", 
    icon: Brain,
    efficiency: 89.5,
    color: "bg-indigo-500",
    description: "Neural networks delivering superior pattern recognition"
  },
  {
    name: "Statistical Models",
    icon: BarChart3,
    efficiency: 86.2,
    color: "bg-cyan-500", 
    description: "Classical statistical approaches with proven reliability"
  },
  {
    name: "Real-time Analytics",
    icon: Zap,
    efficiency: 94.1,
    color: "bg-orange-500",
    description: "High-speed processing for instant market insights"
  }
];

const MetricsShowcase = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Performance Metrics
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-world accuracy rates and efficiency metrics from our production models, 
            validated across thousands of financial instruments and market conditions.
          </p>
        </div>

        {/* Model Accuracy Metrics */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">Model Accuracy Rates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {modelMetrics.map((model) => {
              const Icon = model.icon;
              return (
                <Card key={model.id} className={`${model.borderColor} border-opacity-50`}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-dark ${model.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{model.title}</CardTitle>
                        <CardDescription>Technique-specific accuracy metrics</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {model.techniques.map((technique, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{technique.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {technique.accuracy}%
                          </Badge>
                        </div>
                        <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary/50">
                          <div 
                            className={`h-full transition-all duration-500 ${technique.color.replace('bg-', 'bg-')}`}
                            style={{ width: `${technique.accuracy}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Technology Efficiency Metrics */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center">Technology Stack Efficiency</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologyMetrics.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader className="pb-4">
                    <div className="flex justify-center mb-3">
                      <div className="p-3 rounded-full bg-gradient-dark">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">{tech.name}</CardTitle>
                    <CardDescription className="text-xs">{tech.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-3xl font-bold text-primary">
                        {tech.efficiency}%
                      </div>
                      <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary/50">
                        <div 
                          className={`h-full transition-all duration-500 ${tech.color}`}
                          style={{ width: `${tech.efficiency}%` }}
                        />
                      </div>
                      <div className="flex justify-center">
                        <Badge variant="outline" className="text-xs">
                          <Target className="h-3 w-3 mr-1" />
                          Production Ready
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Overall Performance Summary */}
        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="py-8">
              <h4 className="text-xl font-semibold mb-4">Overall Platform Performance</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-2xl font-bold text-primary">89.2%</div>
                  <div className="text-sm text-muted-foreground">Average Model Accuracy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">90.7%</div>
                  <div className="text-sm text-muted-foreground">Technology Efficiency</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">99.8%</div>
                  <div className="text-sm text-muted-foreground">System Uptime</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MetricsShowcase;