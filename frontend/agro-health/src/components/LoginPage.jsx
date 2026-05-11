import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Form input states
  const [fullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Handles submittion state
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    // Send request to the login API in backend
    try {
      const res = await fetch(
        "https://agro-health.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, fullName }),
        },
      );

      const data = await res.json();
      console.log(data);

      // If login is successful, save token and user info to localStorage, then navigate to dashboard
      if (res.ok) {
        const fullName = data.user?.fullName;

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userName", fullName);

        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setIsLoading(false);
    }
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
                placeholder=""
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder=""
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[24px] text-gray-500 hover:text-[#1C8C36] z-10"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-[#1C8C36] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1C8C36] text-[#ffffff] hover:bg-[#1C8C36]/90 rounded-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Login
                </>
              )}
            </Button>
          </form>

          <div className="text-center text-[#4B5563]">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/create-account")}
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
