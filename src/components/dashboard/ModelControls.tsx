import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Settings2, RefreshCw, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ModelControlsProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
  forecastPeriod: number;
  onForecastPeriodChange: (period: number) => void;
  onParameterChange: (params: any) => void;
}

const ModelControls = ({
  selectedModel,
  onModelChange,
  forecastPeriod,
  onForecastPeriodChange,
  onParameterChange
}: ModelControlsProps) => {
  const { toast } = useToast();
  const [arimaParams, setArimaParams] = useState({
    p: 2,
    d: 1,
    q: 2
  });
  const [seasonalParams, setSeasonalParams] = useState({
    P: 1,
    D: 1,
    Q: 1,
    s: 12
  });

  const handleParameterUpdate = () => {
    const params = {
      arima: arimaParams,
      seasonal: seasonalParams,
      forecastPeriod
    };
    onParameterChange(params);
    toast({
      title: "Parameters Updated",
      description: "Model has been retrained with new parameters."
    });
  };

  const resetToDefaults = () => {
    setArimaParams({ p: 2, d: 1, q: 2 });
    setSeasonalParams({ P: 1, D: 1, Q: 1, s: 12 });
    onForecastPeriodChange(12);
    toast({
      title: "Reset to Defaults",
      description: "All parameters have been reset to default values."
    });
  };

  const models = [
    { value: "ARIMA", label: "ARIMA", description: "AutoRegressive Integrated Moving Average" },
    { value: "SARIMA", label: "SARIMA", description: "Seasonal ARIMA" },
    { value: "AUTO_ARIMA", label: "Auto ARIMA", description: "Automatic parameter selection" }
  ];

  return (
    <div className="space-y-6">
      {/* Model Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            Model Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Forecasting Model</Label>
            <Select value={selectedModel} onValueChange={onModelChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model.value} value={model.value}>
                    <div>
                      <div className="font-medium">{model.label}</div>
                      <div className="text-sm text-muted-foreground">{model.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Forecast Period: {forecastPeriod} months</Label>
            <Slider
              value={[forecastPeriod]}
              onValueChange={([value]) => onForecastPeriodChange(value)}
              min={1}
              max={24}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>1 month</span>
              <span>24 months</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ARIMA Parameters */}
      <Card>
        <CardHeader>
          <CardTitle>ARIMA Parameters (p, d, q)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>p (AR): {arimaParams.p}</Label>
              <Slider
                value={[arimaParams.p]}
                onValueChange={([value]) => setArimaParams(prev => ({ ...prev, p: value }))}
                min={0}
                max={5}
                step={1}
              />
              <Badge variant="outline" className="text-xs">AutoRegression</Badge>
            </div>
            <div className="space-y-2">
              <Label>d (I): {arimaParams.d}</Label>
              <Slider
                value={[arimaParams.d]}
                onValueChange={([value]) => setArimaParams(prev => ({ ...prev, d: value }))}
                min={0}
                max={2}
                step={1}
              />
              <Badge variant="outline" className="text-xs">Differencing</Badge>
            </div>
            <div className="space-y-2">
              <Label>q (MA): {arimaParams.q}</Label>
              <Slider
                value={[arimaParams.q]}
                onValueChange={([value]) => setArimaParams(prev => ({ ...prev, q: value }))}
                min={0}
                max={5}
                step={1}
              />
              <Badge variant="outline" className="text-xs">Moving Average</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seasonal Parameters */}
      {selectedModel === "SARIMA" && (
        <Card>
          <CardHeader>
            <CardTitle>Seasonal Parameters (P, D, Q, s)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>P: {seasonalParams.P}</Label>
                <Slider
                  value={[seasonalParams.P]}
                  onValueChange={([value]) => setSeasonalParams(prev => ({ ...prev, P: value }))}
                  min={0}
                  max={3}
                  step={1}
                />
              </div>
              <div className="space-y-2">
                <Label>D: {seasonalParams.D}</Label>
                <Slider
                  value={[seasonalParams.D]}
                  onValueChange={([value]) => setSeasonalParams(prev => ({ ...prev, D: value }))}
                  min={0}
                  max={2}
                  step={1}
                />
              </div>
              <div className="space-y-2">
                <Label>Q: {seasonalParams.Q}</Label>
                <Slider
                  value={[seasonalParams.Q]}
                  onValueChange={([value]) => setSeasonalParams(prev => ({ ...prev, Q: value }))}
                  min={0}
                  max={3}
                  step={1}
                />
              </div>
              <div className="space-y-2">
                <Label>s (Period): {seasonalParams.s}</Label>
                <Slider
                  value={[seasonalParams.s]}
                  onValueChange={([value]) => setSeasonalParams(prev => ({ ...prev, s: value }))}
                  min={4}
                  max={24}
                  step={1}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button onClick={handleParameterUpdate} className="flex-1" variant="hero">
          <RefreshCw className="h-4 w-4 mr-2" />
          Update Model
        </Button>
        <Button onClick={resetToDefaults} variant="outline">
          <Save className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
};

export default ModelControls;