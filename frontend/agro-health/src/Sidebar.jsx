import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Camera, Scan, Bookmark, Settings } from 'lucide-react';
import { cn } from './components/ui/utils';

export function Sidebar({ closeMenu }) {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Scan Crop', path: '/scan', icon: Camera },
    { name: 'Saved Results', path: '/saved', icon: Bookmark },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleLinkClick = (path) => {
    navigate(path);
    if (closeMenu) closeMenu();
  };
  
  return (
    <aside className="w-64 border-r bg-white h-[calc(100vh-73px)] sticky top-[73px]">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.path)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-[#1C8C36] text-white'
                  : 'text-[#4B5563] hover:bg-[#F9FAF9]'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}