
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, BarChart3, Settings, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  labelAr: string;
}

const navItems: NavItem[] = [
  {
    href: '/',
    icon: Home,
    label: 'Home',
    labelAr: 'الرئيسية'
  },
  {
    href: '/analysis-results',
    icon: BarChart3,
    label: 'Results',
    labelAr: 'النتائج'
  },
  {
    href: '/analytics',
    icon: TrendingUp,
    label: 'Analytics',
    labelAr: 'التحليلات'
  },
  {
    href: '/settings',
    icon: Settings,
    label: 'Settings',
    labelAr: 'الإعدادات'
  }
];

const BottomNavigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-border shadow-lg">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-200 min-w-[60px]",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 mb-1 transition-transform",
                isActive && "scale-110"
              )} />
              <span className="text-xs font-medium leading-none">
                {item.labelAr}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
