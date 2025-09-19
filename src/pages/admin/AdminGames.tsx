
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Calendar, 
  MapPin,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Users
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Expanded mock data for games with full group matches
const gamesData = [
  // Group A
  { 
    id: 1, 
    title: "Morocco vs Mali", 
    location: "Mohammed V Stadium, Casablanca", 
    date: "2025-01-15", 
    time: "18:00", 
    totalSeats: 99000, 
    availableSeats: 15000, 
    price: 120,
    group: "A" 
  },
  { 
    id: 2, 
    title: "Morocco vs Zambia", 
    location: "Grand Stade de Rabat, Rabat", 
    date: "2025-01-19", 
    time: "16:00", 
    totalSeats: 75000, 
    availableSeats: 18000, 
    price: 100,
    group: "A"
  },
  { 
    id: 3, 
    title: "Morocco vs Comoros", 
    location: "Stade de Marrakech, Marrakech", 
    date: "2025-01-23", 
    time: "18:00", 
    totalSeats: 45000, 
    availableSeats: 12500, 
    price: 110,
    group: "A"
  },
  { 
    id: 4, 
    title: "Mali vs Zambia", 
    location: "Mohammed V Stadium, Casablanca", 
    date: "2025-01-20", 
    time: "16:00", 
    totalSeats: 65000, 
    availableSeats: 22000, 
    price: 80,
    group: "A"
  },
  { 
    id: 5, 
    title: "Mali vs Comoros", 
    location: "Grand Stade de Tangier, Tangier", 
    date: "2025-01-24", 
    time: "19:00", 
    totalSeats: 45000, 
    availableSeats: 15000, 
    price: 90,
    group: "A"
  },
  { 
    id: 6, 
    title: "Zambia vs Comoros", 
    location: "Stade Adrar, Agadir", 
    date: "2025-01-27", 
    time: "16:00", 
    totalSeats: 40000, 
    availableSeats: 20000, 
    price: 70,
    group: "A"
  },

  // Group B
  { 
    id: 7, 
    title: "Egypt vs South Africa", 
    location: "Grand Stade de Rabat, Rabat", 
    date: "2025-01-18", 
    time: "19:00", 
    totalSeats: 75000, 
    availableSeats: 8000, 
    price: 95,
    group: "B"
  },
  { 
    id: 8, 
    title: "Egypt vs Ghana", 
    location: "Mohammed V Stadium, Casablanca", 
    date: "2025-01-22", 
    time: "18:00", 
    totalSeats: 68000, 
    availableSeats: 12000, 
    price: 100,
    group: "B"
  },
  { 
    id: 9, 
    title: "Egypt vs Mozambique", 
    location: "Stade de Marrakech, Marrakech", 
    date: "2025-01-26", 
    time: "16:00", 
    totalSeats: 45000, 
    availableSeats: 15000, 
    price: 85,
    group: "B"
  },
  { 
    id: 10, 
    title: "South Africa vs Ghana", 
    location: "Grand Stade de Tangier, Tangier", 
    date: "2025-01-21", 
    time: "19:00", 
    totalSeats: 45000, 
    availableSeats: 18000, 
    price: 80,
    group: "B"
  },
  { 
    id: 11, 
    title: "South Africa vs Mozambique", 
    location: "Stade Adrar, Agadir", 
    date: "2025-01-25", 
    time: "16:00", 
    totalSeats: 40000, 
    availableSeats: 25000, 
    price: 70,
    group: "B"
  },
  { 
    id: 12, 
    title: "Ghana vs Mozambique", 
    location: "Mohammed V Stadium, Casablanca", 
    date: "2025-01-29", 
    time: "18:00", 
    totalSeats: 65000, 
    availableSeats: 30000, 
    price: 75,
    group: "B"
  },

  // Group C
  { 
    id: 13, 
    title: "Nigeria vs Tunisia", 
    location: "Stade de Marrakech, Marrakech", 
    date: "2025-01-20", 
    time: "16:00", 
    totalSeats: 75000, 
    availableSeats: 12000, 
    price: 85,
    group: "C"
  },
  { 
    id: 14, 
    title: "Nigeria vs Angola", 
    location: "Grand Stade de Rabat, Rabat", 
    date: "2025-01-24", 
    time: "18:00", 
    totalSeats: 60000, 
    availableSeats: 22000, 
    price: 90,
    group: "C"
  },
  { 
    id: 15, 
    title: "Nigeria vs Guinea", 
    location: "Mohammed V Stadium, Casablanca", 
    date: "2025-01-28", 
    time: "16:00", 
    totalSeats: 70000, 
    availableSeats: 25000, 
    price: 95,
    group: "C"
  },
  { 
    id: 16, 
    title: "Tunisia vs Angola", 
    location: "Stade Adrar, Agadir", 
    date: "2025-01-23", 
    time: "19:00", 
    totalSeats: 40000, 
    availableSeats: 15000, 
    price: 75,
    group: "C"
  },
  { 
    id: 17, 
    title: "Tunisia vs Guinea", 
    location: "Grand Stade de Tangier, Tangier", 
    date: "2025-01-27", 
    time: "18:00", 
    totalSeats: 45000, 
    availableSeats: 18000, 
    price: 80,
    group: "C"
  },
  { 
    id: 18, 
    title: "Angola vs Guinea", 
    location: "Stade de Marrakech, Marrakech", 
    date: "2025-01-30", 
    time: "16:00", 
    totalSeats: 45000, 
    availableSeats: 20000, 
    price: 70,
    group: "C"
  },

  // Group D
  { 
    id: 19, 
    title: "Senegal vs DR Congo", 
    location: "Stade Adrar, Agadir", 
    date: "2025-01-22", 
    time: "19:00", 
    totalSeats: 48000, 
    availableSeats: 5000, 
    price: 110,
    group: "D"
  },
  { 
    id: 20, 
    title: "Senegal vs Guinea-Bissau", 
    location: "Mohammed V Stadium, Casablanca", 
    date: "2025-01-26", 
    time: "18:00", 
    totalSeats: 70000, 
    availableSeats: 15000, 
    price: 105,
    group: "D"
  },
  { 
    id: 21, 
    title: "Senegal vs Mauritania", 
    location: "Grand Stade de Rabat, Rabat", 
    date: "2025-01-30", 
    time: "19:00", 
    totalSeats: 65000, 
    availableSeats: 20000, 
    price: 95,
    group: "D"
  },
  { 
    id: 22, 
    title: "DR Congo vs Guinea-Bissau", 
    location: "Stade de Marrakech, Marrakech", 
    date: "2025-01-25", 
    time: "16:00", 
    totalSeats: 45000, 
    availableSeats: 25000, 
    price: 75,
    group: "D"
  },
  { 
    id: 23, 
    title: "DR Congo vs Mauritania", 
    location: "Grand Stade de Tangier, Tangier", 
    date: "2025-01-29", 
    time: "16:00", 
    totalSeats: 45000, 
    availableSeats: 28000, 
    price: 70,
    group: "D"
  },
  { 
    id: 24, 
    title: "Guinea-Bissau vs Mauritania", 
    location: "Stade Adrar, Agadir", 
    date: "2025-02-01", 
    time: "18:00", 
    totalSeats: 40000, 
    availableSeats: 30000, 
    price: 65,
    group: "D"
  },

  // Group E
  { 
    id: 25, 
    title: "Algeria vs Burkina Faso", 
    location: "Mohammed V Stadium, Casablanca", 
    date: "2025-01-24", 
    time: "16:00", 
    totalSeats: 41000, 
    availableSeats: 9000, 
    price: 75,
    group: "E"
  },
  { 
    id: 26, 
    title: "Algeria vs Namibia", 
    location: "Grand Stade de Rabat, Rabat", 
    date: "2025-01-28", 
    time: "18:00", 
    totalSeats: 65000, 
    availableSeats: 15000, 
    price: 85,
    group: "E"
  },
  { 
    id: 27, 
    title: "Algeria vs Ethiopia", 
    location: "Stade de Marrakech, Marrakech", 
    date: "2025-02-01", 
    time: "16:00", 
    totalSeats: 45000, 
    availableSeats: 18000, 
    price: 80,
    group: "E"
  },
  { 
    id: 28, 
    title: "Burkina Faso vs Namibia", 
    location: "Stade Adrar, Agadir", 
    date: "2025-01-27", 
    time: "19:00", 
    totalSeats: 40000, 
    availableSeats: 25000, 
    price: 70,
    group: "E"
  },
  { 
    id: 29, 
    title: "Burkina Faso vs Ethiopia", 
    location: "Grand Stade de Tangier, Tangier", 
    date: "2025-01-31", 
    time: "18:00", 
    totalSeats: 45000, 
    availableSeats: 28000, 
    price: 65,
    group: "E"
  },
  { 
    id: 30, 
    title: "Namibia vs Ethiopia", 
    location: "Mohammed V Stadium, Casablanca", 
    date: "2025-02-03", 
    time: "16:00", 
    totalSeats: 65000, 
    availableSeats: 35000, 
    price: 60,
    group: "E"
  },

  // Group F
  { 
    id: 31, 
    title: "Ivory Coast vs Cameroon", 
    location: "Grand Stade de Tangier, Tangier", 
    date: "2025-01-25", 
    time: "19:00", 
    totalSeats: 65000, 
    availableSeats: 11000, 
    price: 90,
    group: "F"
  },
  { 
    id: 32, 
    title: "Ivory Coast vs Benin", 
    location: "Mohammed V Stadium, Casablanca", 
    date: "2025-01-29", 
    time: "18:00", 
    totalSeats: 70000, 
    availableSeats: 15000, 
    price: 85,
    group: "F"
  },
  { 
    id: 33, 
    title: "Ivory Coast vs Rwanda", 
    location: "Grand Stade de Rabat, Rabat", 
    date: "2025-02-02", 
    time: "16:00", 
    totalSeats: 65000, 
    availableSeats: 20000, 
    price: 80,
    group: "F"
  },
  { 
    id: 34, 
    title: "Cameroon vs Benin", 
    location: "Stade de Marrakech, Marrakech", 
    date: "2025-01-28", 
    time: "19:00", 
    totalSeats: 45000, 
    availableSeats: 25000, 
    price: 75,
    group: "F"
  },
  { 
    id: 35, 
    title: "Cameroon vs Rwanda", 
    location: "Stade Adrar, Agadir", 
    date: "2025-02-01", 
    time: "18:00", 
    totalSeats: 40000, 
    availableSeats: 28000, 
    price: 70,
    group: "F"
  },
  { 
    id: 36, 
    title: "Benin vs Rwanda", 
    location: "Grand Stade de Tangier, Tangier", 
    date: "2025-02-04", 
    time: "16:00", 
    totalSeats: 45000, 
    availableSeats: 30000, 
    price: 65,
    group: "F"
  },

  // Special Matches
  { 
    id: 37, 
    title: "Brazil vs Spain", 
    location: "Mohammed V Stadium, Casablanca", 
    date: "2025-02-10", 
    time: "20:00", 
    totalSeats: 75000, 
    availableSeats: 10000, 
    price: 150,
    group: "special"
  },
  { 
    id: 38, 
    title: "Morocco vs Portugal", 
    location: "Grand Stade de Rabat, Rabat", 
    date: "2025-02-15", 
    time: "19:00", 
    totalSeats: 65000, 
    availableSeats: 8000, 
    price: 140,
    group: "special"
  }
];

const AdminGames = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  
  const filteredGames = gamesData.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          game.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === "" || game.group === selectedGroup;
    
    return matchesSearch && matchesGroup;
  });
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-morocco-darkblue">Games Management</h1>
        <Button className="bg-morocco-red hover:bg-morocco-red/90 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Game
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Games Overview</CardTitle>
          <CardDescription>
            Manage all football games, their locations, times, and pricing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search games by title or location..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-[200px]">
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Groups</SelectItem>
                  <SelectItem value="A">Group A</SelectItem>
                  <SelectItem value="B">Group B</SelectItem>
                  <SelectItem value="C">Group C</SelectItem>
                  <SelectItem value="D">Group D</SelectItem>
                  <SelectItem value="E">Group E</SelectItem>
                  <SelectItem value="F">Group F</SelectItem>
                  <SelectItem value="special">Special Matches</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Game Title</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Available Seats</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGames.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center h-32 text-muted-foreground">
                      No games found matching your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredGames.map((game) => (
                    <TableRow key={game.id}>
                      <TableCell className="font-medium">{game.title}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                          Group {game.group}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          {game.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          {formatDate(game.date)} at {game.time}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`${
                          game.availableSeats / game.totalSeats < 0.1 
                            ? 'text-morocco-red' 
                            : game.availableSeats / game.totalSeats < 0.3 
                              ? 'text-amber-500' 
                              : 'text-morocco-green'
                        }`}>
                          {game.availableSeats.toLocaleString()}
                        </span> 
                        <span className="text-muted-foreground text-xs">
                          /{game.totalSeats.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>${game.price}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-morocco-red">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing <strong>{filteredGames.length}</strong> of <strong>{gamesData.length}</strong> games
            </p>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="bg-morocco-red/10 text-morocco-red">
                1
              </Button>
              <Button variant="outline" size="icon">
                2
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminGames;
