
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  description: string;
}

const StatCard = ({ title, value, change, icon: Icon, description }: StatCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </CardContent>
      <CardFooter className="p-2">
        <span className={`flex items-center text-xs ${
          change.startsWith('+') ? 'text-green-600' : 'text-morocco-red'
        }`}>
          <TrendingUp className="mr-1 h-3 w-3" />
          {change}
        </span>
      </CardFooter>
    </Card>
  );
};

export default StatCard;
