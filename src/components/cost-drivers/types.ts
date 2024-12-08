export interface CostDriver {
  id: string;
  name: string;
  category: string;
  value: number;
  isManual: boolean;
  isIncluded: boolean;
}

export const categories = [
  "Product Attributes",
  "Platform Attributes",
  "Personnel Attributes",
  "Project Attributes"
] as const;

export const defaultDrivers = [
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
] as const;