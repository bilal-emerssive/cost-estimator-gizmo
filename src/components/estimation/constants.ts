import { CostDriver } from "../cost-drivers/types";

export const INITIAL_DRIVERS: CostDriver[] = [
  // Product Attributes
  { id: "rely", name: "Required Reliability", category: "Product Attributes", value: "Nominal", isManual: false, isIncluded: true },
  { id: "data", name: "Database Size", category: "Product Attributes", value: "Nominal", isManual: false, isIncluded: true },
  { id: "cplx", name: "Product Complexity", category: "Product Attributes", value: "Nominal", isManual: false, isIncluded: true },
  
  // Platform Attributes
  { id: "time", name: "Time Constraint", category: "Platform Attributes", value: "Nominal", isManual: false, isIncluded: true },
  { id: "stor", name: "Storage Constraint", category: "Platform Attributes", value: "Nominal", isManual: false, isIncluded: true },
  { id: "pvol", name: "Platform Volatility", category: "Platform Attributes", value: "Nominal", isManual: false, isIncluded: true },
  
  // Personnel Attributes
  { id: "acap", name: "Analyst Capability", category: "Personnel Attributes", value: "Nominal", isManual: false, isIncluded: true },
  { id: "pcap", name: "Programmer Capability", category: "Personnel Attributes", value: "Nominal", isManual: false, isIncluded: true },
  { id: "aexp", name: "Application Experience", category: "Personnel Attributes", value: "Nominal", isManual: false, isIncluded: true },
  { id: "pexp", name: "Platform Experience", category: "Personnel Attributes", value: "Nominal", isManual: false, isIncluded: true },
  { id: "ltex", name: "Language and Tool Experience", category: "Personnel Attributes", value: "Nominal", isManual: false, isIncluded: true },
  
  // Project Attributes
  { id: "tool", name: "Use of Software Tools", category: "Project Attributes", value: "Nominal", isManual: false, isIncluded: true },
  { id: "sced", name: "Development Schedule", category: "Project Attributes", value: "Nominal", isManual: false, isIncluded: true },
];