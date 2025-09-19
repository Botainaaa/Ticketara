
import { useState } from "react";
import { 
  Table, 
  TableBody, 
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
  MapPin,
  Globe,
  ArrowUpDown,
  ImageIcon,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for destinations
const destinationsData = [
  { 
    id: 1, 
    name: "Barcelona", 
    country: "Spain", 
    description: "Home of FC Barcelona and Camp Nou stadium",
    hasPackages: true,
    popularity: "High",
    imageUrl: "https://via.placeholder.com/150",
  },
  { 
    id: 2, 
    name: "Manchester", 
    country: "United Kingdom", 
    description: "Famous for Manchester United and Manchester City",
    hasPackages: true,
    popularity: "High",
    imageUrl: "https://via.placeholder.com/150", 
  },
  { 
    id: 3, 
    name: "Munich", 
    country: "Germany", 
    description: "Home to Bayern Munich and Allianz Arena",
    hasPackages: true,
    popularity: "Medium",
    imageUrl: "https://via.placeholder.com/150", 
  },
  { 
    id: 4, 
    name: "Paris", 
    country: "France", 
    description: "Home of Paris Saint-Germain and Parc des Princes",
    hasPackages: false,
    popularity: "Medium",
    imageUrl: "https://via.placeholder.com/150", 
  },
  { 
    id: 5, 
    name: "Turin", 
    country: "Italy", 
    description: "Home to Juventus and Allianz Stadium",
    hasPackages: false,
    popularity: "Low",
    imageUrl: "https://via.placeholder.com/150", 
  },
];

const AdminDestinations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredDestinations = destinationsData.filter(destination => 
    destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    destination.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-morocco-darkblue">Destinations Management</h1>
        <Button className="bg-morocco-red hover:bg-morocco-red/90 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Destination
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Destinations Overview</CardTitle>
          <CardDescription>
            Manage all travel destinations for football tourism packages.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search destinations by name or country..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
                  <TableHead>Destination</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Packages</TableHead>
                  <TableHead>Popularity</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDestinations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-32 text-muted-foreground">
                      No destinations found matching your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDestinations.map((destination) => (
                    <TableRow key={destination.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                            {destination.imageUrl ? (
                              <img 
                                src={destination.imageUrl} 
                                alt={destination.name} 
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <ImageIcon className="h-6 w-6 text-muted-foreground" />
                            )}
                          </div>
                          <span className="font-medium">{destination.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                          {destination.country}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[300px] truncate">
                        {destination.description}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          destination.hasPackages 
                            ? 'bg-morocco-green/10 text-morocco-green' 
                            : 'bg-morocco-red/10 text-morocco-red'
                        }`}>
                          {destination.hasPackages ? 'Available' : 'None'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`${
                          destination.popularity === 'High' 
                            ? 'text-morocco-green' 
                            : destination.popularity === 'Medium'
                              ? 'text-amber-500' 
                              : 'text-muted-foreground'
                        }`}>
                          {destination.popularity}
                        </span>
                      </TableCell>
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
              Showing <strong>{filteredDestinations.length}</strong> of <strong>{destinationsData.length}</strong> destinations
            </p>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="bg-morocco-red/10 text-morocco-red">
                1
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

export default AdminDestinations;
