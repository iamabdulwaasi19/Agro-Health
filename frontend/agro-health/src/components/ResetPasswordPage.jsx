import { Leaf, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useState } from 'react';

export function ResetPasswordPage({ onNavigate }) {
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setResetSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F4EA] to-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="bg-[#1C8C36] rounded-lg p-2">
            <Leaf className="h-8 w-8 text-white" />
          </div>
          <span className="text-[#1C8C36]">AgroHealth</span>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {!resetSuccess ? (
            <>
              <div className="space-y-2">
                <h2 className="text-[#1C8C36]">Reset Your Password</h2>
                <p className="text-[#4B5563]">Enter your new password below.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="rounded-lg"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#1C8C36] hover:bg-[#1C8C36]/90 rounded-lg shadow-lg"
                >
                  Reset Password
                </Button>
              </form>

              <button
                onClick={() => onNavigate('login')}
                className="flex items-center gap-2 text-[#1C8C36] hover:underline mx-auto"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </button>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="bg-[#A3E635] rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-[#1C8C36]" />
              </div>
              <h2 className="text-[#1C8C36]">Password Reset Successful!</h2>
              <p className="text-[#4B5563]">
                Your password has been reset successfully. You can now log in
                with your new password.
              </p>
              <Button
                onClick={() => onNavigate('login')}
                className="w-full bg-[#1C8C36] hover:bg-[#1C8C36]/90 rounded-lg"
              >
                Go to Login
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#A3E635] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1C8C36] opacity-5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}