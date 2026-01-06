import { cn } from "@/lib/utils";

interface FocusScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function FocusScore({ score, size = "md", showLabel = true }: FocusScoreProps) {
  const sizeClasses = {
    sm: { container: "w-20 h-20", text: "text-xl", label: "text-xs" },
    md: { container: "w-32 h-32", text: "text-3xl", label: "text-sm" },
    lg: { container: "w-44 h-44", text: "text-5xl", label: "text-base" },
  };

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 80) return "text-success stroke-success";
    if (score >= 60) return "text-focus stroke-focus";
    if (score >= 40) return "text-warning stroke-warning";
    return "text-distraction stroke-distraction";
  };

  const getScoreLabel = () => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Work";
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn("relative", sizeClasses[size].container)}>
        {/* Background circle */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted/30"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            className={cn("transition-all duration-1000 ease-out", getScoreColor())}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
            }}
          />
        </svg>
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-display font-bold", sizeClasses[size].text, getScoreColor())}>
            {score}
          </span>
          {showLabel && (
            <span className={cn("text-muted-foreground", sizeClasses[size].label)}>
              {getScoreLabel()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
