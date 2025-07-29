import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Zap, Clock, Activity, Globe, CheckCircle, ArrowRight, Gauge, Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RealTimeAnalytics = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section with Gradient */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/30 via-amber-900/30 to-orange-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 via-amber-500/10 to-orange-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-6 py-2 mb-6">
            <Zap className="h-5 w-5 text-yellow-400" />
            <span className="text-yellow-300 text-sm font-medium">Real-time Analytics Technology</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent mb-6">
            Real-time Analytics
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Process massive streams of financial data in real-time, enabling instant decision-making, 
            immediate risk assessment, and lightning-fast response to market opportunities.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-950/20 to-amber-950/20"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How Real-time Analytics Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Stream processing architecture that handles millions of data points per second
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Data Ingestion */}
            <Card className="bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border-yellow-500/30 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-yellow-400" />
                </div>
                <CardTitle className="text-white">Data Ingestion</CardTitle>
                <CardDescription className="text-gray-300">
                  High-throughput streaming data collection from multiple sources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400" />
                    <span>Market data feeds</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400" />
                    <span>News sentiment streams</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400" />
                    <span>Social media signals</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Stream Processing */}
            <Card className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 border-amber-500/30 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-amber-400" />
                </div>
                <CardTitle className="text-white">Stream Processing</CardTitle>
                <CardDescription className="text-gray-300">
                  Real-time computation and analysis of streaming data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span>Event stream processing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span>Complex event detection</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span>Pattern matching</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Real-time Insights */}
            <Card className="bg-gradient-to-br from-orange-900/40 to-red-900/40 border-orange-500/30 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-orange-400" />
                </div>
                <CardTitle className="text-white">Real-time Insights</CardTitle>
                <CardDescription className="text-gray-300">
                  Instant alerts, predictions, and actionable intelligence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-400" />
                    <span>Instant alerts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-400" />
                    <span>Live predictions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-400" />
                    <span>Dynamic dashboards</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-950/10 via-amber-950/10 to-orange-950/10"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Key Capabilities</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Ultra-low latency processing for time-sensitive trading decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Sub-millisecond</h3>
              <p className="text-gray-400 text-sm">
                Ultra-low latency processing for high-frequency trading
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gauge className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">High Throughput</h3>
              <p className="text-gray-400 text-sm">
                Process millions of events per second without degradation
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Global Scale</h3>
              <p className="text-gray-400 text-sm">
                Distributed processing across multiple regions and exchanges
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Live Monitoring</h3>
              <p className="text-gray-400 text-sm">
                Continuous monitoring and alerting for market conditions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20 bg-gradient-to-b from-yellow-950/20 to-amber-950/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Performance Metrics</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Industry-leading performance for mission-critical trading applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent mb-2">
                85.3%
              </div>
              <p className="text-gray-300 font-medium">Real-time Efficiency</p>
              <p className="text-gray-500 text-sm mt-1">Processing accuracy</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-2">
                &lt;1ms
              </div>
              <p className="text-gray-300 font-medium">Latency</p>
              <p className="text-gray-500 text-sm mt-1">End-to-end processing</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                10M+
              </div>
              <p className="text-gray-300 font-medium">Events/Second</p>
              <p className="text-gray-500 text-sm mt-1">Peak processing capacity</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-950/10 via-amber-950/10 to-orange-950/10"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Real-time Use Cases</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Critical applications that require instant data processing and response
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-yellow-900/30 to-amber-900/30 border-yellow-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  <span>Algorithmic Trading</span>
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Execute trades based on real-time market conditions and signals
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-400">
                React to market movements within microseconds, capture arbitrage opportunities, 
                and implement high-frequency trading strategies with minimal latency.
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-amber-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-amber-400" />
                  <span>Risk Management</span>
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Monitor portfolio risk and trigger alerts in real-time
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-400">
                Continuously assess portfolio exposure, detect limit breaches instantly, 
                and automatically trigger risk mitigation measures before losses occur.
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-orange-400" />
                  <span>Market Surveillance</span>
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Detect market manipulation and unusual trading patterns
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-400">
                Monitor trading activity across all markets, identify suspicious patterns, 
                and ensure regulatory compliance with real-time surveillance systems.
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 border-yellow-600/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-yellow-400" />
                  <span>News Analytics</span>
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Process breaking news and social sentiment in real-time
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-400">
                Analyze news feeds, social media sentiment, and economic announcements 
                instantly to capture market-moving information before competitors.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Architecture Highlights */}
      <section className="py-20 bg-gradient-to-b from-amber-950/20 to-orange-950/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Architecture Highlights</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Built for speed, scale, and reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-4">Distributed Processing</h3>
              <p className="text-gray-400">
                Horizontally scalable architecture that processes data across multiple nodes 
                for maximum throughput and fault tolerance.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-4">In-Memory Computing</h3>
              <p className="text-gray-400">
                Keep critical data structures in memory for sub-millisecond access times 
                and eliminate disk I/O bottlenecks.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-4">Edge Processing</h3>
              <p className="text-gray-400">
                Deploy processing nodes close to data sources to minimize network latency 
                and maximize processing speed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/30 via-amber-900/30 to-orange-900/30"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Experience Real-time Power
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the fastest traders who never miss a market opportunity
          </p>
          <button className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 mx-auto">
            <span>Start Real-time Trading</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RealTimeAnalytics;