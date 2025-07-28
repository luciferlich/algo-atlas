import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Brain } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-6 py-20 pt-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Brain className="h-12 w-12 text-primary mr-4" />
              <h1 className="text-5xl font-bold">About AlgoAtlas</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Advanced financial analytics powered by machine learning and artificial intelligence
            </p>
          </div>

          <div className="space-y-8">
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                AlgoAtlas is dedicated to democratizing advanced financial analytics through cutting-edge 
                machine learning technologies. We empower traders, analysts, and financial institutions 
                with sophisticated models that provide deep insights into market behavior, risk assessment, 
                and portfolio optimization.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-blue-950/40 to-blue-900/20 border-blue-800/30">
              <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our platform leverages state-of-the-art deep learning architectures including LSTM networks, 
                Transformer models, and advanced statistical methods like GARCH and ARIMA. Built on a 
                foundation of Python, TensorFlow, and PyTorch, our models are designed for both accuracy 
                and scalability.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-green-950/40 to-green-900/20 border-green-800/30">
              <h2 className="text-2xl font-semibold mb-4">Why Choose AlgoAtlas</h2>
              <ul className="text-muted-foreground space-y-2">
                <li>• Real-time market analysis with sub-second latency</li>
                <li>• Ensemble models combining multiple ML approaches</li>
                <li>• Risk-adjusted portfolio optimization</li>
                <li>• Anomaly detection for unusual market patterns</li>
                <li>• Comprehensive backtesting and validation</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;