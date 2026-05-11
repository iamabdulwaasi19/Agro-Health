import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Clock, Inbox } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Hamburger } from "../Hamburger";
import { ImageWithFallback } from "./images/ImageWithFallback";

export function Dashboard(darkMode, setDarkMode) {
  const navigate = useNavigate();
  // State to hold the user's first name for the welcome message
  const [firstName, setFirstName] = useState("Farmer");
  const [userDiagnoses, setUserDiagnoses] = useState([]);

  // Target the user's first name and displays
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (savedUser.fullName) {
      const firstName = savedUser.fullName.trim().split(" ")[0];
      setFirstName(firstName);
    } else {
      setFirstName("Farmer"); // else display farmer
    }
  }, []);

  // Retrieve user's scan history on log in
  useEffect(() => {
    const fetchRecentDiagnoses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(
          "https://agro-health.onrender.com/api/scan/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (data.success) {
          setUserDiagnoses(data.history);
        }
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
      }
    };

    fetchRecentDiagnoses();
  }, []);

  return (
    <Hamburger darkMode={darkMode} setDarkMode={setDarkMode}>
      <main className="flex-1 h-screen overflow-hidden bg-[#F9FAF9] dark:bg-[#0F172A]">
        <div className="h-full max-w-[1440px] mx-auto px-5 py-5 flex flex-col overflow-hidden">
          {/* Welcome Section */}
          <div className="mb-4 flex-shrink-0">
            <h1 className="text-[#1C8C36] text-2xl font-bold mb-1">
              Welcome back, {firstName}!
            </h1>

            <p className="text-gray-600 text-sm">
              Diagnose your crops and get instant treatment recommendations
            </p>
          </div>

          {/* Upload Card */}
          <div className="mb-4 flex-shrink-0 dark:bg-[#1F2937] dark:border-gray-700">
            <Card
              onClick={() => navigate("/scan")}
              className="cursor-pointer border-2 border-[#A3E635] hover:shadow-md transition-all rounded-2xl w-full max-w-[460px]"
            >
              <CardHeader className="p-5 flex flex-col items-start text-left">
                <div className="bg-[#1C8C36] rounded-full p-4 mb-3">
                  <Upload className="h-6 w-6 text-white" />
                </div>

                <CardTitle className="text-[#1C8C36] text-xl font-semibold mb-1">
                  Upload Image
                </CardTitle>

                <CardDescription className="text-gray-500 text-sm leading-relaxed max-w-sm">
                  Upload an existing photo for AI-powered disease analysis
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Recent Diagnoses */}
          <Card className="border border-gray-200 rounded-2xl shadow-sm bg-white overflow-hidden min-h-0 dark:bg-[#1F2937] dark:border-gray-700">
            {/* Header */}
            <CardHeader className="flex flex-row items-center justify-between px-5 py-4 flex-shrink-0">
              <div>
                <CardTitle className="text-[#1C8C36] text-lg font-semibold">
                  Recent Diagnoses
                </CardTitle>

                <CardDescription className="text-gray-500 text-xs mt-1 dark:text-gray-400">
                  Your latest crop health assessments
                </CardDescription>
              </div>

              {userDiagnoses.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => navigate("/saved")}
                  className="border-[#1C8C36] text-[#1C8C36] hover:bg-[#1C8C36] hover:text-white rounded-lg px-4 h-9 text-sm dark:hover:bg-[#374151]"
                >
                  View All
                </Button>
              )}
            </CardHeader>

            {/* Content: If user has diagnoses, show them. Otherwise, show empty state */}
            <CardContent className="px-5 pb-5 pt-0 overflow-hidden">
              {userDiagnoses.length > 0 ? (
                <div className="space-y-3">
                  {userDiagnoses.slice(0, 3).map((diagnosis) => (
                    <div
                      key={diagnosis.id || diagnosis._id}
                      onClick={() =>
                        navigate("/diagnosis-details", {
                          state: { result: diagnosis },
                        })
                      }
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition cursor-pointer dark:hover:bg-[#1F2937]"
                    >
                      <ImageWithFallback
                        src={diagnosis.imagePath || diagnosis.image}
                        alt={diagnosis.label || diagnosis.disease}
                        className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="text-[#1C8C36] font-semibold text-base truncate">
                          {diagnosis.label || diagnosis.disease}
                        </h3>

                        <div className="flex items-center gap-4 text-gray-500 mt-1">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />

                            <span className="text-xs">
                              {new Date(
                                diagnosis.createdAt || diagnosis.date,
                              ).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="text-xs">
                            Confidence:{" "}
                            <span className="text-[#1C8C36] font-semibold">
                              {diagnosis.confidence < 1
                                ? (diagnosis.confidence * 100).toFixed(0)
                                : diagnosis.confidence}
                              %
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-6">
                  <div className="bg-gray-100 p-4 rounded-full mb-3">
                    <Inbox className="h-8 w-8 text-green-400" />
                  </div>

                  <p className="text-gray-500 text-sm max-w-xs">
                    Your analysis history will appear here once you start
                    scanning.
                  </p>

                  <Button
                    variant="link"
                    onClick={() => navigate("/scan")}
                    className="text-[#1C8C36] font-semibold mt-2 text-sm"
                  >
                    Start your first scan →
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </Hamburger>
  );
}
