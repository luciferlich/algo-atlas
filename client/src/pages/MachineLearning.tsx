import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Brain, TrendingUp, Target, BarChart3, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MachineLearning = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section with Gradient */}
      <section className="relative py-20 overflow-hidden mt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-6 py-2 mb-6">
            <Brain className="h-5 w-5 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">Machine Learning Technology</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            Machine Learning
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Harness the power of advanced machine learning algorithms to predict market movements, 
            optimize portfolios, and identify profitable trading opportunities with unprecedented accuracy.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 to-purple-950/20"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How Machine Learning Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our ML algorithms learn from vast amounts of historical data to identify patterns and make intelligent predictions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Data Processing */}
            <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-blue-400" />
                </div>
                <CardTitle className="text-white">Data Processing</CardTitle>
                <CardDescription className="text-gray-300">
                  Collect and process massive datasets from multiple sources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                    <span>Real-time market data ingestion</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                    <span>Feature engineering & selection</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                    <span>Data normalization & cleaning</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Model Training */}
            <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-purple-400" />
                </div>
                <CardTitle className="text-white">Model Training</CardTitle>
                <CardDescription className="text-gray-300">
                  Train sophisticated algorithms on historical patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-purple-400" />
                    <span>Random Forest algorithms</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-purple-400" />
                    <span>Support Vector Machines</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-purple-400" />
                    <span>Ensemble methods</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Prediction */}
            <Card className="bg-gradient-to-br from-cyan-900/40 to-teal-900/40 border-cyan-500/30 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-cyan-400" />
                </div>
                <CardTitle className="text-white">Prediction</CardTitle>
                <CardDescription className="text-gray-300">
                  Generate accurate forecasts and actionable insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400" />
                    <span>Price movement predictions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400" />
                    <span>Confidence intervals</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400" />
                    <span>Risk assessments</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/10 via-purple-950/10 to-cyan-950/10"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Key Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Advanced machine learning capabilities designed for financial markets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Pattern Recognition</h3>
              <p className="text-gray-400 text-sm">
                Identify complex market patterns and trends automatically
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Precision Targeting</h3>
              <p className="text-gray-400 text-sm">
                Achieve high accuracy in price predictions and market timing
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Adaptive Learning</h3>
              <p className="text-gray-400 text-sm">
                Continuously improve predictions with new market data
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Real-time Analysis</h3>
              <p className="text-gray-400 text-sm">
                Process and analyze market data in real-time for immediate insights
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20 bg-gradient-to-b from-blue-950/20 to-purple-950/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Performance Metrics</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our machine learning models deliver consistent, measurable results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                78.4%
              </div>
              <p className="text-gray-300 font-medium">Average Accuracy</p>
              <p className="text-gray-500 text-sm mt-1">Across all ML models</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                2.3s
              </div>
              <p className="text-gray-300 font-medium">Processing Time</p>
              <p className="text-gray-500 text-sm mt-1">Per prediction cycle</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent mb-2">
                99.2%
              </div>
              <p className="text-gray-300 font-medium">Uptime</p>
              <p className="text-gray-500 text-sm mt-1">System availability</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-cyan-900/30"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience Machine Learning Power?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start leveraging advanced ML algorithms for your trading strategies today
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 mx-auto">
            <span>Get Started</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MachineLearning;