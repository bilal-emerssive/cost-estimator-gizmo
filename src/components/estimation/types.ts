import { RatingValue } from "../cost-drivers/types";

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

export interface CostDriver {
  id: string;
  name: string;
  category: string;
  value: RatingValue;
  isManual: boolean;
  isIncluded: boolean;
}