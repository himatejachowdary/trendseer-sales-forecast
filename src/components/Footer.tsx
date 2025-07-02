import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, label: "GitHub", href: "#" },
    { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", href: "#" },
    { icon: <Mail className="w-5 h-5" />, label: "Email", href: "mailto:contact@example.com" }
  ];

  return (
    <footer className="bg-gradient-to-br from-background to-muted/30 border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Project info */}
          <div>
            <h3 className="text-xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">
              Sales Forecasting Model
            </h3>
            <p className="text-muted-foreground mb-4">
              Advanced time series analysis using ARIMA methodology for accurate sales predictions.
            </p>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Data Science Project
            </Badge>
          </div>

          {/* Quick links */}
          <div className="text-center">
            <h4 className="font-semibold mb-4">Explore</h4>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Analysis
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <ExternalLink className="w-4 h-4 mr-2" />
                Model Documentation
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <ExternalLink className="w-4 h-4 mr-2" />
                Source Code
              </Button>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex justify-center md:justify-end gap-3 mb-4">
              {socialLinks.map((social, index) => (
                <Button key={index} variant="outline" size="icon" asChild>
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </Button>
              ))}
            </div>
            <Button variant="data" className="w-full md:w-auto">
              Get in Touch
            </Button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Sales Forecasting Project. Built with Python, ARIMA, and advanced data science techniques.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;