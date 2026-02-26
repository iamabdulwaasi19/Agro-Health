import { Search, Filter } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Navbar } from '../Navbar';
import { Sidebar } from '../Sidebar';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { ImageWithFallback } from './figma/ImageWithFallback';

const savedResults = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1758903178566-81b9026340ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9wJTIwZGlzZWFzZSUyMHBsYW50fGVufDF8fHx8MTc2MjczNjMxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    disease: 'Tomato Late Blight',
    date: '2025-11-08',
    confidence: '94%',
    severity: 'Severe',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1682845504704-2f9a25bfc631?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMGxlYXZlcyUyMG5hdHVyZXxlbnwxfHx8fDE3NjI3MzYzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    disease: 'Wheat Rust',
    date: '2025-11-06',
    confidence: '87%',
    severity: 'Moderate',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1709489016628-d173053e7eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMGNyb3BzJTIwZmllbGR8ZW58MXx8fHwxNzYyNzE2MTcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    disease: 'Corn Leaf Spot',
    date: '2025-11-05',
    confidence: '91%',
    severity: 'Moderate',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1682845504704-2f9a25bfc631?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMGxlYXZlcyUyMG5hdHVyZXxlbnwxfHx8fDE3NjI3MzYzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    disease: 'Potato Early Blight',
    date: '2025-11-03',
    confidence: '89%',
    severity: 'Mild',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1758903178566-81b9026340ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9wJTIwZGlzZWFzZSUyMHBsYW50fGVufDF8fHx8MTc2MjczNjMxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    disease: 'Rice Blast',
    date: '2025-11-01',
    confidence: '96%',
    severity: 'Severe',
  },
];

export function SavedResultsPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-[#F9FAF9]">
      <Navbar onNavigate={onNavigate} />
      <div className="flex">
        <Sidebar currentPage="saved" onNavigate={onNavigate} />
        <main className="flex-1 p-6 lg:p-8 max-w-[1440px] mx-auto w-full">
          <h1 className="text-[#1C8C36] mb-8">Saved Results</h1>

          {/* Search and Filter */}
          <Card className="p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4B5563]" />
                <Input
                  placeholder="Search by disease name..."
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                className="border-[#1C8C36] text-[#1C8C36] hover:bg-[#1C8C36] hover:text-white"
              >
                <Filter className="h-5 w-5 mr-2" />
                Filter
              </Button>
            </div>
          </Card>

          {/* Desktop Table View */}
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
                {savedResults.map((result) => (
                  <TableRow
                    key={result.id}
                    className="cursor-pointer hover:bg-[#F9FAF9]"
                    onClick={() => onNavigate('diagnosis-detail')}
                  >
                    <TableCell>
                      <ImageWithFallback
                        src={result.image}
                        alt={result.disease}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    </TableCell>
                    <TableCell className="text-[#1C8C36]">
                      {result.disease}
                    </TableCell>
                    <TableCell className="text-[#4B5563]">{result.date}</TableCell>
                    <TableCell className="text-[#4B5563]">
                      {result.confidence}
                    </TableCell>
                    <TableCell>
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
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Mobile Card Grid View */}
          <div className="md:hidden grid gap-4">
            {savedResults.map((result) => (
              <Card
                key={result.id}
                className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onNavigate('diagnosis-detail')}
              >
                <div className="flex gap-4">
                  <ImageWithFallback
                    src={result.image}
                    alt={result.disease}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 space-y-2">
                    <h3 className="text-[#1C8C36]">{result.disease}</h3>
                    <div className="flex items-center gap-2 text-[#4B5563]">
                      <span>{result.date}</span>
                      <span>•</span>
                      <span>{result.confidence}</span>
                    </div>
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
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}