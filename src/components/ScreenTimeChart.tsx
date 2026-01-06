import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { time: "6am", focus: 0, distraction: 0 },
  { time: "8am", focus: 45, distraction: 15 },
  { time: "10am", focus: 90, distraction: 30 },
  { time: "12pm", focus: 60, distraction: 45 },
  { time: "2pm", focus: 75, distraction: 25 },
  { time: "4pm", focus: 85, distraction: 20 },
  { time: "6pm", focus: 40, distraction: 50 },
  { time: "8pm", focus: 20, distraction: 60 },
];

export function ScreenTimeChart() {
  return (
    <Card variant="elevated" className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Screen Time Today</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="focusGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(168, 55%, 32%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(168, 55%, 32%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="distractionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(350, 65%, 60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(350, 65%, 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(160, 10%, 45%)', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(160, 10%, 45%)', fontSize: 12 }}
                tickFormatter={(value) => `${value}m`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(0, 0%, 100%)',
                  border: '1px solid hsl(145, 15%, 88%)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                }}
                labelStyle={{ fontWeight: 600, marginBottom: 4 }}
              />
              <Area
                type="monotone"
                dataKey="focus"
                stroke="hsl(168, 55%, 32%)"
                strokeWidth={2}
                fill="url(#focusGradient)"
                name="Focus Time"
              />
              <Area
                type="monotone"
                dataKey="distraction"
                stroke="hsl(350, 65%, 60%)"
                strokeWidth={2}
                fill="url(#distractionGradient)"
                name="Distraction"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-focus" />
            <span className="text-sm text-muted-foreground">Focus Time</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-distraction" />
            <span className="text-sm text-muted-foreground">Distraction</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
