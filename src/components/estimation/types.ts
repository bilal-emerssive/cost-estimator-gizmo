import { RatingValue, CostDriver } from "../cost-drivers/types";

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