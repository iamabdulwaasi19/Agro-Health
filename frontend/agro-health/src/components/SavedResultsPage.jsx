import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Search, Filter, ArrowUp } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Navbar } from '../Navbar';
import { Sidebar } from '../Sidebar';
import { Hamburger } from '../Hamburger';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from './ui/table';
import { ImageWithFallback } from './images/ImageWithFallback';

export function SavedResultsPage() {
  const navigate = useNavigate();
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://agro-health.onrender.com/api/scan/history', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        
        if (data.success) {
          // 4. Update the state with the history from MongoDB
          setResults(data.history); 
        }
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);


  // Listener to show "Back to Top" button after scrolling 400px
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // return (
  //   <Hamburger>
  //     <div className="relative flex min-h-screen">
  //       <main className="flex-1 p-6 lg:p-8 max-w-[1440px] mx-auto w-full">
  //         <h1 className="text-[#1C8C36] mb-8">Saved Results</h1>

  //         {/* Search and Filter */}
  //         <Card className="p-6 mb-6">
  //           <div className="flex flex-col sm:flex-row gap-4">
  //             <div className="relative flex-1">
  //               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4B5563]" />
  //               <Input
  //                 placeholder="Search by disease name..."
  //                 className="pl-10"
  //               />
  //             </div>
  //             <Button
  //               variant="outline"
  //               className="border-[#1C8C36] text-[#1C8C36] hover:bg-[#1C8C36] hover:text-white"
  //             >
  //               <Filter className="h-5 w-5 mr-2" />
  //               Filter
  //             </Button>
  //           </div>
  //         </Card>

  //         {/* Desktop Table View */}
  //         <Card className="hidden md:block overflow-hidden">
  //           <Table>
  //             <TableHeader>
  //               <TableRow>
  //                 <TableHead>Image</TableHead>
  //                 <TableHead>Disease Name</TableHead>
  //                 <TableHead>Date</TableHead>
  //                 <TableHead>Confidence</TableHead>
  //                 <TableHead>Severity</TableHead>
  //               </TableRow>
  //             </TableHeader>
  //             <TableBody>
  //               {savedResults.map((result) => (
  //                 <TableRow
  //                   key={result.id}
  //                   className="cursor-pointer hover:bg-[#90f790]"
  //                   onClick={() => navigate('/diagnosis-detail')}
  //                 >
  //                   <TableCell>
  //                     <ImageWithFallback
  //                       src={result.image}
  //                       alt={result.disease}
  //                       className="w-16 h-16 rounded-lg object-cover"
  //                     />
  //                   </TableCell>
  //                   <TableCell className="text-[#1C8C36]">
  //                     {result.disease}
  //                   </TableCell>
  //                   <TableCell className="text-[#4B5563]">{result.date}</TableCell>
  //                   <TableCell className="text-[#4B5563]">
  //                     {result.confidence}
  //                   </TableCell>
  //                   <TableCell>
  //                     <Badge
  //                       variant={
  //                         result.severity === 'Severe'
  //                           ? 'destructive'
  //                           : result.severity === 'Moderate'
  //                           ? 'default'
  //                           : 'secondary'
  //                       }
  //                       className={
  //                         result.severity === 'Severe'
  //                           ? 'bg-red-500'
  //                           : result.severity === 'Moderate'
  //                           ? 'bg-[#A3E635] text-[#1C8C36]'
  //                           : 'bg-gray-200 text-gray-700'
  //                       }
  //                     >
  //                       {result.severity}
  //                     </Badge>
  //                   </TableCell>
  //                 </TableRow>
  //               ))}
  //             </TableBody>
  //           </Table>
  //         </Card>

  //         {/* Mobile Card Grid View */}
  //         <div className="md:hidden grid gap-4">
  //           {savedResults.map((result) => (
  //             <Card
  //               key={result.id}
  //               className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
  //               onClick={() => navigate('/diagnosis-detail')}
  //             >
  //               <div className="flex gap-4">
  //                 <ImageWithFallback
  //                   src={result.image}
  //                   alt={result.disease}
  //                   className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
  //                 />
  //                 <div className="flex-1 space-y-2">
  //                   <h3 className="text-[#1C8C36]">{result.disease}</h3>
  //                   <div className="flex items-center gap-2 text-[#4B5563]">
  //                     <span>{result.date}</span>
  //                     <span>•</span>
  //                     <span>{result.confidence}</span>
  //                   </div>
  //                   <Badge
  //                     variant={
  //                       result.severity === 'Severe'
  //                         ? 'destructive'
  //                         : result.severity === 'Moderate'
  //                         ? 'default'
  //                         : 'secondary'
  //                     }
  //                     className={
  //                       result.severity === 'Severe'
  //                         ? 'bg-red-500'
  //                         : result.severity === 'Moderate'
  //                         ? 'bg-[#A3E635] text-[#1C8C36]'
  //                         : 'bg-gray-200 text-gray-700'
  //                     }
  //                   >
  //                     {result.severity}
  //                   </Badge>
  //                 </div>
  //               </div>
  //             </Card>
  //           ))}

  //             {showTopBtn && (
  //           <Button
  //             onClick={goToTop}
  //             className="fixed bottom-8 right-8 rounded-full p-4 bg-[#1C8C36] text-white shadow-2xl hover:bg-[#156d2a] transition-all animate-bounce"
  //             size="icon"
  //           >
  //             <ArrowUp className="h-6 w-6" />
  //           </Button>
  //         )}
  //         </div>
  //       </main>
  //       </div>
  //     </Hamburger>
  // );
// }


return (
    <Hamburger>
      <main className="flex-1 p-6 lg:p-8 max-w-[1440px] mx-auto w-full">
        <h1 className="text-[#1C8C36] mb-8 font-bold text-2xl">Saved Results</h1>

        <Card className="hidden md:block overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Disease Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Severity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* 5. Map through 'results' instead of 'savedResults' */}
              {results.length > 0 ? (
                results.map((result) => (
                  <TableRow
                    key={result._id} // MongoDB uses _id
                    className="cursor-pointer hover:bg-[#F0FDF4] transition-colors"
                    onClick={() => navigate('/diagnosis-result', { state: { result } })}
                  >
                    <TableCell>
                      <ImageWithFallback
                        src={result.imagePath}
                        alt={result.label}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    </TableCell>
                    <TableCell className="text-[#1C8C36] font-medium">
                      {result.label}
                    </TableCell>
                    <TableCell className="text-[#4B5563]">
                      {new Date(result.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-[#4B5563]">
                      {result.confidence}%
                    </TableCell>
                    <TableCell>
                       {/* Your Badge Logic here */}
                       <Badge
                      variant={
                        result.severity === 'Severe'
                          ? 'destructive'
                          : result.severity === 'Moderate'
                          ? 'default'
                          : 'secondary'
                      }
                      className={
                        result.severity === 'Severe'
                          ? 'bg-red-500'
                          : result.severity === 'Moderate'
                          ? 'bg-[#A3E635] text-[#1C8C36]'
                          : 'bg-gray-200 text-gray-700'
                      }
                    >
                      {result.severity}
                    </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-20 text-gray-400">
                    {loading ? "Loading history..." : "No saved results found."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Back to Top Button */}
        {/* <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-10 right-10 bg-[#1C8C36] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform hidden md:flex"
        >
          <ArrowUp className="h-6 w-6" />
        </button> */}

        {showTopBtn && (
          <Button
            onClick={goToTop}
            className="fixed bottom-8 right-8 rounded-full p-4 bg-[#1C8C36] text-white shadow-2xl hover:bg-[#156d2a] transition-all animate-bounce"
             size="icon"
           >
            <ArrowUp className="h-6 w-6" />
           </Button>
         )}
      </main>
    </Hamburger>
  );
}