import { useState } from 'react';
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
  const [currentPage, setCurrentPage] = useState('landing');

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'create-account':
        return <CreateAccountPage onNavigate={handleNavigate} />;
      case 'forgot-password':
        return <ForgotPasswordPage onNavigate={handleNavigate} />;
      case 'reset-password':
        return <ResetPasswordPage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'scan':
        return <ScanUploadPage onNavigate={handleNavigate} />;
      case 'diagnosis-result':
        return <DiagnosisResultPage onNavigate={handleNavigate} />;
      case 'saved':
        return <SavedResultsPage onNavigate={handleNavigate} />;
      case 'diagnosis-detail':
        return <DiagnosisDetailPage onNavigate={handleNavigate} />;
      case 'settings':
        return <SettingsPage onNavigate={handleNavigate} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return <div className="min-h-screen">{renderPage()}</div>;
}

// export default function App() { return <h1>AgroHealth is alive!</h1> }