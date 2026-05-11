import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Search, Filter, ArrowUp } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Navbar } from "../Navbar";
import { Sidebar } from "../Sidebar";
import { Hamburger } from "../Hamburger";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ImageWithFallback } from "./images/ImageWithFallback";

export function SavedResultsPage(darkMode, setDarkMode) {
  const navigate = useNavigate();
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Handles fetching user history from backend API
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://agro-health.onrender.com/api/scan/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();

        if (data.success) {
          // Update the state with the history from MongoDB
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Hamburger darkMode={darkMode} setDarkMode={setDarkMode}>
      <main className="flex-1 p-6 lg:p-8 max-w-[1440px] mx-auto w-full">
        <h1 className="text-[#1C8C36] mb-8 font-bold text-2xl">
          Saved Results
        </h1>

        <Card className="w-full block overflow-x-auto">
          <Table className="min-w-[600px] md:w-full">
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
              {/* Map through 'results' instead of 'savedResults' */}
              {results.length > 0 ? (
                results.map((result) => (
                  <TableRow
                    key={result._id}
                    className="cursor-pointer hover:bg-[#F0FDF4] transition-colors"
                    onClick={() =>
                      navigate("/diagnosis-details", { state: { result } })
                    }
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
                      {result.confidence < 1
                        ? (result.confidence * 100).toFixed(0)
                        : result.confidence}
                      %
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          result.severity?.toLowerCase() === "severe"
                            ? "destructive"
                            : result.severity?.toLowerCase() === "moderate"
                              ? "default"
                              : "secondary"
                        }
                        className={
                          result.severity?.toLowerCase() === "severe"
                            ? "bg-red-500"
                            : result.severity?.toLowerCase() === "moderate"
                              ? "bg-[#A3E635] text-[#1C8C36]"
                              : "bg-gray-200 text-gray-700"
                        }
                      >
                        {result.severity || "Unknown"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-20 text-gray-400"
                  >
                    {loading ? "Loading history..." : "No saved results found."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>

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
