# Changelog

## v0.3.1 — 2026-05-04

**Fix template field names + add CI validation script.**

The 3 templates shipped in v0.3.0 used stale field names (`features`/`title`/`subtitle` for feature-grid; `subtitle` for cta; lowercase icons) that failed Zod validation against the canonical schemas. Consumers couldn't use them — `AnyBlockSchema.parse(template.blocks[i])` would reject every feature-grid. PrimeTeam (v0.3.0 consumer) had to ship a parallel `templates.ts` inline with corrected field names; this release re-aligns the DS templates so the inline copy can be removed.

### Fixed
- `LP_PREMIUM_TEMPLATE`, `LP_V3_TEMPLATE`, `LANDING_CLASSIC_TEMPLATE` now use canonical schema names:
  - feature-grid: `features` → `items`, `title` → `heading`, `subtitle` → `subheading`, plus required `variant` field
  - cta: `subtitle` → `body`, `cta: {label,href,variant}` → `button: {label,href}` + `variant` enum
  - footer: required `logoAlt` field added
  - faq: required `anchorId` field added
  - before-after-carousel: required `anchorId` field added
  - feature-grid icons: lowercase (`sparkles`) → PascalCase (`Sparkles`) per `ICON_ALLOWLIST` enum

### Added
- `scripts/validate-templates.ts` — runs `AnyBlockSchema.parse()` against every block of every template, exits non-zero on any failure with a per-error path/message summary
- `npm run validate:templates` script
- `tsx` + `zod` as devDependencies (needed to actually run the validation)
- GitHub Actions workflow `.github/workflows/validate-templates.yml` — runs on every PR and push to main, blocks merges with broken templates

### Why this matters
Templates that fail backend Zod can't be used to seed CMS pages — admin clicks "Use template" → backend returns 400. The CI script makes that catastrophic regression impossible going forward.

## v0.3.0 — 2026-05-03

**4 new CMS blocks + templates registry.**

Closes the gap to "PrimeTeam can create any landing page through the CMS admin" — the renderer now supports navbar, footer, FAQ and before-after carousel as Zod-typed CMS blocks. Plus a new `templates/` registry with 3 ready-to-use page templates (lp-premium / lp-v3 / landing-classic).

### Added — 4 new CMS blocks

Each follows the same `<name>/{schema.ts, index.tsx}` pattern as existing blocks (Hero/CTA/FeatureGrid/Testimonials/Pricing).

- **`navbar`** — sticky header with logo, links, login + CTA. Anchor-based navigation (`href="#features"`) so it's static-renderable. Light/dark variants.
- **`footer`** — minimal footer with logo + links + copyright. Light/dark variants.
- **`faq`** — accordion with stagger reveal, `whitespace-pre-line` answer support. Light/dark variants.
- **`before-after-carousel`** — section wrapper around drag-slider with title/badge/CTA. Light/dark variants.

`AnyBlockSchema` discriminated union: 5 → **9 types**.
`BLOCK_REGISTRY`: 5 → **9 entries**.

### Added — `templates/` subpath (NEW)

Pre-populated `AnyBlock[]` arrays for "create page from template":

- **`LP_PREMIUM_TEMPLATE`** — full marketing landing (8 blocks: navbar → hero → features → before-after → pricing → testimonials → faq → footer). Italian defaults. Models `lovarch.com/lp`.
- **`LP_V3_TEMPLATE`** — modern minimalist (6 blocks, dark variant). Models `lovarch.com/lp-v3`.
- **`LANDING_CLASSIC_TEMPLATE`** — quick promo (4 blocks: hero → features → cta → footer). Models `lovarch.com/landing`.

```ts
import { TEMPLATES, getTemplate, listTemplates } from "@archprime/lovarch-ds/templates";

const tpl = getTemplate("lp-premium");
// → { id, display_name, description, blocks, default_target_domain, default_locale }

await db.from("cms_pages").insert({
  slug: "promo-2026",
  target_domain: tpl.default_target_domain,
  locale: tpl.default_locale,
  blocks: tpl.blocks,
});
```

Image URLs in templates are placeholders pointing to `https://placehold.co` — admin replaces with real assets after creation.

### Migration

Backwards-compatible. Existing pages with the 5 v0.1.0 blocks keep working unchanged. New pages can mix-and-match all 9 block types.

The 4 new block types map 1:1 to the components in `lp-blocks/` subpath (v0.2.0). The `lp-blocks/` versions remain available for non-CMS use cases (e.g. statically-coded landing pages).

---

## v0.2.0 — 2026-05-03

**Component expansion + landing-page composite blocks.**

Lifts the 14-component gap flagged in v0.1.0 and adds 7 LP-level building blocks so PrimeTeam (and any consumer) can replicate the look-and-feel of `lovarch.com/lp` without duplicating code.

### Added — `feedback/` subpath
- `LovarchSymbolLoader` — neural-network loading animation (DS V8 mandatory loader)
- `GlassCard` — glassmorphism card with `backdrop-filter` blur
- `LovarchAlert` — alert with 4 variants (info/warning/success/error), Radix-free

### Added — `charts/` subpath
- `LovarchBarList` — horizontal bar ranking
- `LovarchProgressCircle` — circular progress indicator
- `LovarchTracker` — activity tracker grid

### Added — `animated/` subpath
- `NumberTicker` — spring-animated counter
- `AnimatedList` + `AnimatedListItem` — staggered reveal lists
- `ShimmerButton` — premium CTA with shimmer sweep
- `DotPattern` + `GridPattern` — subtle decorative SVG patterns

### Added — `effects/` subpath
- `ConstellationParticles` — fixed canvas with linked particles (mobile + reduced-motion safe)
- `AmbientGlow` — gold/neutral radial glow blobs
- `BackgroundEffects` — gradient + architectural grid + noise composite

### Added — `lp-blocks/` subpath (NEW — content-agnostic LP sections)
- `Navbar` — sticky header with logo, links, login + CTA. `extraSlot` for LanguageSelector.
- `Footer` — minimal footer with optional `renderLink` override for react-router.
- `Faq` — accordion with stagger reveal, `light`/`dark` variants.
- `BeforeAfterSlider` — drag handle to reveal `after` over `before` (touch + mouse).
- `BeforeAfterCarousel` — section wrapper around the slider with title/badge/CTA.
- `EmailModal` — Radix Dialog lead capture (email + name + phone). Headless validation, override hook available.
- `EnterpriseModal` — Radix Dialog + Radix Select B2B form (role + team_size + needs). Consumer wires `onSubmit` to its API.

All `lp-blocks/*` accept all texts as props — i18n stays in the consumer.

### Added — peerDependencies
- `class-variance-authority` ^0.7.0 (used by `LovarchAlert`)
- `@radix-ui/react-dialog` ^1.1.0 (used by `EmailModal`, `EnterpriseModal`)
- `@radix-ui/react-select` ^2.1.0 (used by `EnterpriseModal`)

### Changed
- `src/index.ts` now re-exports every subpath for convenience (subpath imports remain preferred for tree-shaking).
- `src/components/index.ts` is no longer empty — re-exports from `feedback/`, `charts/`, `animated/`, `effects/`, `lp-blocks/` for backwards compatibility.

### Migration

Consumers that previously imported these from their own `src/components/ui/...` paths can now switch to:

```ts
// Before
import { LovarchSymbolLoader } from "@/components/ui/lovarch-loader";
import { GlassCard } from "@/components/ui/glass-card";
import { LovarchBarList } from "@/components/ui/charts";
import { NumberTicker } from "@/components/ui/animated";
import { ConstellationParticles } from "@/components/ui/constellation-particles";

// After (v0.2.0)
import { LovarchSymbolLoader, GlassCard } from "@archprime/lovarch-ds/feedback";
import { LovarchBarList } from "@archprime/lovarch-ds/charts";
import { NumberTicker } from "@archprime/lovarch-ds/animated";
import { ConstellationParticles } from "@archprime/lovarch-ds/effects";
```

The local files can then be deleted from each consumer.

---

## v0.1.1 — 2026-05-03

**Visual polish for light mode contrast.**

### Changed
- `FeatureGrid` cards: `border-foreground/10 + ring-1 ring-foreground/5 + shadow-sm + hover -translate-y-0.5`. Hover border `foreground/20`. Fixes near-invisibility in warm-white-on-warm-white light mode.
- `Testimonials` cards: same border/ring treatment, hover lift.
- `Pricing` non-highlighted tiers: same border/ring treatment, hover lift. Highlighted tier now `ring-2 ring-accent/40 -translate-y-1` for stronger emphasis.

## v0.1.0 — 2026-05-03

**Initial release for CMS Fase 0.**

### Added
- Tokens (light + dark): ~70 CSS vars from Lovarch DS V8.
- Fonts: Playfair Display, Outfit, DM Sans, Inter, JetBrains Mono.
- Motion lib: stagger, fadeInUp, fadeInScale, slideInRight, scaleOnTap, hoverLift, scrollReveal, listItem.
- `cn` helper (clsx + tailwind-merge).
- Icon allowlist (80 Lucide icons curated).
- Tailwind preset with colors, fonts, shadows, keyframes.
- 5 CMS blocks with Zod schemas + React components: **Hero**, **CTA**, **FeatureGrid**, **Testimonials**, **Pricing**.
- `AnyBlockSchema` discriminated union for editor validation.
- `BlockRenderer` component for renderers consuming JSON blocks.

### Known gaps (deferred to v0.2.x)
- 13 shared components (LovarchSymbolLoader, GlassCard, ConstellationParticles, AmbientGlow, LovarchAlert, BackgroundEffects, charts/*, animated/*) not yet extracted — consumers continue importing them from their local `src/components/ui/` paths.
- No Vite library build / dts output yet — submodule is consumed via direct source import.
