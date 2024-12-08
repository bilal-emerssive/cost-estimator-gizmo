import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ChevronRight } from "lucide-react";

interface FPAMetric {
  count: number;
  modules: string[];
}

interface ResultsViewProps {
  fpa: {
    ei: FPAMetric;
    eo: FPAMetric;
    eq: FPAMetric;
    ilf: FPAMetric;
    eif: FPAMetric;
    total: number;
  };
  cocomo: {
    kloc: number;
    effort: number;
    multiplier: number;
    time: number;
  };
}

export function ResultsView({ fpa, cocomo }: ResultsViewProps) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <Card className="glass-card hover:shadow-lg transition-all duration-300">
        <CardHeader className="border-b bg-primary/5">
          <CardTitle className="flex items-center justify-between">
            <span>Function Point Analysis</span>
            <Badge variant="secondary" className="text-lg px-4">
              Total: {fpa.total}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {Object.entries(fpa).map(([key, value]) => {
              if (key === 'total') return null;
              const metric = value as FPAMetric;
              const title = {
                ei: 'External Inputs (EI)',
                eo: 'External Outputs (EO)',
                eq: 'External Inquiries (EQ)',
                ilf: 'Internal Logical Files (ILF)',
                eif: 'External Interface Files (EIF)',
              }[key];

              return (
                <AccordionItem 
                  key={key} 
                  value={key}
                  className="border rounded-lg px-2 hover:bg-accent/50 transition-colors"
                >
                  <AccordionTrigger className="py-4 flex items-center gap-2">
                    <div className="flex-1 flex items-center justify-between pr-4">
                      <span>{title}</span>
                      <Badge variant="outline" className="ml-2">
                        {metric.count} points
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 px-4">
                    <ul className="space-y-2">
                      {metric.modules.map((module, index) => (
                        <li key={index} className="flex items-center gap-2 text-muted-foreground">
                          <ChevronRight className="h-4 w-4" />
                          {module}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Project Size
              <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{cocomo.kloc.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">Estimated KLOC</p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Development Effort
              <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{cocomo.effort.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">Person-Months</p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Effort Multiplier
              <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{cocomo.multiplier.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">Total Multiplier</p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Development Time
              <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{cocomo.time.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">Months</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}