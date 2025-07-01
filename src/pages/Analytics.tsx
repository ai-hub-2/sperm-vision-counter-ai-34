
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Eye, Calendar, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  
  // Sample data - in real app this would come from localStorage or API
  const analysisData = [
    { date: '2024-01-01', count: 120, quality: 'excellent', confidence: 92 },
    { date: '2024-01-02', count: 85, quality: 'good', confidence: 88 },
    { date: '2024-01-03', count: 150, quality: 'excellent', confidence: 95 },
    { date: '2024-01-04', count: 67, quality: 'fair', confidence: 82 },
    { date: '2024-01-05', count: 200, quality: 'excellent', confidence: 96 },
    { date: '2024-01-06', count: 95, quality: 'good', confidence: 87 },
    { date: '2024-01-07', count: 180, quality: 'excellent', confidence: 94 }
  ];

  const qualityDistribution = [
    { name: 'ممتاز', value: 45, color: '#1e40af' },
    { name: 'جيد', value: 30, color: '#3b82f6' },
    { name: 'متوسط', value: 20, color: '#60a5fa' },
    { name: 'ضعيف', value: 5, color: '#93c5fd' }
  ];

  const weeklyTrends = [
    { week: 'الأسبوع 1', avgCount: 120, avgConfidence: 88 },
    { week: 'الأسبوع 2', avgCount: 135, avgConfidence: 91 },
    { week: 'الأسبوع 3', avgCount: 110, avgConfidence: 85 },
    { week: 'الأسبوع 4', avgCount: 155, avgConfidence: 93 }
  ];

  const totalAnalyses = analysisData.length;
  const avgSpermCount = Math.round(analysisData.reduce((sum, item) => sum + item.count, 0) / totalAnalyses);
  const avgConfidence = Math.round(analysisData.reduce((sum, item) => sum + item.confidence, 0) / totalAnalyses);
  const excellentQuality = analysisData.filter(item => item.quality === 'excellent').length;

  const exportData = () => {
    const csvContent = [
      'التاريخ,عدد الخلايا,الثقة,الجودة',
      ...analysisData.map(item => `${item.date},${item.count},${item.confidence}%,${item.quality}`)
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'sperm_analysis_data.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">البيانات الرسومية</h1>
                <p className="text-muted-foreground">تحليل وإحصائيات شاملة لنتائج الفحوصات</p>
              </div>
            </div>
            <Button onClick={exportData} variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              تصدير البيانات
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي التحاليل</p>
                  <p className="text-3xl font-bold text-primary">{totalAnalyses}</p>
                </div>
                <Eye className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">متوسط عدد الخلايا</p>
                  <p className="text-3xl font-bold text-primary">{avgSpermCount}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">متوسط الثقة</p>
                  <p className="text-3xl font-bold text-primary">{avgConfidence}%</p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  عالي
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">جودة ممتازة</p>
                  <p className="text-3xl font-bold text-primary">{excellentQuality}</p>
                </div>
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sperm Count Trend */}
          <Card>
            <CardHeader>
              <CardTitle>اتجاه عدد الخلايا المنوية</CardTitle>
              <CardDescription>التغيير في عدد الخلايا عبر الوقت</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analysisData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => `التاريخ: ${value}`}
                    formatter={(value) => [`${value} خلية`, 'عدد الخلايا']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Quality Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>توزيع جودة العينات</CardTitle>
              <CardDescription>نسبة توزيع جودة التحاليل</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={qualityDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {qualityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'النسبة']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Confidence Levels */}
          <Card>
            <CardHeader>
              <CardTitle>مستويات الثقة في التحليل</CardTitle>
              <CardDescription>دقة نتائج الذكاء الاصطناعي</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analysisData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'مستوى الثقة']}
                  />
                  <Bar 
                    dataKey="confidence" 
                    fill="hsl(var(--accent))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Weekly Averages */}
          <Card>
            <CardHeader>
              <CardTitle>المتوسطات الأسبوعية</CardTitle>
              <CardDescription>مقارنة الأداء الأسبوعي</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="avgCount" 
                    fill="hsl(var(--primary))" 
                    name="متوسط العدد"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Analysis Table */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>التحاليل الأخيرة</CardTitle>
            <CardDescription>سجل آخر التحاليل المكتملة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-right p-2">التاريخ</th>
                    <th className="text-right p-2">عدد الخلايا</th>
                    <th className="text-right p-2">مستوى الثقة</th>
                    <th className="text-right p-2">الجودة</th>
                  </tr>
                </thead>
                <tbody>
                  {analysisData.slice(0, 5).map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{item.date}</td>
                      <td className="p-2 font-semibold">{item.count}</td>
                      <td className="p-2">
                        <Badge 
                          variant={item.confidence > 90 ? 'default' : 'secondary'}
                        >
                          {item.confidence}%
                        </Badge>
                      </td>
                      <td className="p-2">
                        <Badge 
                          variant={item.quality === 'excellent' ? 'default' : 'outline'}
                        >
                          {item.quality === 'excellent' ? 'ممتاز' : 
                           item.quality === 'good' ? 'جيد' : 
                           item.quality === 'fair' ? 'متوسط' : 'ضعيف'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
