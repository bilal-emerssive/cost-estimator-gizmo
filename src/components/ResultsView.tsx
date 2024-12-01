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
            <CardTitle className="text-lg">Project Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${cocomo.cost.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Estimated Cost</p>
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