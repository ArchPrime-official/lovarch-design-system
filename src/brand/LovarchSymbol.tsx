/**
 * LovarchSymbol — static SVG of the Lovarch geometric symbol.
 *
 * Same neural-network geometry as `LovarchSymbolLoader` but rendered as a flat
 * SVG (no animation). Use this for branding marks, watermarks, footer badges,
 * and anywhere you need the symbol without the runtime canvas overhead.
 *
 * For the animated version (loading state) use `LovarchSymbolLoader` from
 * `@archprime/lovarch-ds/feedback`.
 *
 * Usage:
 *   <LovarchSymbol size={32} className="text-foreground" />
 *   <LovarchSymbol size={48} stroke="currentColor" strokeWidth={1.5} />
 */
interface LovarchSymbolProps {
  size?: number;
  className?: string;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  title?: string;
}

const VERTICES: [number, number][] = [
  [50, 8], [86.37, 29], [86.37, 71], [50, 92], [13.63, 71], [13.63, 29],
  [59.45, 33.63], [68.9, 50], [59.45, 66.37], [40.55, 66.37], [31.1, 50], [40.55, 33.63],
  [50, 50],
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
  [0, 12], [1, 12], [2, 12], [3, 12], [4, 12], [5, 12],
  [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 6],
  [0, 6], [0, 11], [1, 7], [1, 6], [2, 8], [2, 7],
  [3, 9], [3, 8], [4, 10], [4, 9], [5, 11], [5, 10],
];

export function LovarchSymbol({
  size = 32,
  className,
  stroke = "currentColor",
  strokeWidth = 1.25,
  fill = "currentColor",
  title,
}: LovarchSymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      <g stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={VERTICES[a][0]}
            y1={VERTICES[a][1]}
            x2={VERTICES[b][0]}
            y2={VERTICES[b][1]}
          />
        ))}
      </g>
      <g fill={fill}>
        {VERTICES.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === 12 ? 2.5 : 2} />
        ))}
      </g>
    </svg>
  );
}
