import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AppUsage {
  name: string;
  icon: string;
  time: number; // minutes
  category: "productive" | "neutral" | "distracting";
  limit?: number;
}

const appData: AppUsage[] = [
  { name: "VS Code", icon: "💻", time: 180, category: "productive" },
  { name: "Notion", icon: "📝", time: 95, category: "productive" },
  { name: "Instagram", icon: "📸", time: 45, category: "distracting", limit: 30 },
  { name: "Slack", icon: "💬", time: 60, category: "neutral" },
  { name: "YouTube", icon: "▶️", time: 35, category: "distracting", limit: 60 },
  { name: "Twitter/X", icon: "🐦", time: 28, category: "distracting", limit: 20 },
  { name: "Chrome", icon: "🌐", time: 120, category: "neutral" },
  { name: "Figma", icon: "🎨", time: 75, category: "productive" },
];

function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function AppUsageList() {
  const sortedApps = [...appData].sort((a, b) => b.time - a.time);
  const maxTime = Math.max(...appData.map((app) => app.time));

  return (
    <Card variant="elevated" className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">App Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedApps.map((app) => {
            const percentage = (app.time / maxTime) * 100;
            const isOverLimit = app.limit && app.time > app.limit;

            return (
              <div key={app.name} className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{app.icon}</span>
                    <span className="font-medium text-sm">{app.name}</span>
                    {isOverLimit && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-distraction/10 text-distraction font-medium">
                        Over limit
                      </span>
                    )}
                  </div>
                  <span className={cn(
                    "text-sm font-medium",
                    app.category === "productive" && "text-focus",
                    app.category === "distracting" && "text-distraction",
                    app.category === "neutral" && "text-muted-foreground"
                  )}>
                    {formatTime(app.time)}
                    {app.limit && (
                      <span className="text-muted-foreground"> / {formatTime(app.limit)}</span>
                    )}
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500 ease-out",
                      app.category === "productive" && "bg-focus",
                      app.category === "distracting" && (isOverLimit ? "bg-distraction" : "bg-warning"),
                      app.category === "neutral" && "bg-muted-foreground/40"
                    )}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
