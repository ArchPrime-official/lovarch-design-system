/// <reference types="vite/client" />

// PNG/SVG/WEBP imports resolve to URL strings via the consumer's bundler
// (Vite by default). Declared here so the DS package compiles without
// depending on the consumer's vite-env.d.ts.
declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}
