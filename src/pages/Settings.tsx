
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SettingsHeader } from '@/components/settings/SettingsHeader';
import { AnalysisSettings } from '@/components/settings/AnalysisSettings';
import { AppSettings } from '@/components/settings/AppSettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { ActionButtons } from '@/components/settings/ActionButtons';

const Settings = () => {
  const [settings, setSettings] = useState({
    autoAnalysis: true,
    saveResults: true,
    soundNotifications: false,
    analysisQuality: [85],
    videoFps: [30],
    maxFileSize: [100],
    darkMode: false,
    language: 'ar'
  });

  const { toast } = useToast();

  const handleSave = () => {
    localStorage.setItem('spermAnalysisSettings', JSON.stringify(settings));
    toast({
      title: "تم حفظ الإعدادات",
      description: "تم حفظ جميع الإعدادات بنجاح"
    });
  };

  const handleReset = () => {
    const defaultSettings = {
      autoAnalysis: true,
      saveResults: true,
      soundNotifications: false,
      analysisQuality: [85],
      videoFps: [30],
      maxFileSize: [100],
      darkMode: false,
      language: 'ar'
    };
    setSettings(defaultSettings);
    toast({
      title: "تم إعادة تعيين الإعدادات",
      description: "تم استعادة الإعدادات الافتراضية"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SettingsHeader />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid gap-6">
          <AnalysisSettings 
            settings={settings} 
            onSettingsChange={setSettings} 
          />
          
          <AppSettings 
            settings={settings} 
            onSettingsChange={setSettings} 
          />
          
          <NotificationSettings />

          <ActionButtons 
            onSave={handleSave} 
            onReset={handleReset} 
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
