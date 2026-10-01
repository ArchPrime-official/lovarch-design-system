import { useRef, useEffect, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  o: number;
}

export interface ConstellationParticlesProps {
  /** Ocupa o elemento pai (absolute) em vez da janela (fixed). Use dentro de cards/heros. */
  contained?: boolean;
  /** Também anima no mobile (default: desligado abaixo de 768px, por bateria). */
  forceOnMobile?: boolean;
  className?: string;
  /** Cor dos pontos. `auto` segue o tema do <html> (branco no dark, preto no light). */
  particleColor?: "auto" | "white" | "black";
}

export function ConstellationParticles({ contained = false, forceOnMobile = false, className, particleColor = "auto" }: ConstellationParticlesProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  const getColor = useCallback(() => {
    if (particleColor === "white") return "255,255,255";
    if (particleColor === "black") return "0,0,0";
    return document.documentElement.classList.contains("dark")
      ? "255,255,255"
      : "0,0,0";
  }, [particleColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    if (reduced || (isMobile && !forceOnMobile)) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const host = contained ? canvas.parentElement : null;
      canvas.width = host ? host.clientWidth : window.innerWidth;
      canvas.height = host ? host.clientHeight : window.innerHeight;
    };
    resize();

    const count = Math.min(50, Math.floor(canvas.width / 25));
    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.5,
      o: Math.random() * 0.35 + 0.08,
    }));

    const connectionDist = 130;

    const draw = () => {
      if (document.hidden) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const rgb = getColor();
      const pts = particles.current;

      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${p.o})`;
        ctx.fill();
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < connectionDist) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${rgb},${((1 - d / connectionDist) * 0.12).toFixed(3)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [getColor, contained, forceOnMobile]);

  return (
    <canvas
      ref={canvasRef}
      className={`${contained ? "absolute" : "fixed"} inset-0 pointer-events-none ${className ?? ""}`}
      style={{ zIndex: 1, opacity: 0.8 }}
    />
  );
}
