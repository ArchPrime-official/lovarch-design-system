import { useState } from "react";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../lib/cn";
import { BeforeAfterSlider } from "../../lp-blocks/before-after-slider";
import type { BeforeAfterCarouselBlock } from "./schema";

export function BeforeAfterCarousel({ block }: { block: BeforeAfterCarouselBlock }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isDark = block.variant === "dark";

  if (block.slides.length === 0) return null;

  const next = () => setCurrentSlide((p) => (p + 1) % block.slides.length);
  const prev = () =>
    setCurrentSlide((p) => (p - 1 + block.slides.length) % block.slides.length);
  const slide = block.slides[currentSlide];

  return (
    <section
      id={block.anchorId}
      className={cn("py-16 md:py-24", isDark ? "bg-black" : "bg-white")}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {block.badgeText && (
            <span
              className={cn(
                "inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border text-sm",
                isDark
                  ? "border-white/20 text-white/80"
                  : "border-black/20 text-black/80"
              )}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {block.badgeText}
            </span>
          )}
          <h2
            className={cn(
              "text-2xl md:text-4xl lg:text-5xl font-bold mb-4",
              isDark ? "text-white" : "text-black"
            )}
          >
            {block.title}
          </h2>
          {block.subtitle && (
            <p
              className={cn(
                "text-base md:text-lg max-w-2xl mx-auto",
                isDark ? "text-white/60" : "text-black/60"
              )}
            >
              {block.subtitle}
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
              {block.slides.map((_, idx) => (
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

          {block.ctaLabel && block.ctaHref && (
            <div className="text-center mt-8">
              <a
                href={block.ctaHref}
                className={cn(
                  "inline-flex items-center justify-center px-6 py-2 rounded-full border font-medium transition-colors",
                  isDark
                    ? "bg-transparent border-white/30 text-white hover:bg-white/10"
                    : "bg-transparent border-black/30 text-black hover:bg-black/10"
                )}
              >
                {block.ctaLabel}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default BeforeAfterCarousel;
export { BeforeAfterCarouselSchema } from "./schema";
export type { BeforeAfterCarouselBlock } from "./schema";
