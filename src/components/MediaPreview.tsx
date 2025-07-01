
import React, { useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MediaPreviewProps {
  file: File | null;
  isAnalyzing: boolean;
}

export const MediaPreview: React.FC<MediaPreviewProps> = ({ file, isAnalyzing }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [mediaUrl, setMediaUrl] = React.useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setMediaUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setMediaUrl(null);
    }
  }, [file]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const restart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  if (!file || !mediaUrl) {
    return (
      <Card className="border-dashed border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="text-muted-foreground flex items-center gap-2">
            <Eye className="w-5 h-5" />
            معاينة الوسائط
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Eye className="w-8 h-8 text-primary/50" />
          </div>
          <p className="text-muted-foreground text-center">
            لم يتم اختيار أي وسائط للمعاينة
          </p>
          <p className="text-sm text-muted-foreground text-center">
            اختر ملف أو استخدم الكاميرا لبدء التحليل
          </p>
        </CardContent>
      </Card>
    );
  }

  const isVideo = file.type.startsWith('video/');

  return (
    <Card className={`transition-all duration-300 ${isAnalyzing ? 'animate-pulse-glow border-primary/50' : 'border-primary/20'}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            معاينة الوسائط
          </span>
          {isVideo && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={togglePlay}
                disabled={isAnalyzing}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={restart}
                disabled={isAnalyzing}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative bg-black rounded-lg overflow-hidden group">
          {isVideo ? (
            <video
              ref={videoRef}
              src={mediaUrl}
              className="w-full h-auto max-h-96 object-contain"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              controls={false}
            />
          ) : (
            <img
              src={mediaUrl}
              alt="Preview"
              className="w-full h-auto max-h-96 object-contain"
            />
          )}
          
          {/* Analysis Overlay */}
          {isAnalyzing && (
            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-sm">
              <div className="bg-background/95 rounded-lg p-6 flex flex-col items-center gap-4 shadow-lg">
                <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                <div className="text-center">
                  <p className="font-medium">جاري تحليل الإطارات</p>
                  <p className="text-sm text-muted-foreground">يرجى الانتظار...</p>
                </div>
              </div>
            </div>
          )}

          {/* Hover overlay for better UX */}
          {!isAnalyzing && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
          )}
        </div>
        
        {/* File Info */}
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex justify-between items-center text-sm">
            <div className="space-y-1">
              <p className="font-medium truncate">{file.name}</p>
              <p className="text-muted-foreground">
                {isVideo ? 'فيديو' : 'صورة'} • {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground">جاهز للتحليل</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
