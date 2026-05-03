# Lovarch Design System V8

Shared design system distributed as a **git submodule** to Lovarch + PrimeTeam (and future ArchPrime.io). Single source of truth for tokens, motion, components and CMS blocks.

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
  "tailwind-merge": "^2.5.0"
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

## Renderer usage (CMS pages)

```tsx
import { BlockRenderer, AnyBlockSchema } from "@archprime/lovarch-ds/blocks";

const blocks = AnyBlockSchema.array().parse(page.blocks);
return blocks.map((b, i) => <BlockRenderer key={i} block={b} />);
```

## v0.1.0 — what's in

- 5 blocks: Hero · CTA · FeatureGrid · Testimonials · Pricing (with Zod schemas)
- Tokens (light + dark), fonts (Playfair / Outfit / DM Sans / Inter / JetBrains)
- Motion lib (Framer variants: fadeInUp, stagger, scaleOnTap, etc.)
- `cn` helper
- Icon allowlist (~80 Lucide names curated)
- Tailwind preset

## Roadmap

- v0.2.x — extract 13 shared components (LovarchSymbolLoader, GlassCard, ConstellationParticles, charts, animated) with re-export shims
- v0.3.x — additional blocks (Logos, FAQ, Stats)
- v0.4.x — multi-domain theming (ArchPrime.io variant)

## License

Proprietary © ArchPrime / Lovarch.
