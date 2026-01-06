import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const weekData = [
  { day: "Mon", focus: 4.2, target: 5 },
  { day: "Tue", focus: 5.5, target: 5 },
  { day: "Wed", focus: 3.8, target: 5 },
  { day: "Thu", focus: 6.2, target: 5 },
  { day: "Fri", focus: 4.8, target: 5 },
  { day: "Sat", focus: 2.1, target: 3 },
  { day: "Sun", focus: 1.5, target: 2 },
];

export function WeeklyOverview() {
  return (
    <Card variant="elevated" className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Weekly Focus Hours</CardTitle>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-focus" />
              <span className="text-muted-foreground">Actual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-muted-foreground/30" />
              <span className="text-muted-foreground">Target</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(160, 10%, 45%)', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(160, 10%, 45%)', fontSize: 12 }}
                tickFormatter={(value) => `${value}h`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(0, 0%, 100%)',
                  border: '1px solid hsl(145, 15%, 88%)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                }}
                formatter={(value: number) => [`${value}h`, '']}
              />
              <Bar
                dataKey="target"
                fill="hsl(160, 10%, 85%)"
                radius={[6, 6, 0, 0]}
                barSize={30}
              />
              <Bar
                dataKey="focus"
                radius={[6, 6, 0, 0]}
                barSize={30}
              >
                {weekData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.focus >= entry.target ? 'hsl(168, 55%, 32%)' : 'hsl(38, 92%, 60%)'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm">
          <div>
            <span className="text-muted-foreground">Weekly Total:</span>
            <span className="font-semibold ml-2">28.1 hours</span>
          </div>
          <div>
            <span className="text-muted-foreground">Weekly Goal:</span>
            <span className="font-semibold ml-2 text-focus">27 hours</span>
          </div>
          <div className="px-3 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
            +4% Above Target
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
