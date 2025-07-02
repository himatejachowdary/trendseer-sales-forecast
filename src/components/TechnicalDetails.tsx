import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code2, Database, LineChart, Settings } from "lucide-react";

const TechnicalDetails = () => {
  const methodologies = [
    {
      icon: <LineChart className="w-6 h-6" />,
      title: "ARIMA Modeling",
      description: "AutoRegressive Integrated Moving Average for time series forecasting",
      details: [
        "Seasonal decomposition analysis",
        "Stationarity testing and differencing", 
        "Parameter optimization (p,d,q)",
        "Residual analysis and validation"
      ]
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Processing",
      description: "Comprehensive data preparation and feature engineering",
      details: [
        "Historical sales data cleaning",
        "Missing value imputation",
        "Outlier detection and treatment",
        "Feature scaling and normalization"
      ]
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Implementation",
      description: "Python-based solution with industry-standard libraries",
      details: [
        "Pandas for data manipulation",
        "Scikit-learn for ML pipeline",
        "Matplotlib for visualization",
        "Statsmodels for time series"
      ]
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Model Validation",
      description: "Rigorous testing and performance evaluation",
      details: [
        "Cross-validation techniques",
        "Error metrics (MAE, RMSE, MAPE)",
        "Backtesting on historical data",
        "Confidence interval analysis"
      ]
    }
  ];

  const technologies = [
    { name: "Python", category: "Language", color: "bg-blue-500" },
    { name: "ARIMA", category: "Algorithm", color: "bg-green-500" },
    { name: "Pandas", category: "Data Processing", color: "bg-purple-500" },
    { name: "Matplotlib", category: "Visualization", color: "bg-orange-500" },
    { name: "Scikit-learn", category: "ML Framework", color: "bg-red-500" },
    { name: "Statsmodels", category: "Statistics", color: "bg-teal-500" },
    { name: "NumPy", category: "Computing", color: "bg-indigo-500" },
    { name: "Jupyter", category: "Development", color: "bg-yellow-500" }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-secondary bg-clip-text text-transparent">
            Technical Implementation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Deep dive into the methodologies, algorithms, and technologies used to build 
            this high-performance sales forecasting system.
          </p>
        </div>

        {/* Methodology cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {methodologies.map((method, index) => (
            <Card key={index} className="bg-gradient-card shadow-card hover:shadow-primary transition-smooth">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {method.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {method.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technologies section */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-2">Technology Stack</CardTitle>
            <CardDescription>
              A comprehensive suite of tools and libraries for robust time series analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {technologies.map((tech, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-smooth">
                  <div className={`w-3 h-3 ${tech.color} rounded-full mx-auto mb-2`} />
                  <h4 className="font-semibold text-sm">{tech.name}</h4>
                  <p className="text-xs text-muted-foreground">{tech.category}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button variant="data" className="px-8">
                View Source Code
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TechnicalDetails;