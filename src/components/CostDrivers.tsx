import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface CostDriver {
  id: string;
  name: string;
  category: string;
  value: number;
  systemGenerated?: boolean;
}

interface CostDriversProps {
  drivers: CostDriver[];
  onValueChange: (id: string, value: number) => void;
}

export function CostDrivers({ drivers, onValueChange }: CostDriversProps) {
  const categories = Array.from(new Set(drivers.map(d => d.category)));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {categories.map(category => (
        <Card key={category} className="glass-card animate-fadeIn">
          <CardHeader>
            <CardTitle className="text-lg font-medium">{category}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {drivers
              .filter(d => d.category === category)
              .map(driver => (
                <div key={driver.id} className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor={driver.id}>{driver.name}</Label>
                    <span className={cn(
                      "text-sm",
                      driver.systemGenerated ? "text-primary" : "text-muted-foreground"
                    )}>
                      {driver.systemGenerated ? "System Generated" : "Manual"}
                    </span>
                  </div>
                  <Slider
                    id={driver.id}
                    min={0}
                    max={5}
                    step={0.1}
                    value={[driver.value]}
                    onValueChange={([value]) => onValueChange(driver.id, value)}
                    className="w-full"
                  />
                  <span className="text-sm text-muted-foreground">
                    Value: {driver.value.toFixed(1)}
                  </span>
                </div>
              ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}