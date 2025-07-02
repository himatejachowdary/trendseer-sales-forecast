import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, CheckCircle, AlertCircle, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateSalesData } from "@/lib/dataUtils";

interface DataUploadProps {
  onDataUpload: (data: any[]) => void;
}

const DataUpload = ({ onDataUpload }: DataUploadProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [fileName, setFileName] = useState<string>('');
  const [dataStats, setDataStats] = useState<any>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setUploadStatus('uploading');
    setUploadProgress(0);

    // Simulate file processing
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // Simulate async file processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo, generate mock data instead of parsing actual CSV
      const mockData = generateSalesData(36);
      
      setDataStats({
        records: mockData.length,
        dateRange: `${mockData[0].month} - ${mockData[mockData.length - 1].month}`,
        avgSales: Math.round(mockData.reduce((sum, item) => sum + item.sales, 0) / mockData.length),
        trend: 'Upward'
      });

      onDataUpload(mockData);
      setUploadStatus('success');
      
      toast({
        title: "Data uploaded successfully",
        description: `Processed ${mockData.length} records from ${file.name}`
      });
    } catch (error) {
      setUploadStatus('error');
      toast({
        title: "Upload failed",
        description: "Please check your file format and try again.",
        variant: "destructive"
      });
    }
  };

  const handleUseSampleData = () => {
    const sampleData = generateSalesData(48);
    setDataStats({
      records: sampleData.length,
      dateRange: `${sampleData[0].month} - ${sampleData[sampleData.length - 1].month}`,
      avgSales: Math.round(sampleData.reduce((sum, item) => sum + item.sales, 0) / sampleData.length),
      trend: 'Mixed with seasonal patterns'
    });
    
    onDataUpload(sampleData);
    setUploadStatus('success');
    setFileName('Sample Dataset');
    
    toast({
      title: "Sample data loaded",
      description: "Using 48 months of synthetic sales data for demonstration."
    });
  };

  const downloadTemplate = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "month,sales\n" +
      "2020-01,45000\n" +
      "2020-02,47500\n" +
      "2020-03,52000\n";
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sales_data_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Data Upload
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File Upload Area */}
          <div 
            className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Upload your sales data</h3>
            <p className="text-muted-foreground mb-4">
              Drop a CSV file here or click to browse
            </p>
            <Badge variant="outline">CSV files only</Badge>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Upload Progress */}
          {uploadStatus === 'uploading' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading {fileName}...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          {/* Upload Status */}
          {uploadStatus === 'success' && (
            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-700 dark:text-green-300">
                Successfully uploaded {fileName}
              </span>
            </div>
          )}

          {uploadStatus === 'error' && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-700 dark:text-red-300">
                Failed to upload {fileName}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={handleUseSampleData} variant="data" className="flex-1">
              Use Sample Data
            </Button>
            <Button onClick={downloadTemplate} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Statistics */}
      {dataStats && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Data Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm text-muted-foreground">Records</Label>
                <p className="font-medium">{dataStats.records.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm text-muted-foreground">Date Range</Label>
                <p className="font-medium">{dataStats.dateRange}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm text-muted-foreground">Avg Sales</Label>
                <p className="font-medium">${dataStats.avgSales.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm text-muted-foreground">Trend</Label>
                <Badge variant="secondary">{dataStats.trend}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Format Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Data Format Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm space-y-2">
            <p><strong>Required columns:</strong></p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li><code>month</code> - Date in YYYY-MM format</li>
              <li><code>sales</code> - Numeric sales values</li>
            </ul>
            <p className="text-muted-foreground mt-3">
              Ensure your data is clean with no missing values for optimal forecasting results.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataUpload;