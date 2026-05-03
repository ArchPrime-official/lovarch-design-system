/**
 * LovarchProgressCircle — Circular progress indicator (inspired by Tremor)
 * DS V8: accent gold, muted track, DM Sans center value
 *
 * Usage:
 *   <LovarchProgressCircle value={72} size={80} label="72%" />
 */
import { cn } from "../lib/cn";

interface LovarchProgressCircleProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  label?: string;
  color?: string; // stroke color (CSS)
  trackColor?: string;
  className?: string;
  children?: React.ReactNode;
}

export function LovarchProgressCircle({
  value,
  size = 64,
  strokeWidth = 5,
  label,
  color = "hsl(38, 90%, 33%)", // accent gold
  trackColor = "hsl(0, 0%, 90%)",
  className,
  children,
}: LovarchProgressCircleProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(Math.max(value, 0), 100) / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={trackColor} strokeWidth={strokeWidth} className="opacity-20" />
        {/* Progress */}
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          className="transition-all duration-700 ease-out" />
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children || (label && (
          <span className="text-xs font-bold text-foreground" style={{ fontFamily: "'DM Sans'" }}>{label}</span>
        ))}
      </div>
    </div>
  );
}
