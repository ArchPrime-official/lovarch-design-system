import type { CmsTemplate } from "./index";

/**
 * Landing Classic Template — clean and simple, modeled on `lovarch.com/landing`.
 *
 * Hero + 3-feature-grid + CTA + Footer. Minimal — for quick promo pages.
 */
export const LANDING_CLASSIC_TEMPLATE: CmsTemplate = {
  id: "landing-classic",
  display_name: "Landing Classic (lovarch.com/landing)",
  description: "Minimal promo page — hero, features, CTA, footer. Quick to fill.",
  default_target_domain: "lovarch.com",
  default_locale: "it",
  blocks: [
    {
      type: "hero",
      title: "Cresci il tuo studio. Senza sforzo.",
      subtitle: "Tutto quello che ti serve, in un unico posto.",
      cta: { label: "Inizia gratis", href: "#cta", variant: "primary" },
      background: { type: "color", value: "#FAF9F7" },
      align: "center",
      height: "compact",
    },
    {
      type: "feature-grid",
      title: "Tre cose che facciamo bene",
      columns: 3,
      features: [
        { title: "Render", description: "Foto realistici in secondi.", icon: "Sparkles" },
        { title: "Brand", description: "Identità visuale completa.", icon: "Palette" },
        { title: "Studio", description: "Gestione clienti e progetti.", icon: "Briefcase" },
      ],
    },
    {
      type: "cta",
      title: "Pronto a iniziare?",
      subtitle: "7 giorni gratis. Nessuna carta richiesta.",
      cta: { label: "Inizia ora", href: "/signup", variant: "primary" },
      background: { type: "color", value: "#09090B" },
    },
    {
      type: "footer",
      copyright: "© 2026 Brand. Tutti i diritti riservati.",
      links: [
        { href: "/terms-of-service", label: "Termini", external: false },
        { href: "/privacy-policy", label: "Privacy", external: false },
      ],
      variant: "light",
    },
  ],
};
