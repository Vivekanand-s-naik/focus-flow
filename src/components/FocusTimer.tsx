import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Coffee, Brain, Target } from "lucide-react";
import { cn } from "@/lib/utils";

type SessionType = "focus" | "shortBreak" | "longBreak";

interface SessionConfig {
  label: string;
  duration: number; // in seconds
  icon: typeof Brain;
  color: string;
}

const SESSION_CONFIGS: Record<SessionType, SessionConfig> = {
  focus: { label: "Deep Focus", duration: 25 * 60, icon: Brain, color: "text-focus" },
  shortBreak: { label: "Short Break", duration: 5 * 60, icon: Coffee, color: "text-warning" },
  longBreak: { label: "Long Break", duration: 15 * 60, icon: Target, color: "text-info" },
};

interface FocusTimerProps {
  onSessionComplete?: (type: SessionType, duration: number) => void;
}

export function FocusTimer({ onSessionComplete }: FocusTimerProps) {
  const [sessionType, setSessionType] = useState<SessionType>("focus");
  const [timeLeft, setTimeLeft] = useState(SESSION_CONFIGS.focus.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const config = SESSION_CONFIGS[sessionType];
  const Icon = config.icon;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = ((config.duration - timeLeft) / config.duration) * 100;

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(config.duration);
  }, [config.duration]);

  const handleSessionTypeChange = (type: SessionType) => {
    setSessionType(type);
    setTimeLeft(SESSION_CONFIGS[type].duration);
    setIsRunning(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (sessionType === "focus") {
        setSessionsCompleted((prev) => prev + 1);
      }
      onSessionComplete?.(sessionType, config.duration);
      
      // Auto-switch to break after focus, or back to focus after break
      if (sessionType === "focus") {
        const nextType = sessionsCompleted > 0 && (sessionsCompleted + 1) % 4 === 0 ? "longBreak" : "shortBreak";
        handleSessionTypeChange(nextType);
      } else {
        handleSessionTypeChange("focus");
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, sessionType, sessionsCompleted, onSessionComplete, config.duration]);

  return (
    <Card variant="elevated" className="w-full max-w-md mx-auto overflow-hidden">
      {/* Progress bar at top */}
      <div className="h-1.5 bg-muted">
        <div
          className={cn("h-full transition-all duration-1000 ease-linear", 
            sessionType === "focus" ? "bg-focus" : sessionType === "shortBreak" ? "bg-warning" : "bg-info"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>

      <CardContent className="p-8">
        {/* Session type selector */}
        <div className="flex gap-2 justify-center mb-8">
          {(Object.keys(SESSION_CONFIGS) as SessionType[]).map((type) => {
            const cfg = SESSION_CONFIGS[type];
            const TypeIcon = cfg.icon;
            return (
              <Button
                key={type}
                variant={sessionType === type ? "focus" : "ghost"}
                size="sm"
                onClick={() => handleSessionTypeChange(type)}
                className={cn(
                  "flex items-center gap-2",
                  sessionType === type && "shadow-glow"
                )}
              >
                <TypeIcon className="w-4 h-4" />
                <span className="hidden sm:inline">{cfg.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Timer display */}
        <div className="relative flex items-center justify-center mb-8">
          <div className="relative">
            {/* Background ring */}
            <svg className="w-56 h-56 -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-muted/20"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                strokeWidth="4"
                strokeLinecap="round"
                className={cn(
                  "transition-all duration-1000",
                  sessionType === "focus" ? "stroke-focus" : 
                  sessionType === "shortBreak" ? "stroke-warning" : "stroke-info"
                )}
                style={{
                  strokeDasharray: 2 * Math.PI * 45,
                  strokeDashoffset: 2 * Math.PI * 45 * (1 - progress / 100),
                }}
              />
            </svg>
            
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Icon className={cn("w-8 h-8 mb-2", config.color)} />
              <span className="font-display text-5xl font-bold tracking-tight">
                {formatTime(timeLeft)}
              </span>
              <span className="text-sm text-muted-foreground mt-1">{config.label}</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handleReset}
            className="rounded-full"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>

          <Button
            variant="focus"
            size="xl"
            onClick={() => setIsRunning(!isRunning)}
            className={cn(
              "rounded-full w-20 h-20",
              isRunning && "animate-ring-pulse"
            )}
          >
            {isRunning ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </Button>

          <div className="w-10 h-10 flex items-center justify-center">
            <span className="text-sm font-medium text-muted-foreground">
              {sessionsCompleted} done
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
