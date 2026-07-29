import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, LogIn, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export function FormPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
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
          {!isSubmitted ? (
            <>
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold text-[#0D3B36] text-center mb-2">
                  Contact Us
                </h2>
                <p className="text-slate-600 text-center text-sm mb-8 max-w-md mx-auto">
                  We'll love to hear from you so let's get the conversation
                  tarted. Tell us a bit about yourself, and we'll get in touch
                  with you.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">FullName</Label>
                  <Input
                    id="fullName"
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
                    placeholder=""
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phonenumber">Phone Number</Label>
                  <Input
                    id="phonenumber"
                    type="tel"
                    placeholder=""
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="rounded-lg"
                    rows="4"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#1C8C36] text-[#ffffff] hover:bg-[#1C8C36]/90 rounded-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </>
          ) : (
            <div className="py-8 text-center space-y-3">
              <div className="flex justify-center">
                <div className="bg-[#E6F4EA] p-4 rounded-full">
                  <ThumbsUp className="h-12 w-12 text-[#1C8C36]" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#0D3B36]">
                Message Sent!
              </h3>
              <p className="text-slate-600 text-sm">
                Thank you for your message, we'll get back to you shortly.
              </p>
            </div>
          )}

          <div className="text-center text-[#4B5563]">
            <button
              onClick={() => navigate("/")}
              className="text-[#1C8C36] hover:underline text-sm font-medium"
            >
              Go Back
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
