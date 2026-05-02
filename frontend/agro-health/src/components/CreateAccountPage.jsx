import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { ImageWithFallback } from './images/ImageWithFallback';

export function CreateAccountPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const cleanedFullName = fullName.trim().replace(/\s+/g, ' ');

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("https://agro-health.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: cleanedFullName,
        phoneNumber,
        state,
        email,
        password,
        confirmPassword,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      navigate('/dashboard');
    } else {
      alert(data.message || "Something went wrong");
    }

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};

return (
  <div className="min-h-screen bg-gradient-to-br from-[#E6F4EA] to-white">
    <div className="grid lg:grid-cols-2 min-h-screen">
      {/* Left Section - Form */}
      <div className="flex items-center justify-center p-6 lg:p-12 bg-white lg:bg-transparent">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-[#1C8C36] rounded-lg p-2">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <span className="text-[#1C8C36] font-bold text-xl">AgroHealth</span>
          </div>

          {/* Form Header */}
          <div className="space-y-2">
            <h1 className="text-[#1C8C36] text-3xl font-bold">Create Account</h1>
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
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phonenumber">Phone Number</Label>
              <Input
                id="phonenumber"
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                required
                className="rounded-lg"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  required
                  className="rounded-lg pr-10"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#1C8C36] z-10"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  required
                  className="rounded-lg pr-10"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#1C8C36] z-10"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 py-2">
              <Checkbox id="terms" required />
              <label htmlFor="terms" className="text-[#4B5563] text-sm cursor-pointer">
                I agree to the{' '}
                <a href="#" className="text-[#1C8C36] hover:underline font-medium">
                  Terms & Privacy Policy
                </a>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#1C8C36] text-white hover:bg-[#1C8C36]/90 rounded-lg shadow-lg h-11"
            >
              Create Account
            </Button>
          </form>

          <div className="text-center text-[#4B5563]">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-[#1C8C36] hover:underline font-semibold"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-[#1C8C36] to-[#A3E635] p-12 relative overflow-hidden h-full">
        <div className="relative z-10 text-white space-y-6 max-w-md text-center">
          <h2 className="text-4xl font-bold">Empowering farmers with AI</h2>
          <p className="text-white/90 text-lg leading-relaxed">
            Join thousands of farmers using AgroHealth to protect their crops
            and increase yields with AI-powered disease detection.
          </p>
          <div className="pt-8 w-full">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1694093817187-0c913bc4ad87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjB3b3JraW5nJTIwZmllbGR8ZW58MXx8fHwxNzYyNjQ2MzE0fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Farmer working in field"
              className="rounded-2xl shadow-2xl w-full h-80 object-cover border-4 border-white/20"
            />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
      </div>
    </div>
  </div>
);
}