import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CostDriver {
  id: string;
  name: string;
  category: string;
  value: number;
  isManual: boolean;
}

interface CostDriversProps {
  drivers: CostDriver[];
  onValueChange: (id: string, value: number) => void;
  onModeChange: (id: string, isManual: boolean) => void;
}

export function CostDrivers({ drivers, onValueChange, onModeChange }: CostDriversProps) {
  const categories = [
    "Product Attributes",
    "Platform Attributes",
    "Personnel Attributes",
    "Project Attributes"
  ];

  const allDrivers = [
    { id: "rely", name: "Required Software Reliability", category: "Product Attributes" },
    { id: "data", name: "Database Size", category: "Product Attributes" },
    { id: "cplx", name: "Product Complexity", category: "Product Attributes" },
    { id: "time", name: "Execution Time Constraint", category: "Platform Attributes" },
    { id: "stor", name: "Main Storage Constraint", category: "Platform Attributes" },
    { id: "pvol", name: "Platform Volatility", category: "Platform Attributes" },
    { id: "acap", name: "Analyst Capability", category: "Personnel Attributes" },
    { id: "pcap", name: "Programmer Capability", category: "Personnel Attributes" },
    { id: "aexp", name: "Application Experience", category: "Personnel Attributes" },
    { id: "pexp", name: "Platform Experience", category: "Personnel Attributes" },
    { id: "ltex", name: "Language and Tool Experience", category: "Personnel Attributes" },
    { id: "tool", name: "Use of Software Tools", category: "Project Attributes" },
    { id: "sced", name: "Development Schedule", category: "Project Attributes" }
  ].map(d => ({
    ...d,
    value: drivers.find(existing => existing.id === d.id)?.value || 1.0,
    isManual: drivers.find(existing => existing.id === d.id)?.isManual || false
  }));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {categories.map(category => (
        <Card key={category} className="glass-card animate-fadeIn">
          <CardHeader>
            <CardTitle className="text-lg font-medium">{category}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {allDrivers
              .filter(d => d.category === category)
              .map(driver => (
                <div key={driver.id} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label htmlFor={driver.id}>{driver.name}</Label>
                  </div>
                  <RadioGroup
                    defaultValue={driver.isManual ? "manual" : "system"}
                    onValueChange={(value) => onModeChange(driver.id, value === "manual")}
                    className="flex space-x-4 mb-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id={`${driver.id}-system`} />
                      <Label htmlFor={`${driver.id}-system`}>System Generated</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="manual" id={`${driver.id}-manual`} />
                      <Label htmlFor={`${driver.id}-manual`}>Manual</Label>
                    </div>
                  </RadioGroup>
                  {driver.isManual && (
                    <div className="space-y-2">
                      <Slider
                        id={driver.id}
                        min={0.1}
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
                  )}
                </div>
              ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}