import { motion } from "framer-motion";
import { fadeInUp, scaleOnTap } from "../../lib/motion";
import { cn } from "../../lib/cn";
import type { HeroBlock } from "./schema";

const HEIGHT_CLASSES: Record<HeroBlock["height"], string> = {
  compact: "min-h-[60vh] py-16 md:py-24",
  regular: "min-h-[80vh] py-20 md:py-32",
  full: "min-h-screen py-24 md:py-40",
};

export function Hero({ block }: { block: HeroBlock }) {
  const isCenter = block.align === "center";
  const bg = block.background;

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden flex items-center",
        HEIGHT_CLASSES[block.height],
      )}
      style={
        bg.type === "color"
          ? { backgroundColor: bg.value }
          : bg.type === "image"
          ? { backgroundImage: `url(${bg.url})`, backgroundSize: "cover", backgroundPosition: "center" }
          : undefined
      }
    >
      {bg.type === "image" && bg.overlay !== undefined && (
        <div className="absolute inset-0 bg-black" style={{ opacity: bg.overlay }} aria-hidden="true" />
      )}
      {bg.type === "video" && (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={bg.poster}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={bg.url} />
        </video>
      )}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className={cn(
          "relative z-10 max-w-5xl mx-auto px-5 md:px-8 w-full",
          isCenter ? "text-center" : "text-left",
        )}
      >
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight font-bold text-foreground"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {block.title}
        </h1>
        {block.subtitle && (
          <p
            className={cn(
              "mt-5 md:mt-7 text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl",
              isCenter && "mx-auto",
            )}
          >
            {block.subtitle}
          </p>
        )}
        {block.cta && (
          <div className={cn("mt-8 md:mt-10", isCenter && "flex justify-center")}>
            <motion.a
              href={block.cta.href}
              {...scaleOnTap}
              className={cn(
                "inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 rounded-xl font-semibold text-sm md:text-base shadow-lg transition-shadow hover:shadow-xl min-h-[44px]",
                block.cta.variant === "primary"
                  ? "bg-accent text-accent-foreground"
                  : "bg-foreground/5 text-foreground border border-border/50",
              )}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {block.cta.label}
            </motion.a>
          </div>
        )}
      </motion.div>
    </section>
  );
}

export default Hero;
export { HeroSchema } from "./schema";
export type { HeroBlock } from "./schema";
