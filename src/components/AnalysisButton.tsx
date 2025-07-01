
import React from 'react';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

interface AnalysisButtonProps {
  isAnalyzing: boolean;
  onClick: () => void;
}

export const AnalysisButton: React.FC<AnalysisButtonProps> = ({ 
  isAnalyzing, 
  onClick 
}) => {
  return (
    <Button
      variant="medical"
      size="lg"
      onClick={onClick}
      disabled={isAnalyzing}
      className="px-8 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {isAnalyzing ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          جاري التحليل...
        </>
      ) : (
        <>
          <Zap className="w-5 h-5 mr-2" />
          بدء التحليل
        </>
      )}
    </Button>
  );
};
