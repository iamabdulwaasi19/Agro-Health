import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { ArrowLeft, Share2, Bookmark, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Navbar } from '../Navbar';
import { Sidebar } from '../Sidebar';
import { Hamburger } from '../Hamburger';
import { Badge } from './ui/badge';
import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ImageWithFallback } from './images/ImageWithFallback';

export function DiagnosisResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSaving, setIsSaving] = useState(false);
  const { result, preview } = location.state || {};
  const pdfExportComponent = useRef(null);

  const diagnosisData = result;
  const imageUrl = preview;

  const downloadPDF = async () => {
  const element = pdfExportComponent.current;
    if (!element) return;

    // Optional: Show a loading state while generating
    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality
      useCORS: true, // Needed to load images from external URLs (like Render/Unsplash)
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`AgroHealth-Report-${Date.now()}.pdf`);
  };

const handleSaveResult = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://agro-health.onrender.com/api/scan/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          label: diagnosisData.disease_name,
          confidence: diagnosisData.confidence,
          imagePath: imageUrl,
          treatment: diagnosisData.treatment
        })
      });

      if (response.ok) {
        alert("Result saved successfully!");
        navigate('/dashboard'); // Go back to see it in the list
      } else {
        throw new Error("Failed to save");
      }
    } catch (err) {
      console.error("Save error detail:", err);
      alert("Error saving result. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!diagnosisData) {
    return <div className="p-10 text-center">No diagnosis data found.</div>;
  }

  return (
      <Hamburger>
        <main className="flex-1 p-6 lg:p-8 max-w-[1440px] mx-auto w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/scan')}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-[#1C8C36] text-2xl font-bold">Diagnosis Result</h1>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={downloadPDF} 
                className="bg-[#1C8C36] hover:bg-[#1C8C36]/90">
                Download as PDF
              </Button>
              <Button 
      onClick={handleSaveResult} 
      disabled={isSaving}
      className="bg-[#1C8C36] hover:bg-[#1C8C36]/90"
    >
      {isSaving ? (
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
      ) : (
        <Bookmark className="h-5 w-5 mr-2" />
      )}
      {isSaving ? "Saving..." : "Save Result"}
    </Button>
            </div>
          </div>

          <div ref={pdfExportComponent} className="bg-white p-4 rounded-lg">
          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Left - The Scanned Image */}
            <Card className="overflow-hidden">
              <ImageWithFallback
                src={imageUrl || "https://images.unsplash.com/photo-1758903178566-81b9026340ae"}
                alt="Scanned plant leaf"
                className="w-full h-[500px] object-cover"
              />
            </Card>

            {/* Right - Diagnosis Summary from AI */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-[#1C8C36] text-3xl">
                        {diagnosisData.disease_name}
                      </CardTitle>
                      <p className="text-[#4B5563] italic font-medium">
                        {diagnosisData.scientific_name}
                      </p>
                    </div>
                    <Badge className={`${
                      diagnosisData.severity === 'Severe' ? 'bg-red-500' : 'bg-[#1C8C36]'
                    } hover:opacity-90`}>
                      {diagnosisData.severity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
   <div>
  <div className="flex items-center justify-between mb-2">
    <span className="text-[#4B5563]">Confidence Score</span>
    {/* Multiply by 100 if the value is a decimal (e.g., 0.9 -> 90) */}
    <span className="text-[#1C8C36] font-bold">
      {diagnosisData.confidence < 1 
        ? (diagnosisData.confidence * 100).toFixed(0) 
        : diagnosisData.confidence}%
    </span>
  </div>
  <div className="w-full bg-[#E5E7EB] rounded-full h-2">
    <div
      className="bg-[#1C8C36] h-2 rounded-full transition-all duration-500"
      style={{ 
        width: `${diagnosisData.confidence < 1 
          ? diagnosisData.confidence * 100 
          : diagnosisData.confidence}%` 
      }}
    ></div>
  </div>
</div>

                  <div className="pt-4 border-t">
                    <h4 className="text-[#1C8C36] font-semibold mb-2">Description</h4>
                    <p className="text-[#4B5563] leading-relaxed">
                      {diagnosisData.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="text-[#1C8C36] font-semibold mb-2">Common Symptoms</h4>
                    <ul className="space-y-2">
                      {diagnosisData.symptoms.map((symptom, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertCircle className="h-5 w-5 text-[#A3E635] flex-shrink-0 mt-0.5" />
                          <span className="text-[#4B5563]">{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Treatment Recommendations from AI */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1C8C36]">
                Recommended Treatment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Column 1: Immediate Actions */}
                <div className="space-y-4">
                  <h4 className="text-[#1C8C36] font-semibold">Immediate Actions</h4>
                  <ul className="space-y-3">
                    {diagnosisData.treatment.immediate_actions.map((action, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[#1C8C36] flex-shrink-0 mt-0.5" />
                        <span className="text-[#4B5563]">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: Prevention Tips */}
                <div className="space-y-4">
                  <h4 className="text-[#1C8C36] font-semibold">Prevention Tips</h4>
                  <ul className="space-y-3">
                    {diagnosisData.treatment.prevention_tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[#A3E635] flex-shrink-0 mt-0.5" />
                        <span className="text-[#4B5563]">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="border-[#1C8C36] text-[#1C8C36] hover:bg-[#1C8C36] hover:text-white"
            >
              Back to Dashboard
            </Button>
            <Button
              onClick={() => navigate('/scan')}
              className="bg-[#1C8C36] hover:bg-[#1C8C36]/90"
            >
              Scan Another Leaf
            </Button>
          </div>
        </main>
      </Hamburger>
  );
}