import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Mail className="h-12 w-12 text-primary mr-4" />
              <h1 className="text-5xl font-bold">Contact Us</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Get in touch with our team for partnerships, support, or inquiries
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <Input placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <Input placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <Input placeholder="Your Company" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea placeholder="Tell us about your project or inquiry..." rows={6} />
                  </div>
                  <Button className="w-full" variant="hero">
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="p-8 bg-gradient-to-br from-blue-950/40 to-blue-900/20 border-blue-800/30">
                <Mail className="h-8 w-8 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground">contact@algoatlas.com</p>
                <p className="text-muted-foreground">support@algoatlas.com</p>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-green-950/40 to-green-900/20 border-green-800/30">
                <Phone className="h-8 w-8 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Phone</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
                <p className="text-muted-foreground">+1 (555) 987-6543</p>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-yellow-950/40 to-amber-900/20 border-yellow-800/30">
                <MapPin className="h-8 w-8 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Address</h3>
                <p className="text-muted-foreground">
                  123 Financial District<br />
                  New York, NY 10004<br />
                  United States
                </p>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-red-950/40 to-red-900/20 border-red-800/30">
                <Clock className="h-8 w-8 text-red-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
                <p className="text-muted-foreground">
                  Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                  Saturday: 10:00 AM - 4:00 PM EST<br />
                  Sunday: Closed
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;