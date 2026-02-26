import { Leaf, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useState } from 'react';

export function ForgotPasswordPage({ onNavigate }) {
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailSent(true);
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
          {!emailSent ? (
            <>
              <div className="space-y-2">
                <h2 className="text-[#1C8C36]">Forgot Password?</h2>
                <p className="text-[#4B5563]">
                  Enter your registered email and we'll send you a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    className="rounded-lg"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#1C8C36] hover:bg-[#1C8C36]/90 rounded-lg shadow-lg"
                >
                  Send Reset Link
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
                <Leaf className="h-8 w-8 text-[#1C8C36]" />
              </div>
              <h2 className="text-[#1C8C36]">Check Your Email</h2>
              <p className="text-[#4B5563]">
                We've sent a password reset link to your email address. Please
                check your inbox and follow the instructions.
              </p>
              <Button
                onClick={() => onNavigate('login')}
                className="w-full bg-[#1C8C36] hover:bg-[#1C8C36]/90 rounded-lg"
              >
                Back to Login
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