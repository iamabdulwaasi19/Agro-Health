import { Leaf } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function LoginPage({ onNavigate }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F4EA] to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="bg-[#1C8C36] rounded-lg p-2">
            <Leaf className="h-8 w-8 text-white" />
          </div>
          <span className="text-[#1C8C36]">AgroHealth</span>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-[#1C8C36]">Welcome Back</h2>
            <p className="text-[#4B5563]">Login to your account</p>
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

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="rounded-lg"
              />
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => onNavigate('forgot-password')}
                className="text-[#1C8C36] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button type="submit" className="w-full bg-[#1C8C36] text-[#ffffff] hover:bg-[#1C8C36]/90 rounded-lg">
              Continue
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full rounded-lg border-[#1C8C36] text-[#1C8C36] hover:bg-[#F9FAF9]"
              onClick={() => onNavigate('dashboard')}
            >
              Continue Offline
            </Button>
          </form>

          <div className="text-center text-[#4B5563]">
            Don't have an account?{' '}
            <button
              onClick={() => onNavigate('create-account')}
              className="text-[#1C8C36] hover:underline"
            >
              Create an account
            </button>
          </div>
        </div>

        {/* Background decoration */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#A3E635] opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1C8C36] opacity-5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}