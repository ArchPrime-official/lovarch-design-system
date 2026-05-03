import type { CmsTemplate } from "./index";

/**
 * LP V3 Template — modern landing modeled on `lovarch.com/lp-v3`.
 *
 * Sequence: navbar (dark) → hero (color bg) → feature-grid (4 cols) → pricing → faq → footer.
 * Lighter than lp-premium — no before/after carousel, no testimonials block.
 */
export const LP_V3_TEMPLATE: CmsTemplate = {
  id: "lp-v3",
  display_name: "LP V3 (lovarch.com/lp-v3)",
  description:
    "Modern minimalist landing — dark navbar, color hero, 4-column feature grid, simple pricing.",
  default_target_domain: "lovarch.com",
  default_locale: "it",
  blocks: [
    {
      type: "navbar",
      logoUrl: "https://placehold.co/240x60/000000/ffffff.png?text=LOGO",
      logoAlt: "Brand",
      navLinks: [
        { label: "Features", href: "#features", showMobile: true },
        { label: "Pricing", href: "#pricing", showMobile: true },
        { label: "FAQ", href: "#faq", showMobile: true },
      ],
      loginLabel: "Sign in",
      loginHref: "/login",
      ctaLabel: "Get Started",
      ctaShortLabel: "Try",
      ctaHref: "#pricing",
      variant: "dark",
    },
    {
      type: "hero",
      title: "The modern way to grow your studio.",
      subtitle: "AI-first toolkit for architects. Branding, renders, CRM. One subscription.",
      cta: { label: "Start free", href: "#pricing", variant: "primary" },
      background: { type: "color", value: "#09090B" },
      align: "left",
      height: "regular",
    },
    {
      type: "feature-grid",
      title: "Built for studios that move fast",
      columns: 4,
      features: [
        { title: "Render AI", description: "30s photorealistic renders.", icon: "Sparkles" },
        { title: "Branding", description: "Logo + kit on demand.", icon: "Palette" },
        { title: "CRM", description: "Pipeline + automations.", icon: "Users" },
        { title: "Finance", description: "Invoicing + cashflow.", icon: "DollarSign" },
      ],
    },
    {
      type: "pricing",
      title: "Pricing",
      subtitle: "No hidden fees.",
      tiers: [
        {
          name: "Starter",
          price: "$49",
          period: "/mo",
          features: ["100 renders", "1 brand"],
          ctaLabel: "Start",
          ctaHref: "/signup",
          highlighted: false,
        },
        {
          name: "Pro",
          price: "$99",
          period: "/mo",
          features: ["500 renders", "Unlimited brands", "Team"],
          ctaLabel: "Start",
          ctaHref: "/signup",
          highlighted: true,
        },
      ],
    },
    {
      type: "faq",
      title: "FAQ",
      items: [
        { question: "How does AI render work?", answer: "Upload sketch, get photo render in 30s." },
        { question: "Can I cancel anytime?", answer: "Yes, no penalties." },
      ],
      variant: "dark",
    },
    {
      type: "footer",
      links: [
        { href: "/terms-of-service", label: "Terms", external: false },
        { href: "/privacy-policy", label: "Privacy", external: false },
      ],
      copyright: "© 2026 Brand. All rights reserved.",
      variant: "dark",
    },
  ],
};
