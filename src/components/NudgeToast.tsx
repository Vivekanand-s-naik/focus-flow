import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { X, Coffee, Eye, Move, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NudgeProps {
  type: "break" | "eyeRest" | "stretch" | "refocus";
  onDismiss: () => void;
  onAction: () => void;
}

const nudgeConfig = {
  break: {
    icon: Coffee,
    title: "Time for a break! ☕",
    message: "You've been focused for 50 minutes. Take a 5-minute break to recharge.",
    action: "Start Break",
    color: "bg-warning/10 border-warning/30 text-warning",
  },
  eyeRest: {
    icon: Eye,
    title: "Rest your eyes 👀",
    message: "Look at something 20 feet away for 20 seconds (20-20-20 rule).",
    action: "Done",
    color: "bg-info/10 border-info/30 text-info",
  },
  stretch: {
    icon: Move,
    title: "Stretch break! 🙆",
    message: "Roll your shoulders and stretch your neck. Your body will thank you!",
    action: "Done",
    color: "bg-success/10 border-success/30 text-success",
  },
  refocus: {
    icon: Brain,
    title: "Getting distracted? 🎯",
    message: "We noticed some app switching. Ready to get back in the zone?",
    action: "Start Focus Mode",
    color: "bg-focus/10 border-focus/30 text-focus",
  },
};

export function NudgeToast({ type, onDismiss, onAction }: NudgeProps) {
  const [isVisible, setIsVisible] = useState(false);
  const config = nudgeConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 50);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(onDismiss, 300);
  };

  const handleAction = () => {
    setIsVisible(false);
    setTimeout(onAction, 300);
  };

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 max-w-sm p-4 rounded-2xl border shadow-large glass transition-all duration-300",
        config.color,
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      )}
    >
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 p-1 rounded-full hover:bg-foreground/10 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-current/10">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 pr-6">
          <h4 className="font-display font-semibold mb-1">{config.title}</h4>
          <p className="text-sm opacity-80 mb-3">{config.message}</p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="focus"
              onClick={handleAction}
              className="text-xs"
            >
              {config.action}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDismiss}
              className="text-xs"
            >
              Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Demo component showing nudges
export function NudgeDemo() {
  const [activeNudge, setActiveNudge] = useState<keyof typeof nudgeConfig | null>("break");

  if (!activeNudge) {
    return (
      <Button
        variant="outline"
        onClick={() => setActiveNudge("break")}
        className="fixed bottom-6 right-6"
      >
        Show Nudge
      </Button>
    );
  }

  return (
    <NudgeToast
      type={activeNudge}
      onDismiss={() => setActiveNudge(null)}
      onAction={() => {
        console.log("Action taken for:", activeNudge);
        setActiveNudge(null);
      }}
    />
  );
}
