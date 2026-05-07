import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Clock, Inbox } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Navbar } from '../Navbar';
import { Sidebar } from '../Sidebar';
import { Hamburger } from '../Hamburger';
import { ImageWithFallback } from './images/ImageWithFallback';

export function Dashboard() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('Farmer');
  const [userDiagnoses, setUserDiagnoses] = useState([]);

useEffect(() => {
  const savedUser = JSON.parse(localStorage.getItem('user') || '{}');

  if (savedUser.fullName) {
    const firstName = savedUser.fullName.trim().split(' ')[0];
// eslint-disable-next-line react-hooks/set-state-in-effect
    setFirstName(firstName);
  } else {
    setFirstName('Farmer');
  }
}, []);

  useEffect(() => {
  const fetchRecentDiagnoses = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('https://agro-health.onrender.com/api/scan/history', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        // We only want the 3 most recent for the dashboard interface
        setUserDiagnoses(data.history); 
      }
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
    }
  };

  fetchRecentDiagnoses();
}, []);

  return (
<Hamburger>
  <main className="flex-1 p-4 lg:p-6 max-w-[1440px] mx-auto w-full h-full flex flex-col overflow-hidden">
    {/* Welcome Section - Reduced margin */}
    <div className="mb-4">
      <h1 className="text-[#1C8C36] text-2xl font-bold mb-1">Welcome back, {firstName}!</h1>
      <p className="text-[#1C8C36] text-sm opacity-80">
        Diagnose your crops and get instant treatment recommendations
      </p>
    </div>

    {/* Upload Image Card - Reduced padding and margin to save space */}
    <div className="flex justify-center mb-6">
      <Card
        className="cursor-pointer hover:shadow-lg transition-all border-[#A3E635] border-2 w-full max-w-lg group"
        onClick={() => navigate('/scan')}
      >
        <CardHeader className="flex flex-col items-center text-center p-4">
          <div className="bg-[#1C8C36] rounded-full p-4 w-fit mb-2 group-hover:scale-105 transition-transform">
            <Upload className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-[#1C8C36] text-xl">Upload Image</CardTitle>
          <CardDescription className="text-sm max-w-xs">
            Click here to upload a plant leaf photo for AI-powered disease analysis
          </CardDescription>
        </CardHeader>
      </Card>
    </div>

    {/* Recent Diagnoses Section - Added Border and fixed height container */}
    <Card className="bg-[#F9FAF9] border-[#A3E635] border-2 shadow-sm flex-1 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
        <div>
          <CardTitle className="text-[#1C8C36] text-lg">Recent Diagnoses</CardTitle>
          <CardDescription className="text-xs">Your latest crop health assessments</CardDescription>
        </div>
        {userDiagnoses.length > 0 && (
          <Button
            variant="outline"
            onClick={() => navigate('/saved')}
            className="border-[#1C8C36] text-[#1C8C36] hover:bg-[#1C8C36] hover:text-white rounded-md h-8 px-4 text-xs"
          >
            View All
          </Button>
        )}
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        {userDiagnoses.length > 0 ? (
          <div className="space-y-2">
            {userDiagnoses.slice(0, 3).map((diagnosis) => (
              <div
                key={diagnosis.id || diagnosis._id}
                className="flex items-center gap-3 p-2 rounded-xl bg-white border border-transparent hover:border-[#A3E635] cursor-pointer transition-all shadow-sm"
                onClick={() => navigate('/diagnosis-details', { state: { result: diagnosis } })}
              >
                <ImageWithFallback
                  src={diagnosis.imagePath || diagnosis.image}
                  alt={diagnosis.label || diagnosis.disease}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#1C8C36] font-bold text-base truncate">
                    {diagnosis.label || diagnosis.disease}
                  </h3>
                  <div className="flex items-center gap-3 text-gray-500 text-xs">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-[#A3E635]" />
                      <span>{new Date(diagnosis.createdAt || diagnosis.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="opacity-70">Confidence:</span>
                      {/* <span className="text-[#1C8C36] font-semibold">{diagnosis.confidence}%</span> */}
                      <span className="text-[#1C8C36] font-semibold">
      {diagnosis.confidence < 1 
        ? (diagnosis.confidence * 100).toFixed(0) 
        : diagnosis.confidence}%
    </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="bg-gray-100 p-4 rounded-full mb-3">
              <Inbox className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm italic max-w-[200px]">
              Your analysis history will be displayed here once you start scanning.
            </p>
            <Button 
              variant="link" 
              className="text-[#1C8C36] font-bold text-xs mt-1"
              onClick={() => navigate('/scan')}
            >
              Start your first scan →
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  </main>
</Hamburger>
  );
}