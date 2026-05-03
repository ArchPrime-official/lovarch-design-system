/**
 * Components barrel — Phase 1 of v0.1.0 ships only the blocks.
 * The 13 component shims (LovarchSymbolLoader, GlassCard, ConstellationParticles,
 * AmbientGlow, LovarchAlert, BackgroundEffects, charts/*, animated/*) will be
 * extracted progressively in v0.1.x patches as Story 1.1 Phase 3 advances.
 *
 * Until then, consumer apps continue importing them directly from their own
 * Lovarch/src/components/ui paths — the renderer in /page/:slug doesn't
 * depend on them; only Hero/CTA/FeatureGrid/Testimonials/Pricing are needed
 * for Fase 0.
 */
export {};
