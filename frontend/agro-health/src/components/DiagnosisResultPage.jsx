import { ArrowLeft, Share2, Bookmark, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Navbar } from '../Navbar';
import { Sidebar } from '../Sidebar';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function DiagnosisResultPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-[#F9FAF9]">
      <Navbar onNavigate={onNavigate} />
      <div className="flex">
        <Sidebar currentPage="scan" onNavigate={onNavigate} />
        <main className="flex-1 p-6 lg:p-8 max-w-[1440px] mx-auto w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate('scan')}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-[#1C8C36]">Diagnosis Result</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button
                className="bg-[#1C8C36] hover:bg-[#1C8C36]/90"
              >
                <Bookmark className="h-5 w-5 mr-2" />
                Save Result
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Left - Image */}
            <Card className="overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758903178566-81b9026340ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9wJTIwZGlzZWFzZSUyMHBsYW50fGVufDF8fHx8MTc2MjczNjMxN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Scanned plant leaf"
                className="w-full h-[500px] object-cover"
              />
            </Card>

            {/* Right - Diagnosis Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-[#1C8C36]">
                        Tomato Late Blight
                      </CardTitle>
                      <p className="text-[#4B5563]">
                        Phytophthora infestans
                      </p>
                    </div>
                    <Badge className="bg-[#1C8C36] hover:bg-[#1C8C36]/90">
                      Severe
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#4B5563]">Confidence Score</span>
                      <span className="text-[#1C8C36]">94%</span>
                    </div>
                    <div className="w-full bg-[#F9FAF9] rounded-full h-2">
                      <div
                        className="bg-[#1C8C36] h-2 rounded-full"
                        style={{ width: '94%' }}
                      ></div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="text-[#1C8C36] mb-2">Description</h4>
                    <p className="text-[#4B5563]">
                      Late blight is a devastating disease that affects tomatoes
                      and potatoes. It spreads rapidly in cool, wet conditions and
                      can destroy entire crops within days if left untreated.
                    </p>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="text-[#1C8C36] mb-2">Common Symptoms</h4>
                    <ul className="space-y-2">
                      {[
                        'Dark brown or black lesions on leaves',
                        'White fungal growth on leaf undersides',
                        'Rapid leaf death and defoliation',
                        'Brown spots on fruits',
                      ].map((symptom, index) => (
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

          {/* Treatment Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1C8C36]">
                Recommended Treatment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-[#1C8C36]">Immediate Actions</h4>
                  <ul className="space-y-3">
                    {[
                      'Remove and destroy all infected plant material',
                      'Apply copper-based fungicide immediately',
                      'Improve air circulation around plants',
                      'Water plants at soil level, not overhead',
                    ].map((action, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[#1C8C36] flex-shrink-0 mt-0.5" />
                        <span className="text-[#4B5563]">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[#1C8C36]">Prevention Tips</h4>
                  <ul className="space-y-3">
                    {[
                      'Use disease-resistant tomato varieties',
                      'Rotate crops annually',
                      'Avoid working with wet plants',
                      'Monitor regularly during wet weather',
                    ].map((tip, index) => (
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
              onClick={() => onNavigate('dashboard')}
              className="border-[#1C8C36] text-[#1C8C36] hover:bg-[#1C8C36] hover:text-white"
            >
              Back to Dashboard
            </Button>
            <Button
              onClick={() => onNavigate('scan')}
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