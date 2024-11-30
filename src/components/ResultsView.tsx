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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Estimated KLOC</TableCell>
                <TableCell className="text-right">{cocomo.kloc}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Effort (Person-Months)</TableCell>
                <TableCell className="text-right">{cocomo.effort}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Effort Multiplier</TableCell>
                <TableCell className="text-right">{cocomo.multiplier}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Estimated Cost</TableCell>
                <TableCell className="text-right">${cocomo.cost.toLocaleString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Development Time</TableCell>
                <TableCell className="text-right">{cocomo.time} months</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}