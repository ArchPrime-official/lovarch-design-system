/**
 * Motion utilities — Reusable Framer Motion variants and helpers
 * DS V8: Expo.out 700ms, press scale 0.97, scroll reveal
 *
 * Usage:
 *   import { stagger, fadeInUp, scaleOnTap } from "@/lib/motion";
 *   <motion.div variants={fadeInUp} initial="hidden" animate="visible">
 *   <motion.div {...scaleOnTap}>
 */
import type { Variants, TargetAndTransition, Easing } from "framer-motion";

// ─── Easing curves (DS V8) ─────────────────────────────
// Cubic-bezier control points typed as a framer-motion Easing tuple so they
// satisfy `Transition["ease"]` under framer-motion v12's stricter typings.
export const easeExpoOut: Easing = [0.16, 1, 0.3, 1];
export const easeSmooth: Easing = [0.2, 0, 0, 1];

// ─── Stagger container ─────────────────────────────────
export const stagger = (staggerMs = 60): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerMs / 1000 },
  },
});

// ─── Fade in + slide up ────────────────────────────────
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeExpoOut },
  },
};

// ─── Fade in + scale ───────────────────────────────────
export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: easeExpoOut },
  },
};

// ─── Slide in from right ───────────────────────────────
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: easeExpoOut },
  },
};

// ─── Press scale (tap feedback) ────────────────────────
export const scaleOnTap = {
  whileTap: { scale: 0.97 } as TargetAndTransition,
  transition: { type: "spring" as const, stiffness: 400, damping: 17 },
};

// ─── Hover lift ────────────────────────────────────────
export const hoverLift = {
  whileHover: { y: -2, transition: { duration: 0.2 } } as TargetAndTransition,
};

// ─── Scroll reveal (for useInView) ─────────────────────
export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeExpoOut },
  },
};

// ─── Number spring config ──────────────────────────────
export const numberSpringConfig = {
  damping: 40,
  stiffness: 120,
};

// ─── Layout transition ─────────────────────────────────
export const layoutTransition = {
  type: "spring" as const,
  stiffness: 350,
  damping: 30,
};

// ─── List item (for stagger children) ──────────────────
export const listItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: easeExpoOut },
  },
};
