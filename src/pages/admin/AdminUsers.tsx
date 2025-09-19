
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
  Search, 
  Edit, 
  Trash2, 
  Mail,
  User,
  Calendar,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ShieldCheck,
  ShieldX
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for users
const usersData = [
  { 
    id: 1, 
    name: "John Doe", 
    email: "john.doe@example.com", 
    registeredDate: "2023-01-15", 
    lastActive: "2023-10-01",
    role: "Admin",
    status: "Active",
    ordersCount: 12,
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    email: "jane.smith@example.com", 
    registeredDate: "2023-02-22", 
    lastActive: "2023-09-28",
    role: "Customer",
    status: "Active",
    ordersCount: 8,
  },
  { 
    id: 3, 
    name: "Mark Johnson", 
    email: "mark.johnson@example.com", 
    registeredDate: "2023-03-10", 
    lastActive: "2023-09-30",
    role: "Customer",
    status: "Active",
    ordersCount: 5,
  },
  { 
    id: 4, 
    name: "Sarah Williams", 
    email: "sarah.williams@example.com", 
    registeredDate: "2023-04-05", 
    lastActive: "2023-08-15",
    role: "Customer",
    status: "Inactive",
    ordersCount: 3,
  },
  { 
    id: 5, 
    name: "Robert Brown", 
    email: "robert.brown@example.com", 
    registeredDate: "2023-05-20", 
    lastActive: "2023-09-25",
    role: "Support",
    status: "Active",
    ordersCount: 0,
  },
];

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredUsers = usersData.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-morocco-darkblue">Users Management</h1>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Users Overview</CardTitle>
          <CardDescription>
            Manage user accounts, permissions, and view their activity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users by name, email, or role..."
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
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center h-32 text-muted-foreground">
                      No users found matching your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-morocco-light flex items-center justify-center">
                            <User className="h-5 w-5 text-morocco-darkblue" />
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                          {user.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {user.role === "Admin" ? (
                            <ShieldCheck className="h-3.5 w-3.5 text-morocco-red" />
                          ) : user.role === "Support" ? (
                            <ShieldCheck className="h-3.5 w-3.5 text-morocco-green" />
                          ) : (
                            <ShieldX className="h-3.5 w-3.5 text-muted-foreground" />
                          )}
                          {user.role}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          {formatDate(user.registeredDate)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'Active' 
                            ? 'bg-morocco-green/10 text-morocco-green' 
                            : 'bg-morocco-red/10 text-morocco-red'
                        }`}>
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell>{user.ordersCount}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
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
              Showing <strong>{filteredUsers.length}</strong> of <strong>{usersData.length}</strong> users
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

export default AdminUsers;
