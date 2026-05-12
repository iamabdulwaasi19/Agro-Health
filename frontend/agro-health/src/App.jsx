import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { CreateAccountPage } from "./components/CreateAccountPage";
import { ForgotPasswordPage } from "./components/ForgotPasswordPage";
import { ResetPasswordPage } from "./components/ResetPasswordPage";
import { Dashboard } from "./components/Dashboard";
import { ScanUploadPage } from "./components/ScanUploadPage";
import { DiagnosisResultPage } from "./components/DiagnosisResultPage";
import { SavedResultsPage } from "./components/SavedResultsPage";
import { DiagnosisDetailPage } from "./components/DiagnosisDetailPage";
import { SettingsPage } from "./components/SettingsPage";
import { VerifyOTP } from "./components/VerifyOTP";

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