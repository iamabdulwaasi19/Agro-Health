import { useState } from "react";
import { Menu, X, Leaf, Sun, Moon } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export function Hamburger({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300">
      {/* 1. MOBILE HEADER */}
      <nav className="lg:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-50 transition-colors duration-300">
        {/* LEFT */}
        <div className="flex items-center gap-2">
          <div className="bg-[#1C8C36] rounded-lg p-1.5">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-[#1C8C36]">AgroHealth</span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* DARK MODE TOGGLE */}
          {/* <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-yellow-400" />
            )}
          </button> */}

          {/* HAMBURGER */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* 2. DESKTOP NAVBAR */}
      <div className="hidden lg:block">
        <Navbar />
      </div>

      <div className="flex">
        {/* 3. DESKTOP SIDEBAR */}
        <aside className="hidden lg:block w-64 border-r bg-white sticky top-[73px] min-h-[calc(100vh-73px)] transition-colors duration-300">
          <Sidebar />
        </aside>

        {/* 4. MOBILE SIDEBAR OVERLAY: Only appears when Hamburger is toggled */}
        {isMobileMenuOpen && (
          <div className="absolute top-[73px] right-4 z-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-60 bg-white rounded-xl shadow-2xl border border-gray-100  overflow-hidden">
              <div className="flex flex-col p-2">
                <Sidebar closeMenu={() => setIsMobileMenuOpen(false)} />
              </div>
            </div>
          </div>
        )}

        {/* 5. MAIN CONTENT AREA */}
        <main className="flex-1 overflow-hidden bg-white text-slate-900 transition-colors duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
