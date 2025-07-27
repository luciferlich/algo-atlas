import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Search, GitBranch } from "lucide-react";

const AnomalyDetection = () => {
  const models = [
    {
      name: "Autoencoders",
      description: "Neural networks for unsupervised anomaly detection",
      icon: <Shield className="h-8 w-8" />,
      accuracy: "89%",
      technique: "Deep Learning"
    },
    {
      name: "Isolation Forest",
      description: "Tree-based algorithm for outlier detection",
      icon: <Search className="h-8 w-8" />,
      accuracy: "86%",
      technique: "Ensemble"
    },
    {
      name: "HDBSCAN",
      description: "Hierarchical density-based clustering for anomalies",
      icon: <GitBranch className="h-8 w-8" />,
      accuracy: "91%",
      technique: "Clustering"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Anomaly Detection
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge algorithms for detecting market anomalies and outliers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary">{model.technique}</Badge>
                    <div className="text-sm text-muted-foreground">
                      Accuracy: <span className="text-primary font-semibold">{model.accuracy}</span>
                    </div>
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

export default AnomalyDetection;