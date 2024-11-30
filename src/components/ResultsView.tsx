import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ResultsViewProps {
  fpa: {
    ei: number;
    eo: number;
    eq: number;
    ilf: number;
    eif: number;
    total: number;
  };
  cocomo: {
    kloc: number;
    effort: number;
    multiplier: number;
    cost: number;
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>External Inputs (EI)</TableCell>
                <TableCell className="text-right">{fpa.ei}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>External Outputs (EO)</TableCell>
                <TableCell className="text-right">{fpa.eo}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>External Inquiries (EQ)</TableCell>
                <TableCell className="text-right">{fpa.eq}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Internal Logical Files (ILF)</TableCell>
                <TableCell className="text-right">{fpa.ilf}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>External Interface Files (EIF)</TableCell>
                <TableCell className="text-right">{fpa.eif}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Total Function Points</TableCell>
                <TableCell className="text-right font-medium">{fpa.total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>COCOMO Estimates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 rounded-lg bg-primary/5">
              <p className="text-sm text-muted-foreground">Estimated KLOC</p>
              <p className="text-2xl font-semibold">{cocomo.kloc}</p>
            </div>
            <div className="p-4 rounded-lg bg-primary/5">
              <p className="text-sm text-muted-foreground">Effort (Person-Months)</p>
              <p className="text-2xl font-semibold">{cocomo.effort}</p>
            </div>
            <div className="p-4 rounded-lg bg-primary/5">
              <p className="text-sm text-muted-foreground">Total Effort Multiplier</p>
              <p className="text-2xl font-semibold">{cocomo.multiplier}</p>
            </div>
            <div className="p-4 rounded-lg bg-primary/5">
              <p className="text-sm text-muted-foreground">Estimated Cost</p>
              <p className="text-2xl font-semibold">${cocomo.cost.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-lg bg-primary/5">
              <p className="text-sm text-muted-foreground">Development Time</p>
              <p className="text-2xl font-semibold">{cocomo.time} months</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}