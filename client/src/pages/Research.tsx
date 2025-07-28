import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, TrendingUp, BarChart3, Brain } from "lucide-react";

const Research = () => {
  const publications = [
    {
      title: "Deep Learning Approaches to Financial Time Series Prediction",
      authors: "AlgoAtlas Research Team",
      year: "2024",
      category: "Machine Learning",
      description: "Comprehensive analysis of LSTM and Transformer architectures for financial forecasting.",
      color: "text-blue-400"
    },
    {
      title: "Advanced Portfolio Risk Management Using ML",
      authors: "Dr. Sarah Chen, Michael Rodriguez",
      year: "2024", 
      category: "Risk Management",
      description: "Novel approaches to Value-at-Risk calculation using ensemble learning methods.",
      color: "text-green-400"
    },
    {
      title: "Real-time Anomaly Detection in Financial Markets",
      authors: "Research Division",
      year: "2023",
      category: "Anomaly Detection", 
      description: "Implementation of autoencoder networks for identifying market irregularities.",
      color: "text-yellow-400"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="h-12 w-12 text-primary mr-4" />
              <h1 className="text-5xl font-bold">Research</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Pioneering research in financial machine learning and quantitative analysis
            </p>
          </div>

          <div className="grid gap-8 mb-12">
            {publications.map((pub, index) => (
              <Card key={index} className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 card-hover">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold">{pub.title}</h3>
                  <Badge variant="secondary" className={`${pub.color} border border-opacity-30`}>
                    {pub.category}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">{pub.description}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{pub.authors}</span>
                  <span>{pub.year}</span>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-gradient-to-br from-blue-950/40 to-blue-900/20 border-blue-800/30">
              <TrendingUp className="h-8 w-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Active Research Areas</h3>
              <ul className="text-muted-foreground space-y-2">
                <li>• Reinforcement Learning for Trading</li>
                <li>• Graph Neural Networks for Market Analysis</li>
                <li>• Explainable AI in Finance</li>
                <li>• Quantum Computing Applications</li>
              </ul>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-green-950/40 to-green-900/20 border-green-800/30">
              <Brain className="h-8 w-8 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Collaborations</h3>
              <ul className="text-muted-foreground space-y-2">
                <li>• MIT Computer Science and Artificial Intelligence Laboratory</li>
                <li>• Stanford Financial Mathematics Program</li>
                <li>• European Centre for Advanced Research</li>
                <li>• Quantitative Finance Research Institute</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;