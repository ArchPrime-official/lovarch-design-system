import type { Meta, StoryObj } from "@storybook/react-vite";
import { LovarchSymbolLoader } from "./lovarch-loader";

const meta = {
  title: "Feedback/LovarchSymbolLoader",
  component: LovarchSymbolLoader,
  parameters: {
    docs: {
      description: {
        component:
          "**The only permitted loading state.** Border spinners, bouncing dots, `Loader2` " +
          "and bespoke indicators are all banned — this component *is* the standard, and " +
          "it is by far the most used thing in the design system (289 of 330 DS imports " +
          "across the app).\n\n" +
          "It draws to a `<canvas>` on a continuous 3.6s sine loop, so there are no " +
          "discrete phases to wait for and it can be mounted and unmounted freely. Colour " +
          "is inherited from `currentColor`, which is why `className` carries a text " +
          "colour rather than a fill.\n\n" +
          "Sizes are conventional: **80** for cards and panels, **96** for sections, " +
          "**120+** for a full page.",
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "range", min: 32, max: 160, step: 8 },
      description: "Canvas edge in pixels. 80 cards/panels · 96 sections · 120+ full page.",
    },
    label: {
      control: "text",
      description: "Pass an empty string to render the symbol with no caption.",
    },
    className: {
      control: false,
      description: "Sets the colour via `currentColor` — e.g. `text-foreground`.",
    },
  },
  args: {
    size: 96,
    label: "Generando...",
    className: "text-foreground",
  },
} satisfies Meta<typeof LovarchSymbolLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** The three conventional sizes, so the right one is obvious by eye. */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-10">
      {[
        { size: 80, use: "card / panel" },
        { size: 96, use: "section" },
        { size: 120, use: "full page" },
      ].map(({ size, use }) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <LovarchSymbolLoader size={size} label="" className="text-foreground" />
          <p className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Sans'" }}>
            {size} — {use}
          </p>
        </div>
      ))}
    </div>
  ),
};

/** No caption: pass `label=""`, not `undefined` — the default is "Generando...". */
export const WithoutLabel: Story = {
  args: { label: "", size: 120 },
};

/**
 * Over media the loader sits on solid black in both themes, which is the one
 * legitimate exception to light-mode-first: the dark frame serves the content.
 */
export const OverMedia: Story = {
  args: { label: "Caricamento video...", className: "text-white" },
  decorators: [
    (Story) => (
      <div className="flex h-64 items-center justify-center rounded-xl bg-black">
        <Story />
      </div>
    ),
  ],
};

/** At 375px the caption must not wrap awkwardly next to the symbol. */
export const Mobile: Story = {
  args: { size: 80, label: "Generando il rendering..." },
  globals: { viewport: { value: "mobile", isRotated: false } },
};
