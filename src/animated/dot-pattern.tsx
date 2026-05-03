/**
 * DotPattern — Subtle dot grid background (inspired by Magic UI)
 * DS V8: uses currentColor for theme-awareness
 *
 * Usage:
 *   <div className="relative">
 *     <DotPattern className="opacity-20" />
 *     <div className="relative z-10">Content</div>
 *   </div>
 */
import { useId } from "react";
import { cn } from "../lib/cn";

interface DotPatternProps {
  width?: number;
  height?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
}

export function DotPattern({
  width = 16,
  height = 16,
  cx = 1,
  cy = 1,
  cr = 0.8,
  className,
}: DotPatternProps) {
  const id = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full fill-foreground/10", className)}
    >
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
          <circle cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
