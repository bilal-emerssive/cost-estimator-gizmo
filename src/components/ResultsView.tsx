import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Function Point Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="ei">
              <AccordionTrigger>
                External Inputs (EI) - {fpa.ei.count} points
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2">
                  {fpa.ei.modules.map((module, index) => (
                    <li key={index}>{module}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="eo">
              <AccordionTrigger>
                External Outputs (EO) - {fpa.eo.count} points
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2">
                  {fpa.eo.modules.map((module, index) => (
                    <li key={index}>{module}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="eq">
              <AccordionTrigger>
                External Inquiries (EQ) - {fpa.eq.count} points
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2">
                  {fpa.eq.modules.map((module, index) => (
                    <li key={index}>{module}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="ilf">
              <AccordionTrigger>
                Internal Logical Files (ILF) - {fpa.ilf.count} points
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2">
                  {fpa.ilf.modules.map((module, index) => (
                    <li key={index}>{module}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="eif">
              <AccordionTrigger>
                External Interface Files (EIF) - {fpa.eif.count} points
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2">
                  {fpa.eif.modules.map((module, index) => (
                    <li key={index}>{module}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="mt-4 p-4 bg-primary/10 rounded-lg">
            <p className="text-lg font-semibold text-center">
              Total Function Points: {fpa.total}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Project Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{cocomo.kloc}</div>
            <p className="text-sm text-muted-foreground">Estimated KLOC</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Development Effort</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{cocomo.effort}</div>
            <p className="text-sm text-muted-foreground">Person-Months</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Effort Multiplier</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{cocomo.multiplier}</div>
            <p className="text-sm text-muted-foreground">Total Multiplier</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Development Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{cocomo.time}</div>
            <p className="text-sm text-muted-foreground">Months</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}