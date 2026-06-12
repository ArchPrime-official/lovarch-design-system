# Lovarch Design System V8

Shared design system distributed as a **git submodule** to Lovarch + PrimeTeam (and future ArchPrime.io). Single source of truth for tokens, motion, components, blocks and landing-page sections.

> ⚠️ **NEVER edit files inside a consumer's `squads/lovarch-design-system/` directly.** Edit here, push, then run `bump-all-squads.sh` in each consumer.

> **Package name divergence (known, intentional for now):**
> `package.json` declares `name: "@archprime/lovarch-design-system"`, but both consumers
> (PrimeTeam and repo `ByPabloRuanL/lovarch`) resolve it via the Vite alias
> `"@archprime/lovarch-ds"` — **not** via npm install. The `name` field is therefore unused
> at runtime. Renaming it to `@archprime/lovarch-ds` requires a coordinated change in both
> consumers' `vite.config.ts` and `package.json`, and has been deferred to avoid risk.
> Until then: **always use `@archprime/lovarch-ds/...` in import statements** regardless of
> what `package.json name` says.

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

## CMS blocks (13 types)

| Type | Version | Description |
|---|---|---|
| `hero` | v0.1.0 | Full-width hero with title + subtitle + CTA. Supports color/image/video/particles bg. |
| `cta` | v0.1.0 | CTA section with optional background. |
| `feature-grid` | v0.1.0 | Grid of feature cards with icon + title + description. |
| `testimonials` | v0.1.0 | Quote cards with author + role. |
| `pricing` | v0.1.0 | Tier comparison with highlighted plan. |
| `navbar` | v0.3.0 | Sticky header with anchor-based nav. Light/dark. |
| `footer` | v0.3.0 | Minimal footer with logo + legal links. Light/dark. |
| `faq` | v0.3.0 | Accordion FAQ with stagger reveal. Light/dark. |
| `before-after-carousel` | v0.3.0 | Section with slider carousel for AI render showcase. Light/dark. |
| `lead-form` | v0.4.1 | Native lead capture. Submit handler injected via `<LeadFormProvider>`. |
| `ecosystem` | v0.5.0 | N-phase flow section (label/title/desc/icon + featureList per phase). Light/dark. |
| `stats` | v0.5.0 | Metric grid (value + label), 1–6 items. Animated on scroll. Light/dark. |
| `replaces` | v0.5.0 | Tag cloud of tools the platform replaces, with optional footer line. |

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

## Consumer map: PrimeTeam vs Lovarch

This DS is consumed by **two separate repos**. Their usage patterns differ:

| Subpath / export | PrimeTeam (`primeteam.archprime.io`) | Lovarch (`ByPabloRuanL/lovarch`) |
|---|---|---|
| `blocks` — `BlockRenderer` | ✅ `LovarchPageRenderer.tsx` renders CMS pages | ✅ `CmsPageRenderer.tsx` (mirror) |
| `blocks` — `AnyBlockSchema` | ✅ backend Zod validation | ✅ backend Zod validation |
| `tokens/css`, `tokens/fonts`, `tokens/globals` | ✅ imported in `main.tsx` | ✅ imported in `main.tsx` |
| `tailwind-preset` | ✅ `tailwind.config.ts` | ✅ `tailwind.config.ts` |
| `lp-blocks` | ✅ statically-coded LPs | ✅ statically-coded LPs |
| `feedback`, `animated`, `effects`, `charts` | ✅ shared UI components | ✅ shared UI components |
| `templates` | ✅ admin "create from template" | ❌ not used (CMS managed by PrimeTeam) |
| `brand` | ✅ logo in emails + OG meta | ✅ logo in headers + OG meta |

### Breaking-change rule — PR companion required

Any change to `blocks/` (schema, component, or `AnyBlockSchema` union) is a
**dual-consumer breaking change**. Both repos parse the same Zod schemas from the same
`landing_pages` table. Procedure:

1. Open PR in this repo with the block change.
2. **On the same day**, open a companion PR in `ByPabloRuanL/lovarch` updating
   `src/pages/cms/CmsPageRenderer.tsx` (and any related hooks) to match.
3. Reference both PRs in each other's description.
4. Never merge the DS PR before the Lovarch companion PR is ready.

Failure to do this causes `lovarch.com/page/{slug}` pages to break silently (no alert,
no user will notice until someone manually opens a LP).

Hook changes (`useCmsTracking.ts`) and API shape changes (`cms-pages-api` response) follow
the same rule.

## Versions

- **v0.1.0** — 5 CMS blocks (Hero/CTA/FeatureGrid/Testimonials/Pricing), tokens, motion, cn helper.
- **v0.1.1** — Light-mode contrast fix on FeatureGrid/Testimonials/Pricing cards.
- **v0.2.0** — 14 shared components (feedback/charts/animated/effects) + 7 LP-blocks (Navbar/Footer/Faq/BeforeAfter/EmailModal/EnterpriseModal).
- **v0.3.0** — 4 new CMS blocks (navbar/footer/faq/before-after-carousel) + `templates/` registry with 3 page templates (lp-premium/lp-v3/landing-classic).
- **v0.3.1** — Fix template field names + CI validation script (`validate-templates.yml`).
- **v0.4.0** — `brand/` subpath: official Lovarch logos, symbol, asset URLs.
- **v0.4.1** — `lead-form` block: native lead capture with `<LeadFormProvider>`.
- **v0.5.0** — 3 new CMS blocks: `ecosystem` (N-phase flow), `stats` (metric grid), `replaces` (tag cloud). Parity with lovarch.com/lp-v3.

## Roadmap

- v0.5.x — multi-domain theming hooks (ArchPrime.io vs Lovarch variants)
- v0.5.x — PNG asset compression (brand subpath ~3.9MB total)
- v0.x — rename `package.json name` from `@archprime/lovarch-design-system` to `@archprime/lovarch-ds` (coordinated with both consumers)

## License

Proprietary © ArchPrime / Lovarch.
