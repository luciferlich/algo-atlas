import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Brain, Layers, Cpu, Network, CheckCircle, ArrowRight, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DeepLearning = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section with Gradient */}
      <section className="relative py-20 overflow-hidden mt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-red-900/30 to-pink-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-orange-500/10 to-red-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 rounded-full px-6 py-2 mb-6">
            <Brain className="h-5 w-5 text-orange-400" />
            <span className="text-orange-300 text-sm font-medium">Deep Learning Technology</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent mb-6">
            Deep Learning
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Unleash the power of neural networks and deep learning architectures to uncover hidden patterns, 
            predict complex market behaviors, and generate superior trading insights.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-950/20 to-red-950/20"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How Deep Learning Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Multi-layered neural networks process complex financial data to discover non-linear relationships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Neural Architecture */}
            <Card className="bg-gradient-to-br from-orange-900/40 to-red-900/40 border-orange-500/30 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Layers className="h-6 w-6 text-orange-400" />
                </div>
                <CardTitle className="text-white">Neural Architecture</CardTitle>
                <CardDescription className="text-gray-300">
                  Multi-layer neural networks with specialized architectures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-400" />
                    <span>LSTM networks for sequences</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-400" />
                    <span>Transformer architectures</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-400" />
                    <span>Attention mechanisms</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Deep Processing */}
            <Card className="bg-gradient-to-br from-red-900/40 to-pink-900/40 border-red-500/30 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Cpu className="h-6 w-6 text-red-400" />
                </div>
                <CardTitle className="text-white">Deep Processing</CardTitle>
                <CardDescription className="text-gray-300">
                  Advanced computation through multiple hidden layers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-red-400" />
                    <span>Feature extraction</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-red-400" />
                    <span>Pattern recognition</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-red-400" />
                    <span>Non-linear modeling</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Neural Predictions */}
            <Card className="bg-gradient-to-br from-pink-900/40 to-rose-900/40 border-pink-500/30 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Network className="h-6 w-6 text-pink-400" />
                </div>
                <CardTitle className="text-white">Neural Predictions</CardTitle>
                <CardDescription className="text-gray-300">
                  Generate sophisticated forecasts and insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-pink-400" />
                    <span>Time series forecasting</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-pink-400" />
                    <span>Volatility prediction</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-pink-400" />
                    <span>Anomaly detection</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Neural Network Types */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-950/10 via-red-950/10 to-pink-950/10"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Neural Network Types</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Specialized architectures optimized for different financial applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layers className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">LSTM Networks</h3>
              <p className="text-gray-400 text-sm">
                Long Short-Term Memory networks for sequential pattern recognition
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Transformers</h3>
              <p className="text-gray-400 text-sm">
                Attention-based models for complex relationship modeling
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Network className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Autoencoders</h3>
              <p className="text-gray-400 text-sm">
                Unsupervised learning for anomaly detection and data compression
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">DeepAR</h3>
              <p className="text-gray-400 text-sm">
                Advanced forecasting with probabilistic predictions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20 bg-gradient-to-b from-orange-950/20 to-red-950/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Performance Metrics</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Deep learning models achieve superior accuracy through advanced neural architectures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                75.2%
              </div>
              <p className="text-gray-300 font-medium">Deep Learning Accuracy</p>
              <p className="text-gray-500 text-sm mt-1">Neural network models</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-2">
                95%
              </div>
              <p className="text-gray-300 font-medium">Pattern Recognition</p>
              <p className="text-gray-500 text-sm mt-1">Complex pattern detection</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-2">
                12x
              </div>
              <p className="text-gray-300 font-medium">Processing Speed</p>
              <p className="text-gray-500 text-sm mt-1">Faster than traditional methods</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Applications */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/10 via-red-950/10 to-pink-950/10"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Key Applications</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Deep learning powers our most advanced financial prediction models
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-orange-400" />
                  <span>Time Series Forecasting</span>
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Predict future price movements with LSTM and Transformer networks
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-400">
                Deep neural networks excel at capturing long-term dependencies and complex temporal patterns 
                in financial time series data, providing superior forecasting accuracy.
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-900/30 to-pink-900/30 border-red-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Network className="h-5 w-5 text-red-400" />
                  <span>Volatility Modeling</span>
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Model complex volatility patterns with advanced neural architectures
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-400">
                Neural networks can capture non-linear volatility clustering and regime changes 
                that traditional models miss, providing more accurate risk assessments.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-red-900/30 to-pink-900/30"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Harness Deep Learning Power
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Experience the cutting-edge of AI-powered financial analysis
          </p>
          <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 mx-auto">
            <span>Explore Deep Learning</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DeepLearning;