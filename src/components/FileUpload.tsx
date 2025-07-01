
import React, { useCallback, useState } from 'react';
import { Upload, FileVideo, Image, X, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  isProcessing: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  selectedFile,
  isProcessing
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      
      const files = Array.from(e.dataTransfer.files);
      const validFile = files.find(file => 
        file.type.startsWith('video/') || file.type.startsWith('image/')
      );
      
      if (validFile) {
        onFileSelect(validFile);
      }
    },
    [onFileSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const clearFile = () => {
    onFileSelect(null);
  };

  return (
    <Card className="p-8">
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300",
          isDragOver ? "border-primary bg-primary/5 scale-[1.02]" : "border-border",
          selectedFile ? "border-accent bg-accent/5" : "",
          isProcessing && "opacity-50 pointer-events-none"
        )}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
      >
        {selectedFile ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-accent/20 border-2 border-accent/30">
              {selectedFile.type.startsWith('video/') ? (
                <FileVideo className="w-8 h-8 text-accent" />
              ) : (
                <Image className="w-8 h-8 text-accent" />
              )}
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-1">{selectedFile.name}</h3>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • 
                {selectedFile.type.startsWith('video/') ? ' فيديو' : ' صورة'}
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearFile}
                disabled={isProcessing}
                className="gap-2 max-w-fit mx-auto"
              >
                <X className="w-4 h-4" />
                إزالة الملف
              </Button>
              <p className="text-xs text-muted-foreground">
                يمكنك الآن بدء التحليل
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary/10 border-2 border-primary/20">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                رفع الوسائط للتحليل
              </h3>
              <p className="text-muted-foreground mb-4">
                اسحب وأفلت ملف الفيديو أو الصورة هنا، أو اضغط للتصفح
              </p>
              <div className="flex flex-wrap gap-2 justify-center text-sm text-muted-foreground">
                <span className="bg-muted px-2 py-1 rounded">MP4</span>
                <span className="bg-muted px-2 py-1 rounded">AVI</span>
                <span className="bg-muted px-2 py-1 rounded">JPG</span>
                <span className="bg-muted px-2 py-1 rounded">PNG</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <input
                type="file"
                accept="video/*,image/*"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="medical" size="lg" className="cursor-pointer px-8">
                  <Upload className="w-5 h-5 mr-2" />
                  اختيار ملف
                </Button>
              </label>
              
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  أو استخدم الكاميرا لالتقاط عينة مباشرة
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Drag overlay */}
        {isDragOver && (
          <div className="absolute inset-0 bg-primary/10 border-2 border-primary border-dashed rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Upload className="w-12 h-12 text-primary mx-auto mb-2" />
              <p className="text-primary font-medium">أفلت الملف هنا</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
