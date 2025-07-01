
import React from 'react';
import { Microscope } from 'lucide-react';

export const AppHeader: React.FC = () => {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Microscope className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">SpermVision AI</h1>
              <p className="text-muted-foreground">تحليل متقدم للحيوانات المنوية بالذكاء الاصطناعي</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
