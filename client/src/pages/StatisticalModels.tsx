import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BarChart3, TrendingUp, Calculator, LineChart, CheckCircle, ArrowRight, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const StatisticalModels = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section with Gradient */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-emerald-900/30 to-teal-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-lime-500/10 via-green-500/10 to-emerald-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-6 py-2 mb-6">
            <BarChart3 className="h-5 w-5 text-green-400" />
            <span className="text-green-300 text-sm font-medium">Statistical Modeling Technology</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent mb-6">
            Statistical Models
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Leverage time-tested statistical methodologies and mathematical models to provide robust, 
            interpretable financial analysis with proven theoretical foundations.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/20 to-emerald-950/20"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How Statistical Models Work</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Mathematical models based on proven statistical principles and econometric theory
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mathematical Foundation */}
            <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Calculator className="h-6 w-6 text-green-400" />
                </div>
                <CardTitle className="text-white">Mathematical Foundation</CardTitle>
                <CardDescription className="text-gray-300">
                  Built on rigorous mathematical and statistical principles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Probability theory</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Econometric models</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Time series analysis</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Model Estimation */}
            <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/30 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-emerald-400" />
                </div>
                <CardTitle className="text-white">Model Estimation</CardTitle>
                <CardDescription className="text-gray-300">
                  Parameter estimation using maximum likelihood methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <span>ARIMA modeling</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <span>GARCH volatility models</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <span>Linear regression analysis</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Statistical Inference */}
            <Card className="bg-gradient-to-br from-teal-900/40 to-cyan-900/40 border-teal-500/30 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-teal-400" />
                </div>
                <CardTitle className="text-white">Statistical Inference</CardTitle>
                <CardDescription className="text-gray-300">
                  Confidence intervals and hypothesis testing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-teal-400" />
                    <span>Confidence intervals</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-teal-400" />
                    <span>Significance testing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-teal-400" />
                    <span>Model diagnostics</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Model Types */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-950/10 via-emerald-950/10 to-teal-950/10"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Statistical Model Types</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive suite of proven statistical and econometric models
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">ARIMA Models</h3>
              <p className="text-gray-400 text-sm">
                AutoRegressive Integrated Moving Average for time series forecasting
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">GARCH Models</h3>
              <p className="text-gray-400 text-sm">
                Generalized AutoRegressive Conditional Heteroskedasticity for volatility
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <LineChart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Linear Regression</h3>
              <p className="text-gray-400 text-sm">
                Multiple regression analysis for factor-based modeling
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-lime-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">VAR Models</h3>
              <p className="text-gray-400 text-sm">
                Vector AutoRegression for multivariate time series analysis
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Advantages */}
      <section className="py-20 bg-gradient-to-b from-green-950/20 to-emerald-950/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Key Advantages</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Why statistical models remain fundamental to quantitative finance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-green-400" />
                  <span>Theoretical Foundation</span>
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Built on decades of proven mathematical and statistical theory
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-400">
                Statistical models provide transparent, interpretable results with well-understood 
                mathematical properties and established theoretical foundations.
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border-emerald-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                  <span>Interpretability</span>
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Clear understanding of model parameters and their economic meaning
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-400">
                Every parameter has a clear interpretation, confidence intervals provide uncertainty 
                quantification, and model assumptions can be tested and validated.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Performance Metrics</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Consistent, reliable performance with transparent uncertainty measures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                81.6%
              </div>
              <p className="text-gray-300 font-medium">Statistical Accuracy</p>
              <p className="text-gray-500 text-sm mt-1">Traditional models</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
                99.8%
              </div>
              <p className="text-gray-300 font-medium">Model Stability</p>
              <p className="text-gray-500 text-sm mt-1">Consistent performance</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                0.1s
              </div>
              <p className="text-gray-300 font-medium">Computation Time</p>
              <p className="text-gray-500 text-sm mt-1">Lightning fast results</p>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/10 via-emerald-950/10 to-teal-950/10"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Key Applications</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Where statistical models excel in financial analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-center">Risk Management</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400 text-center">
                VaR calculations, stress testing, and portfolio risk assessment with statistical confidence intervals
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border-emerald-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-center">Economic Modeling</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400 text-center">
                Macroeconomic forecasting, interest rate modeling, and fundamental factor analysis
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-900/20 to-cyan-900/20 border-teal-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-center">Regulatory Compliance</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400 text-center">
                Basel III compliance, stress testing, and transparent model validation for regulators
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-emerald-900/30 to-teal-900/30"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Trust in Proven Statistical Methods
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Build on decades of mathematical foundation with transparent, interpretable models
          </p>
          <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 mx-auto">
            <span>Explore Statistical Models</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StatisticalModels;