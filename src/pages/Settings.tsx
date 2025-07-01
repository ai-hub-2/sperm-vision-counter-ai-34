
import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, RotateCcw, Camera, Monitor, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

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
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <SettingsIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">الإعدادات</h1>
              <p className="text-muted-foreground">تخصيص إعدادات التطبيق والتحليل</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid gap-6">
          {/* Analysis Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                إعدادات التحليل
              </CardTitle>
              <CardDescription>
                تخصيص عملية التحليل والكشف
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">التحليل التلقائي</h4>
                  <p className="text-sm text-muted-foreground">
                    بدء التحليل تلقائياً عند رفع الملف
                  </p>
                </div>
                <Switch
                  checked={settings.autoAnalysis}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, autoAnalysis: checked }))
                  }
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">جودة التحليل</h4>
                  <span className="text-sm text-muted-foreground">
                    {settings.analysisQuality[0]}%
                  </span>
                </div>
                <Slider
                  value={settings.analysisQuality}
                  onValueChange={(value) => 
                    setSettings(prev => ({ ...prev, analysisQuality: value }))
                  }
                  max={100}
                  min={50}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  جودة أعلى = دقة أكبر لكن وقت أطول
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">معدل الإطارات للفيديو</h4>
                  <span className="text-sm text-muted-foreground">
                    {settings.videoFps[0]} fps
                  </span>
                </div>
                <Slider
                  value={settings.videoFps}
                  onValueChange={(value) => 
                    setSettings(prev => ({ ...prev, videoFps: value }))
                  }
                  max={60}
                  min={15}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">الحد الأقصى لحجم الملف</h4>
                  <span className="text-sm text-muted-foreground">
                    {settings.maxFileSize[0]} MB
                  </span>
                </div>
                <Slider
                  value={settings.maxFileSize}
                  onValueChange={(value) => 
                    setSettings(prev => ({ ...prev, maxFileSize: value }))
                  }
                  max={500}
                  min={10}
                  step={10}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* App Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                إعدادات التطبيق
              </CardTitle>
              <CardDescription>
                تخصيص واجهة المستخدم والتفضيلات العامة
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">حفظ النتائج تلقائياً</h4>
                  <p className="text-sm text-muted-foreground">
                    حفظ نتائج التحليل في المتصفح
                  </p>
                </div>
                <Switch
                  checked={settings.saveResults}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, saveResults: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">الإشعارات الصوتية</h4>
                  <p className="text-sm text-muted-foreground">
                    تشغيل صوت عند انتهاء التحليل
                  </p>
                </div>
                <Switch
                  checked={settings.soundNotifications}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, soundNotifications: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">الوضع المظلم</h4>
                  <p className="text-sm text-muted-foreground">
                    تفعيل الثيم المظلم للتطبيق
                  </p>
                </div>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, darkMode: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                الإشعارات والتنبيهات
              </CardTitle>
              <CardDescription>
                إدارة التنبيهات والإشعارات
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">معلومات مهمة</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• هذا التطبيق مخصص للأغراض البحثية فقط</li>
                  <li>• النتائج لا تحل محل الفحص الطبي المتخصص</li>
                  <li>• يتم حفظ البيانات محلياً في متصفحك فقط</li>
                  <li>• لا نقوم بجمع أو مشاركة بياناتك الشخصية</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button onClick={handleSave} className="flex-1" size="lg">
              <Save className="w-4 h-4 mr-2" />
              حفظ الإعدادات
            </Button>
            <Button onClick={handleReset} variant="outline" className="flex-1" size="lg">
              <RotateCcw className="w-4 h-4 mr-2" />
              إعادة تعيين
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
