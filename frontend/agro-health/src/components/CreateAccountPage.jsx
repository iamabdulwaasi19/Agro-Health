import { useState } from 'react';
import { Leaf } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { ImageWithFallback } from './images/ImageWithFallback';

export function CreateAccountPage({ onNavigate }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (fullName) {
  //     localStorage.setItem('userName', fullName);
  //   }
  //   onNavigate('dashboard');
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("https://agro-health.onrender.com/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
      }),
    });

    // const data = await res.json();
    // console.log(data);

    const text = await res.text();                                                                                                                                                                                                                
    console.log(text);

    if (res.ok) {
      onNavigate('dashboard');
    } else {
      alert(text.message || "Something went wrong");
    }

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F4EA] to-white">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 min-h-screen">
          {/* Left Section - Form */}
          <div className="flex items-center justify-center p-6 lg:p-12">
            <div className="w-full max-w-md space-y-8">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="bg-[#1C8C36] rounded-lg p-2">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <span className="text-[#1C8C36]">AgroHealth</span>
              </div>

              {/* Form */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-[#1C8C36]">Create Account</h1>
                  <p className="text-[#4B5563]">
                    Join AgroHealth and start diagnosing crop diseases with AI
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input
                      id="fullname"
                      type="text"
                      placeholder=""
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      placeholder="your.email@example.com"
                      required
                      className="rounded-lg"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      required
                      className="rounded-lg"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="rounded-lg"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox id="terms" required />
                    <label htmlFor="terms" className="text-[#4B5563] cursor-pointer">
                      I agree to the{' '}
                      <a href="#" className="text-[#1C8C36] hover:underline">
                        Terms & Privacy Policy
                      </a>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#1C8C36] text-[#ffffff] hover:bg-[#1C8C36]/90 rounded-lg shadow-lg"
                  >
                    Create Account
                  </Button>
                </form>

                <div className="text-center text-[#4B5563]">
                  Already have an account?{' '}
                  <button
                    onClick={() => onNavigate('login')}
                    className="text-[#1C8C36] hover:underline"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Illustration */}
          <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-[#1C8C36] to-[#A3E635] p-12 relative overflow-hidden">
            <div className="relative z-10 text-white space-y-6 max-w-md">
              <h2>Empowering farmers with AI</h2>
              <p className="text-white/90">
                Join thousands of farmers using AgroHealth to protect their crops
                and increase yields with AI-powered disease detection.
              </p>
              <div className="pt-8">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1694093817187-0c913bc4ad87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjB3b3JraW5nJTIwZmllbGR8ZW58MXx8fHwxNzYyNjQ2MzE0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Farmer working in field"
                  className="rounded-2xl shadow-2xl w-full h-64 object-cover"
                />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}