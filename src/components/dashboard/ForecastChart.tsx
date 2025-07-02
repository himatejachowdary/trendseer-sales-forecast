import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area,
  ComposedChart
} from 'recharts';

interface ForecastChartProps {
  historicalData: any[];
  forecastData: any[];
  showConfidenceInterval?: boolean;
  focusOnForecast?: boolean;
}

const ForecastChart = ({ 
  historicalData, 
  forecastData, 
  showConfidenceInterval = true,
  focusOnForecast = false 
}: ForecastChartProps) => {
  // Combine historical and forecast data
  const combinedData = [
    ...historicalData.map(item => ({
      ...item,
      type: 'historical'
    })),
    ...forecastData.map(item => ({
      ...item,
      type: 'forecast'
    }))
  ];

  const formatTooltip = (value: any, name: string) => {
    if (name === 'sales') return [`$${value?.toLocaleString()}`, 'Actual Sales'];
    if (name === 'forecast') return [`$${value?.toLocaleString()}`, 'Forecast'];
    if (name === 'upperBound') return [`$${value?.toLocaleString()}`, 'Upper Bound'];
    if (name === 'lowerBound') return [`$${value?.toLocaleString()}`, 'Lower Bound'];
    return [value, name];
  };

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={combinedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="month" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip 
            formatter={formatTooltip}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
          />
          <Legend />
          
          {/* Confidence Interval Area */}
          {showConfidenceInterval && (
            <Area
              dataKey="upperBound"
              stroke="none"
              fill="hsl(var(--primary-glow) / 0.1)"
              fillOpacity={0.3}
              name="Confidence Interval"
            />
          )}
          
          {/* Historical Sales Line */}
          <Line
            type="monotone"
            dataKey="sales"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
            connectNulls={false}
            name="Historical Sales"
          />
          
          {/* Forecast Line */}
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="hsl(var(--secondary))"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 4 }}
            connectNulls={false}
            name="Forecast"
          />
          
          {/* Confidence Bounds */}
          {showConfidenceInterval && (
            <>
              <Line
                type="monotone"
                dataKey="upperBound"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={1}
                strokeDasharray="2 2"
                dot={false}
                connectNulls={false}
                name="Upper Bound"
              />
              <Line
                type="monotone"
                dataKey="lowerBound"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={1}
                strokeDasharray="2 2"
                dot={false}
                connectNulls={false}
                name="Lower Bound"
              />
            </>
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;