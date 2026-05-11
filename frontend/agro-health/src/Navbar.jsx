// import { useNavigate } from 'react-router-dom';
// import { Leaf, Settings, User } from 'lucide-react';
// import { Button } from './components/ui/button';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from './components/ui/dropdown-menu';
// import { Avatar, AvatarFallback } from './components/ui/avatar';

// export function Navbar() {
//   const navigate = useNavigate();
//   return (
//     <nav className="border-b bg-white sticky top-0 z-50">
//       <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
//         {/* Logo Section */}
//         <div
//           className="flex items-center gap-2 cursor-pointer"
//           onClick={() => navigate('/dashboard')}
//         >
//           <div className="bg-[#1C8C36] rounded-lg p-2">
//             <Leaf className="h-6 w-6 text-white" />
//           </div>
//           <span className="font-semibold text-[#1C8C36]">AgroHealth</span>
//         </div>

//         {/* Action Items */}
//         <div className="flex items-center gap-4 cursor-pointer">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="relative h-10 w-10 rounded-full">
//                 <Avatar>
//                   <AvatarFallback className="bg-[#A3E635] text-[#1C8C36]">
//                     <User className="h-5 w-5" />
//                   </AvatarFallback>
//                 </Avatar>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg text-black">
//               <DropdownMenuLabel>User</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={() => navigate('/settings')} className="hover:bg-[#1C8C36] cursor-pointer">
//                 Profile
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => navigate('/login')} className="hover:bg-[#1C8C36] cursor-pointer">
//                 Logout
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </nav>
//   );
// }

import { useNavigate } from "react-router-dom";
import { Leaf, Moon, Sun, User } from "lucide-react";
import { Button } from "./components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./components/ui/avatar";

export function Navbar(darkMode, setDarkMode) {
  const navigate = useNavigate();

  return (
    <nav className="border-b bg-white dark:bg-[#111827] dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <div className="bg-[#1C8C36] rounded-lg p-2">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <span className="font-semibold text-[#1C8C36]">AgroHealth</span>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          {/* DARK MODE TOGGLE */}
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-black dark:text-white" />
            )}
          </button>

          {/* USER DROPDOWN */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar>
                  <AvatarFallback className="bg-[#A3E635] text-[#1C8C36]">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="bg-white dark:bg-[#1F2937] border border-gray-200 dark:border-gray-700 shadow-lg text-black dark:text-white"
            >
              <DropdownMenuLabel>User</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => navigate("/settings")}
                className="hover:bg-[#1C8C36] cursor-pointer"
              >
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => navigate("/login")}
                className="hover:bg-[#1C8C36] cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
