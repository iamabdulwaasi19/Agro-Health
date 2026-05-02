// import { useState } from 'react';
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

// export default function App() {
//   const [currentPage, setCurrentPage] = useState('landing');
//   const [currentDiagnosis, setCurrentDiagnosis] = useState(null);
//   const [currentImage, setCurrentImage] = useState(null);

//   const handleNavigate = (page, data = null, imageUrl = null) => {
//     if (data) setCurrentDiagnosis(data);
//     if (imageUrl) setCurrentImage(imageUrl);
//     setCurrentPage(page);
//     window.scrollTo(0, 0);
//   };

//   const renderPage = () => {
//     switch (currentPage) {
//       case 'landing':
//         return <LandingPage onNavigate={handleNavigate} />;
//       case 'login':
//         return <LoginPage onNavigate={handleNavigate} />;
//       case 'create-account':
//         return <CreateAccountPage onNavigate={handleNavigate} />;
//       case 'forgot-password':
//         return <ForgotPasswordPage onNavigate={handleNavigate} />;
//       case 'reset-password':
//         return <ResetPasswordPage onNavigate={handleNavigate} />;
//       case 'dashboard':
//         return <Dashboard onNavigate={handleNavigate} />;
//       case 'scan':
//         return <ScanUploadPage onNavigate={handleNavigate} />;
//       case 'diagnosis-result':
//         return (
//           <DiagnosisResultPage 
//             onNavigate={handleNavigate} 
//             diagnosisData={currentDiagnosis} 
//             imageUrl={currentImage}
//           /> );
//       case 'saved':
//         return <SavedResultsPage onNavigate={handleNavigate} />;
//       case 'diagnosis-detail':
//         return <DiagnosisDetailPage onNavigate={handleNavigate} />;
//       case 'settings':
//         return <SettingsPage onNavigate={handleNavigate} />;
//       default:
//         return <LandingPage onNavigate={handleNavigate} />;
//     }
//   };

//   return <div className="min-h-screen">{renderPage()}</div>;
// }

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/create-account" element={<CreateAccountPage />} />
//         <Route path="/forget-password" element={<ForgetPasswordPage />} />
//         <Route path="/reset-password" element={<ResetPasswordPage />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/scan" element={<ScanUploadPage />} />
//         <Route path="/diagnosis-result" element={<DiagnosisResultPage />} />
//         <Route path="/saved" element={<SavedResultPage />} />
//         <Route path="/diagnosis-details" element={<DiagnosisDetailsPage />} />
//         <Route path="/settings" element={<SettingsPage />} />
//       </Routes>
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



export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
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