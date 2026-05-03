# Changelog

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
