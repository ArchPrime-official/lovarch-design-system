/**
 * GridPattern — Subtle grid line background (inspired by Magic UI)
 * DS V8: uses currentColor, opacity-controlled
 *
 * Usage:
 *   <div className="relative overflow-hidden rounded-2xl">
 *     <GridPattern className="opacity-10" />
 *     <div className="relative z-10">Content</div>
 *   </div>
 */
import { useId } from "react";
import { cn } from "../lib/cn";

interface GridPatternProps {
  width?: number;
  height?: number;
  strokeWidth?: number;
  className?: string;
  squares?: [number, number][]; // [x, y] coordinates of highlighted squares
}

export function GridPattern({
  width = 40,
  height = 40,
  strokeWidth = 0.5,
  className,
  squares,
}: GridPatternProps) {
  const id = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full stroke-foreground/10 fill-none", className)}
    >
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse">
          <path d={`M ${width} 0 L 0 0 0 ${height}`} fill="none" strokeWidth={strokeWidth} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      {/* Highlighted squares */}
      {squares?.map(([x, y], i) => (
        <rect
          key={i}
          width={width - 1}
          height={height - 1}
          x={x * width + 1}
          y={y * height + 1}
          className="fill-foreground/5 stroke-foreground/10 transition-colors duration-500"
          strokeWidth={strokeWidth}
        />
      ))}
    </svg>
  );
}
