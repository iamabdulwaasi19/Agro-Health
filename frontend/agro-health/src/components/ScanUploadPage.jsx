import { Upload, Camera, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Navbar } from '../Navbar';
import { Sidebar } from '../Sidebar';
import { Progress } from './ui/progress';
import { useState } from 'react';

export function ScanUploadPage({ onNavigate }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = () => {
    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onNavigate('diagnosis-result');
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-[#F9FAF9]">
      <Navbar onNavigate={onNavigate} />
      <div className="flex">
        <Sidebar currentPage="scan" onNavigate={onNavigate} />
        <main className="flex-1 p-6 lg:p-8 max-w-[1440px] mx-auto w-full">
          <h1 className="text-[#1C8C36] mb-8">Scan or Upload Image</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Section - Upload Zone */}
            <Card className="p-8">
              <div className="space-y-6">
                <div className="border-2 border-dashed border-[#A3E635] rounded-xl p-12 text-center bg-white hover:bg-[#F9FAF9] transition-colors cursor-pointer">
                  <div className="flex flex-col items-center gap-4">
                    <div className="bg-[#1C8C36] rounded-full p-6">
                      <Upload className="h-12 w-12 text-white" />
                    </div>
                    <div>
                      <h3 className="text-[#1C8C36] mb-2">Upload an Image</h3>
                      <p className="text-[#4B5563]">
                        Drag and drop or click to browse
                      </p>
                      <p className="text-[#4B5563] mt-2">
                        Supports: JPG, PNG, HEIC
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#A3E635]"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-[#4B5563]">OR</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-[#1C8C36] hover:bg-[#1C8C36]/90"
                  size="lg"
                  onClick={handleUpload}
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Take Photo
                </Button>

                {uploading && (
                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <p className="text-center text-[#4B5563]">
                      {progress < 100 ? 'Analyzing image...' : 'Analysis complete!'}
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Right Section - Instructions */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-[#1C8C36] mb-4">How to get the best results</h3>
                <ul className="space-y-4">
                  {[
                    'Take clear, well-lit photos of the affected leaves',
                    'Focus on the diseased areas for accurate diagnosis',
                    'Capture multiple angles if possible',
                    'Avoid blurry or dark images',
                    'Ensure the leaf fills most of the frame',
                  ].map((instruction, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#A3E635] flex-shrink-0 mt-0.5" />
                      <span className="text-[#4B5563]">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6 bg-[#E6F4EA] border-[#A3E635]">
                <h3 className="text-[#1C8C36] mb-2">💡 Pro Tip</h3>
                <p className="text-[#4B5563]">
                  For best results, photograph leaves in natural daylight. Avoid
                  using flash as it can distort colors and make diagnosis less
                  accurate.
                </p>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}