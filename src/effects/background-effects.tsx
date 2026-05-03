import { useEffect, useState } from "react";

const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export function BackgroundEffects() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const gridColor = isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.03)";

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Layer 1: Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "linear-gradient(180deg, #0C0C10 0%, #09090B 40%, #07070A 100%)"
            : "linear-gradient(180deg, #FFFFFF 0%, #FAF9F7 40%, #F5F3F0 100%)",
        }}
      />

      {/* Layer 2: Architectural Grid (96px) */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="archGrid" width="96" height="96" patternUnits="userSpaceOnUse">
            <line x1="96" y1="0" x2="96" y2="96" stroke={gridColor} strokeWidth="0.5" />
            <line x1="0" y1="96" x2="96" y2="96" stroke={gridColor} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#archGrid)" />
      </svg>

      {/* Layer 3: Noise Texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: noiseSvg,
          opacity: isDark ? 0.04 : 0.03,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
