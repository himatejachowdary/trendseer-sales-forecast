import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Target, BarChart } from "lucide-react";

interface MetricsPanelProps {
  data: any[];
  forecast: any[];
}

const MetricsPanel = ({ data, forecast }: MetricsPanelProps) => {
  // Calculate metrics from data
  const currentSales = data[data.length - 1]?.sales || 0;
  const previousSales = data[data.length - 2]?.sales || 0;
  const growth = ((currentSales - previousSales) / previousSales) * 100;
  
  const avgSales = data.reduce((sum, item) => sum + (item.sales || 0), 0) / data.length;
  const forecastAvg = forecast.reduce((sum, item) => sum + (item.forecast || 0), 0) / forecast.length;
  const forecastGrowth = ((forecastAvg - avgSales) / avgSales) * 100;
  
  const totalForecast = forecast.reduce((sum, item) => sum + (item.forecast || 0), 0);
  const accuracy = 92.4; // Mock accuracy percentage

  const metrics = [
    {
      title: "Current Sales",
      value: `$${currentSales.toLocaleString()}`,
      change: `${growth >= 0 ? '+' : ''}${growth.toFixed(1)}%`,
      trend: growth >= 0 ? 'up' : 'down',
      icon: BarChart,
      color: growth >= 0 ? 'text-green-600' : 'text-red-600'
    },
    {
      title: "Forecast Accuracy",
      value: `${accuracy.toFixed(1)}%`,
      change: "+2.1%",
      trend: 'up',
      icon: Target,
      color: 'text-green-600'
    },
    {
      title: "Predicted Growth",
      value: `${forecastGrowth >= 0 ? '+' : ''}${forecastGrowth.toFixed(1)}%`,
      change: "Next 12 months",
      trend: forecastGrowth >= 0 ? 'up' : 'down',
      icon: TrendingUp,
      color: forecastGrowth >= 0 ? 'text-green-600' : 'text-red-600'
    },
    {
      title: "Total Forecast",
      value: `$${totalForecast.toLocaleString()}`,
      change: "12 month total",
      trend: 'up',
      icon: TrendingUp,
      color: 'text-blue-600'
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index} className="border border-border shadow-card hover:shadow-primary transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{metric.value}</div>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant={metric.trend === 'up' ? 'default' : 'secondary'}
                  className={`text-xs ${metric.color}`}
                >
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {metric.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MetricsPanel;