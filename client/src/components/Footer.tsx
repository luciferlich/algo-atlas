import { Instagram, MessageCircle, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black/90 border-t border-primary/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Centered AlgoAtlas Section */}
        <div className="text-center mb-12">
          <h3 className="text-primary font-bold text-xl">AlgoAtlas</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mt-2">
            Unlock Smarter, Faster Trading with AI-Powered Financial Analytics Platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Connect Section */}
          <div className="space-y-4 text-center">
            <h4 className="text-foreground font-semibold">Connect</h4>
            <div className="flex flex-col space-y-3 items-center">
              <a href="#" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-4 w-4" />
                <span className="text-sm">algoatlas_ai</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">Discord Server</span>
              </a>

              <a href="#" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-4 w-4" />
                <span className="text-sm">YouTube</span>
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4 text-center">
            <h4 className="text-foreground font-semibold">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Features
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Models
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Pricing
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Documentation
              </a>
            </div>
          </div>

          {/* Legal Section */}
          <div className="space-y-4 text-center">
            <h4 className="text-foreground font-semibold">Legal</h4>
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Disclaimer
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="mt-12 pt-8 border-t border-primary/10">
          <p className="text-muted-foreground/70 text-[10px] leading-relaxed text-center">
            Disclaimer: AlgoAtlas is a financial analytics and AI-powered platform. We are not a brokerage, investment advisor, or financial institution. The platform provides AI-powered analysis of market events and economic data for informational purposes only. We do not provide financial advice, investment recommendations, or trading signals. The insights and analysis provided through our platform should not be considered as certified financial guidance or professional advice without advice. Users should conduct their own research and consult with qualified financial professionals before making any investment decisions. All platform features and analysis are provided "as is" without any guarantees of accuracy or specific trading outcomes. All sales are final, and we do not offer refunds.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-primary/10">
          <p className="text-center text-muted-foreground text-sm">
            © 2025 AlgoAtlas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;