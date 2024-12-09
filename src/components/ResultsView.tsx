import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { Project } from "@/services/api";

interface ResultsViewProps {
  data: Project;
}

export function ResultsView({ data }: ResultsViewProps) {
  const fpaMapping = {
    ei: {
      title: 'External Inputs (EI)',
      ...data.functionPointAnalysis.externalInputs
    },
    eo: {
      title: 'External Outputs (EO)',
      ...data.functionPointAnalysis.externalOutputs
    },
    eq: {
      title: 'External Inquiries (EQ)',
      ...data.functionPointAnalysis.externalInquiries
    },
    ilf: {
      title: 'Internal Logical Files (ILF)',
      ...data.functionPointAnalysis.internalLogicalFiles
    },
    eif: {
      title: 'External Interface Files (EIF)',
      ...data.functionPointAnalysis.externalInterfaceFiles
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      <Card className="glass-card hover:shadow-xl transition-all duration-500 overflow-hidden">
        <CardHeader className="border-b bg-gradient-to-r from-cost-100 to-cost-200 py-8">
          <CardTitle className="flex items-center justify-between">
            <span className="text-2xl font-bold text-cost-400">Function Point Analysis</span>
            <Badge variant="secondary" className="text-lg px-6 py-2 bg-white/80 text-cost-400">
              Total: {data.estimationResults.totalFunctionPoints}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8 pb-6">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {Object.entries(fpaMapping).map(([key, value]) => (
              <AccordionItem 
                key={key} 
                value={key}
                className="border rounded-xl px-3 hover:bg-cost-100/50 transition-colors duration-300"
              >
                <AccordionTrigger className="py-4 flex items-center gap-2">
                  <div className="flex-1 flex items-center justify-between pr-4">
                    <span className="text-cost-400 font-medium">{value.title}</span>
                    <Badge variant="outline" className="ml-2 bg-white/80">
                      {value.count} points
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 px-4">
                  <ul className="space-y-2">
                    {value.modules.map((module, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground hover:text-cost-400 transition-colors">
                        <ChevronRight className="h-4 w-4" />
                        {module}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Project Size", value: data.estimationResults.estimatedKLOC.toFixed(2), label: "Estimated KLOC" },
          { title: "Development Effort", value: data.estimationResults.developmentEffort.toFixed(2), label: "Person-Months" },
          { title: "Effort Multiplier", value: data.estimationResults.effortMultiplier.toFixed(2), label: "Total Multiplier" },
          { title: "Development Time", value: data.estimationResults.developmentTime.toFixed(2), label: "Months" }
        ].map((item, index) => (
          <Card key={index} className="glass-card hover:shadow-xl transition-all duration-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between text-cost-400">
                {item.title}
                <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cost-500">{item.value}</div>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}