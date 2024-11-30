import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  name: string;
  date: string;
  status: "completed" | "in-progress";
  onViewResults: () => void;
  onRecalculate: () => void;
}

export function ProjectCard({ name, date, status, onViewResults, onRecalculate }: ProjectCardProps) {
  return (
    <Card className="glass-card hover-lift w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-medium">{name}</CardTitle>
          <Badge variant={status === "completed" ? "default" : "secondary"}>
            {status === "completed" ? "Completed" : "In Progress"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Created on {date}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-3">
        <Button variant="outline" onClick={onRecalculate}>
          Recalculate
        </Button>
        <Button onClick={onViewResults}>View Results</Button>
      </CardFooter>
    </Card>
  );
}