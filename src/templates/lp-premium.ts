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
      cta: {
        label: "Inizia ora",
        href: "#pricing",
        variant: "primary",
      },
      background: { type: "particles" },
      align: "center",
      height: "regular",
    },
    {
      type: "feature-grid",
      title: "Tutto in un solo posto",
      subtitle: "Da brief a brand deck. Da sketch a render fotorealistico.",
      columns: 3,
      features: [
        {
          title: "Render AI",
          description: "Trasforma sketch e planimetrie in render fotorealistici in 30 secondi.",
          icon: "Sparkles",
        },
        {
          title: "Branding completo",
          description: "Logo, colori, font, moodboard e brand kit generati su misura.",
          icon: "Palette",
        },
        {
          title: "Gestione studio",
          description: "CRM, fatturazione, kanban progetti — tutto sincronizzato.",
          icon: "Briefcase",
        },
      ],
    },
    {
      type: "before-after-carousel",
      title: "Render AI in 30 secondi",
      subtitle: "Trascina lo slider per vedere la trasformazione.",
      badgeText: "Render AI",
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
      variant: "dark",
      anchorId: "render",
    },
    {
      type: "pricing",
      title: "Prezzi semplici",
      subtitle: "Inizia gratis. Aggiorna quando cresci.",
      tiers: [
        {
          name: "Personal",
          price: "49€",
          period: "/mese",
          description: "Per architetti freelance.",
          features: ["100 render/mese", "Branding kit", "CRM base"],
          ctaLabel: "Prova gratis",
          ctaHref: "/signup?plan=personal",
          highlighted: false,
        },
        {
          name: "Studio",
          price: "99€",
          period: "/mese",
          description: "Per studi 2-5 persone.",
          features: ["500 render/mese", "Team unlimited", "Client portal"],
          ctaLabel: "Prova gratis",
          ctaHref: "/signup?plan=studio",
          highlighted: true,
        },
        {
          name: "Business",
          price: "199€",
          period: "/mese",
          description: "Per studi 5+ persone.",
          features: ["Render illimitati", "API access", "Onboarding dedicato"],
          ctaLabel: "Contattaci",
          ctaHref: "#enterprise",
          highlighted: false,
        },
      ],
    },
    {
      type: "testimonials",
      title: "Cosa dicono gli studi",
      testimonials: [
        {
          quote: "Lovarch ha rivoluzionato il mio studio. Ora consegno render in un giorno.",
          author: "Giulia R.",
          role: "Architetto, Milano",
        },
        {
          quote: "Il branding kit ci ha risparmiato 3 settimane di lavoro grafico.",
          author: "Marco B.",
          role: "Studio Boscolo, Padova",
        },
        {
          quote: "Finalmente un CRM pensato per architetti. Lo uso ogni giorno.",
          author: "Sara L.",
          role: "Designer, Roma",
        },
      ],
    },
    {
      type: "faq",
      title: "Domande frequenti",
      items: [
        {
          question: "Quanto costa Lovarch?",
          answer:
            "Tre piani: Personal (49€/mese), Studio (99€/mese), Business (199€/mese). Tutti includono prova gratis di 7 giorni.",
        },
        {
          question: "Quanti render posso generare?",
          answer:
            "Personal: 100/mese. Studio: 500/mese. Business: illimitati. Crediti rinnovati ogni mese.",
        },
        {
          question: "Posso annullare quando voglio?",
          answer: "Sì, annulli con un click dal pannello account. Nessuna penale.",
        },
        {
          question: "Il team può collaborare?",
          answer:
            "Sì, dal piano Studio in su. Aggiungi membri illimitati con permessi granulari.",
        },
        {
          question: "Funziona in italiano?",
          answer: "Sì, italiano è la lingua principale. Disponibile anche in EN/PT/ES.",
        },
      ],
      variant: "light",
      anchorId: "faq",
    },
    {
      type: "footer",
      logoAlt: "Brand",
      links: [
        { href: "/terms-of-service", label: "Termini di servizio", external: false },
        { href: "/privacy-policy", label: "Privacy", external: false },
        { href: "mailto:support@lovarch.com", label: "Contatti", external: true },
      ],
      copyright: "© 2026 LOVARCH. Tutti i diritti riservati.",
      variant: "light",
    },
  ],
};
