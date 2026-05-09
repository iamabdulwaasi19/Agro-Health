// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import { LandingPage } from './components/LandingPage';
// import { LoginPage } from './components/LoginPage';
// import { CreateAccountPage } from './components/CreateAccountPage';
// import { ForgotPasswordPage } from './components/ForgotPasswordPage';
// import { ResetPasswordPage } from './components/ResetPasswordPage';
// import { Dashboard } from './components/Dashboard';
// import { ScanUploadPage } from './components/ScanUploadPage';
// import { DiagnosisResultPage } from './components/DiagnosisResultPage';
// import { SavedResultsPage } from './components/SavedResultsPage';
// import { DiagnosisDetailPage } from './components/DiagnosisDetailPage';
// import { SettingsPage } from './components/SettingsPage';
// import { VerifyOTP } from './components/VerifyOTP';

// export default function App() {
//   // Initialize theme from localStorage or default to light
//   const [isDarkMode, setIsDarkMode] = useState(() => {
//     return localStorage.getItem('theme') === 'dark';
//   });

//   // Apply the 'dark' class to the root HTML element whenever theme changes
//   useEffect(() => {
//     if (isDarkMode) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   }, [isDarkMode]);

//   const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

//   return (
//     <Router>
//       {/* 
//          The 'bg-white dark:bg-[#121212]' ensures the background 
//          changes globally as you navigate.
//       */}
//       <div className="min-h-screen bg-white dark:bg-[#121212] text-black dark:text-red-500 transition-colors duration-300">
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/create-account" element={<CreateAccountPage />} />
//           <Route path="/verify-otp" element={<VerifyOTP />} />
//           <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//           <Route path="/reset-password" element={<ResetPasswordPage />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/scan" element={<ScanUploadPage />} />
//           <Route path="/diagnosis-result" element={<DiagnosisResultPage />} />
//           <Route path="/saved" element={<SavedResultsPage />} />
//           <Route path="/diagnosis-details" element={<DiagnosisDetailPage />} />
          
//           {/* Pass the theme state and toggle function to SettingsPage */}
//           <Route 
//             path="/settings" 
//             element={
//               <SettingsPage 
//                 isDarkMode={isDarkMode} 
//                 toggleDarkMode={toggleDarkMode} 
//               />
//             } 
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { CreateAccountPage } from './components/CreateAccountPage';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';
import { ResetPasswordPage } from './components/ResetPasswordPage';
import { Dashboard } from './components/Dashboard';
import { ScanUploadPage } from './components/ScanUploadPage';
import { DiagnosisResultPage } from './components/DiagnosisResultPage';
import { SavedResultsPage } from './components/SavedResultsPage';
import { DiagnosisDetailPage } from './components/DiagnosisDetailPage';
import { SettingsPage } from './components/SettingsPage';
import { VerifyOTP } from './components/VerifyOTP';


export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scan" element={<ScanUploadPage />} />
          <Route path="/diagnosis-result" element={<DiagnosisResultPage />} />
          <Route path="/saved" element={<SavedResultsPage />} />
          <Route path="/diagnosis-details" element={<DiagnosisDetailPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </Router>
  );
} 