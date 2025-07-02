// Mock data generation utilities for sales forecasting

export interface SalesData {
  month: string;
  sales: number;
  type?: 'historical' | 'forecast';
}

export interface ForecastData {
  month: string;
  forecast: number;
  upperBound: number;
  lowerBound: number;
  type: 'forecast';
}

// Generate realistic historical sales data with seasonal patterns
export const generateSalesData = (months: number): SalesData[] => {
  const data: SalesData[] = [];
  const baseDate = new Date('2021-01-01');
  const baseSales = 35000;
  
  for (let i = 0; i < months; i++) {
    const currentDate = new Date(baseDate);
    currentDate.setMonth(baseDate.getMonth() + i);
    
    // Create seasonal and trend patterns
    const monthIndex = currentDate.getMonth();
    const yearProgress = i / 12;
    
    // Seasonal multiplier (higher in Q4, lower in Q1)
    const seasonal = 1 + Math.sin((monthIndex - 2) * Math.PI / 6) * 0.15;
    
    // Growth trend (5% annually)
    const trend = 1 + (yearProgress * 0.05);
    
    // Random variation
    const randomVariation = 1 + (Math.random() - 0.5) * 0.2;
    
    // Holiday spikes (November, December)
    const holidayBoost = (monthIndex === 10 || monthIndex === 11) ? 1.3 : 1;
    
    const sales = Math.round(baseSales * seasonal * trend * randomVariation * holidayBoost);
    
    data.push({
      month: currentDate.toISOString().slice(0, 7),
      sales: sales
    });
  }
  
  return data;
};

// Generate forecast data with confidence intervals
export const generateForecast = (
  months: number, 
  params?: any
): ForecastData[] => {
  const data: ForecastData[] = [];
  const baseDate = new Date();
  baseDate.setMonth(baseDate.getMonth() + 1); // Start from next month
  
  // Base forecast value (using recent trends)
  const baseForecast = 45000;
  
  for (let i = 0; i < months; i++) {
    const currentDate = new Date(baseDate);
    currentDate.setMonth(baseDate.getMonth() + i);
    
    const monthIndex = currentDate.getMonth();
    const yearProgress = i / 12;
    
    // Apply ARIMA-like patterns
    const trend = 1 + (yearProgress * 0.06); // Slightly higher growth in forecast
    const seasonal = 1 + Math.sin((monthIndex - 2) * Math.PI / 6) * 0.18;
    
    // Holiday patterns
    const holidayBoost = (monthIndex === 10 || monthIndex === 11) ? 1.25 : 1;
    
    // Uncertainty increases with time
    const uncertainty = 0.05 + (i * 0.01);
    
    const forecastValue = Math.round(baseForecast * trend * seasonal * holidayBoost);
    const margin = forecastValue * uncertainty;
    
    data.push({
      month: currentDate.toISOString().slice(0, 7),
      forecast: forecastValue,
      upperBound: Math.round(forecastValue + margin),
      lowerBound: Math.round(forecastValue - margin),
      type: 'forecast'
    });
  }
  
  return data;
};

// Calculate model accuracy metrics
export const calculateAccuracy = (
  actual: number[], 
  predicted: number[]
): {
  mae: number;
  rmse: number;
  mape: number;
  r2: number;
} => {
  const n = Math.min(actual.length, predicted.length);
  
  // Mean Absolute Error
  const mae = actual.slice(0, n).reduce((sum, val, i) => 
    sum + Math.abs(val - predicted[i]), 0) / n;
  
  // Root Mean Square Error
  const rmse = Math.sqrt(
    actual.slice(0, n).reduce((sum, val, i) => 
      sum + Math.pow(val - predicted[i], 2), 0) / n
  );
  
  // Mean Absolute Percentage Error
  const mape = actual.slice(0, n).reduce((sum, val, i) => 
    sum + Math.abs((val - predicted[i]) / val), 0) / n * 100;
  
  // R-squared
  const actualMean = actual.slice(0, n).reduce((sum, val) => sum + val, 0) / n;
  const totalSumSquares = actual.slice(0, n).reduce((sum, val) => 
    sum + Math.pow(val - actualMean, 2), 0);
  const residualSumSquares = actual.slice(0, n).reduce((sum, val, i) => 
    sum + Math.pow(val - predicted[i], 2), 0);
  const r2 = 1 - (residualSumSquares / totalSumSquares);
  
  return { mae, rmse, mape, r2 };
};

// Validate uploaded data format
export const validateSalesData = (data: any[]): {
  valid: boolean;
  errors: string[];
  stats?: {
    records: number;
    dateRange: string;
    avgSales: number;
  };
} => {
  const errors: string[] = [];
  
  if (!Array.isArray(data) || data.length === 0) {
    errors.push("Data must be a non-empty array");
    return { valid: false, errors };
  }
  
  // Check required columns
  const requiredColumns = ['month', 'sales'];
  const firstRow = data[0];
  
  requiredColumns.forEach(col => {
    if (!(col in firstRow)) {
      errors.push(`Missing required column: ${col}`);
    }
  });
  
  // Validate data types and values
  data.forEach((row, index) => {
    if (typeof row.sales !== 'number' || row.sales < 0) {
      errors.push(`Invalid sales value at row ${index + 1}`);
    }
    
    if (typeof row.month !== 'string' || !/^\d{4}-\d{2}$/.test(row.month)) {
      errors.push(`Invalid month format at row ${index + 1} (expected YYYY-MM)`);
    }
  });
  
  if (errors.length > 0) {
    return { valid: false, errors };
  }
  
  // Calculate stats
  const avgSales = data.reduce((sum, row) => sum + row.sales, 0) / data.length;
  const dateRange = `${data[0].month} - ${data[data.length - 1].month}`;
  
  return {
    valid: true,
    errors: [],
    stats: {
      records: data.length,
      dateRange,
      avgSales: Math.round(avgSales)
    }
  };
};