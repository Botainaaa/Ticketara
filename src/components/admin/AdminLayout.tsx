
import { useState, ReactNode } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  Gamepad2, 
  MapPin, 
  Users, 
  LogOut,
  Search
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from '@/contexts/LanguageContext';

// Define the sidebar trigger as a regular component, not as a function that produces ReactNode
const SidebarTrigger = ({ isCollapsed }: { isCollapsed: boolean }) => (
  <Button
    variant="ghost"
    size="icon"
    className="hidden md:flex h-9 w-9 absolute right-[-18px] top-7 rounded-full border shadow-md"
  >
    {isCollapsed ? (
      <ChevronRight className="h-4 w-4" />
    ) : (
      <ChevronLeft className="h-4 w-4" />
    )}
  </Button>
);

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const isLinkActive = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300",
          isCollapsed ? "w-[70px]" : "w-64"
        )}
      >
        <div className="h-full px-3 py-4 overflow-y-auto relative">
          <div className="flex items-center justify-between mb-8">
            {!isCollapsed && (
              <Link to="/">
                <img 
                  src="/lovable-uploads/f3c0216f-c271-49c7-88f8-87616e547aca.png" 
                  alt="TicketAra" 
                  className="h-10"
                />
              </Link>
            )}
            
            {/* Use the SidebarTrigger as JSX, not as a function */}
            <div onClick={toggleSidebar} className="cursor-pointer">
              <SidebarTrigger isCollapsed={isCollapsed} />
            </div>
          </div>
          
          {!isCollapsed && (
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder={t('admin.search')}
                  className="pl-8 bg-gray-50 border-gray-200"
                />
              </div>
            </div>
          )}
          
          <ul className="space-y-2 font-medium">
            <li className="pt-4 pb-2">
              <span className={cn(
                "text-xs uppercase text-gray-500 font-semibold",
                isCollapsed && "hidden"
              )}>
                {t('admin.mainNavigation')}
              </span>
            </li>
            
            {/* Dashboard */}
            <li>
              <Link
                to="/admin"
                className={cn(
                  "flex items-center p-2 rounded-lg group hover:bg-gray-100",
                  isLinkActive('/admin') && !location.pathname.includes('/admin/') ? "bg-morocco-red text-white hover:bg-morocco-red/90" : "text-gray-700",
                  isCollapsed && "justify-center"
                )}
              >
                <LayoutDashboard className="w-5 h-5 transition duration-75" />
                {!isCollapsed && (
                  <span className="ml-3">{t('admin.dashboard')}</span>
                )}
              </Link>
            </li>
            
            {/* Games */}
            <li>
              <Link
                to="/admin/games"
                className={cn(
                  "flex items-center p-2 rounded-lg group hover:bg-gray-100",
                  isLinkActive('/admin/games') ? "bg-morocco-red text-white hover:bg-morocco-red/90" : "text-gray-700",
                  isCollapsed && "justify-center"
                )}
              >
                <Gamepad2 className="w-5 h-5 transition duration-75" />
                {!isCollapsed && (
                  <span className="ml-3">{t('admin.games')}</span>
                )}
              </Link>
            </li>
            
            {/* Destinations */}
            <li>
              <Link
                to="/admin/destinations"
                className={cn(
                  "flex items-center p-2 rounded-lg group hover:bg-gray-100",
                  isLinkActive('/admin/destinations') ? "bg-morocco-red text-white hover:bg-morocco-red/90" : "text-gray-700",
                  isCollapsed && "justify-center"
                )}
              >
                <MapPin className="w-5 h-5 transition duration-75" />
                {!isCollapsed && (
                  <span className="ml-3">{t('admin.destinations')}</span>
                )}
              </Link>
            </li>
            
            {/* Users */}
            <li>
              <Link
                to="/admin/users"
                className={cn(
                  "flex items-center p-2 rounded-lg group hover:bg-gray-100",
                  isLinkActive('/admin/users') ? "bg-morocco-red text-white hover:bg-morocco-red/90" : "text-gray-700",
                  isCollapsed && "justify-center"
                )}
              >
                <Users className="w-5 h-5 transition duration-75" />
                {!isCollapsed && (
                  <span className="ml-3">{t('admin.users')}</span>
                )}
              </Link>
            </li>
            
            {/* Separator */}
            <li className="py-4">
              <div className={cn(
                "h-px bg-gray-200",
                isCollapsed && "mx-2"
              )}></div>
            </li>
            
            {/* Logout */}
            <li>
              <Link
                to="/"
                className={cn(
                  "flex items-center p-2 rounded-lg text-gray-700 hover:bg-gray-100",
                  isCollapsed && "justify-center"
                )}
              >
                <LogOut className="w-5 h-5 transition duration-75" />
                {!isCollapsed && (
                  <span className="ml-3">{t('admin.logout')}</span>
                )}
              </Link>
            </li>
            
            {/* Return to site */}
            <li>
              <Link
                to="/"
                className={cn(
                  "flex items-center p-2 text-sm text-gray-600 hover:text-morocco-red",
                  isCollapsed && "justify-center"
                )}
              >
                {!isCollapsed && (
                  <span>{t('admin.returnToSite')}</span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Main content */}
      <div className={cn(
        "flex-1 transition-all duration-300",
        isCollapsed ? "md:ml-[70px]" : "md:ml-64"
      )}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
