import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FileText, Code, Database, Settings } from "lucide-react";

const Documentation = () => {
  const sections = [
    {
      icon: Code,
      title: "API Reference",
      description: "Complete API documentation with examples and endpoints",
      items: ["Authentication", "Price Prediction API", "Risk Analysis API", "Data Streaming"],
      color: "text-blue-400",
      gradient: "from-blue-950/40 to-blue-900/20",
      border: "border-blue-800/30"
    },
    {
      icon: Database,
      title: "Data Models", 
      description: "Schema and data structure documentation",
      items: ["Market Data", "Portfolio Schema", "Risk Metrics", "Model Outputs"],
      color: "text-green-400",
      gradient: "from-green-950/40 to-green-900/20",
      border: "border-green-800/30"
    },
    {
      icon: Settings,
      title: "Configuration",
      description: "Setup and configuration guides",
      items: ["Environment Setup", "Model Parameters", "API Keys", "Deployment"],
      color: "text-yellow-400", 
      gradient: "from-yellow-950/40 to-amber-900/20",
      border: "border-yellow-800/30"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-6 py-20 pt-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <FileText className="h-12 w-12 text-primary mr-4" />
              <h1 className="text-5xl font-bold">Documentation</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Complete technical documentation and integration guides
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Card key={index} className={`p-8 bg-gradient-to-br ${section.gradient} ${section.border} card-hover`}>
                  <Icon className={`h-8 w-8 ${section.color} mb-4`} />
                  <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                  <p className="text-muted-foreground mb-4">{section.description}</p>
                  <div className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{item}</span>
                        <Badge variant="secondary" className="text-xs">
                          Guide
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <h2 className="text-2xl font-semibold mb-6">Quick Start Guide</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">1</div>
                  <div>
                    <h4 className="font-medium">Account Setup</h4>
                    <p className="text-sm text-muted-foreground">Create your AlgoAtlas account and get API credentials</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">2</div>
                  <div>
                    <h4 className="font-medium">Integration</h4>
                    <p className="text-sm text-muted-foreground">Install our SDK and configure your environment</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">3</div>
                  <div>
                    <h4 className="font-medium">First API Call</h4>
                    <p className="text-sm text-muted-foreground">Make your first prediction request</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-red-950/40 to-red-900/20 border-red-800/30">
              <h2 className="text-2xl font-semibold mb-6">Support Resources</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Community Forum</span>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>GitHub Repository</span>
                  <Badge variant="secondary">Open Source</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Video Tutorials</span>
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Technical Support</span>
                  <Badge variant="secondary">24/7</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Documentation;