import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3, Target, Zap } from "lucide-react";
import arimaImage from "@/assets/arima-visualization.jpg";
import pythonImage from "@/assets/python-code.jpg";

const ProjectOverview = () => {
  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Time Series Analysis",
      description: "Advanced ARIMA modeling for accurate trend prediction and seasonal pattern recognition."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Data Visualization",
      description: "Interactive charts and graphs using Matplotlib to visualize forecasting results and insights."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "High Accuracy",
      description: "Achieved superior forecasting accuracy by incorporating market fluctuations and seasonal variations."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Scalable Solution",
      description: "Built with Python and Pandas for efficient processing of large historical sales datasets."
    }
  ];

  const metrics = [
    { label: "Forecast Accuracy", value: "94.2%", color: "text-primary" },
    { label: "Data Points Analyzed", value: "10K+", color: "text-secondary" },
    { label: "Seasonal Patterns", value: "12", color: "text-primary" },
    { label: "Processing Time", value: "<2min", color: "text-secondary" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Project Overview
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive approach to sales forecasting using cutting-edge time series analysis 
            and machine learning techniques to deliver actionable business insights.
          </p>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <Card key={index} className="text-center bg-gradient-card shadow-card hover:shadow-primary transition-smooth">
              <CardContent className="pt-6">
                <div className={`text-3xl font-bold mb-2 ${metric.color}`}>
                  {metric.value}
                </div>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Visual showcase */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gradient-card shadow-card hover:shadow-primary transition-smooth overflow-hidden">
            <CardContent className="p-0">
              <img 
                src={arimaImage} 
                alt="ARIMA Forecasting Visualization" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">ARIMA Model Results</h3>
                <p className="text-muted-foreground">
                  Visualizing forecast accuracy and trend analysis with seasonal decomposition.
                </p>
                <Badge className="mt-3 bg-primary/10 text-primary border-primary/20">
                  Time Series Analysis
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card hover:shadow-primary transition-smooth overflow-hidden">
            <CardContent className="p-0">
              <img 
                src={pythonImage} 
                alt="Python Implementation" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Python Implementation</h3>
                <p className="text-muted-foreground">
                  Clean, efficient code using Pandas, Scikit-learn, and statistical libraries.
                </p>
                <Badge className="mt-3 bg-secondary/10 text-secondary border-secondary/20">
                  Machine Learning
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gradient-card shadow-card hover:shadow-primary transition-smooth">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit text-primary">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectOverview;