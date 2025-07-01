
import React, { useState } from 'react';
import { Microscope, Brain, Zap, Camera, Settings, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUpload } from '@/components/FileUpload';
import { MediaPreview } from '@/components/MediaPreview';
import { CameraCapture } from '@/components/CameraCapture';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, Link } from 'react-router-dom';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const simulateAnalysis = async (file: File) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const result = {
      sperm_count: Math.floor(Math.random() * 200) + 10,
      confidence: 85 + Math.random() * 10,
      analysis_time: 2.5 + Math.random() * 2,
      image_quality: ['excellent', 'good', 'fair', 'poor'][Math.floor(Math.random() * 4)] as 'excellent' | 'good' | 'fair' | 'poor'
    };
    
    return result;
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      setShowCamera(false);
    }
  };

  const handleCameraCapture = (file: File) => {
    setSelectedFile(file);
    setShowCamera(false);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast({
        title: "لا يوجد ملف محدد",
        description: "يرجى اختيار ملف فيديو أو صورة للتحليل.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const result = await simulateAnalysis(selectedFile);
      
      // Navigate to analysis results page
      navigate('/analysis-results', {
        state: { file: selectedFile, result }
      });
      
      toast({
        title: "بدء التحليل",
        description: "تم بدء عملية التحليل بنجاح"
      });
    } catch (error) {
      toast({
        title: "فشل التحليل",
        description: "حدث خطأ أثناء التحليل. يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
      setIsAnalyzing(false);
    }
  };

  if (showCamera) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <CameraCapture
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Microscope className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">SpermVision AI</h1>
                <p className="text-muted-foreground">تحليل متقدم للحيوانات المنوية بالذكاء الاصطناعي</p>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center gap-2">
              <Link to="/analytics">
                <Button variant="ghost" size="sm" className="gap-2">
                  <TrendingUp className="w-4 h-4" />
                  البيانات الرسومية
                </Button>
              </Link>
              <Link to="/settings">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Settings className="w-4 h-4" />
                  الإعدادات
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader>
              <Brain className="w-10 h-10 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">كشف بالذكاء الاصطناعي</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                نموذج YOLOv8 المتقدم لكشف وعد الحيوانات المنوية بدقة عالية
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-accent/20 hover:border-accent/40 transition-colors">
            <CardHeader>
              <Zap className="w-10 h-10 text-accent mx-auto mb-2" />
              <CardTitle className="text-lg">تحليل في الوقت الفعلي</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                معالجة سريعة للفيديوهات والصور مع نتائج فورية ودرجات ثقة
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader>
              <Microscope className="w-10 h-10 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">جودة طبية</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                أدوات تحليل احترافية مصممة للبحث والتطبيقات الطبية
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Main Analysis Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload and Controls */}
          <div className="space-y-6">
            <FileUpload
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              isProcessing={isAnalyzing}
            />
            
            {/* Analysis Button */}
            {selectedFile && (
              <div className="flex justify-center">
                <Button
                  variant="medical"
                  size="lg"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="px-8"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      جاري التحليل...
                    </>
                  ) : (
                    'بدء التحليل'
                  )}
                </Button>
              </div>
            )}

            {/* Camera Button - Only show when no file is selected */}
            {!selectedFile && (
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowCamera(true)}
                  className="px-8 gap-2"
                >
                  <Camera className="w-5 h-5" />
                  استخدام الكاميرا
                </Button>
              </div>
            )}
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            <MediaPreview file={selectedFile} isAnalyzing={isAnalyzing} />
            
            {/* Quick Tips Card */}
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="text-lg">نصائح للحصول على أفضل النتائج</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• استخدم إضاءة جيدة وواضحة</li>
                  <li>• تأكد من وضوح الصورة أو الفيديو</li>
                  <li>• تجنب الحركة المفرطة عند التسجيل</li>
                  <li>• استخدم تكبير مناسب للعينة</li>
                  <li>• اختر الجزء الأكثر وضوحاً في العينة</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-muted-foreground bg-muted/30 rounded-lg p-6">
          <p className="font-medium mb-2">
            هذا التطبيق يستخدم الذكاء الاصطناعي لأغراض البحث فقط
          </p>
          <p>
            النتائج لا يجب أن تحل محل التقييم الطبي المتخصص. 
            جميع البيانات محفوظة محلياً ولا يتم مشاركتها.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
