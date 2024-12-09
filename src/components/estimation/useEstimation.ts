import { useState } from "react";
import { CostDriver, RatingValue } from "../cost-drivers/types";
import { INITIAL_DRIVERS } from "./constants";
import { EstimationState } from "./types";
import { api } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useEstimation() {
  const [state, setState] = useState<EstimationState>({
    step: 1,
    showResults: false,
    drivers: INITIAL_DRIVERS,
  });

  const generateEstimation = useMutation({
    mutationFn: api.generateEstimation,
    onSuccess: () => {
      setState(prev => ({ ...prev, showResults: true }));
      toast.success("Estimation generated successfully");
    },
    onError: (error) => {
      toast.error("Failed to generate estimation");
      console.error(error);
    },
  });

  const handleDriverChange = (id: string, value: RatingValue) => {
    setState(prev => ({
      ...prev,
      drivers: prev.drivers.map(driver => 
        driver.id === id ? { ...driver, value } : driver
      )
    }));
  };

  const handleModeChange = (id: string, isManual: boolean) => {
    setState(prev => ({
      ...prev,
      drivers: prev.drivers.map(driver => 
        driver.id === id ? { ...driver, isManual } : driver
      )
    }));
  };

  const handleIncludeChange = (id: string, isIncluded: boolean) => {
    setState(prev => ({
      ...prev,
      drivers: prev.drivers.map(driver => 
        driver.id === id ? { ...driver, isIncluded } : driver
      )
    }));
  };

  const setStep = (step: number) => {
    setState(prev => ({ ...prev, step }));
  };

  const setShowResults = (showResults: boolean) => {
    setState(prev => ({ ...prev, showResults }));
  };

  return {
    state,
    generateEstimation,
    handlers: {
      handleDriverChange,
      handleModeChange,
      handleIncludeChange,
      setStep,
      setShowResults
    }
  };
}