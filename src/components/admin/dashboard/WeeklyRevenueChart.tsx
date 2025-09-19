
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChartIcon } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

interface WeeklyRevenueChartProps {
  revenueData: {
    name: string;
    revenue: number;
    users: number;
  }[];
}

const WeeklyRevenueChart = ({ revenueData }: WeeklyRevenueChartProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Weekly Revenue</CardTitle>
        <BarChartIcon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="px-2">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Revenue
                            </span>
                            <span className="font-bold text-muted-foreground">
                              ${payload[0].value}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey="revenue" 
                stackId="a" 
                fill="#8884d8" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="users" 
                stackId="a" 
                fill="#82ca9d" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyRevenueChart;
