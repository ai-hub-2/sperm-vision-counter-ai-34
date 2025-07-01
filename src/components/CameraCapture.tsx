
import React, { useRef, useState, useCallback } from 'react';
import { Camera, Video, Square, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  onClose: () => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [mode, setMode] = useState<'photo' | 'video'>('photo');
  const [cameraActive, setCameraActive] = useState(false);
  
  const { toast } = useToast();

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: mode === 'video'
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      mediaStreamRef.current = stream;
      setCameraActive(true);
    } catch (error) {
      toast({
        title: "خطأ في الكاميرا",
        description: "لا يمكن الوصول للكاميرا. تأكد من السماح بالوصول.",
        variant: "destructive"
      });
    }
  }, [mode, toast]);

  const stopCamera = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
        onCapture(file);
        stopCamera();
        onClose();
        toast({
          title: "تم التقاط الصورة",
          description: "سيتم تحليل الصورة الآن"
        });
      }
    }, 'image/jpeg', 0.9);
  }, [onCapture, onClose, stopCamera, toast]);

  const startRecording = useCallback(() => {
    if (!mediaStreamRef.current) return;
    
    const mediaRecorder = new MediaRecorder(mediaStreamRef.current);
    mediaRecorderRef.current = mediaRecorder;
    
    const chunks: Blob[] = [];
    setRecordedChunks(chunks);
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };
    
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const file = new File([blob], `recording-${Date.now()}.webm`, { type: 'video/webm' });
      onCapture(file);
      stopCamera();
      onClose();
      toast({
        title: "تم تسجيل الفيديو",
        description: "سيتم تحليل الفيديو الآن"
      });
    };
    
    mediaRecorder.start();
    setIsRecording(true);
  }, [onCapture, onClose, stopCamera, toast]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  React.useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>التقاط من الكاميرا</span>
          <div className="flex gap-2">
            <Button
              variant={mode === 'photo' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMode('photo')}
            >
              <Camera className="w-4 h-4 mr-1" />
              صورة
            </Button>
            <Button
              variant={mode === 'video' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMode('video')}
            >
              <Video className="w-4 h-4 mr-1" />
              فيديو
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-auto max-h-96 object-contain"
            playsInline
            muted
          />
          <canvas ref={canvasRef} className="hidden" />
          
          {!cameraActive && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button onClick={startCamera} size="lg">
                <Camera className="w-6 h-6 mr-2" />
                تشغيل الكاميرا
              </Button>
            </div>
          )}
        </div>
        
        {cameraActive && (
          <div className="flex justify-center gap-4">
            {mode === 'photo' ? (
              <Button onClick={capturePhoto} size="lg" className="px-8">
                <Camera className="w-5 h-5 mr-2" />
                التقاط صورة
              </Button>
            ) : (
              <>
                {!isRecording ? (
                  <Button onClick={startRecording} size="lg" className="px-8">
                    <Video className="w-5 h-5 mr-2" />
                    بدء التسجيل
                  </Button>
                ) : (
                  <Button onClick={stopRecording} size="lg" variant="destructive" className="px-8">
                    <Square className="w-5 h-5 mr-2" />
                    إيقاف التسجيل
                  </Button>
                )}
              </>
            )}
            
            <Button onClick={onClose} variant="outline" size="lg">
              إلغاء
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
