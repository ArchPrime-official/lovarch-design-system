/**
 * LovarchBarList — Horizontal bar ranking list (inspired by Tremor BarList)
 * DS V8: var(--accent), var(--surface), DM Sans values
 *
 * Usage:
 *   <LovarchBarList data={[{ name: "Instagram", value: 42 }, { name: "Referral", value: 28 }]} />
 */
import { cn } from "../lib/cn";

interface BarListItem {
  name: string;
  value: number;
  icon?: React.ReactNode;
  href?: string;
  color?: string; // tailwind bg class override
}

interface LovarchBarListProps {
  data: BarListItem[];
  valueFormatter?: (v: number) => string;
  showAnimation?: boolean;
  className?: string;
  color?: string; // default bar bg class
}

export function LovarchBarList({
  data,
  valueFormatter = (v) => v.toLocaleString(),
  showAnimation = true,
  className,
  color = "bg-accent/15",
}: LovarchBarListProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className={cn("space-y-1.5", className)}>
      {data.map((item, idx) => {
        const pct = (item.value / maxValue) * 100;
        return (
          <div key={item.name} className="group flex items-center gap-3">
            {/* Bar */}
            <div className="flex-1 relative h-8 rounded-lg overflow-hidden" style={{ background: "var(--surface)" }}>
              <div
                className={cn("absolute inset-y-0 left-0 rounded-lg transition-all", item.color || color, showAnimation && "duration-700 ease-out")}
                style={{ width: showAnimation ? `${pct}%` : `${pct}%` }}
              />
              <div className="relative flex items-center gap-2 px-3 h-full z-10">
                {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                <span className="text-xs font-medium text-foreground truncate">{item.name}</span>
              </div>
            </div>
            {/* Value */}
            <span className="text-xs font-semibold text-foreground tabular-nums min-w-[40px] text-right" style={{ fontFamily: "'DM Sans'" }}>
              {valueFormatter(item.value)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
