import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Zap, 
  Moon, 
  Bell, 
  Timer, 
  Smartphone,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface QuickAction {
  id: string;
  label: string;
  icon: typeof Zap;
  color: string;
  activeColor: string;
  description: string;
}

const actions: QuickAction[] = [
  {
    id: "focus-mode",
    label: "Focus Mode",
    icon: Zap,
    color: "bg-focus/10 text-focus hover:bg-focus/20",
    activeColor: "bg-focus text-primary-foreground",
    description: "Block distracting apps",
  },
  {
    id: "dnd",
    label: "Do Not Disturb",
    icon: Moon,
    color: "bg-info/10 text-info hover:bg-info/20",
    activeColor: "bg-info text-primary-foreground",
    description: "Silence notifications",
  },
  {
    id: "app-limits",
    label: "App Limits",
    icon: Shield,
    color: "bg-warning/10 text-warning hover:bg-warning/20",
    activeColor: "bg-warning text-accent-foreground",
    description: "Enforce time limits",
  },
  {
    id: "break-reminder",
    label: "Break Alerts",
    icon: Timer,
    color: "bg-success/10 text-success hover:bg-success/20",
    activeColor: "bg-success text-primary-foreground",
    description: "20-20-20 reminders",
  },
];

export function QuickActions() {
  const [activeActions, setActiveActions] = useState<string[]>(["focus-mode"]);

  const toggleAction = (id: string) => {
    setActiveActions((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  return (
    <Card variant="elevated">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            const isActive = activeActions.includes(action.id);

            return (
              <button
                key={action.id}
                onClick={() => toggleAction(action.id)}
                className={cn(
                  "relative p-4 rounded-xl border transition-all duration-200 text-left group",
                  isActive
                    ? `${action.activeColor} border-transparent shadow-glow`
                    : `${action.color} border-border hover:border-transparent`
                )}
              >
                <Icon className={cn("w-5 h-5 mb-2", isActive && "animate-pulse-gentle")} />
                <p className="font-medium text-sm">{action.label}</p>
                <p className={cn(
                  "text-xs mt-0.5",
                  isActive ? "opacity-80" : "text-muted-foreground"
                )}>
                  {action.description}
                </p>
                
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-current animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
