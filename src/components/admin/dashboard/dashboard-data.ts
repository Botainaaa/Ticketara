
// Mock data for charts
export const revenueData = [
  { name: '17', revenue: 4000, users: 2400 },
  { name: '18', revenue: 3000, users: 1398 },
  { name: '19', revenue: 5000, users: 3800 },
  { name: '20', revenue: 6000, users: 3908 },
  { name: '21', revenue: 4500, users: 4800 },
  { name: '22', revenue: 8000, users: 3800 },
  { name: '23', revenue: 9000, users: 4300 },
  { name: '24', revenue: 8500, users: 4100 },
  { name: '25', revenue: 9500, users: 5000 },
];

export const dailyTrafficData = [
  { name: '00', visitors: 400 },
  { name: '04', visitors: 1000 },
  { name: '08', visitors: 1600 },
  { name: '12', visitors: 900 },
  { name: '14', visitors: 1800 },
  { name: '16', visitors: 2000 },
  { name: '18', visitors: 1400 },
];

// Top matches mock data
export const topMatchesData = [
  { name: 'Brazil vs Germany', quantity: 742, progress: 75 },
  { name: 'Egypt vs Denmark', quantity: 1902, progress: 30 },
  { name: 'France vs Germany', quantity: 9123, progress: 80 },
  { name: 'Italy vs Germany', quantity: 1102, progress: 45 },
];

// Tasks mock data
export const tasksData = [
  { id: 1, name: 'Landing Page Design', completed: false },
  { id: 2, name: 'Dashboard Builder', completed: true },
  { id: 3, name: 'Mobile App Design', completed: true },
  { id: 4, name: 'Illustrations', completed: false },
  { id: 5, name: 'Promotional LP', completed: true },
];

// Table data
export const tableData = [
  { name: 'Horizon UI PRO', progress: 17.5, quantity: 2458, date: '12 Jan 2021', checked: false },
  { name: 'Horizon UI Free', progress: 10.8, quantity: 1485, date: '21 Feb 2021', checked: true },
  { name: 'Weekly Update', progress: 21.3, quantity: 1024, date: '13 Mar 2021', checked: true },
  { name: 'Venus 3D Asset', progress: 31.5, quantity: 858, date: '24 Jan 2021', checked: true },
  { name: 'Marketplace', progress: 12.2, quantity: 258, date: '24 Oct 2022', checked: false },
];

// Calendar data
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

// Stat cards data
export const statCardsData = [
  { 
    title: "Total Revenue", 
    value: "$37.5K", 
    change: "+12.45%", 
    icon: "DollarSign",
    description: "Total Spent"
  },
  { 
    title: "Daily Traffic", 
    value: "2,579", 
    change: "+2.45%", 
    icon: "Users",
    description: "Visitors"
  },
  { 
    title: "Tickets Sold", 
    value: "5,720", 
    change: "+15.2%", 
    icon: "ShoppingCart",
    description: "Last 30 days"
  },
  { 
    title: "Avg. Order Value", 
    value: "$89.54", 
    change: "+5.3%", 
    icon: "CreditCard",
    description: "Per purchase"
  },
];
