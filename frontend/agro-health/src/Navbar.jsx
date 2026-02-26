import { Leaf, Settings, User } from 'lucide-react';
import { Button } from './components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from './components/ui/avatar';

export function Navbar({ onNavigate }) {
  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate('dashboard')}
        >
          <div className="bg-[#1C8C36] rounded-lg p-2">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <span className="font-semibold text-[#1C8C36]">AgroHealth</span>
        </div>

        {/* Action Items */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('settings')}
          >
            <Settings className="h-5 w-5 text-[#4B5563]" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarFallback className="bg-[#A3E635] text-[#1C8C36]">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onNavigate('settings')}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('landing')}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}