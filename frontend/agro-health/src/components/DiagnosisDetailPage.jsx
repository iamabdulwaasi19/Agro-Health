import {
  ArrowLeft,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Download,
  Share2,
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Navbar } from '../Navbar';
import { Sidebar } from '../Sidebar';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function DiagnosisDetailPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-[#F9FAF9]">
      <Navbar onNavigate={onNavigate} />
      <div className="flex">
        <Sidebar currentPage="saved" onNavigate={onNavigate} />
        <main className="flex-1 p-6 lg:p-8 max-w-[1440px] mx-auto w-full">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate('saved')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-[#1C8C36]">Diagnosis Details</h1>
          </div>

          {/* Image Preview */}
          <Card className="overflow-hidden mb-8">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1758903178566-81b9026340ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9wJTIwZGlzZWFzZSUyMHBsYW50fGVufDF8fHx8MTc2MjczNjMxN3ww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Tomato Late Blight"
              className="w-full h-[500px] object-cover"
            />
          </Card>

          {/* Disease Information */}
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-[#1C8C36]">
                  Tomato Late Blight
                </CardTitle>
                <p className="text-[#4B5563]">Phytophthora infestans</p>
              </div>
              <Badge className="bg-[#1C8C36] hover:bg-[#1C8C36]/90">Severe</Badge>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-[#A3E635]" />
                  <div>
                    <p className="text-[#4B5563]">Date Scanned</p>
                    <p className="text-[#1C8C36]">November 8, 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-[#A3E635]" />
                  <div>
                    <p className="text-[#4B5563]">Confidence Level</p>
                    <p className="text-[#1C8C36]">94%</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-[#1C8C36] mb-3">About This Disease</h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    Late blight is one of the most destructive diseases affecting
                    tomato and potato crops worldwide. Caused by the water mold
                    Phytophthora infestans, this disease thrives in cool, wet
                    conditions and can spread rapidly throughout a field. The
                    pathogen can destroy entire crops within days if environmental
                    conditions are favorable and the disease is left untreated. It
                    was responsible for the Irish Potato Famine in the 1840s.
                  </p>
                </div>

                <div>
                  <h3 className="text-[#1C8C36] mb-3">Symptoms to Watch For</h3>
                  <ul className="space-y-3">
                    {[
                      'Large, irregular, dark brown to black lesions on leaves, often starting at leaf tips or edges',
                      'White, fuzzy fungal growth on the undersides of leaves, especially in humid conditions',
                      'Rapid wilting and death of affected foliage',
                      'Brown, greasy-looking spots on stems',
                      'Firm, brown lesions on fruits that can spread quickly',
                    ].map((symptom, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-[#A3E635] flex-shrink-0 mt-0.5" />
                        <span className="text-[#4B5563]">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Treatment Guide */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-[#1C8C36]">
                Comprehensive Treatment Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-[#1C8C36] mb-3">Immediate Treatment Steps</h3>
                <ul className="space-y-3">
                  {[
                    'Remove and destroy all infected plant parts immediately. Do not compost infected material.',
                    'Apply copper-based fungicide (e.g., Bordeaux mixture) or chlorothalonil to all plants in the area',
                    'Treat on a 7-10 day schedule, or more frequently during wet weather',
                    'Ensure thorough coverage of both upper and lower leaf surfaces',
                    'Improve air circulation by spacing plants properly and removing lower leaves',
                  ].map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#1C8C36] flex-shrink-0 mt-0.5" />
                      <span className="text-[#4B5563]">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-[#1C8C36] mb-3">Cultural Practices</h3>
                <ul className="space-y-3">
                  {[
                    'Water plants at the soil level using drip irrigation; avoid overhead watering',
                    'Water early in the day so foliage dries quickly',
                    'Stake or cage plants to keep foliage off the ground',
                    'Remove weeds that can harbor the pathogen',
                    'Maintain good field sanitation and remove plant debris',
                  ].map((practice, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#A3E635] flex-shrink-0 mt-0.5" />
                      <span className="text-[#4B5563]">{practice}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Prevention Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1C8C36]">Prevention Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  'Plant disease-resistant varieties when available (check local recommendations)',
                  'Rotate crops - avoid planting tomatoes or potatoes in the same location for at least 3 years',
                  'Start with certified disease-free seed or transplants',
                  'Apply preventive fungicide sprays before disease appears, especially during wet seasons',
                  'Monitor plants regularly, especially during cool, wet weather',
                  'Remove volunteer tomato and potato plants that may harbor the pathogen',
                  'Space plants adequately for good air circulation',
                  'Mulch around plants to prevent soil splash onto lower leaves',
                ].map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#1C8C36] flex-shrink-0 mt-0.5" />
                    <span className="text-[#4B5563]">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              onClick={() => onNavigate('saved')}
              className="border-[#1C8C36] text-[#1C8C36] hover:bg-[#1C8C36] hover:text-white"
            >
              Back to Saved Results
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}