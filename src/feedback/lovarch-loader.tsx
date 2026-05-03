/**
 * LovarchSymbolLoader — DS V8 mandatory loading component
 * Neural network animation: particles wander organically, converge into the Lovarch
 * geometric symbol, hold with subtle breathing, then fade out and repeat.
 * Typewriter text effect for loading label.
 *
 * Usage:
 *   <LovarchSymbolLoader size={64} label="Generando..." className="text-white" />
 *   <LovarchSymbolLoader size={48} label="" className="text-foreground" />
 *
 * Sizes:  40-48 = inline,  64-72 = card/panel,  96+ = full page
 */
import { useRef, useEffect, useState } from "react";

// ─── Symbol geometry ───
function buildSymbol(cx: number, cy: number, R: number) {
  const r = R * 0.45;
  const outer: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    outer.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]);
  }
  const inner: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 2 + Math.PI / 6;
    inner.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  const edges: [number, number][] = [];
  for (let i = 0; i < 6; i++) edges.push([i, (i + 1) % 6]);
  for (let i = 0; i < 6; i++) edges.push([i, 12]);
  for (let i = 0; i < 6; i++) edges.push([6 + i, 6 + ((i + 1) % 6)]);
  for (let i = 0; i < 6; i++) {
    edges.push([i, 6 + i]);
    edges.push([i, 6 + ((i + 5) % 6)]);
  }
  const verts: [number, number][] = [...outer, ...inner, [cx, cy]];
  return { verts, edges };
}

interface Neuron {
  x: number; y: number;
  tx: number; ty: number;
  vx: number; vy: number;
  ax: number; ay: number;
  phase: number;
  r: number;
  pulse: number;
  pulseSpeed: number;
}

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }
function easeInCubic(t: number) { return t * t * t; }

export function LovarchSymbolLoader({
  size = 64,
  label = "Generando...",
  className = "",
  variant,
}: {
  size?: number;
  label?: string;
  className?: string;
  /** Force "dark" (white lines) or "light" (dark lines). Auto-detects if omitted. */
  variant?: "dark" | "light";
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const labelId = useRef(`ll-${Math.random().toString(36).slice(2, 8)}`).current;

  // ─── Canvas neural animation ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const R = size * 0.34;
    const cx = size / 2;
    const cy = size / 2;
    const { verts, edges } = buildSymbol(cx, cy, R);
    const CONNECTION_DIST = R * 0.85;
    const WANDER_RADIUS = R * 1.4; // tighter wander area

    // Single sine wave: convergeFactor oscillates 0→1→0 smoothly, no phases
    const CYCLE = 3600; // full period in ms

    const neurons: Neuron[] = verts.map(([tx, ty]) => {
      const angle = Math.random() * Math.PI * 2;
      const dist = WANDER_RADIUS * (0.3 + Math.random() * 0.5);
      return {
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        tx, ty,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        ax: 0, ay: 0,
        phase: Math.random() * Math.PI * 2,
        r: 0.8 + Math.random() * 0.4,
        pulse: Math.random(),
        pulseSpeed: 0.005 + Math.random() * 0.008,
      };
    });

    let startTime = performance.now();

    const updateWander = (n: Neuron, dt: number) => {
      n.phase += dt * 0.001; // organic drift speed
      const wf = 0.012; // moderate wander force
      n.ax = Math.sin(n.phase * 1.3) * wf + Math.cos(n.phase * 0.7) * wf * 0.5;
      n.ay = Math.cos(n.phase * 1.1) * wf + Math.sin(n.phase * 0.9) * wf * 0.5;
      const dx = n.x - cx;
      const dy = n.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > WANDER_RADIUS) {
        const pull = (dist - WANDER_RADIUS) * 0.005;
        n.ax -= (dx / dist) * pull;
        n.ay -= (dy / dist) * pull;
      }
      n.vx = (n.vx + n.ax) * 0.97;
      n.vy = (n.vy + n.ay) * 0.97;
      n.x += n.vx;
      n.y += n.vy;
      n.pulse = (Math.sin(n.phase * 2) + 1) / 2;
    };

    // Distance-based alpha fade: particles near edge of canvas fade out
    // Soft fade only at the very edges — symbol area fully visible
    const distanceFade = (x: number, y: number): number => {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const fadeStart = size * 0.38; // start fading near canvas edge
      const fadeEnd = size * 0.5;    // fully transparent at edge
      if (dist < fadeStart) return 1;
      return Math.max(0, 1 - (dist - fadeStart) / (fadeEnd - fadeStart));
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, size, size);
      const elapsed = (now - startTime) % CYCLE;
      const dt = 16;
      // Read actual text color from container (matches the label text exactly)
      const computed = getComputedStyle(containerRef.current || canvas.parentElement || document.body);
      const colorStr = computed.color; // e.g. "rgb(255, 255, 255)" or "rgba(40,40,40,0.4)"
      const cm = colorStr.match(/(\d+)/g);
      const rgb = cm ? `${cm[0]},${cm[1]},${cm[2]}` : "128,128,128";
      const isDark = cm ? (parseInt(cm[0]) * 299 + parseInt(cm[1]) * 587 + parseInt(cm[2]) * 114) / 1000 > 128 : true;
      const accentRgb = "161,98,7";

      let globalOpacity = 1;
      // Smooth sine oscillation: 0 → 1 → 0 → 1 ... infinite, no seams
      const t = elapsed / CYCLE; // 0..1 per cycle
      const convergeFactor = (Math.sin(t * Math.PI * 2 - Math.PI / 2) + 1) / 2; // smooth 0→1→0

      // All neurons always wander + get pulled toward target by convergeFactor
      for (const n of neurons) {
        const wanderStrength = 1 - convergeFactor * 0.92;
        updateWander(n, dt * wanderStrength);
        // Pull toward symbol position
        n.x += (n.tx - n.x) * convergeFactor * 0.1;
        n.y += (n.ty - n.y) * convergeFactor * 0.1;
        // Dampen velocity when converged
        n.vx *= 1 - convergeFactor * 0.4;
        n.vy *= 1 - convergeFactor * 0.4;
      }

      // ─── Draw connections (subtle) ───
      if (convergeFactor < 0.85) {
        for (let i = 0; i < neurons.length; i++) {
          for (let j = i + 1; j < neurons.length; j++) {
            const dx = neurons[i].x - neurons[j].x;
            const dy = neurons[i].y - neurons[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < CONNECTION_DIST) {
              const strength = 1 - d / CONNECTION_DIST;
              const fade = Math.min(distanceFade(neurons[i].x, neurons[i].y), distanceFade(neurons[j].x, neurons[j].y));
              const alpha = strength * 0.15 * globalOpacity * fade;
              if (alpha < 0.005) continue;
              ctx.beginPath();
              ctx.moveTo(neurons[i].x, neurons[i].y);
              ctx.lineTo(neurons[j].x, neurons[j].y);
              ctx.strokeStyle = `rgba(${rgb},${alpha.toFixed(3)})`;
              ctx.lineWidth = 0.3;
              ctx.stroke();
            }
          }
        }
      }

      // ─── Symbol edges ───
      if (convergeFactor > 0.15) {
        const edgeAlpha = Math.min(1, (convergeFactor - 0.15) / 0.6) * 0.4 * globalOpacity;
        for (const [a, b] of edges) {
          ctx.beginPath();
          ctx.moveTo(neurons[a].x, neurons[a].y);
          ctx.lineTo(neurons[b].x, neurons[b].y);
          ctx.strokeStyle = `rgba(${rgb},${edgeAlpha.toFixed(3)})`;
          ctx.lineWidth = size > 60 ? 0.5 : 0.35;
          ctx.stroke();
        }
      }

      // ─── Neuron dots (subtle — no glow) ───
      for (const n of neurons) {
        if (globalOpacity < 0.02) continue;
        const fade = distanceFade(n.x, n.y);
        const baseAlpha = (0.25 + n.pulse * 0.15) * globalOpacity * fade;
        if (baseAlpha < 0.005) continue;
        ctx.beginPath();
        const dotScale = 0.6 + n.pulse * 0.15;
        ctx.arc(n.x, n.y, n.r * dotScale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${baseAlpha.toFixed(3)})`;
        ctx.fill();

        // Very subtle accent tint when converged — no large glow
        if (convergeFactor > 0.8 && n.pulse > 0.7) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${accentRgb},${(0.06 * globalOpacity).toFixed(3)})`;
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [size, variant]);

  return (
    <div ref={containerRef} className={`inline-flex flex-col items-center gap-1.5 ${className}`}>
      <canvas ref={canvasRef} style={{ width: size, height: size }} />
      {label && (
        <span
          className="text-current text-xs min-h-[1.2em] relative inline-block overflow-hidden"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {/* Base text (dim) */}
          <span className="opacity-20">{label}</span>
          {/* Reveal layer — sweeps left-to-right with glow */}
          <span className="absolute inset-0 opacity-50" style={{
            WebkitMaskImage: `linear-gradient(90deg, black, black 30%, transparent 50%, transparent)`,
            maskImage: `linear-gradient(90deg, black, black 30%, transparent 50%, transparent)`,
            WebkitMaskSize: "200% 100%",
            maskSize: "200% 100%",
            animation: "lovarch-label-sweep 2.8s ease-in-out infinite",
          }}>{label}</span>
          {/* Glow accent line */}
          <span className="absolute top-0 bottom-0 w-[2px] rounded-full" style={{
            background: "hsl(38, 90%, 33%)",
            filter: "blur(3px)",
            opacity: 0.4,
            animation: "lovarch-label-glow 2.8s ease-in-out infinite",
          }} />
          <style>{`
            @keyframes lovarch-label-sweep {
              0%, 100% { -webkit-mask-position: 100% 0; mask-position: 100% 0; }
              45%, 55% { -webkit-mask-position: 0% 0; mask-position: 0% 0; }
            }
            @keyframes lovarch-label-glow {
              0%, 100% { left: -4px; opacity: 0; }
              10% { opacity: 0.4; }
              45%, 55% { left: 100%; opacity: 0.4; }
              60% { left: 100%; opacity: 0; }
            }
          `}</style>
        </span>
      )}
    </div>
  );
}
