# Changelog

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
- 13 shared components (LovarchSymbolLoader, GlassCard, ConstellationParticles, AmbientGlow, LovarchAlert, BackgroundEffects, charts/*, animated/*) not yet extracted — consumers continue importing from their local `src/components/ui/` paths.
- No Vite library build / dts output yet — submodule is consumed via direct source import.
