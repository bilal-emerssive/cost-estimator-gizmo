import { CategoryCard } from "./cost-drivers/CategoryCard";
import { CostDriver, categories, defaultDrivers } from "./cost-drivers/types";

interface CostDriversProps {
  drivers: CostDriver[];
  onValueChange: (id: string, value: number) => void;
  onModeChange: (id: string, isManual: boolean) => void;
}

export function CostDrivers({ drivers, onValueChange, onModeChange }: CostDriversProps) {
  const allDrivers = defaultDrivers.map(d => {
    const existingDriver = drivers.find(existing => existing.id === d.id);
    return {
      ...d,
      value: existingDriver?.value || 1.0,
      isManual: existingDriver?.isManual || false
    };
  });

  return (
    <div className="space-y-8">
      {categories.map(category => (
        <CategoryCard
          key={category}
          category={category}
          drivers={allDrivers.filter(d => d.category === category)}
          onValueChange={onValueChange}
          onModeChange={onModeChange}
        />
      ))}
    </div>
  );
}