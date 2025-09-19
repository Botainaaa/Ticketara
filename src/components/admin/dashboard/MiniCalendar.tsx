
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MiniCalendarProps {
  currentMonth: string;
  currentYear: number;
  days: string[];
}

const MiniCalendar = ({ currentMonth, currentYear, days }: MiniCalendarProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          {currentMonth} {currentYear}
        </CardTitle>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 text-center text-xs">
          {days.map((day, index) => (
            <div key={index} className="py-1">
              <div>{day}</div>
              <div className="text-[10px] text-muted-foreground">{['N', 'E', 'D', 'U', 'T', 'N'][index]}</div>
            </div>
          ))}
          
          {/* Empty cells for previous month */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`prev-${i}`} className="rounded-md py-1.5 text-muted-foreground">
              {24 + i}
            </div>
          ))}
          
          {/* Actual month days */}
          {Array.from({ length: 31 }).map((_, i) => (
            <div 
              key={`day-${i}`} 
              className={`rounded-md py-1.5 ${i === 16 ? "bg-morocco-red text-white" : ""}`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MiniCalendar;
