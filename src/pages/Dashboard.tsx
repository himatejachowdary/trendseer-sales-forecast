import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ForecastChart from "@/components/dashboard/ForecastChart";
import MetricsPanel from "@/components/dashboard/MetricsPanel";
import ModelControls from "@/components/dashboard/ModelControls";
import DataUpload from "@/components/dashboard/DataUpload";
import { generateSalesData, generateForecast } from "@/lib/dataUtils";
import { BarChart3, TrendingUp, Upload, Settings } from "lucide-react";

const Dashboard = () => {
  const [selectedModel, setSelectedModel] = useState("ARIMA");
  const [forecastPeriod, setForecastPeriod] = useState(12);
  const [data, setData] = useState(() => generateSalesData(36));
  const [forecast, setForecast] = useState(() => generateForecast(12));

  const handleParameterChange = (params: any) => {
    // Regenerate forecast with new parameters
    const newForecast = generateForecast(forecastPeriod, params);
    setForecast(newForecast);
  };

  const handleDataUpload = (newData: any[]) => {
    setData(newData);
    // Regenerate forecast based on new data
    const newForecast = generateForecast(forecastPeriod);
    setForecast(newForecast);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Sales Forecasting Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Interactive ARIMA model analysis and prediction
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-gradient-primary">
                {selectedModel} Model
              </Badge>
              <Badge variant="outline">
                {forecastPeriod} Month Forecast
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="forecast" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Forecast
            </TabsTrigger>
            <TabsTrigger value="controls" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Controls
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Metrics Overview */}
            <MetricsPanel data={data} forecast={forecast} />
            
            {/* Main Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Sales Trend Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ForecastChart 
                  historicalData={data} 
                  forecastData={forecast}
                  showConfidenceInterval={true}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecast" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Forecast Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <ForecastChart 
                    historicalData={data.slice(-12)} 
                    forecastData={forecast}
                    showConfidenceInterval={true}
                    focusOnForecast={true}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Model Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Mean Absolute Error:</span>
                      <span className="font-medium">±2,450</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">RMSE:</span>
                      <span className="font-medium">3,120</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">MAPE:</span>
                      <span className="font-medium">8.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">R²:</span>
                      <span className="font-medium">0.924</span>
                    </div>
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    Export Forecast Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="controls">
            <ModelControls 
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
              forecastPeriod={forecastPeriod}
              onForecastPeriodChange={setForecastPeriod}
              onParameterChange={handleParameterChange}
            />
          </TabsContent>

          <TabsContent value="upload">
            <DataUpload onDataUpload={handleDataUpload} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;