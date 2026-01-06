import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowRight, TrendingUp, Clock, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

interface Insight {
  id: string;
  type: "tip" | "warning" | "achievement";
  title: string;
  description: string;
  action?: string;
  icon: typeof Lightbulb;
}

const insights: Insight[] = [
  {
    id: "1",
    type: "achievement",
    title: "New Focus Record! 🎉",
    description: "You had 4.5 hours of uninterrupted focus today. That's 30% more than your weekly average!",
    icon: TrendingUp,
  },
  {
    id: "2",
    type: "tip",
    title: "Optimize Your Peak Hours",
    description: "You're most productive between 9-11 AM. Schedule deep work during this window for maximum impact.",
    action: "Schedule Focus Block",
    icon: Clock,
  },
  {
    id: "3",
    type: "warning",
    title: "Instagram Usage Spike",
    description: "You spent 45 minutes on Instagram, exceeding your 30-minute limit. Consider enabling Focus Mode during work hours.",
    action: "Set App Limit",
    icon: Coffee,
  },
];

export function InsightsPanel() {
  return (
    <Card variant="elevated" className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-warning" />
          <CardTitle className="text-lg">Smart Insights</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <div
              key={insight.id}
              className={cn(
                "p-4 rounded-xl border transition-all duration-200 hover:shadow-soft",
                insight.type === "achievement" && "bg-success/5 border-success/20",
                insight.type === "tip" && "bg-focus/5 border-focus/20",
                insight.type === "warning" && "bg-warning/5 border-warning/20"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "p-2 rounded-lg shrink-0",
                  insight.type === "achievement" && "bg-success/10 text-success",
                  insight.type === "tip" && "bg-focus/10 text-focus",
                  insight.type === "warning" && "bg-warning/10 text-warning"
                )}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm mb-1">{insight.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {insight.description}
                  </p>
                  {insight.action && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 -ml-2 h-8 text-xs font-medium hover:bg-transparent hover:text-focus group"
                    >
                      {insight.action}
                      <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
