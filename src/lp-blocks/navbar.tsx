/**
 * Navbar — sticky landing-page header with logo + nav + actions.
 *
 * Content-agnostic: all texts, links and callbacks come from props (consumer i18n).
 *
 * Usage:
 *   <Navbar
 *     logoUrl="/lovarch-logo.png"
 *     logoAlt="LOVARCH"
 *     navLinks={[
 *       { label: "Features", onClick: () => scrollTo("features"), showMobile: true },
 *       { label: "Pricing", onClick: () => scrollTo("pricing"), showMobile: true },
 *     ]}
 *     loginLabel="Log in"
 *     onLogin={() => navigate("/login")}
 *     ctaLabel="Get Started"
 *     ctaShortLabel="Try"
 *     onCtaClick={() => scrollTo("pricing")}
 *     extraSlot={<LanguageSelector />}
 *   />
 */
import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { cn } from "../lib/cn";

export interface NavbarLink {
  label: string;
  onClick: () => void;
  showMobile?: boolean;
}

export interface NavbarProps {
  logoUrl: string;
  logoAlt?: string;
  navLinks: NavbarLink[];
  loginLabel: string;
  onLogin: () => void;
  ctaLabel: string;
  ctaShortLabel?: string;
  onCtaClick: () => void;
  /** Slot for LanguageSelector or other consumer-controlled UI */
  extraSlot?: React.ReactNode;
  /** When true, navbar uses dark text. Default: light theme (white background). */
  variant?: "light" | "dark";
  className?: string;
}

export function Navbar({
  logoUrl,
  logoAlt = "Logo",
  navLinks,
  loginLabel,
  onLogin,
  ctaLabel,
  ctaShortLabel,
  onCtaClick,
  extraSlot,
  variant = "light",
  className,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = variant === "dark";
  const textBase = isDark ? "text-white/70" : "text-black/70";
  const textHover = isDark ? "hover:text-white" : "hover:text-black";
  const ctaBg = isDark ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-black/90";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? isDark
            ? "bg-black/95 backdrop-blur-lg border-b border-white/5 shadow-sm"
            : "bg-white/95 backdrop-blur-lg border-b border-black/5 shadow-sm"
          : "bg-transparent",
        className
      )}
    >
      <div className="container mx-auto px-1 sm:px-4 h-14 md:h-16 flex items-center justify-between gap-1">
        <div className="flex items-center flex-shrink-0">
          <img
            src={logoUrl}
            alt={logoAlt}
            className="h-5 sm:h-8 md:h-12 w-auto flex-shrink-0 max-w-[90px] sm:max-w-none"
            style={{ aspectRatio: "auto", objectFit: "contain" }}
          />
        </div>

        <nav className="flex items-center gap-1.5 sm:gap-2 md:gap-8">
          {navLinks.map((link, i) => (
            <button
              key={i}
              onClick={link.onClick}
              className={cn(
                "text-[8px] sm:text-xs md:text-sm transition-colors font-medium px-0 sm:px-2 whitespace-nowrap",
                textBase,
                textHover,
                link.showMobile === false && "hidden md:block"
              )}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-0.5 sm:gap-2 md:gap-3 flex-shrink-0">
          {extraSlot}
          <button
            type="button"
            onClick={onLogin}
            className={cn(
              "inline-flex items-center justify-center text-xs md:text-sm font-medium px-0.5 sm:px-2 h-6 sm:h-8 rounded-md transition-colors",
              textBase,
              textHover
            )}
          >
            <User className="h-3.5 w-3.5 sm:hidden" />
            <span className="hidden sm:inline">{loginLabel}</span>
          </button>
          <button
            type="button"
            onClick={onCtaClick}
            className={cn(
              "inline-flex items-center justify-center font-medium text-[8px] sm:text-xs md:text-sm px-1 sm:px-3 md:px-4 h-5 sm:h-8 md:h-9 rounded-full flex-shrink-0 transition-colors",
              ctaBg
            )}
          >
            <span className="sm:hidden">{ctaShortLabel || ctaLabel}</span>
            <span className="hidden sm:inline">{ctaLabel}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
