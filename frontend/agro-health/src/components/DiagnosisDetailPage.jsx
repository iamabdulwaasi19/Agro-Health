import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Download,
  Share2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Hamburger } from "../Hamburger";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./images/ImageWithFallback";

export function DiagnosisDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the diagnosis data passed from SavedResultsPage or Dashboard
  const diagnosis = location.state?.result;

  // Parse the treatment data saved as a JSON string in MongoDB
  const treatment = diagnosis?.treatment
    ? typeof diagnosis.treatment === "string"
      ? JSON.parse(diagnosis.treatment)
      : diagnosis.treatment
    : null;

  if (!diagnosis) {
    return (
      <div className="p-10 text-center">
        <p>No diagnosis details found.</p>
        <Button onClick={() => navigate("/saved")}>Back to History</Button>
      </div>
    );
  }

  return (
    <Hamburger>
      <main className="flex-1 p-6 lg:p-8 max-w-[1440px] mx-auto w-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-[#1C8C36] text-2xl font-bold">
            Diagnosis Details
          </h1>
        </div>

        {/* Image Preview */}
        <Card className="overflow-hidden mb-8 shadow-sm">
          <ImageWithFallback
            src={diagnosis.imagePath}
            alt={diagnosis.label}
            className="w-full h-[500px] object-cover"
          />
        </Card>

        {/* Disease Information */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-[#1C8C36] text-3xl font-bold">
                {diagnosis.label}
              </CardTitle>
              <p className="text-[#4B5563] italic">
                Scientific identification provided by AI
              </p>
            </div>
            <Badge className="bg-[#1C8C36] text-white px-4 py-1">
              Saved Result
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 mb-8 border-b pb-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-50 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-[#1C8C36]" />
                </div>
                <div>
                  <p className="text-xs text-[#4B5563] uppercase tracking-wider font-semibold">
                    Date Scanned
                  </p>
                  <p className="text-[#1C8C36] font-medium">
                    {new Date(diagnosis.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-green-50 p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-[#1C8C36]" />
                </div>
                <div>
                  <p className="text-xs text-[#4B5563] uppercase tracking-wider font-semibold">
                    Confidence Level
                  </p>

                  <p className="text-[#1C8C36] font-medium">
                    {diagnosis.confidence < 1
                      ? (diagnosis.confidence * 100).toFixed(0)
                      : diagnosis.confidence}
                    %
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#1C8C36] text-[#1C8C36]"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#1C8C36] text-[#1C8C36]"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Treatment Sections */}
            <div className="space-y-8">
              {treatment?.immediate_actions && (
                <div>
                  <h3 className="text-[#1C8C36] text-xl font-semibold mb-4">
                    Immediate Treatment Steps
                  </h3>
                  <ul className="space-y-3">
                    {treatment.immediate_actions.map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#1C8C36] flex-shrink-0 mt-0.5" />
                        <span className="text-[#4B5563]">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {treatment?.prevention_tips && (
                <div>
                  <h3 className="text-[#1C8C36] text-xl font-semibold mb-4">
                    Prevention Tips
                  </h3>
                  <ul className="space-y-3">
                    {treatment.prevention_tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-[#A3E635] flex-shrink-0 mt-0.5" />
                        <span className="text-[#4B5563]">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            onClick={() => navigate("/saved")}
            className="border-[#1C8C36] text-[#1C8C36] hover:bg-[#1C8C36] hover:text-white px-8"
          >
            Back to Saved Results
          </Button>
        </div>
      </main>
    </Hamburger>
  );
}
