import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  id: string;  // Changed from number to string since project names are strings
  name: string;
  date: string;
  onViewResults: () => void;
  onRecalculate: () => void;
}

export function ProjectCard({ name, date, onViewResults, onRecalculate }: ProjectCardProps) {
  return (
    <Card className="glass-card animate-fadeIn">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">Created on {date}</p>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onViewResults}>
            Show Results
          </Button>
          <Button onClick={onRecalculate}>
            Recalculate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}