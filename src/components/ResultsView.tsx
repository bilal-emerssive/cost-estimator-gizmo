import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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
  const chartData = [
    { name: "External Inputs", value: fpa.ei },
    { name: "External Outputs", value: fpa.eo },
    { name: "External Inquiries", value: fpa.eq },
    { name: "Internal Files", value: fpa.ilf },
    { name: "External Files", value: fpa.eif },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Function Point Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center">
            <p className="text-2xl font-semibold">
              Total Function Points: {fpa.total}
            </p>
          </div>
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