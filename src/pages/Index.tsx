import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ModelShowcase from "@/components/ModelShowcase";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ModelShowcase />
      <Footer />
    </div>
  );
};

export default Index;
