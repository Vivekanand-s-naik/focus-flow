import { Card, CardContent } from "@/components/ui/card";
import { Clock, Zap, TrendingUp, Brain, AlertCircle, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  subtext?: string;
  icon: typeof Clock;
  trend?: { value: number; positive: boolean };
  color?: "focus" | "warning" | "success" | "info" | "distraction";
}

function StatCard({ label, value, subtext, icon: Icon, trend, color = "focus" }: StatCardProps) {
  const colorClasses = {
    focus: "bg-focus/10 text-focus",
    warning: "bg-warning/10 text-warning",
    success: "bg-success/10 text-success",
    info: "bg-info/10 text-info",
    distraction: "bg-distraction/10 text-distraction",
  };

  return (
    <Card variant="interactive" className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">{label}</p>
            <p className="text-2xl font-display font-bold">{value}</p>
            {subtext && (
              <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
            )}
            {trend && (
              <div className={cn(
                "flex items-center gap-1 mt-2 text-xs font-medium",
                trend.positive ? "text-success" : "text-distraction"
              )}>
                <TrendingUp className={cn("w-3 h-3", !trend.positive && "rotate-180")} />
                <span>{trend.positive ? "+" : ""}{trend.value}% vs yesterday</span>
              </div>
            )}
          </div>
          <div className={cn("p-3 rounded-xl", colorClasses[color])}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard
        label="Focus Time"
        value="4h 32m"
        subtext="Deep work sessions"
        icon={Brain}
        trend={{ value: 12, positive: true }}
        color="focus"
      />
      <StatCard
        label="Screen Time"
        value="6h 15m"
        subtext="Total today"
        icon={Clock}
        trend={{ value: 5, positive: false }}
        color="info"
      />
      <StatCard
        label="Focus Sessions"
        value="7"
        subtext="Completed today"
        icon={Target}
        trend={{ value: 2, positive: true }}
        color="success"
      />
      <StatCard
        label="Distractions"
        value="23"
        subtext="App switches"
        icon={AlertCircle}
        trend={{ value: 18, positive: false }}
        color="distraction"
      />
      <StatCard
        label="Peak Hours"
        value="9-11 AM"
        subtext="Most productive"
        icon={Zap}
        color="warning"
      />
      <StatCard
        label="Daily Goal"
        value="85%"
        subtext="5h focus target"
        icon={TrendingUp}
        trend={{ value: 10, positive: true }}
        color="focus"
      />
    </div>
  );
}
