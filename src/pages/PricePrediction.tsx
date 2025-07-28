import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3, LineChart, TreePine } from "lucide-react";

const PricePrediction = () => {
  const models = [
    {
      name: "LSTM Neural Network",
      description: "Long Short-Term Memory networks for time series prediction",
      icon: <TrendingUp className="h-8 w-8" />,
      accuracy: "87%",
      technique: "Deep Learning"
    },
    {
      name: "ARIMA",
      description: "AutoRegressive Integrated Moving Average model",
      icon: <BarChart3 className="h-8 w-8" />,
      accuracy: "82%",
      technique: "Statistical"
    },
    {
      name: "Linear Regression",
      description: "Multiple linear regression with feature engineering",
      icon: <LineChart className="h-8 w-8" />,
      accuracy: "76%",
      technique: "Classical ML"
    },
    {
      name: "Random Forest",
      description: "Ensemble method for robust price forecasting",
      icon: <TreePine className="h-8 w-8" />,
      accuracy: "84%",
      technique: "Ensemble"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Price Prediction Models
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced machine learning models for accurate financial price forecasting
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {models.map((model, index) => (
              <Card key={index} className="card-premium">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="text-primary">
                      {model.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{model.name}</CardTitle>
                      <CardDescription>{model.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Badge variant="secondary">{model.technique}</Badge>
                  </div>
                  <Button className="w-full" variant="analytics">
                    Run Model
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricePrediction;