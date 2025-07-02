import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-forecast.jpg";

const HeroSection = () => {
  const technologies = ["Python", "ARIMA", "Pandas", "Matplotlib", "Scikit-learn"];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent leading-tight">
            Sales Forecasting
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-foreground">
            Using Time Series Analysis
          </h2>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            Built a comprehensive sales forecasting model using Python and ARIMA methodology. 
            Analyzed historical sales data to predict future trends with high accuracy, 
            incorporating seasonal patterns and market fluctuations.
          </p>
          
          {/* Technology badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {technologies.map((tech) => (
              <Badge 
                key={tech} 
                className="px-4 py-2 text-sm font-medium bg-gradient-card border-border shadow-card hover:shadow-primary transition-smooth"
              >
                {tech}
              </Badge>
            ))}
          </div>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-lg px-8 py-3">
              View Analysis
            </Button>
            <Button variant="data" size="lg" className="text-lg px-8 py-3">
              Explore Model
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-pulse delay-1000" />
    </section>
  );
};

export default HeroSection;