import { useNavigate } from "react-router-dom";
import { Leaf, Smartphone, BookOpen, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./images/ImageWithFallback";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#1C8C36] rounded-lg p-2">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-[#1C8C36]">AgroHealth</span>
          </div>
          <Button
            onClick={() => navigate("/login")}
            variant="outline"
            className="border-[#1C8C36] text-[#1C8C36] hover:bg-[#1C8C36] hover:text-white"
          >
            Login
          </Button>
        </div>
      </header>

      <section className="max-w-[1440px] mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-[#1C8C36]">
              Diagnose crop diseases instantly with AI.
            </h1>
            <p className="text-[#4B5563]">
              Empower your farming with cutting-edge AI technology. Get instant
              disease diagnosis, treatment recommendations, and expert advice
              all in one platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => navigate("/create-account")}
                className="bg-[#1C8C36] text-[#ffffff] hover:bg-[#1C8C36]/90"
              >
                Try Now
              </Button>
              <Button
                onClick={() => navigate("/login")}
                variant="outline"
                className="border-[#1C8C36] text-[#1C8C36] hover:bg-[#1C8C36] hover:text-white"
              >
                Login
              </Button>
            </div>
          </div>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1709489016628-d173053e7eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMGNyb3BzJTIwZmllbGR8ZW58MXx8fHwxNzYyNzE2MTcwfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Agriculture crops in field"
            className="w-full h-[400px] object-cover"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#F9FAF9] py-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <h2 className="text-center text-[#1C8C36] mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm space-y-4">
              <div className="bg-[#A3E635] rounded-lg p-3 w-fit">
                <Zap className="h-6 w-6 text-[#1C8C36]" />
              </div>
              <h3 className="text-[#1C8C36]">AI Diagnosis</h3>
              <p className="text-[#4B5563]">
                Get instant, accurate disease diagnosis powered by advanced
                machine learning algorithms trained on thousands of crop images.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm space-y-4">
              <div className="bg-[#A3E635] rounded-lg p-3 w-fit">
                <Smartphone className="h-6 w-6 text-[#1C8C36]" />
              </div>
              <h3 className="text-[#1C8C36]">Offline Access</h3>
              <p className="text-[#4B5563]">
                Work without internet connectivity. Download disease databases
                and continue diagnosing crops even in remote areas.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm space-y-4">
              <div className="bg-[#A3E635] rounded-lg p-3 w-fit">
                <BookOpen className="h-6 w-6 text-[#1C8C36]" />
              </div>
              <h3 className="text-[#1C8C36]">Disease Library</h3>
              <p className="text-[#4B5563]">
                Access comprehensive information about crop diseases, symptoms,
                and treatment methods curated by agricultural experts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#A3E635] text-white py-6 px-6">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="flex flex-col space-y-4 max-w-sm">
              <div className="flex items-center gap-2">
                <div className="bg-[#1C8C36] rounded-lg p-2">
                  <Leaf className="h-4 w-4 text-white" />
                </div>
                <span className="text-[#1C8C36]">AgroHealth</span>
              </div>
              <p className="text-slate-500 text-md">
                Empower farmers with cutting-edge AI technology. Getting instant
                disease diagnosis, treatment recommendations, and expert advice
                all in one platform.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[#1C8C36]">Product</span>
              <a
                onClick={() => navigate("/login")}
                className=" hover:text-[#1C8C36] transition-colors cursor-pointer"
              >
                Features
              </a>
              <a
                onClick={() => navigate("/login")}
                className=" hover:text-[#1C8C36] transition-colors cursor-pointer"
              >
                How it works
              </a>
              <a
                onClick={() => navigate("/login")}
                className=" hover:text-[#1C8C36] transition-colors cursor-pointer"
              >
                Download Mobile App
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[#1C8C36]">Contact</span>
              <a
                onClick={() => navigate("/login")}
                className=" hover:text-[#1C8C36] transition-colors cursor-pointer"
              >
                Support Form
              </a>
              <a
                onClick={() => navigate("/login")}
                className=" hover:text-[#1C8C36] transition-colors cursor-pointer"
              >
                Privacy Policy
              </a>
              <a
                onClick={() => navigate("/form")}
                className=" hover:text-[#1C8C36] transition-colors cursor-pointer"
              >
                Contact Us
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[#1C8C36]">Socials</span>
              <a
                onClick={() =>
                  window.open("https://twitter.com/AgroHealth", "_blank")
                }
                className=" hover:text-[#1C8C36] transition-colors cursor-pointer"
              >
                Twitter
              </a>
              <a
                onClick={() =>
                  window.open("https://facebook.com/AgroHealth", "_blank")
                }
                className=" hover:text-[#1C8C36] transition-colors cursor-pointer"
              >
                Facebook
              </a>
              <a
                onClick={() =>
                  window.open("https://instagram.com/AgroHealth", "_blank")
                }
                className=" hover:text-[#1C8C36] transition-colors cursor-pointer"
              >
                Instagram
              </a>
            </div>
          </div>

          <div className="text-center mt-6 text-[#4B5563]">
            <p>© 2025 AgroHealth. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
