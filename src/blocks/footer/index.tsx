import { cn } from "../../lib/cn";
import type { FooterBlock } from "./schema";

export function Footer({ block }: { block: FooterBlock }) {
  const isDark = block.variant === "dark";
  const linkClass = cn(
    "transition-colors",
    isDark ? "text-white/60 hover:text-white" : "text-black/60 hover:text-black"
  );

  return (
    <footer
      className={cn(
        "py-10",
        isDark
          ? "bg-black border-t border-white/10"
          : "bg-white border-t border-black/10"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          {block.logoUrl && (
            <img
              src={block.logoUrl}
              alt={block.logoAlt}
              className="hidden md:block h-10"
            />
          )}

          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            {block.links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className={linkClass}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className={cn("text-sm", isDark ? "text-white/40" : "text-black/40")}>
            {block.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
export { FooterSchema } from "./schema";
export type { FooterBlock } from "./schema";
