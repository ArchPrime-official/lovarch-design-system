/**
 * BeforeAfterSlider — drag handle to reveal "after" vs "before" image.
 *
 * Headless: works with any image URLs. Touch + mouse support.
 *
 * Usage:
 *   <BeforeAfterSlider
 *     beforeImage="/images/sketch.webp"
 *     afterImage="/images/render.webp"
 *     beforeLabel="Sketch"
 *     afterLabel="Render"
 *   />
 */
import { useState, useRef, useEffect } from "react";
import { ArrowLeftRight } from "lucide-react";
import { cn } from "../lib/cn";

export interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  onReady?: () => void;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  onReady,
  className,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [beforeLoaded, setBeforeLoaded] = useState(false);
  const [afterLoaded, setAfterLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isReady = beforeLoaded && afterLoaded;

  useEffect(() => {
    if (isReady && onReady) onReady();
  }, [isReady, onReady]);

  useEffect(() => {
    setBeforeLoaded(false);
    setAfterLoaded(false);
    setSliderPosition(50);
  }, [beforeImage, afterImage]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  };

  useEffect(() => {
    if (!isDragging) return;
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const onEnd = () => setIsDragging(false);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [isDragging]);

  const handleStart = () => setIsDragging(true);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-2xl",
        className
      )}
    >
      <img
        src={afterImage}
        alt={afterLabel}
        className={cn(
          "w-full h-auto block transition-opacity duration-300",
          isReady ? "opacity-100" : "opacity-0"
        )}
        draggable={false}
        onLoad={() => setAfterLoaded(true)}
        crossOrigin="anonymous"
      />

      {!isReady && (
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <div
        className={cn(
          "absolute inset-0 overflow-hidden transition-opacity duration-300",
          isReady ? "opacity-100" : "opacity-0"
        )}
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="w-full h-full object-cover"
          draggable={false}
          onLoad={() => setBeforeLoaded(true)}
        />
      </div>

      {isReady && (
        <>
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm text-white text-sm font-medium rounded-full">
            {beforeLabel}
          </div>
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-black text-sm font-medium rounded-full">
            {afterLabel}
          </div>
        </>
      )}

      {isReady && (
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
          style={{ left: `${sliderPosition}%` }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing"
            onMouseDown={handleStart}
            onTouchStart={handleStart}
          >
            <ArrowLeftRight className="w-5 h-5 text-black" />
          </div>
        </div>
      )}
    </div>
  );
}
