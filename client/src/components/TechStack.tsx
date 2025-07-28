import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const technologies = [
  {
    category: "Machine Learning",
    items: ["TensorFlow", "PyTorch", "Scikit-learn", "XGBoost", "LightGBM"],
    color: "from-primary/20 to-primary/5"
  },
  {
    category: "Deep Learning", 
    items: ["LSTM", "GRU", "Transformers", "Attention Mechanisms", "CNNs"],
    color: "from-accent/20 to-accent/5"
  },
  {
    category: "Statistical Models",
    items: ["ARIMA", "GARCH", "VAR", "Kalman Filters", "State Space Models"],
    color: "from-success/20 to-success/5"
  },
  {
    category: "Data Processing",
    items: ["Pandas", "NumPy", "Apache Spark", "Dask", "Feature Engineering"],
    color: "from-warning/20 to-warning/5"
  }
];

const TechStack = () => {
  return (
    <section className="py-20 px-6 bg-gradient-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Powered by <span className="bg-gradient-primary bg-clip-text text-transparent">
              Cutting-Edge Technology
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built on industry-leading frameworks and libraries for maximum performance and reliability.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech) => (
            <Card 
              key={tech.category}
              className={`p-6 bg-gradient-to-br ${tech.color} border-primary/20 hover:border-primary/40 transition-all duration-300`}
            >
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{tech.category}</h3>
                <div className="space-y-2">
                  {tech.items.map((item) => (
                    <Badge 
                      key={item}
                      variant="secondary"
                      className="block w-full text-center bg-secondary/30 hover:bg-secondary/50 transition-colors"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;