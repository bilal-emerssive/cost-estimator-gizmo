export const mockResults = {
  fpa: {
    ei: { count: 3, modules: ["Login form", "Customer entry", "File upload"] },
    eo: { count: 2, modules: ["Order confirmation", "Sales report"] },
    eq: { count: 1, modules: ["Product search"] },
    ilf: { count: 2, modules: ["Employee records", "Product catalog"] },
    eif: { count: 1, modules: ["Currency exchange API"] },
    total: 20,
  },
  cocomo: {
    kloc: 100,
    effort: 360,
    multiplier: 1.2,
    time: 18,
  },
};

export const mockProjects = [
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
      developmentTime: 18
    }
  }
];