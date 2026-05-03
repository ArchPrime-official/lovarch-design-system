/**
 * LovarchTracker — Activity tracker grid (inspired by Tremor Tracker)
 * DS V8: surface tokens, accent for active, muted for empty
 *
 * Usage:
 *   <LovarchTracker data={[{ tooltip: "Mon", color: "bg-accent" }, { tooltip: "Tue", color: "bg-emerald-500" }]} />
 */
import { cn } from "../lib/cn";
import { useState } from "react";

interface TrackerBlock {
  tooltip?: string;
  color?: string; // tailwind bg class
}

interface LovarchTrackerProps {
  data: TrackerBlock[];
  className?: string;
}

export function LovarchTracker({ data, className }: LovarchTrackerProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className={cn("relative", className)}>
      <div className="flex flex-wrap gap-[3px]">
        {data.map((block, i) => (
          <div
            key={i}
            className={cn(
              "h-5 rounded-[4px] transition-all cursor-default",
              block.color || "bg-muted/30",
              hoveredIdx === i && "ring-1 ring-foreground/20 scale-110"
            )}
            style={{ flex: "1 1 0", minWidth: 10 }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          />
        ))}
      </div>
      {/* Tooltip */}
      {hoveredIdx !== null && data[hoveredIdx]?.tooltip && (
        <div
          className="absolute -top-8 px-2 py-1 rounded-md bg-foreground text-background text-[10px] font-medium pointer-events-none whitespace-nowrap z-10 transition-all"
          style={{ left: `${(hoveredIdx / data.length) * 100}%`, transform: "translateX(-50%)" }}
        >
          {data[hoveredIdx].tooltip}
        </div>
      )}
    </div>
  );
}
