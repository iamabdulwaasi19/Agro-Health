import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Clock, Inbox } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Navbar } from '../Navbar';
// import { Sidebar } from '../Sidebar';
import { Hamburger } from '../Hamburger';
import { ImageWithFallback } from './images/ImageWithFallback';

export function Dashboard() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('Farmer');
  const [userDiagnoses, setUserDiagnoses] = useState([]);

  // useEffect(() => {
  //   const fullName = localStorage.getItem('userName');
  //   if (fullName) {
  //     // eslint-disable-next-line react-hooks/set-state-in-effect
  //     setFirstName(fullName.split(' ')[0]);
  //   }
  // }, []);

//   useEffect(() => {
//   // 1. Try the direct 'userName' key
//   let storedName = localStorage.getItem('userName');

//   // 2. If that's missing, try parsing the 'user' object
//   if (!storedName || storedName === "undefined") {
//     const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
//     storedName = savedUser.fullName;
//   }

//   if (storedName && storedName !== "undefined") {
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     setFirstName(storedName.split(' ')[0]);
//   } else {
//     setFirstName('Farmer'); // Fallback
//   }
// }, []);

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
    const savedData = JSON.parse(localStorage.getItem('userAnalysis') || '[]');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserDiagnoses(savedData);
  }, []);

  return (
    <Hamburger>
        <main className="flex-1 p-6 lg:p-8 max-w-[1440px] mx-auto w-full"> 
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-[#1C8C36] text-2xl font-bold mb-2">Welcome back, {firstName}!</h1>
            <p className="text-[#1C8C36] dark:text-gray-400">
              Diagnose your crops and get instant treatment recommendations
            </p>
          </div>

          {/* Upload Image Card */}
          <div className="flex justify-center mb-12">
            <Card
              className="cursor-pointer hover:shadow-xl transition-all border-[#A3E635] border-2 w-full max-w-xl group"
              onClick={() => navigate('/scan')}
            >
              <CardHeader className="flex flex-col items-center text-center">
                <div className="bg-[#1C8C36] rounded-full p-6 w-fit mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-[#1C8C36] text-2xl">Upload Image</CardTitle>
                <CardDescription className="text-base max-w-sm">
                  Click here to upload a plant leaf photo for AI-powered disease analysis
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Recent Diagnoses Section */}
          <Card className="bg-[#F9FAF9] dark:border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-[#1C8C36]">Recent Diagnoses</CardTitle>
                <CardDescription>Your personal crop health history</CardDescription>
              </div>
              {userDiagnoses.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => navigate('/saved')}
                  className="border-[#1C8C36] text-[#1C8C36] hover:bg-[#1C8C36] hover:text-white"
                >
                  View All
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {userDiagnoses.length > 0 ? (
                <div className="space-y-4">
                  {userDiagnoses.map((diagnosis) => (
                    <div
                      key={diagnosis.id}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-[#F0FDF4] dark:hover:bg-[#2D2D2D] cursor-pointer transition-colors border dark:border-gray-800"
                      onClick={() => navigate('/diagnosis-detail')}
                    >
                      <ImageWithFallback
                        src={diagnosis.image}
                        alt={diagnosis.disease}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-[#1C8C36] font-semibold">{diagnosis.disease}</h3>
                        <div className="flex items-center gap-4 text-[#4B5563] dark:text-gray-400 mt-1 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{diagnosis.date}</span>
                          </div>
                          <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded text-xs font-medium">
                            {diagnosis.confidence} Match
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Displays when user has no analysis or Using for the first time */
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="bg-gray-100 dark:bg-green-600 p-4 rounded-full mb-4">
                    <Inbox className="h-12 w-12 text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-lg italic">
                    Your analysis history will be displayed here
                  </p>
                  <Button 
                    variant="link" 
                    className="text-[#1C8C36] mt-2"
                    onClick={() => navigate('/scan')}
                  >
                    Start your first scan
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
        </Hamburger>
  );
}