import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CostDriverItem } from "./CostDriverItem";
import { CostDriver, RatingValue } from "./types";

interface CategoryCardProps {
  category: string;
  drivers: CostDriver[];
  onValueChange: (id: string, value: RatingValue) => void;
  onModeChange: (id: string, isManual: boolean) => void;
  onIncludeChange: (id: string, isIncluded: boolean) => void;
}

export function CategoryCard({
  category,
  drivers,
  onValueChange,
  onModeChange,
  onIncludeChange,
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
                <p>Select which drivers to include in your estimation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {drivers.map((driver) => (
          <CostDriverItem
            key={driver.id}
            {...driver}
            onValueChange={onValueChange}
            onModeChange={onModeChange}
            onIncludeChange={onIncludeChange}
          />
        ))}
      </CardContent>
    </Card>
  );
}