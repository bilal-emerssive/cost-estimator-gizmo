export type RatingValue = "Very Low" | "Low" | "Nominal" | "High" | "Very High" | "Extra High";

export interface CostDriver {
  id: string;
  name: string;
  category: string;
  value: RatingValue;
  isManual: boolean;
  isIncluded: boolean;
}

export interface EstimationRequest {
  requirementsDocument: File;
  costDrivers: Array<{
    driver: string;
    value: RatingValue | "Null";
  }>;
}

export interface EstimationState {
  step: number;
  showResults: boolean;
  drivers: CostDriver[];
}