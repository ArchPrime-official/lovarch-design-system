/**
 * Footer — minimal landing footer with logo, link nav and copyright.
 *
 * Content-agnostic: pass texts and links via props.
 *
 * Usage:
 *   <Footer
 *     logoUrl="/logo.png"
 *     logoAlt="LOVARCH"
 *     links={[
 *       { href: "/terms-of-service", label: "Terms" },
 *       { href: "/privacy-policy", label: "Privacy" },
 *       { href: "mailto:support@lovarch.com", label: "Contact", external: true },
 *     ]}
 *     copyright="© 2026 LOVARCH. All rights reserved."
 *   />
 */
import { cn } from "../lib/cn";

export interface FooterLink {
  href: string;
  label: string;
  /** When true, renders as <a> with native navigation. Otherwise consumer can wrap with router Link. */
  external?: boolean;
  /** Optional render override — useful for react-router Link. Receives href + label + className. */
  renderLink?: (props: { href: string; label: string; className: string }) => React.ReactNode;
}

export interface FooterProps {
  logoUrl?: string;
  logoAlt?: string;
  links: FooterLink[];
  copyright: string;
  variant?: "light" | "dark";
  className?: string;
}

export function Footer({
  logoUrl,
  logoAlt = "Logo",
  links,
  copyright,
  variant = "light",
  className,
}: FooterProps) {
  const isDark = variant === "dark";
  const linkClass = cn(
    "transition-colors",
    isDark ? "text-white/60 hover:text-white" : "text-black/60 hover:text-black"
  );

  return (
    <footer
      className={cn(
        "py-10",
        isDark ? "bg-black border-t border-white/10" : "bg-white border-t border-black/10",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          {logoUrl && (
            <img src={logoUrl} alt={logoAlt} className="hidden md:block h-10" />
          )}

          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            {links.map((link, i) =>
              link.renderLink ? (
                <span key={i}>{link.renderLink({ href: link.href, label: link.label, className: linkClass })}</span>
              ) : (
                <a
                  key={i}
                  href={link.href}
                  className={linkClass}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          <p className={cn("text-sm", isDark ? "text-white/40" : "text-black/40")}>
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
