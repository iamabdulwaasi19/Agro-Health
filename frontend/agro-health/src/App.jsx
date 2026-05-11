// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
//   return (
//     <Router>
//       <div className="min-h-screen">
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
//           <Route path="/settings" element={<SettingsPage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// } 



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-white text-black dark:bg-[#0F172A] dark:text-white transition-colors duration-300">
        <Routes>
          <Route
            path="/"
            element={<LandingPage darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/login"
            element={<LoginPage darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/create-account"
            element={<CreateAccountPage darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/verify-otp"
            element={<VerifyOTP darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPasswordPage darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/reset-password"
            element={<ResetPasswordPage darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/scan"
            element={<ScanUploadPage darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/diagnosis-result"
            element={<DiagnosisResultPage darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/saved"
            element={<SavedResultsPage darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/diagnosis-details"
            element={<DiagnosisDetailPage darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          <Route
            path="/settings"
            element={<SettingsPage darkMode={darkMode} setDarkMode={setDarkMode} />}
          />
        </Routes>
      </div>
    </Router>
  );
}