import type { StorybookConfig } from "@storybook/react-vite";

/**
 * Storybook 10 — catalogue for @archprime/lovarch-ds.
 *
 * Reads component source directly, the same way consumers do: the package has no
 * build step and its `exports` map points at `./src/*`, so there is no artefact
 * between a story and the code an app ships.
 *
 * Viewport, backgrounds, controls and actions are core in Storybook 10 — only
 * docs, themes and a11y are still separate addons.
 */
const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)", "../src/**/*.mdx"],

  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-themes",
    "@storybook/addon-a11y",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  typescript: {
    // The package runs `strict: false` (matching the app), so prop tables come
    // from react-docgen rather than the type checker.
    reactDocgen: "react-docgen-typescript",
  },

  // Private design system — nothing about it should leave the org.
  core: { disableTelemetry: true },
};

export default config;
