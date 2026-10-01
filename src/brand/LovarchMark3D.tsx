/**
 * LovarchMark3D — o símbolo da Lovarch em movimento: icosaedro em wireframe girando,
 * com o hub dourado e três "conexões" que acendem a partir do centro.
 *
 * Quando usar: hero do login/auth, splash, páginas de marca. É marca, não loader —
 * para carregamento use `LovarchSymbolLoader` (/feedback) ou `Spinner` (/primitives).
 * Linhas e vértices usam `currentColor` (defina a cor no pai: `text-foreground`);
 * o hub usa o token `--accent`. Respeita `prefers-reduced-motion` (desenha 1 quadro)
 * e pausa quando a aba está oculta.
 *
 * Uso:
 *   <LovarchMark3D size={200} className="text-foreground" />
 *   <LovarchMark3D size={96} speed={0.6} className="text-white" />
 */
import { useEffect, useRef } from "react";

const PHI = (1 + Math.sqrt(5)) / 2;
const NRM = Math.sqrt(1 + PHI * PHI);
const RAW: [number, number, number][] = [
  [0, 1, PHI], [0, 1, -PHI], [0, -1, PHI], [0, -1, -PHI],
  [1, PHI, 0], [1, -PHI, 0], [-1, PHI, 0], [-1, -PHI, 0],
  [PHI, 0, 1], [-PHI, 0, 1], [PHI, 0, -1], [-PHI, 0, -1],
];
const V = RAW.map((p) => [p[0] / NRM, p[1] / NRM, p[2] / NRM] as [number, number, number]);
const E: [number, number][] = [];
for (let i = 0; i < 12; i++) {
  for (let j = i + 1; j < 12; j++) {
    const dx = V[i][0] - V[j][0], dy = V[i][1] - V[j][1], dz = V[i][2] - V[j][2];
    if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 1.1) E.push([i, j]);
  }
}

function rot(p: [number, number, number], rx: number, ry: number): [number, number, number] {
  const cy = Math.cos(ry), sy = Math.sin(ry);
  const x1 = p[0] * cy + p[2] * sy, z1 = -p[0] * sy + p[2] * cy;
  const cx = Math.cos(rx), sx = Math.sin(rx);
  return [x1, p[1] * cx - z1 * sx, p[1] * sx + z1 * cx];
}

export interface LovarchMark3DProps {
  /** Lado em px (o desenho é quadrado). */
  size?: number;
  className?: string;
  /** Multiplicador da velocidade de rotação (1 = a do login). */
  speed?: number;
  /** Rótulo acessível; sem ele o símbolo é decorativo (aria-hidden). */
  title?: string;
}

export function LovarchMark3D({ size = 200, className, speed = 1, title }: LovarchMark3DProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const NS = "http://www.w3.org/2000/svg";
    svg.querySelectorAll("[data-mark]").forEach((n) => n.remove());

    const make = (tag: string, attrs: Record<string, string>) => {
      const el = document.createElementNS(NS, tag);
      el.setAttribute("data-mark", "");
      for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
      svg.appendChild(el);
      return el;
    };
    const lines = E.map(() => make("line", { stroke: "currentColor", "stroke-width": "0.9", "stroke-linecap": "round" }));
    const hubLines = [0, 1, 2].map(() => make("line", { stroke: "currentColor", "stroke-width": "1.15", "stroke-linecap": "round" }));
    const dots = V.map(() => make("circle", { fill: "currentColor" }));
    make("circle", { r: "4.4", cx: "60", cy: "60", style: "fill: hsl(var(--accent, 38 90% 33%))" });

    const draw = (now: number) => {
      const t = (now / 1000) * speed;
      const ry = t * 0.26, rx = 0.5 + Math.sin(t * 0.11) * 0.2;
      const P = V.map((v) => {
        const r = rot(v, rx, ry);
        const persp = 3.2 / (3.2 - r[2]);
        return { x: 60 + r[0] * 38 * persp, y: 60 + r[1] * 38 * persp, z: r[2] };
      });
      E.forEach((e, i) => {
        const a = P[e[0]], b = P[e[1]], zm = (a.z + b.z) / 2, l = lines[i];
        l.setAttribute("x1", String(a.x)); l.setAttribute("y1", String(a.y));
        l.setAttribute("x2", String(b.x)); l.setAttribute("y2", String(b.y));
        l.setAttribute("opacity", (0.14 + 0.5 * (zm + 1) / 2).toFixed(3));
      });
      hubLines.forEach((l, k) => {
        const period = 2.6, u = t / period + k / 3;
        const ph = u % 1, idx = (Math.floor(u) * 5 + k * 4) % 12;
        const p = P[idx], fade = Math.sin(ph * Math.PI);
        l.setAttribute("x1", "60"); l.setAttribute("y1", "60");
        l.setAttribute("x2", String(p.x)); l.setAttribute("y2", String(p.y));
        l.setAttribute("opacity", (fade * 0.8).toFixed(3));
      });
      P.forEach((p, i) => {
        const c = dots[i], s = (p.z + 1) / 2;
        c.setAttribute("cx", String(p.x)); c.setAttribute("cy", String(p.y));
        c.setAttribute("r", (1.9 + 1.6 * s).toFixed(2));
        c.setAttribute("opacity", (0.3 + 0.65 * s).toFixed(3));
      });
    };

    const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      draw(1800);
      return;
    }
    let raf = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (typeof document !== "undefined" && document.hidden) return;
      draw(now);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      style={{ overflow: "visible" }}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    />
  );
}
