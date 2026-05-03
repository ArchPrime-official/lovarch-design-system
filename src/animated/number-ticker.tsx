/**
 * NumberTicker — Animated counter that springs to target value (inspired by Magic UI)
 * DS V8: DM Sans font, uses Framer Motion useSpring
 *
 * Usage:
 *   <NumberTicker value={1234} />
 *   <NumberTicker value={98.5} decimals={1} prefix="$" suffix="%" />
 */
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "../lib/cn";

interface NumberTickerProps {
  value: number;
  direction?: "up" | "down";
  decimals?: number;
  prefix?: string;
  suffix?: string;
  delay?: number; // seconds
  className?: string;
}

export function NumberTicker({
  value,
  direction = "up",
  decimals = 0,
  prefix = "",
  suffix = "",
  delay = 0,
  className,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, { damping: 40, stiffness: 120 });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Intl.NumberFormat("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(Number(latest.toFixed(decimals)))}${suffix}`;
      }
    });
    return unsubscribe;
  }, [springValue, decimals, prefix, suffix]);

  return (
    <span
      ref={ref}
      className={cn("tabular-nums font-bold", className)}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {prefix}0{suffix}
    </span>
  );
}
