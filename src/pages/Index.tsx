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
  { id: "rely", name: "Required Reliability", category: "Product Attributes", value: 1.0, isManual: false, isIncluded: true },
  { id: "data", name: "Database Size", category: "Product Attributes", value: 1.0, isManual: false, isIncluded: true },
  { id: "cplx", name: "Product Complexity", category: "Product Attributes", value: 1.0, isManual: false, isIncluded: true },
  
  // Platform Attributes
  { id: "time", name: "Time Constraint", category: "Platform Attributes", value: 1.0, isManual: false, isIncluded: true },
  { id: "stor", name: "Storage Constraint", category: "Platform Attributes", value: 1.0, isManual: false, isIncluded: true },
  { id: "pvol", name: "Platform Volatility", category: "Platform Attributes", value: 1.0, isManual: false, isIncluded: true },
  
  // Personnel Attributes
  { id: "acap", name: "Analyst Capability", category: "Personnel Attributes", value: 1.0, isManual: false, isIncluded: true },
  { id: "pcap", name: "Programmer Capability", category: "Personnel Attributes", value: 1.0, isManual: false, isIncluded: true },
  { id: "aexp", name: "Application Experience", category: "Personnel Attributes", value: 1.0, isManual: false, isIncluded: true },
  { id: "pexp", name: "Platform Experience", category: "Personnel Attributes", value: 1.0, isManual: false, isIncluded: true },
  { id: "ltex", name: "Language and Tool Experience", category: "Personnel Attributes", value: 1.0, isManual: false, isIncluded: true },
  
  // Project Attributes
  { id: "tool", name: "Use of Software Tools", category: "Project Attributes", value: 1.0, isManual: false, isIncluded: true },
  { id: "sced", name: "Development Schedule", category: "Project Attributes", value: 1.0, isManual: false, isIncluded: true },
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

  const handleIncludeChange = (id: string, isIncluded: boolean) => {
    setDrivers(prevDrivers => 
      prevDrivers.map(driver => 
        driver.id === id ? { ...driver, isIncluded } : driver
      )
    );
  };

  const handleProcess = async () => {
    const costDrivers = drivers
      .filter(driver => driver.isIncluded)
      .map(driver => ({
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
    <div className="min-h-screen bg-gradient-to-b from-cost-100 to-cost-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-cost-400 to-cost-500 bg-clip-text text-transparent">
            Cost Estimation Tool
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate software development effort and costs with precision using our advanced estimation algorithms
          </p>
        </div>

        {step === 1 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects?.map((project) => (
                <ProjectCard
                  key={project.projectName}
                  id={project.projectName}
                  name={project.projectName}
                  date={new Date(project.dateCreated).toISOString()}
                  onViewResults={() => setShowResults(true)}
                  onRecalculate={handleRecalculate}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={() => setStep(2)}
                className="hover-lift bg-cost-400 hover:bg-cost-500 text-white px-8 py-6 text-lg rounded-xl shadow-lg transition-all duration-300"
              >
                + New Project Estimates
              </Button>
            </div>
          </div>
        )}

        {step === 2 && !showResults && (
          <div className="space-y-10 animate-fadeIn max-w-4xl mx-auto">
            <FileUpload />
            <CostDrivers 
              drivers={drivers} 
              onValueChange={handleDriverChange}
              onModeChange={handleModeChange}
              onIncludeChange={handleIncludeChange}
            />
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleProcess}
                className="hover-lift bg-cost-400 hover:bg-cost-500 text-white px-8 py-6 text-lg rounded-xl shadow-lg transition-all duration-300"
                disabled={generateEstimation.isPending}
              >
                {generateEstimation.isPending ? "Processing..." : "Process Estimation"}
              </Button>
            </div>
          </div>
        )}

        {showResults && (
          <div className="space-y-10 animate-fadeIn">
            <ResultsView {...mockResults} />
            <div className="flex justify-center gap-6">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setStep(1);
                  setShowResults(false);
                }}
                className="hover-lift px-6 py-4 text-base"
              >
                Back to Projects
              </Button>
              <Button
                size="lg"
                onClick={() => {
                  setStep(2);
                  setShowResults(false);
                }}
                className="hover-lift bg-cost-400 hover:bg-cost-500 text-white px-6 py-4 text-base rounded-xl shadow-lg transition-all duration-300"
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