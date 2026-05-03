/**
 * Components barrel — DEPRECATED in favor of subpath exports.
 *
 * Use the dedicated subpaths instead:
 *   - "@archprime/lovarch-ds/feedback"   (loaders, alerts, glass-card)
 *   - "@archprime/lovarch-ds/charts"     (bar-list, progress-circle, tracker)
 *   - "@archprime/lovarch-ds/animated"   (number-ticker, animated-list, shimmer-button, patterns)
 *   - "@archprime/lovarch-ds/effects"    (constellation-particles, ambient-glow, background-effects)
 *   - "@archprime/lovarch-ds/lp-blocks"  (navbar, footer, faq, before-after, email-modal, enterprise-modal)
 *
 * For now this barrel re-exports everything for backwards compatibility.
 */
export * from "../feedback";
export * from "../charts";
export * from "../animated";
export * from "../effects";
export * from "../lp-blocks";
