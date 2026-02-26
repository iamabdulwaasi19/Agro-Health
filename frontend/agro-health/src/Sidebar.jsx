import { Home, Camera, Bookmark, Settings } from 'lucide-react';
import { cn } from './components/ui/utils';

export function Sidebar({ currentPage, onNavigate }) {
  const menuItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'scan', label: 'Scan', icon: Camera },
    { id: 'saved', label: 'Saved Results', icon: Bookmark },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden lg:block w-64 border-r bg-white h-[calc(100vh-73px)] sticky top-[73px]">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-[#1C8C36] text-white'
                  : 'text-[#4B5563] hover:bg-[#F9FAF9]'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}