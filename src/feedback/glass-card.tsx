/**
 * GlassCard — DS V8 glassmorphism card with backdrop-filter blur
 *
 * Usage:
 *   <GlassCard>Content</GlassCard>
 *   <GlassCard variant="accent" blur={16}>Highlighted</GlassCard>
 */
import { forwardRef } from "react";
import { cn } from "../lib/cn";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "accent";
  blur?: 8 | 12 | 16 | 24;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", blur = 12, children, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border p-4 transition-all duration-300",
          variant === "default" && "border-border/40 hover:border-border/50 hover:shadow-md",
          variant === "accent" && "border-[rgba(161,98,7,0.15)] hover:border-[rgba(161,98,7,0.3)]",
          className
        )}
        style={{
          background: variant === "accent"
            ? "linear-gradient(135deg, rgba(161,98,7,0.06), transparent 70%)"
            : "var(--surface)",
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";
export { GlassCard };
