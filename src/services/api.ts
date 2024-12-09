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
    developmentTime: z.number()
  })
});

export type Project = z.infer<typeof ProjectSchema>;

// Replace these with your actual API endpoints
const API_BASE_URL = "http://127.0.0.1:5000";

export const api = {
  fetchProjects: async (): Promise<Project[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`);
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  generateEstimation: async (data: {
    requirementsDocument: File;
    costDrivers: Array<{
      driver: string;
      value: "Very Low" | "Low" | "Nominal" | "High" | "Very High" | "Extra High" | "Null";
    }>;
  }): Promise<Project> => {
    try {
      const formData = new FormData();
      formData.append('requirementsDocument', data.requirementsDocument);
      formData.append('costDrivers', JSON.stringify(data.costDrivers));
  
      const response = await fetch(`${API_BASE_URL}/estimations`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate estimation');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error generating estimation:', error);
      throw error;
    }
  }
};