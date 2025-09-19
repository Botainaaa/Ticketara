
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MatchData {
  name: string;
  quantity: number;
  progress: number;
}

interface TopMatchesCardProps {
  matches: MatchData[];
}

const TopMatchesCard = ({ matches }: TopMatchesCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Top 4 Matches</CardTitle>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {matches.map((match, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{match.name}</span>
                <span className="text-sm text-muted-foreground">{match.quantity}</span>
              </div>
              <Progress value={match.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopMatchesCard;
