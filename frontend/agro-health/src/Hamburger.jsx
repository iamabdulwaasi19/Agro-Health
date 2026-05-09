import { useState } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export function Hamburger({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. MOBILE HEADER: Only shows on small screens (lg:hidden) */}
      <nav className="lg:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-[#1C8C36] rounded-lg p-1.5">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-[#1C8C36]">AgroHealth</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* 2. DESKTOP NAVBAR: Only shows on large screens (hidden lg:block) */}
      <div className="hidden lg:block">
        <Navbar />
      </div>

      <div className="flex">
        {/* 3. DESKTOP SIDEBAR: Persistent on the left for web mode */}
        <aside className="hidden lg:block w-64 border-r min-h-[calc(100vh-73px)] bg-white sticky top-[73px]">
          <Sidebar />
        </aside>

        {/* 4. MOBILE SIDEBAR OVERLAY: Only appears when Hamburger is toggled */}
        {isMobileMenuOpen && (
          // <div className="absolute top-[60px] right-4 z-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="absolute top-[73px] right-4 z-50 animate-in fade-in zoom-in-95 duration-200">
           
            {/* Sidebar Slide-out */}
            {/* <div className="w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"> */}
            <div className="w-60 h-50 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="flex flex-col p-2">
               <Sidebar closeMenu={() => setIsMobileMenuOpen(false)} />
              </div>
            </div>
          </div>
        )}

        {/* 5. MAIN CONTENT AREA */}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}