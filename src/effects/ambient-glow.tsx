import { useEffect, useState } from "react";

export function AmbientGlow() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Gold accent glow — top right */}
      <div
        className="absolute -top-32 -right-16 w-[500px] h-[500px] rounded-full blur-[160px] animate-glow-drift"
        style={{
          background: isDark ? "rgba(161,98,7,0.04)" : "rgba(161,98,7,0.03)",
        }}
      />
      {/* Subtle neutral glow — bottom left */}
      <div
        className="absolute bottom-20 -left-32 w-[400px] h-[400px] rounded-full blur-[140px]"
        style={{
          background: isDark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.01)",
          animation: "glowDrift 30s ease-in-out infinite alternate-reverse",
        }}
      />
    </div>
  );
}
