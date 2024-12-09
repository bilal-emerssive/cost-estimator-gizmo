import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";
import { CostDrivers } from "@/components/CostDrivers";
import { ResultsView } from "@/components/ResultsView";
import { ProjectCard } from "@/components/ProjectCard";
import { api } from "@/services/api";
import { Project } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useEstimation } from "@/components/estimation/useEstimation";
import { RatingValue } from "@/components/cost-drivers/types";

export default function Index() {
  const { 
    state: { step, showResults, drivers },
    generateEstimation,
    handlers
  } = useEstimation();

  const { data: projects, isLoading: isLoadingProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: api.fetchProjects,
  });

  const handleProcess = async () => {
    const costDrivers = drivers
      .filter(driver => driver.isIncluded)
      .map(driver => ({
        driver: driver.id,
        value: driver.isManual ? (driver.value as RatingValue) : "Null" as const,
      }));
  
    generateEstimation.mutate({
      requirementsDocument: new File([""], "requirements.txt"),
      costDrivers,
    });
  };

  const handleRecalculate = () => {
    handlers.setStep(2);
    handlers.setShowResults(false);
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
                  onViewResults={() => {
                    handlers.setShowResults(true);
                  }}
                  onRecalculate={handleRecalculate}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={() => handlers.setStep(2)}
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
              onValueChange={handlers.handleDriverChange}
              onModeChange={handlers.handleModeChange}
              onIncludeChange={handlers.handleIncludeChange}
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

        {showResults && generateEstimation.data && (
          <div className="space-y-10 animate-fadeIn">
            <ResultsView data={generateEstimation.data} />
            <div className="flex justify-center gap-6">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  handlers.setStep(1);
                  handlers.setShowResults(false);
                }}
                className="hover-lift px-6 py-4 text-base"
              >
                Back to Projects
              </Button>
              <Button
                size="lg"
                onClick={() => {
                  handlers.setStep(2);
                  handlers.setShowResults(false);
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
