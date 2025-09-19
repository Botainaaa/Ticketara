
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Ticket {
  order_id: number;
  game_id: number;
  total_amount: number;
  created_at: string;
  seats: string;
}

const UserProfile = () => {
  const { user, token, isAuthenticated, logout } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    } else if (isAuthenticated && token) {
      fetchUserTickets();
    }
  }, [isAuthenticated, token]);

  const fetchUserTickets = async () => {
    if (!token) return;
    
    try {
      setIsLoading(true);
      const response = await api.getUserTickets(token);
      setTickets(response.tickets);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load your tickets"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Hello, {user?.name}!</h1>
          <p className="text-gray-600 mt-1">{user?.email}</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>Sign Out</Button>
      </div>

      <Tabs defaultValue="tickets" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="account">Account Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Your Purchased Tickets</h2>
            
            {isLoading ? (
              <div className="text-center py-8">
                <div className="h-8 w-8 border-t-2 border-r-2 border-morocco-red rounded-full animate-spin mx-auto mb-2"></div>
                <p>Loading your tickets...</p>
              </div>
            ) : tickets.length > 0 ? (
              <div className="grid gap-4">
                {tickets.map((ticket) => (
                  <Card key={ticket.order_id}>
                    <CardHeader>
                      <CardTitle>Order #{ticket.order_id}</CardTitle>
                      <CardDescription>
                        Purchased on {format(new Date(ticket.created_at), "MMMM d, yyyy 'at' h:mm a")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Game ID:</span>
                          <span>{ticket.game_id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Seats:</span>
                          <span>{ticket.seats}</span>
                        </div>
                        <div className="flex justify-between text-morocco-red">
                          <span className="font-medium">Total:</span>
                          <span className="font-bold">${ticket.total_amount}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => navigate(`/games/${ticket.game_id}`)}
                      >
                        View Game Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500 mb-4">You haven't purchased any tickets yet</p>
                <Button onClick={() => navigate("/games")}>Browse Games</Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="account">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Account Information</h2>
            <Card>
              <CardHeader>
                <CardTitle>Personal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{user?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
