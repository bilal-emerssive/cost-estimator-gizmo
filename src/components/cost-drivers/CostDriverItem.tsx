import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CostDriverItemProps {
  id: string;
  name: string;
  value: string;
  isManual: boolean;
  isIncluded: boolean;
  onValueChange: (id: string, value: string) => void;
  onModeChange: (id: string, isManual: boolean) => void;
  onIncludeChange: (id: string, isIncluded: boolean) => void;
}

const ratingLabels = [
  "Very Low",
  "Low", 
  "Nominal",
  "High",
  "Very High",
  "Extra High"
];

const getRatingValue = (label: string): number => {
  const index = ratingLabels.indexOf(label);
  return index === -1 ? 1 : (index + 1) * 1;
};

const getRatingLabel = (numericValue: number): string => {
  const index = Math.round((numericValue - 0.1) / (5 - 0.1) * (ratingLabels.length - 1));
  return ratingLabels[Math.min(Math.max(0, index), ratingLabels.length - 1)];
};

export function CostDriverItem({
  id,
  name,
  value,
  isManual,
  isIncluded,
  onValueChange,
  onModeChange,
  onIncludeChange,
}: CostDriverItemProps) {
  return (
    <Card className={`p-6 space-y-4 transition-opacity duration-300 ${!isIncluded ? 'opacity-50' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-2">
          <Checkbox
            id={`include-${id}`}
            checked={isIncluded}
            onCheckedChange={(checked) => onIncludeChange(id, checked as boolean)}
            className="mt-1"
          />
          <div>
            <Label htmlFor={`include-${id}`} className="text-base font-medium">
              {name}
            </Label>
            <Badge variant="outline" className="ml-2">
              {value}
            </Badge>
          </div>
        </div>
      </div>

      {isIncluded && (
        <>
          <RadioGroup
            defaultValue={isManual ? "manual" : "system"}
            onValueChange={(value) => {
              onModeChange(id, value === "manual");
            }}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="system" id={`${id}-system`} />
              <Label htmlFor={`${id}-system`} className="text-sm">
                System Generated
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="manual" id={`${id}-manual`} />
              <Label htmlFor={`${id}-manual`} className="text-sm">
                Manual
              </Label>
            </div>
          </RadioGroup>

          {isManual && (
            <div className="space-y-2 bg-muted/30 p-4 rounded-lg">
              <div className="flex items-center space-x-4">
                <Slider
                  id={id}
                  min={0}
                  max={5}
                  step={1}
                  value={[ratingLabels.indexOf(value)]}
                  onValueChange={([newIndex]) => {
                    const newLabel = ratingLabels[newIndex];
                    onValueChange(id, newLabel);
                  }}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-4">
                {ratingLabels.map((label) => (
                  <span key={label} className="text-center px-2">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </Card>
  );
}