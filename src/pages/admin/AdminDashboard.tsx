
import { useState } from "react";
import { DollarSign, UsersIcon, ShoppingCart, CreditCard } from "lucide-react";

// Import components
import StatCard from "@/components/admin/dashboard/StatCard";
import TopMatchesCard from "@/components/admin/dashboard/TopMatchesCard";
import RevenueChart from "@/components/admin/dashboard/RevenueChart";
import WeeklyRevenueChart from "@/components/admin/dashboard/WeeklyRevenueChart";
import DailyTrafficChart from "@/components/admin/dashboard/DailyTrafficChart";
import CheckTable from "@/components/admin/dashboard/CheckTable";
import TasksCard from "@/components/admin/dashboard/TasksCard";
import MiniCalendar from "@/components/admin/dashboard/MiniCalendar";

// Import data
import { 
  revenueData, 
  dailyTrafficData, 
  topMatchesData, 
  tasksData, 
  tableData, 
  days
} from "@/components/admin/dashboard/dashboard-data";

const AdminDashboard = () => {
  const [currentMonth, setCurrentMonth] = useState('March');
  const [currentYear, setCurrentYear] = useState(2025);
  
  const statCards = [
    { 
      title: "Total Revenue", 
      value: "$37.5K", 
      change: "+12.45%", 
      icon: DollarSign,
      description: "Total Spent"
    },
    { 
      title: "Daily Traffic", 
      value: "2,579", 
      change: "+2.45%", 
      icon: UsersIcon,
      description: "Visitors"
    },
    { 
      title: "Tickets Sold", 
      value: "5,720", 
      change: "+15.2%", 
      icon: ShoppingCart,
      description: "Last 30 days"
    },
    { 
      title: "Avg. Order Value", 
      value: "$89.54", 
      change: "+5.3%", 
      icon: CreditCard,
      description: "Per purchase"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <StatCard 
            key={index}
            title={card.title}
            value={card.value}
            change={card.change}
            icon={card.icon}
            description={card.description}
          />
        ))}
      </div>

      {/* Top Matches and Revenue Chart */}
      <div className="grid gap-6 md:grid-cols-2">
        <TopMatchesCard matches={topMatchesData} />
        <RevenueChart revenueData={revenueData} />
      </div>

      {/* Weekly Revenue and Daily Traffic */}
      <div className="grid gap-6 md:grid-cols-2">
        <WeeklyRevenueChart revenueData={revenueData} />
        <DailyTrafficChart trafficData={dailyTrafficData} />
      </div>

      {/* Check Table and Tasks */}
      <div className="grid gap-6 md:grid-cols-2">
        <CheckTable tableData={tableData} />
        
        <div className="grid gap-6">
          <TasksCard tasks={tasksData} />
          <MiniCalendar 
            currentMonth={currentMonth}
            currentYear={currentYear}
            days={days}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
