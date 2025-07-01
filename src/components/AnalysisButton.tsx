
import React from 'react';
import { Button } from '@/components/ui/button';

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
  );
};
