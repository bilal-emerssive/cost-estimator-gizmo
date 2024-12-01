import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CostDriverItem } from "./CostDriverItem";
import { CostDriver } from "./types";

interface CategoryCardProps {
  category: string;
  drivers: CostDriver[];
  onValueChange: (id: string, value: number) => void;
  onModeChange: (id: string, isManual: boolean) => void;
}

export function CategoryCard({
  category,
  drivers,
  onValueChange,
  onModeChange,
}: CategoryCardProps) {
  return (
    <Card className="glass-card animate-fadeIn hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="border-b bg-muted/50">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          {category}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Adjust these values to fine-tune your estimation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 p-6">
        {drivers.map((driver) => (
          <CostDriverItem
            key={driver.id}
            {...driver}
            onValueChange={onValueChange}
            onModeChange={onModeChange}
          />
        ))}
      </CardContent>
    </Card>
  );
}