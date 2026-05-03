# Lovarch Design System V8

Shared design system distributed as a **git submodule** to Lovarch + PrimeTeam (and future ArchPrime.io). Single source of truth for tokens, motion, components, blocks and landing-page sections.

> ⚠️ **NEVER edit files inside a consumer's `squads/lovarch-design-system/` directly.** Edit here, push, then run `bump-all-squads.sh` in each consumer.

## Install (consumer apps)

```bash
git submodule add https://github.com/ArchPrime-official/lovarch-design-system squads/lovarch-design-system
```

### Required peerDependencies in consumer

The submodule declares peer deps but the **consumer must install them**:

```jsonc
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "framer-motion": "^12.0.0",
  "lucide-react": "^0.462.0",
  "zod": "^3.23.0",
  "tailwindcss": "^3.4.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0",
  "class-variance-authority": "^0.7.0",
  "@radix-ui/react-dialog": "^1.1.0",
  "@radix-ui/react-select": "^2.1.0"
}
```

### Vite alias

```ts
// vite.config.ts
resolve: {
  alias: {
    "@archprime/lovarch-ds": path.resolve(__dirname, "./squads/lovarch-design-system/src"),
  },
}
```

### Tailwind preset + content path (CRITICAL)

```ts
// tailwind.config.ts
import lovarchPreset from "./squads/lovarch-design-system/tailwind-preset";

export default {
  presets: [lovarchPreset],
  content: [
    "./src/**/*.{ts,tsx}",
    // ⚠️ MANDATORY: include the submodule sources so Tailwind doesn't tree-shake classes
    "./squads/lovarch-design-system/src/**/*.{ts,tsx}",
  ],
};
```

### Import tokens once in `main.tsx`

```ts
import "@archprime/lovarch-ds/tokens/css";
import "@archprime/lovarch-ds/tokens/fonts";
import "@archprime/lovarch-ds/tokens/globals";
```

## Subpaths

| Subpath | Exports | Use for |
|---|---|---|
| `/blocks` | `BlockRenderer`, `AnyBlockSchema`, 9 block schemas | CMS-rendered Zod blocks |
| `/templates` | `TEMPLATES`, `getTemplate`, `listTemplates`, 3 page templates | Create-page-from-template |
| `/feedback` | `LovarchSymbolLoader`, `GlassCard`, `LovarchAlert` | Loading + cards + alerts |
| `/charts` | `LovarchBarList`, `LovarchProgressCircle`, `LovarchTracker` | KPI visualisations |
| `/animated` | `NumberTicker`, `AnimatedList`, `ShimmerButton`, `DotPattern`, `GridPattern` | Micro-interactions + decorative patterns |
| `/effects` | `ConstellationParticles`, `AmbientGlow`, `BackgroundEffects` | Full-screen ambient backgrounds |
| `/lp-blocks` | `Navbar`, `Footer`, `Faq`, `BeforeAfterSlider`, `BeforeAfterCarousel`, `EmailModal`, `EnterpriseModal` | Statically-coded landing-page sections (callbacks-based) |

## CMS blocks (9 types)

| Type | Description |
|---|---|
| `hero` | Full-width hero with title + subtitle + CTA. Supports color/image/video/particles bg. |
| `cta` | CTA section with optional background. |
| `feature-grid` | Grid of feature cards with icon + title + description. |
| `testimonials` | Quote cards with author + role. |
| `pricing` | Tier comparison with highlighted plan. |
| `navbar` | **(v0.3.0)** Sticky header with anchor-based nav. Light/dark. |
| `footer` | **(v0.3.0)** Minimal footer with logo + legal links. Light/dark. |
| `faq` | **(v0.3.0)** Accordion FAQ with stagger reveal. Light/dark. |
| `before-after-carousel` | **(v0.3.0)** Section with slider carousel for AI render showcase. Light/dark. |

## Renderer usage (CMS pages)

```tsx
import { BlockRenderer, AnyBlockSchema } from "@archprime/lovarch-ds/blocks";

const blocks = AnyBlockSchema.array().parse(page.blocks);
return blocks.map((b, i) => <BlockRenderer key={i} block={b} />);
```

## LP-blocks usage (content-agnostic, consumer wires i18n)

```tsx
import { Navbar, Faq, BeforeAfterCarousel, EmailModal } from "@archprime/lovarch-ds/lp-blocks";
import { useLanguage } from "@/contexts/LanguageContext";

export function MyLanding() {
  const { t } = useLanguage();
  return (
    <>
      <Navbar
        logoUrl="/lovarch-logo.png"
        navLinks={[
          { label: t("lp.nav.features"), onClick: () => scrollTo("features") },
          { label: t("lp.nav.pricing"), onClick: () => scrollTo("pricing") },
        ]}
        loginLabel={t("lp.nav.login")}
        ctaLabel={t("lp.nav.cta")}
        onLogin={() => navigate("/login")}
        onCtaClick={() => scrollTo("pricing")}
      />
      <Faq title={t("lp.faq.title")} items={faqItems} />
    </>
  );
}
```

## Components (root subpath, optional)

For convenience, the root export `import { ... } from "@archprime/lovarch-ds"` re-exports everything. Subpath imports are preferred for tree-shaking.

## Versions

- **v0.1.0** — 5 CMS blocks (Hero/CTA/FeatureGrid/Testimonials/Pricing), tokens, motion, cn helper.
- **v0.1.1** — Light-mode contrast fix on FeatureGrid/Testimonials/Pricing cards.
- **v0.2.0** — 14 shared components (feedback/charts/animated/effects) + 7 LP-blocks (Navbar/Footer/Faq/BeforeAfter/EmailModal/EnterpriseModal).
- **v0.3.0** — 4 new CMS blocks (navbar/footer/faq/before-after-carousel) + `templates/` registry with 3 page templates (lp-premium/lp-v3/landing-classic).

## Templates usage (CMS Fase 4)

```ts
import { getTemplate, listTemplates } from "@archprime/lovarch-ds/templates";

// List templates for admin gallery
const templates = listTemplates();

// Create new CMS page from template
const tpl = getTemplate("lp-premium")!;
await supabase.from("cms_pages").insert({
  slug: "promo-italia-2026",
  target_domain: tpl.default_target_domain,
  locale: tpl.default_locale,
  blocks: tpl.blocks,  // 8 pre-populated blocks
  status: "draft",
});
```

## Roadmap

- v0.4.x — additional CMS blocks (Logos, Stats, Hero with carousel)
- v0.4.x — multi-domain theming hooks (ArchPrime.io vs Lovarch variants)

## License

Proprietary © ArchPrime / Lovarch.
