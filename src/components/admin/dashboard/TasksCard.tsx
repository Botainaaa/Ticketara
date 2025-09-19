
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Check, MoreVertical } from "lucide-react";

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

interface TasksCardProps {
  tasks: Task[];
}

const TasksCard = ({ tasks }: TasksCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Check className="h-5 w-5 text-morocco-red" />
          <CardTitle>Tasks</CardTitle>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center gap-2">
              <Checkbox checked={task.completed} />
              <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                {task.name}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksCard;
