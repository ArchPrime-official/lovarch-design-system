/**
 * BeforeAfterCarousel — section with title + slider carousel of before/after pairs.
 *
 * Built on top of BeforeAfterSlider. Background defaults to dark.
 *
 * Usage:
 *   <BeforeAfterCarousel
 *     title="Render AI"
 *     subtitle="Trasforma sketch in render fotorealistici"
 *     badgeText="Render AI"
 *     slides={[
 *       { beforeUrl: "/sketch.webp", afterUrl: "/render.webp", beforeLabel: "Sketch", afterLabel: "Render" },
 *       ...
 *     ]}
 *     ctaLabel="Try Render Studio"
 *     onCtaClick={() => navigate("/signup")}
 *   />
 */
import { useState } from "react";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { BeforeAfterSlider } from "./before-after-slider";
import { cn } from "../lib/cn";

export interface BeforeAfterSlide {
  beforeUrl: string;
  afterUrl: string;
  beforeLabel: string;
  afterLabel: string;
}

export interface BeforeAfterCarouselProps {
  title: string;
  subtitle?: string;
  badgeText?: string;
  badgeIcon?: React.ReactNode;
  slides: BeforeAfterSlide[];
  ctaLabel?: string;
  onCtaClick?: () => void;
  variant?: "light" | "dark";
  className?: string;
  /** HTML id for anchor scroll. Default "render". */
  id?: string;
}

export function BeforeAfterCarousel({
  title,
  subtitle,
  badgeText,
  badgeIcon,
  slides,
  ctaLabel,
  onCtaClick,
  variant = "dark",
  className,
  id = "render",
}: BeforeAfterCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isDark = variant === "dark";

  if (slides.length === 0) return null;

  const next = () => setCurrentSlide((p) => (p + 1) % slides.length);
  const prev = () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);
  const slide = slides[currentSlide];

  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        isDark ? "bg-black" : "bg-white",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {badgeText && (
            <span
              className={cn(
                "inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border text-sm",
                isDark
                  ? "border-white/20 text-white/80"
                  : "border-black/20 text-black/80"
              )}
            >
              {badgeIcon ?? <Sparkles className="w-3.5 h-3.5" />}
              {badgeText}
            </span>
          )}
          <h2
            className={cn(
              "text-2xl md:text-4xl lg:text-5xl font-bold mb-4",
              isDark ? "text-white" : "text-black"
            )}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={cn(
                "text-base md:text-lg max-w-2xl mx-auto",
                isDark ? "text-white/60" : "text-black/60"
              )}
            >
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          <BeforeAfterSlider
            beforeImage={slide.beforeUrl}
            afterImage={slide.afterUrl}
            beforeLabel={slide.beforeLabel}
            afterLabel={slide.afterLabel}
          />

          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                isDark
                  ? "bg-white/10 hover:bg-white/20 text-white"
                  : "bg-black/10 hover:bg-black/20 text-black"
              )}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Slide ${idx + 1}`}
                  onClick={() => setCurrentSlide(idx)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    idx === currentSlide
                      ? isDark
                        ? "bg-white"
                        : "bg-black"
                      : isDark
                        ? "bg-white/30"
                        : "bg-black/30"
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                isDark
                  ? "bg-white/10 hover:bg-white/20 text-white"
                  : "bg-black/10 hover:bg-black/20 text-black"
              )}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {ctaLabel && onCtaClick && (
            <div className="text-center mt-8">
              <button
                type="button"
                onClick={onCtaClick}
                className={cn(
                  "inline-flex items-center justify-center px-6 py-2 rounded-full border font-medium transition-colors",
                  isDark
                    ? "bg-transparent border-white/30 text-white hover:bg-white/10"
                    : "bg-transparent border-black/30 text-black hover:bg-black/10"
                )}
              >
                {ctaLabel}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
