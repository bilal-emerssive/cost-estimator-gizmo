import { z } from "zod";

export const ProjectSchema = z.object({
  projectName: z.string(),
  dateCreated: z.string(),
  functionPointAnalysis: z.object({
    externalInputs: z.object({
      count: z.number(),
      modules: z.array(z.string())
    }),
    externalOutputs: z.object({
      count: z.number(),
      modules: z.array(z.string())
    }),
    externalInquiries: z.object({
      count: z.number(),
      modules: z.array(z.string())
    }),
    internalLogicalFiles: z.object({
      count: z.number(),
      modules: z.array(z.string())
    }),
    externalInterfaceFiles: z.object({
      count: z.number(),
      modules: z.array(z.string())
    })
  }),
  estimationResults: z.object({
    projectSize: z.number(),
    developmentEffort: z.number(),
    effortMultiplier: z.number(),
    developmentTime: z.string()
  })
});

export type Project = z.infer<typeof ProjectSchema>;

const mockProjects: Project[] = [
  {
    projectName: "Inventory Manager",
    dateCreated: "2024-12-01",
    functionPointAnalysis: {
      externalInputs: {
        count: 3,
        modules: ["Login form", "Customer entry", "File upload"]
      },
      externalOutputs: {
        count: 2,
        modules: ["Order confirmation", "Sales report"]
      },
      externalInquiries: {
        count: 1,
        modules: ["Product search"]
      },
      internalLogicalFiles: {
        count: 2,
        modules: ["Employee records", "Product catalog"]
      },
      externalInterfaceFiles: {
        count: 1,
        modules: ["Currency exchange API"]
      }
    },
    estimationResults: {
      projectSize: 120,
      developmentEffort: 150,
      effortMultiplier: 1.2,
      developmentTime: "5 months"
    }
  }
];

export const api = {
  fetchProjects: async (): Promise<Project[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockProjects;
  },

  generateEstimation: async (data: {
    requirementsDocument: File;
    costDrivers: Array<{
      driver: string;
      value: number | null;
    }>;
  }): Promise<Project> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    return mockProjects[0];
  }
};