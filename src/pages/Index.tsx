
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '@/components/AppHeader';
import { FeatureCards } from '@/components/FeatureCards';
import { UploadSection } from '@/components/UploadSection';
import { MediaPreview } from '@/components/MediaPreview';
import { TipsCard } from '@/components/TipsCard';
import { AppFooter } from '@/components/AppFooter';
import { CameraCapture } from '@/components/CameraCapture';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const simulateAnalysis = async (file: File) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
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
      toast({
        title: "تم تحديد الملف",
        description: "يمكنك الآن بدء التحليل"
      });
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
      
      navigate('/analysis-results', {
        state: { file: selectedFile, result }
      });
      
      toast({
        title: "تم إكمال التحليل",
        description: "تم تحليل العينة بنجاح، اطلع على النتائج"
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
      <CameraCapture
        onCapture={handleCameraCapture}
        onClose={() => setShowCamera(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
        <div className="animate-slide-up">
          <FeatureCards />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <UploadSection
              selectedFile={selectedFile}
              isAnalyzing={isAnalyzing}
              onFileSelect={handleFileSelect}
              onCameraClick={() => setShowCamera(true)}
              onAnalyze={handleAnalyze}
            />
          </div>

          <div className="space-y-6">
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <MediaPreview file={selectedFile} isAnalyzing={isAnalyzing} />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <TipsCard />
            </div>
          </div>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <AppFooter />
        </div>
      </div>
    </div>
  );
};

export default Index;
