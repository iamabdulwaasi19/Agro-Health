import { useState } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { Sidebar } from './Sidebar';

export function Hamburger({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Navbar */}
      <nav className="lg:hidden flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center gap-2">
          <Leaf className="text-[#1C8C36]" />
          <span className="font-bold text-[#1C8C36]">AgroHealth</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <div className="flex">
        {/* Desktop Sidebar (Hidden on mobile) */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Dark Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50" 
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Sidebar Content */}
            <div className="relative w-64 bg-white h-full shadow-xl">
               <Sidebar closeMenu={() => setIsMobileMenuOpen(false)} />
            </div>
          </div>
        )}

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}