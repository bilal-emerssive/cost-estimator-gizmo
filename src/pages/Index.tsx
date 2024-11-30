import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";
import { CostDrivers } from "@/components/CostDrivers";
import { ResultsView } from "@/components/ResultsView";
import { ProjectCard } from "@/components/ProjectCard";

const mockProjects = [
  { id: 1, name: "E-Commerce Platform", date: "2024-02-20", status: "completed" as const },
  { id: 2, name: "CRM System", date: "2024-02-15", status: "in-progress" as const },
];

const mockDrivers = [
  { id: "rely", name: "Required Reliability", category: "Product Attributes", value: 1.0, isManual: false },
  { id: "data", name: "Database Size", category: "Product Attributes", value: 1.0, isManual: false },
  { id: "cplx", name: "Product Complexity", category: "Product Attributes", value: 1.0, isManual: false },
  { id: "time", name: "Time Constraint", category: "Platform Attributes", value: 1.0, isManual: false },
  { id: "stor", name: "Storage Constraint", category: "Platform Attributes", value: 1.0, isManual: false },
  { id: "pvol", name: "Platform Volatility", category: "Platform Attributes", value: 1.0, isManual: false },
];

const mockResults = {
  fpa: {
    ei: 5,
    eo: 3,
    eq: 4,
    ilf: 2,
    eif: 6,
    total: 20,
  },
  cocomo: {
    kloc: 100,
    effort: 360,
    multiplier: 1.2,
    cost: 540000,
    time: 18,
  },
};

export default function Index() {
  const [step, setStep] = useState(1);
  const [showResults, setShowResults] = useState(false);

  const handleDriverChange = (id: string, value: number) => {
    console.log(`Driver ${id} changed to ${value}`);
  };

  const handleModeChange = (id: string, isManual: boolean) => {
    console.log(`Driver ${id} mode changed to ${isManual ? 'manual' : 'system'}`);
  };

  const handleProcess = () => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-cost-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Cost Estimation Tool</h1>
          <p className="text-lg text-muted-foreground">
            Calculate software development effort and costs with precision
          </p>
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid gap-6 md:grid-cols-2">
              {mockProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  {...project}
                  onViewResults={() => setShowResults(true)}
                  onRecalculate={() => setStep(2)}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={() => setStep(2)}
                className="hover-lift"
              >
                + New Project Estimates
              </Button>
            </div>
          </div>
        )}

        {step === 2 && !showResults && (
          <div className="space-y-8 animate-fadeIn">
            <FileUpload />
            <CostDrivers 
              drivers={mockDrivers} 
              onValueChange={handleDriverChange}
              onModeChange={handleModeChange}
            />
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleProcess}
                className="hover-lift"
              >
                Process Estimation
              </Button>
            </div>
          </div>
        )}

        {showResults && (
          <div className="space-y-8 animate-fadeIn">
            <ResultsView {...mockResults} />
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setStep(1);
                  setShowResults(false);
                }}
                className="hover-lift"
              >
                Back to Projects
              </Button>
              <Button
                size="lg"
                onClick={() => {
                  setStep(2);
                  setShowResults(false);
                }}
                className="hover-lift"
              >
                New Estimation
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}