/**
 * ShimmerButton — Premium CTA button with shimmer sweep effect (inspired by Magic UI)
 * DS V8: accent gold shimmer, monochrome base
 *
 * Usage:
 *   <ShimmerButton>Get Started</ShimmerButton>
 *   <ShimmerButton variant="outline" size="sm">Learn More</ShimmerButton>
 */
import { cn } from "../lib/cn";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  shimmerColor?: string;
  children: React.ReactNode;
}

export function ShimmerButton({
  variant = "default",
  size = "md",
  shimmerColor = "hsl(38, 90%, 33%)", // accent gold
  children,
  className,
  ...props
}: ShimmerButtonProps) {
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3 text-base",
  };

  const variants = {
    default: "bg-foreground text-background hover:bg-foreground/90",
    outline: "bg-transparent text-foreground border border-border/50 hover:bg-muted/30",
  };

  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-xl font-medium overflow-hidden transition-all active:scale-[0.97]",
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    >
      {/* Shimmer sweep */}
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer-sweep_2.5s_ease-in-out_infinite]"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${shimmerColor}15 40%, ${shimmerColor}25 50%, ${shimmerColor}15 60%, transparent 100%)`,
        }}
      />
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>

      <style>{`
        @keyframes shimmer-sweep {
          0% { transform: translateX(-100%); }
          50%, 100% { transform: translateX(100%); }
        }
      `}</style>
    </button>
  );
}
