import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";
import { CostDrivers } from "@/components/CostDrivers";
import { ResultsView } from "@/components/ResultsView";
import { ProjectCard } from "@/components/ProjectCard";
import { api } from "@/services/api";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { mockResults } from "@/data/mockData";

const mockDrivers = [
  // Product Attributes
  { id: "rely", name: "Required Reliability", category: "Product Attributes", value: 1.0, isManual: false },
  { id: "data", name: "Database Size", category: "Product Attributes", value: 1.0, isManual: false },
  { id: "cplx", name: "Product Complexity", category: "Product Attributes", value: 1.0, isManual: false },
  
  // Platform Attributes
  { id: "time", name: "Time Constraint", category: "Platform Attributes", value: 1.0, isManual: false },
  { id: "stor", name: "Storage Constraint", category: "Platform Attributes", value: 1.0, isManual: false },
  { id: "pvol", name: "Platform Volatility", category: "Platform Attributes", value: 1.0, isManual: false },
  
  // Personnel Attributes
  { id: "acap", name: "Analyst Capability", category: "Personnel Attributes", value: 1.0, isManual: false },
  { id: "pcap", name: "Programmer Capability", category: "Personnel Attributes", value: 1.0, isManual: false },
  { id: "aexp", name: "Application Experience", category: "Personnel Attributes", value: 1.0, isManual: false },
  { id: "pexp", name: "Platform Experience", category: "Personnel Attributes", value: 1.0, isManual: false },
  { id: "ltex", name: "Language and Tool Experience", category: "Personnel Attributes", value: 1.0, isManual: false },
  
  // Project Attributes
  { id: "tool", name: "Use of Software Tools", category: "Project Attributes", value: 1.0, isManual: false },
  { id: "sced", name: "Development Schedule", category: "Project Attributes", value: 1.0, isManual: false },
];

export default function Index() {
  const [step, setStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [drivers, setDrivers] = useState(mockDrivers);

  const { data: projects, isLoading: isLoadingProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: api.fetchProjects,
  });

  const generateEstimation = useMutation({
    mutationFn: api.generateEstimation,
    onSuccess: () => {
      setShowResults(true);
      toast.success("Estimation generated successfully");
    },
    onError: (error) => {
      toast.error("Failed to generate estimation");
      console.error(error);
    },
  });

  const handleDriverChange = (id: string, value: number) => {
    setDrivers(prevDrivers => 
      prevDrivers.map(driver => 
        driver.id === id ? { ...driver, value } : driver
      )
    );
  };

  const handleModeChange = (id: string, isManual: boolean) => {
    setDrivers(prevDrivers => 
      prevDrivers.map(driver => 
        driver.id === id ? { ...driver, isManual } : driver
      )
    );
  };

  const handleProcess = async () => {
    const costDrivers = drivers.map(driver => ({
      driver: driver.id,
      value: driver.isManual ? driver.value : null,
    }));

    generateEstimation.mutate({
      requirementsDocument: new File([""], "requirements.txt"),
      costDrivers,
    });
  };

  const handleRecalculate = () => {
    setStep(2);
    setShowResults(false);
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
              {projects?.map((project) => (
                <ProjectCard
                  key={project.projectName}
                  id={project.projectName}
                  name={project.projectName}
                  date={project.dateCreated}
                  onViewResults={() => setShowResults(true)}
                  onRecalculate={handleRecalculate}
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
              drivers={drivers} 
              onValueChange={handleDriverChange}
              onModeChange={handleModeChange}
            />
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleProcess}
                className="hover-lift"
                disabled={generateEstimation.isPending}
              >
                {generateEstimation.isPending ? "Processing..." : "Process Estimation"}
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