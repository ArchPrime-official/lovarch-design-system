# Changelog

## v0.5.1 — 2026-06-12

### Changed

- **Package `name` aligned to `@archprime/lovarch-ds`** (era `@archprime/lovarch-design-system`).
  Ambos os consumidores (PrimeTeam e `ByPabloRuanL/lovarch`) já importavam via o alias Vite
  `@archprime/lovarch-ds` → `squads/lovarch-design-system/src`, então o rename não exigiu
  mudança de config em nenhum consumidor — apenas remove a divergência name↔chave de import.

## Unreleased — 2026-06-12

**Audit fixes (Fase 7 of `2026-06-12-squads-prd-audit-implementation-plan.md`).** No new
features — correctness, typecheck hygiene, repo-size and docs.

### Fixed

- **Root barrel name collision (critical).** `src/index.ts` re-exported `./blocks` and
  `./lp-blocks` with `export *`, so `Navbar`, `Footer`, `Faq` and `BeforeAfterCarousel`
  (present in both) became ambiguous and were silently dropped from the root barrel —
  `import { Faq } from "@archprime/lovarch-ds"` resolved to `undefined`. The CMS-block
  versions now keep the canonical root names; the LP versions are re-exported explicitly
  with an `Lp` prefix (`LpNavbar`, `LpFooter`, `LpFaq`, `LpBeforeAfterCarousel`). The
  `/lp-blocks` subpath is unchanged.
- **Typecheck now passes clean.** framer-motion v12 tightened `Transition` typings, leaving
  13 pre-existing `error TS` in `src/lib/motion.ts` and four blocks (`cta`/`hero`/
  `lead-form`/`pricing`) that spread `scaleOnTap`. Fixed by typing the easing tuples as
  `Easing` and pinning `scaleOnTap.transition.type` with `as const`. This unblocks the
  `typecheck` job in `.github/workflows/validate-templates.yml`.

### Changed

- **Assets compressed** (~3.2MB → ~0.9MB across the three): `og-image.png` 2.65MB → 1.48MB
  (1536×1024 → 1200×800, standard OG width), `logo-email.png` 768KB → 88KB (1536×652 →
  1024×434), `favicon.png` 488KB → 171KB (819×922 → 455×512). Dimension comments in
  `src/brand/assets.ts` updated accordingly. (sips resize only — pngquant unavailable.)
- **`bg-neutral-950` → `bg-[#09090B]`** (official DS V8 dark base) in the two remaining
  uses: `blocks/faq/index.tsx`, `lp-blocks/faq.tsx`.
- **README** — `/blocks` subpath row now says "13 block schemas" (was 9); documented the
  root-barrel `Lp`-alias collision; updated Roadmap (PNG compression done; added
  blocks↔lp-blocks core-extraction and placehold.co backlog items).
- `package-lock.json` version field synced 0.4.0 → 0.5.0 to match `package.json`.

### Follow-ups (not done here)

- Extract a shared core for the `blocks` ↔ `lp-blocks` duplicates (navbar/footer/faq/
  carousel) so fixes land once instead of twice.
- Replace the 7 `placehold.co` URLs in `templates/lp-v3.ts` / `templates/lp-premium.ts`
  with hosted Lovarch Storage assets once stable URLs exist (block schemas require
  absolute `.url()` values, so they stay on placehold.co until real assets are uploaded).

## v0.5.0 — 2026-06-12

**3 new CMS blocks: `ecosystem`, `stats`, `replaces` — parity with lovarch.com/lp-v3.**

Closes the block gap between the DS and the live lp-v3 layout. All three blocks follow the
established pattern (`schema.ts` + `index.tsx`, framer-motion, DS V8 tokens) and are registered
in `registry.ts` (`AnyBlockSchema` + `BLOCK_REGISTRY`).

`AnyBlockSchema` discriminated union: 10 → **13 types**.
`BLOCK_REGISTRY`: 10 → **13 entries**.

### Added

- **`blocks/ecosystem`** — N-phase flow section (designed for the 5 Lovarch phases:
  diagnose → create → communicate → manage → grow). Each phase has `label`, `title`,
  `description`, optional `icon`, and an optional `featureList`. Light/dark variants.
  - `src/blocks/ecosystem/schema.ts` — `EcosystemSchema` + `EcosystemPhaseSchema`
  - `src/blocks/ecosystem/index.tsx` — animated phase stepper with framer-motion stagger

- **`blocks/stats`** — metric grid (value + label pairs), 1–6 items. Useful for social-proof
  numbers above the fold ("1 200 architetti formati", "98% di soddisfazione", etc.).
  Light/dark variants.
  - `src/blocks/stats/schema.ts` — `StatsSchema` + `StatItemSchema`
  - `src/blocks/stats/index.tsx` — responsive CSS grid, animated counter on scroll

- **`blocks/replaces`** — tag cloud of tools/workflows the platform replaces, with an
  optional footer line (e.g. "Tutto in un'unica piattaforma"). Useful in comparison
  sections and sales pages.
  - `src/blocks/replaces/schema.ts` — `ReplacesSchema`
  - `src/blocks/replaces/index.tsx` — wrapping flex tag cloud, dark-only variant

### Changed

- `src/blocks/index.ts` — exports `EcosystemBlock`, `StatsBlock`, `ReplacesBlock`
- `src/blocks/registry.ts` — adds entries for `ecosystem`, `stats`, `replaces` to
  `BLOCK_REGISTRY` and extends `AnyBlockSchema` discriminated union

### Migration

Backwards-compatible. All existing pages with the previous 10 block types continue working
unchanged. New blocks are additive.

---

## v0.4.1 — 2026-05-04

**New block: `lead-form` — captura de lead nativa nas páginas CMS.**

Primeiro block do DS que produz side-effect (submit). Mantém-se agnóstico de backend: o submit handler é injetado pelo parent via `<LeadFormProvider value={{ submit }}>`. Sem provider, o block entra em modo preview (warning + erro suave). PrimeTeam vai usar isso para alimentar `cms-form-submit` (que reusa `form-submit` + `meta-attribution` + `meta-conversion-tracking`).

### Added
- `blocks/lead-form/schema.ts` — `LeadFormSchema` + `LeadFormFieldSchema` com 5 tipos (`text|email|phone|textarea|select`), validação leve (chave snake_case, max 12 fields)
- `blocks/lead-form/context.tsx` — `LeadFormProvider`, `useLeadFormContext`, tipos `LeadFormSubmitFn|Input|Result`
- `blocks/lead-form/index.tsx` — componente React com motion + Outfit + estados controlados, success message inline ou redirect, error display, anchor_id deep-link
- Registro no `BLOCK_REGISTRY` + export em `blocks/index.ts`

### Pattern
```tsx
<LeadFormProvider value={{ submit: async (input) => { /* call cms-form-submit */ } }}>
  <BlockRenderer block={leadFormBlock} />
</LeadFormProvider>
```

## v0.4.0 — 2026-05-04

**Brand subpath — official Lovarch logos, symbol and brand assets.**

Closes the gap where consumers (PrimeTeam, future ArchPrime.io) had to either copy logo PNGs into their own `/public/` folder or reference URLs hardcoded to `https://lovarch.com/...` (one of the 18 hotspots flagged in the upcoming `app.lovarch.com` migration). The DS now ships the brand assets directly so consumers stay in sync with a single bump.

### Added — `brand/` subpath (NEW)

```ts
import { LovarchLogo, LovarchSymbol } from "@archprime/lovarch-ds/brand";
import {
  LOVARCH_LOGO_HORIZONTAL_URL,
  LOVARCH_EMAIL_LOGO_URL,
  LOVARCH_OG_IMAGE_URL,
  LOVARCH_FAVICON_URL,
} from "@archprime/lovarch-ds/brand";
```

- **`<LovarchLogo />`** — official wordmark with three variants:
  - `variant="horizontal"` — full PNG (1920×248, white wordmark — pair with dark backgrounds)
  - `variant="symbol"` — inline SVG mark (theme-aware via `currentColor`, treeshake-friendly)
  - `variant="email"` — high-res PNG sized for email clients (1536×652)
- **`<LovarchSymbol />`** — standalone SVG of the geometric symbol (same geometry as the animated `LovarchSymbolLoader` from `/feedback`, but static). Use for favicons, watermarks, footer badges, anywhere you need the mark without the canvas runtime.
- **Asset URL constants** — for use outside JSX (meta tags, OG image, server-side templates):
  - `LOVARCH_LOGO_HORIZONTAL_URL` — 1920×248 transparent white PNG
  - `LOVARCH_EMAIL_LOGO_URL` — 1536×652 transparent PNG
  - `LOVARCH_OG_IMAGE_URL` — 1536×1024 Open Graph image
  - `LOVARCH_FAVICON_URL` — 819×922 PNG (generate ICO/16/32/192/512 from this)

### Added — `brand/assets/*` direct file access

For consumers that need to reference asset paths in non-bundled contexts (Vercel rewrites, static HTML, Deno edge functions with bundling), the package exports the raw files via `@archprime/lovarch-ds/brand/assets/*`.

### Why this matters

Removes 4+ hardcoded `https://lovarch.com/brand/...` and `https://lovarch.com/email/...` references from consumer code. Also provides the static SVG symbol that `LovarchSymbolLoader` (animated, canvas-based) couldn't satisfy for use cases like email signatures, OG images, and PDF exports where runtime canvas is not available.

### Migration

Backwards-compatible. Existing consumers continue working with v0.3.x APIs unchanged. New brand subpath is additive.

### Known gaps (deferred to v0.4.x)

- No light-theme variant of the horizontal wordmark — the SVG `<LovarchSymbol />` covers theme-awareness via `currentColor`, but the horizontal PNG is white-only. If a dark-on-light wordmark is needed, request via issue.
- PNGs not optimized — `~3.9MB` total across 4 files. Consumer's bundler will hash and serve, but a future pass should compress (especially `og-image.png` at 2.6MB).
- No SVG version of the horizontal wordmark (would require recreating the typography in SVG paths).

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
