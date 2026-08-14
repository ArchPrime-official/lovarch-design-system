import type { Preview } from "@storybook/react-vite";
import { withThemeByClassName } from "@storybook/addon-themes";

import "./storybook.css";

/**
 * Theme switching is class-based on purpose.
 *
 * DS V8 rule: the product is light by default (`#FAF9F7`) and dark is opt-in.
 * `prefers-color-scheme` must never pick the theme — before that rule existed,
 * anyone with macOS in dark mode opened Lovarch dark without ever choosing it.
 * `tailwind-preset.ts` sets `darkMode: ["class"]`, and this decorator toggles
 * exactly that class, so the catalogue cannot drift from the product.
 */
const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: { light: "", dark: "dark" },
      defaultTheme: "light",
    }),
  ],

  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },

    // 375 is the mandatory minimum target (iPhone SE); the platform is
    // mobile-first, so a story opens narrow and is widened deliberately.
    viewport: {
      options: {
        mobile: { name: "Mobile — 375 (minimum target)", styles: { width: "375px", height: "812px" } },
        tablet: { name: "Tablet — 768", styles: { width: "768px", height: "1024px" } },
        desktop: { name: "Desktop — 1280", styles: { width: "1280px", height: "800px" } },
      },
    },

    // The canvas paints the real page background from the tokens, so the
    // backgrounds addon would only ever hide a contrast regression.
    backgrounds: { disable: true },

    a11y: { test: "todo" },

    options: {
      storySort: {
        order: ["Introduction", "Feedback", "Charts", "Animated", "Effects", "Brand", "Blocks"],
      },
    },
  },

  initialGlobals: {
    viewport: { value: "mobile", isRotated: false },
  },

  tags: ["autodocs"],
};

export default preview;
