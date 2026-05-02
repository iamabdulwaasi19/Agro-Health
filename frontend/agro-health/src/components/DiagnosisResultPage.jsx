import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ArrowLeft, Share2, Bookmark, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Navbar } from '../Navbar';
import { Sidebar } from '../Sidebar';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './images/ImageWithFallback';

export function DiagnosisResultPage() {
  const location = useLocation();
  const { diagnosisData, imageUrl } = location.state || {};

  if (!diagnosisData) {
    return <div className="p-10 text-center">No diagnosis data found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#F9FAF9]">
      <Navbar navigate={navigate} />
      <div className="flex">
        <Sidebar currentPage="/scan" navigate={navigate} />
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
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button className="bg-[#1C8C36] hover:bg-[#1C8C36]/90">
                <Bookmark className="h-5 w-5 mr-2" />
                Save Result
              </Button>
            </div>
          </div>

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
                      <span className="text-[#1C8C36] font-bold">{diagnosisData.confidence}%</span>
                    </div>
                    <div className="w-full bg-[#E5E7EB] rounded-full h-2">
                      <div
                        className="bg-[#1C8C36] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${diagnosisData.confidence}%` }}
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
      </div>
    </div>
  );
}