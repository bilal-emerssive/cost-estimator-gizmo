import { z } from "zod";
import { mockProjects } from "@/data/mockData";

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
    developmentTime: z.number()
  })
});

export type Project = z.infer<typeof ProjectSchema>;

export const api = {
  fetchProjects: async (): Promise<Project[]> => {
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
    await new Promise(resolve => setTimeout(resolve, 2000));
    return mockProjects[0];
  }
};