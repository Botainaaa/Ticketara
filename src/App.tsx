
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Games from "./pages/Games";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import SeatSelection from "./pages/SeatSelection";
import Payment from "./pages/Payment";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminGames from "./pages/admin/AdminGames";
import AdminDestinations from "./pages/admin/AdminDestinations";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminLayout from "./components/admin/AdminLayout";

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Main website routes */}
                <Route path="/" element={<><Navbar /><Index /></>} />
                <Route path="/games" element={<><Navbar /><Games /><Footer /></>} />
                <Route path="/destinations" element={<><Navbar /><Destinations /><Footer /></>} />
                <Route path="/destinations/:id" element={<><Navbar /><DestinationDetails /><Footer /></>} />
                <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
                <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
                <Route path="/seat-selection" element={<><Navbar /><SeatSelection /><Footer /></>} />
                <Route path="/payment" element={<><Navbar /><Payment /><Footer /></>} />
                <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
                <Route path="/signup" element={<><Navbar /><Signup /><Footer /></>} />
                <Route path="/profile" element={<><Navbar /><UserProfile /><Footer /></>} />
                
                {/* Admin dashboard routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="games" element={<AdminGames />} />
                  <Route path="destinations" element={<AdminDestinations />} />
                  <Route path="users" element={<AdminUsers />} />
                </Route>
                
                {/* Catch-all route */}
                <Route path="*" element={<><Navbar /><NotFound /><Footer /></>} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
