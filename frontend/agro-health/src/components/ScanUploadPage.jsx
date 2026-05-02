import { useNavigate } from 'react-router-dom';
import { Upload, Camera, CheckCircle, X, RefreshCw, Play } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
// import { Navbar } from '../Navbar';
// import { Sidebar } from '../Sidebar';
import { Hamburger } from '../Hamburger';
import { Progress } from './ui/progress';
import { useState, useRef } from 'react';

export function ScanUploadPage() {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelection = (file) => {
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const startDiagnosis = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setProgress(20);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      setProgress(40);
      
      const response = await fetch('https://agro-health.onrender.com/api/scan/diagnose', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Diagnosis failed');

      setProgress(80);
      const result = await response.json();
      
      setProgress(100);

      setTimeout(() => {
        navigate('diagnosis-result', result, preview);
      }, 500);

    } catch (err) {
      console.error("Scanning Error:", err);
      alert("Failed to analyze image. Please check your connection.");
      setUploading(false);
      setProgress(0);
    }
  };

  const resetUpload = () => {
    setPreview(null);
    setSelectedFile(null);
    setUploading(false);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onFileSelect = (e) => {
    const file = e.target.files?.[0];
    handleFileSelection(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    handleFileSelection(file);
  };

  return (
      <Hamburger>
        <main className="flex-1 p-6 lg:p-8 max-w-[1440px] mx-auto w-full">
          <h1 className="text-[#1C8C36] text-2xl font-bold mb-8">Scan or Upload Image</h1> 

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-8">
              <div className="space-y-6">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={onFileSelect}
                />

                {/* --- UPLOAD AREA / PREVIEW AREA --- */}
                {!preview ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="border-2 border-dashed border-[#A3E635] rounded-xl p-12 text-center bg-white transition-colors cursor-pointer hover:bg-[#F9FAF9]"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className="bg-[#1C8C36] rounded-full p-6">
                        <Upload className="h-12 w-12 text-white" />
                      </div>
                      <div>
                        <h3 className="text-[#1C8C36] font-semibold mb-2">Upload an Image</h3>
                        <p className="text-[#4B5563]">Drag and drop or click to browse</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="relative rounded-xl overflow-hidden border-2 border-[#A3E635] bg-black h-64 flex items-center justify-center">
                      <img 
                        src={preview} 
                        alt="Preview" 
                        className={`max-h-full max-w-full object-contain ${uploading ? 'opacity-50' : ''}`} 
                      />
                      {uploading && (
                         <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                         </div>
                      )}
                    </div>

                    {/* --- ACTION BUTTONS --- */}
                    {!uploading ? (
                      <div className="grid grid-cols-2 gap-4">
                        <Button 
                          onClick={resetUpload}
                          variant="outline" 
                          className="border-[#EF4444] text-[#EF4444] hover:bg-red-50"
                        >
                          <RefreshCw className="mr-2 h-4 w-4" /> Change Image
                        </Button>
                        <Button 
                          onClick={startDiagnosis}
                          className="bg-[#1C8C36] hover:bg-[#156d2a] text-white"
                        >
                          <Play className="mr-2 h-4 w-4" /> Continue to Diagnose
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Progress value={progress} className="h-2" />
                        <p className="text-center text-[#4B5563] animate-pulse font-medium">
                          {progress < 100 ? 'AI is analyzing your crop...' : 'Analysis complete!'}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>

            {/* --- INSTRUCTIONS PANEL --- */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-[#1C8C36] font-semibold mb-4">How to get the best results</h3>
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
                 <h3 className="text-[#1C8C36] mb-2 font-bold">💡 Pro Tip</h3>
                 <p className="text-[#4B5563]">
                    Photograph leaves in natural daylight. Avoid
                    using flash as it can distort colors and make diagnosis less
                    accurate.
                 </p>
              </Card>
            </div>
          </div>
        </main>
      </Hamburger>
  );
}