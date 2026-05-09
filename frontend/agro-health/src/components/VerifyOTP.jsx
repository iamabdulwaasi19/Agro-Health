import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Leaf, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Grab the email passed from the signup page
  const email = location.state?.email || "";
  
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  // Redirect if no email is found (prevent manual URL access)
  useEffect(() => {
    if (!email) {
      navigate('/signup');
    }
  }, [email, navigate]);

  // Handle countdown for Resend OTP
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://agro-health.onrender.com/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        // Verification successful! Now we can go to dashboard
        alert("Account verified successfully!");
        navigate('/login'); 
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (err) {
      alert("Server error. Please try again.", err);
    } finally {
      setLoading(false);
    }
  };

const handleResend = async () => {
  try {
    const res = await fetch("https://agro-health.onrender.com/api/auth/resend-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      setTimer(60); // Restart the 60s countdown
      alert("A new code has been sent!");
    } else {
      alert(data.message || "Failed to resend OTP");
    }
  } catch (err) {
    alert("Check your internet connection and try again.", err);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F4EA] to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8 border border-[#E6F4EA]">
        
        {/* Logo & Back Link */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-[#1C8C36] rounded-lg p-2">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-[#1C8C36] font-bold text-lg">AgroHealth</span>
          </div>
          <button 
            onClick={() => navigate('/create-account')}
            className="text-gray-400 hover:text-[#1C8C36] flex items-center gap-1 text-sm transition"
          >
            <ArrowLeft size={16} /> Edit Email
          </button>
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E6F4EA] rounded-full mb-2">
            <ShieldCheck className="h-8 w-8 text-[#1C8C36]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Verify your email</h1>
          <p className="text-gray-500 text-sm">
            We've sent a 6-digit code to <br />
            <span className="font-semibold text-gray-700">{email}</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="otp" className="sr-only">Enter OTP</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter 6-digit code"
              maxLength={6}
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              className="text-center text-2xl tracking-[1em] h-14 border-2 focus:border-[#1C8C36] rounded-xl"
            />
          </div>

          <Button
            type="submit"
            disabled={loading || otp.length < 6}
            className="w-full bg-[#1C8C36] text-white hover:bg-[#1C8C36]/90 rounded-xl h-12 text-lg shadow-md"
          >
            {loading ? "Verifying..." : "Verify Account"}
          </Button>
        </form>

        {/* Resend Logic */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Didn't receive the code?
          </p>
          <button
            onClick={handleResend}
            disabled={timer > 0}
            className={`mt-2 font-semibold text-sm transition ${
              timer > 0 ? 'text-gray-300 cursor-not-allowed' : 'text-[#1C8C36] hover:underline'
            }`}
          >
            {timer > 0 ? `Resend code in ${timer}s` : "Resend code now"}
          </button>
        </div>
      </div>
    </div>
  );
}