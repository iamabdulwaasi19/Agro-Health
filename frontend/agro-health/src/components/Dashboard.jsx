import { Camera, Upload, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Navbar } from '../Navbar';
import { Sidebar } from '../Sidebar';
import { ImageWithFallback } from './figma/ImageWithFallback';

const recentDiagnoses = [
  {
    id: 1,
    disease: 'Tomato Late Blight',
    date: '2025-11-08',
    confidence: '94%',
    image: 'https://images.unsplash.com/photo-1758903178566-81b9026340ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9wJTIwZGlzZWFzZSUyMHBsYW50fGVufDF8fHx8MTc2MjczNjMxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    disease: 'Wheat Rust',
    date: '2025-11-06',
    confidence: '87%',
    image: 'https://images.unsplash.com/photo-1682845504704-2f9a25bfc631?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMGxlYXZlcyUyMG5hdHVyZXxlbnwxfHx8fDE3NjI3MzYzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    disease: 'Corn Leaf Spot',
    date: '2025-11-05',
    confidence: '91%',
    image: 'https://images.unsplash.com/photo-1709489016628-d173053e7eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMGNyb3BzJTIwZmllbGR8ZW58MXx8fHwxNzYyNzE2MTcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function Dashboard({ onNavigate }) {
  return (
    <div className="min-h-screen bg-[#F9FAF9]">
      <Navbar onNavigate={onNavigate} />
      <div className="flex">
        <Sidebar currentPage="dashboard" onNavigate={onNavigate} />
        <main className="flex-1 p-6 lg:p-8 max-w-[1440px] mx-auto w-full">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-[#1C8C36] mb-2">Welcome back, Farmer!</h1>
            <p className="text-[#4B5563]">
              Diagnose your crops and get instant treatment recommendations
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow border-[#A3E635] border-2"
              onClick={() => onNavigate('scan')}
            >
              <CardHeader>
                <div className="bg-[#1C8C36] rounded-full p-4 w-fit mb-4">
                  <Camera className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-[#1C8C36]">Scan Leaf</CardTitle>
                <CardDescription>
                  Use your camera to capture and diagnose plant diseases instantly
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow border-[#A3E635] border-2"
              onClick={() => onNavigate('scan')}
            >
              <CardHeader>
                <div className="bg-[#1C8C36] rounded-full p-4 w-fit mb-4">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-[#1C8C36]">Upload Image</CardTitle>
                <CardDescription>
                  Upload an existing photo for AI-powered disease analysis
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Recent Diagnoses */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-[#1C8C36]">Recent Diagnoses</CardTitle>
                <CardDescription>Your latest crop health assessments</CardDescription>
              </div>
              <Button
                variant="outline"
                onClick={() => onNavigate('saved')}
                className="border-[#1C8C36] text-[#1C8C36] hover:bg-[#1C8C36] hover:text-white"
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDiagnoses.map((diagnosis) => (
                  <div
                    key={diagnosis.id}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-[#F9FAF9] cursor-pointer transition-colors"
                    onClick={() => onNavigate('diagnosis-detail')}
                  >
                    <ImageWithFallback
                      src={diagnosis.image}
                      alt={diagnosis.disease}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-[#1C8C36]">{diagnosis.disease}</h3>
                      <div className="flex items-center gap-4 text-[#4B5563] mt-1">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{diagnosis.date}</span>
                        </div>
                        <span>Confidence: {diagnosis.confidence}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}