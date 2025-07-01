
import React from 'react';
import { Monitor } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface AppSettingsProps {
  settings: any;
  onSettingsChange: (newSettings: any) => void;
}

export const AppSettings: React.FC<AppSettingsProps> = ({
  settings,
  onSettingsChange
}) => {
  const updateSetting = (key: string, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
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
            onCheckedChange={(checked) => updateSetting('saveResults', checked)}
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
            onCheckedChange={(checked) => updateSetting('soundNotifications', checked)}
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
            onCheckedChange={(checked) => updateSetting('darkMode', checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
};
