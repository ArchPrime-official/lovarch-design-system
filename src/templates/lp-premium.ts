import type { CmsTemplate } from "./index";

/**
 * LP Premium Template — full marketing landing page modeled on `lovarch.com/lp`.
 *
 * Sequence:
 *   1. Navbar (sticky)
 *   2. Hero (with title + subtitle + CTA, particles bg)
 *   3. FeatureGrid (3 feature cards)
 *   4. BeforeAfterCarousel (Render AI showcase)
 *   5. Pricing (3 tiers)
 *   6. Testimonials (3 quotes)
 *   7. Faq (5 questions)
 *   8. Footer (legal links + copyright)
 *
 * URLs are placeholders pointing to https://placehold.co — admin replaces with real assets.
 */
export const LP_PREMIUM_TEMPLATE: CmsTemplate = {
  id: "lp-premium",
  display_name: "LP Premium (lovarch.com/lp)",
  description:
    "Full premium landing — hero with particles, before/after AI render carousel, 3-tier pricing, testimonials, FAQ. Perfect for Italia growth campaigns.",
  default_target_domain: "lovarch.com",
  default_locale: "it",
  blocks: [
    {
      type: "navbar",
      logoUrl: "https://placehold.co/240x60/transparent/000000.png?text=LOGO",
      logoAlt: "Brand",
      navLinks: [
        { label: "Features", href: "#features", showMobile: true },
        { label: "Prezzi", href: "#pricing", showMobile: true },
        { label: "Testimonianze", href: "#testimonials", showMobile: false },
        { label: "FAQ", href: "#faq", showMobile: true },
      ],
      loginLabel: "Accedi",
      loginHref: "/login",
      ctaLabel: "Inizia gratis",
      ctaShortLabel: "Prova",
      ctaHref: "#pricing",
      variant: "light",
    },
    {
      type: "hero",
      title: "AI Growth System per Architetti & Designer",
      subtitle:
        "Tutto quello di cui hai bisogno per crescere lo studio: branding, render AI, content, gestione clienti — in un'unica piattaforma.",
      cta: { label: "Inizia ora", href: "#pricing", variant: "primary" },
      background: { type: "particles" },
      align: "center",
      height: "regular",
    },
    {
      type: "feature-grid",
      heading: "Tutto in un solo posto",
      subheading: "Da brief a brand deck. Da sketch a render fotorealistico.",
      columns: 3,
      variant: "icons-top",
      items: [
        {
          icon: "Sparkles",
          title: "Render AI",
          description: "Trasforma sketch e planimetrie in render fotorealistici in 30 secondi.",
        },
        {
          icon: "Palette",
          title: "Branding completo",
          description: "Logo, colori, font, moodboard e brand kit generati su misura.",
        },
        {
          icon: "Briefcase",
          title: "Gestione studio",
          description: "CRM, fatturazione, kanban progetti — tutto sincronizzato.",
        },
      ],
    },
    {
      type: "before-after-carousel",
      title: "Render AI in 30 secondi",
      subtitle: "Trascina lo slider per vedere la trasformazione.",
      badgeText: "Render AI",
      anchorId: "render",
      variant: "dark",
      slides: [
        {
          beforeUrl: "https://placehold.co/1200x800/eeeeee/333333.jpg?text=Sketch",
          afterUrl: "https://placehold.co/1200x800/333333/eeeeee.jpg?text=Render",
          beforeLabel: "Sketch",
          afterLabel: "Render",
        },
        {
          beforeUrl: "https://placehold.co/1200x800/dddddd/444444.jpg?text=Stanza+vuota",
          afterUrl: "https://placehold.co/1200x800/444444/dddddd.jpg?text=Render+arredato",
          beforeLabel: "Vuoto",
          afterLabel: "Arredato",
        },
      ],
      ctaLabel: "Prova Render Studio",
      ctaHref: "#pricing",
    },
    {
      type: "pricing",
      heading: "Prezzi",
      subheading: "Nessun costo nascosto.",
      tiers: [
        {
          name: "Personal",
          price: "€49",
          period: "/mese",
          features: ["100 render", "1 brand", "CRM base"],
          cta: { label: "Inizia", href: "/signup" },
          highlighted: false,
        },
        {
          name: "Studio",
          price: "€99",
          period: "/mese",
          features: ["500 render", "Brand illimitati", "Team", "CRM avanzato"],
          cta: { label: "Inizia", href: "/signup" },
          highlighted: true,
          badge: "Più popolare",
        },
        {
          name: "Business",
          price: "€199",
          period: "/mese",
          features: ["Render illimitati", "API", "Onboarding dedicato"],
          cta: { label: "Contattaci", href: "/contact" },
          highlighted: false,
        },
      ],
    },
    {
      type: "testimonials",
      heading: "Cosa dicono i nostri studi",
      variant: "cards",
      items: [
        {
          quote: "Lovarch mi ha fatto risparmiare 20 ore alla settimana.",
          author: "Marco R.",
          role: "Studio Architettura, Milano",
        },
        {
          quote: "I render AI sono indistinguibili da quelli del mio render artist.",
          author: "Giulia M.",
          role: "Interior Designer",
        },
        {
          quote: "Il CRM finalmente ha senso per chi lavora come architetto.",
          author: "Luca B.",
          role: "Studio AB+, Roma",
        },
      ],
    },
    {
      type: "faq",
      title: "Domande frequenti",
      anchorId: "faq",
      variant: "light",
      items: [
        {
          question: "Come funziona il Render AI?",
          answer:
            "Carichi sketch o planimetria, scegli stile e in 30 secondi ottieni un render fotorealistico.",
        },
        {
          question: "Posso annullare quando voglio?",
          answer: "Sì, nessuna penale. Annulli con un click.",
        },
        {
          question: "I miei dati sono al sicuro?",
          answer: "Tutto criptato, server EU, conformità GDPR.",
        },
        {
          question: "Posso provare gratis?",
          answer: "Sì, 7 giorni di trial completo, nessuna carta richiesta.",
        },
        {
          question: "Posso esportare i dati?",
          answer: "Sì, export completo CSV/JSON in qualsiasi momento.",
        },
      ],
    },
    {
      type: "footer",
      logoAlt: "Brand",
      links: [
        { href: "/terms-of-service", label: "Termini", external: false },
        { href: "/privacy-policy", label: "Privacy", external: false },
        { href: "/contact", label: "Contatti", external: false },
      ],
      copyright: "© 2026 Brand. Tutti i diritti riservati.",
      variant: "light",
    },
  ],
};
