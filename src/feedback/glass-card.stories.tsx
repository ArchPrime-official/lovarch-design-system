import type { Meta, StoryObj } from "@storybook/react-vite";
import { GlassCard } from "./glass-card";

const meta = {
  title: "Feedback/GlassCard",
  component: GlassCard,
  parameters: {
    docs: {
      description: {
        component:
          "Glassmorphism surface. `background` comes from `var(--surface)`, so the card " +
          "reads correctly in both themes without a single hard-coded colour — switch the " +
          "theme in the toolbar to confirm. The `accent` variant tints with gold " +
          "`rgba(161,98,7,…)`; blue is banned across the design system.\n\n" +
          "Because the effect is `backdrop-filter`, it only becomes visible over content. " +
          "Every story here sits on a patterned backdrop for that reason — on a flat " +
          "background the blur is invisible and the card looks like a plain bordered box.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "accent"],
      description: "`accent` adds the gold gradient tint used for highlighted surfaces.",
    },
    blur: {
      control: "inline-radio",
      options: [8, 12, 16, 24],
      description: "Backdrop blur radius in pixels.",
    },
  },
  args: {
    variant: "default",
    blur: 12,
  },
  // Something must sit behind the card, or backdrop-filter has nothing to blur.
  decorators: [
    (Story) => (
      <div className="relative overflow-hidden rounded-xl p-8">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, hsl(38 90% 33% / 0.35), transparent 45%), radial-gradient(circle at 80% 70%, hsl(160 60% 40% / 0.28), transparent 45%)",
          }}
        />
        <div className="relative">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof GlassCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="space-y-1">
        <p className="text-sm font-semibold" style={{ fontFamily: "'DM Sans'" }}>
          Progetti attivi
        </p>
        <p className="text-2xl font-semibold" style={{ fontFamily: "'DM Sans'" }}>
          12
        </p>
      </div>
    ),
  },
};

export const Accent: Story = {
  args: {
    variant: "accent",
    children: (
      <div className="space-y-1">
        <p className="text-sm font-semibold" style={{ fontFamily: "'DM Sans'" }}>
          Piano Studio
        </p>
        <p className="text-xs text-muted-foreground">
          Il bordo e la sfumatura usano l'accento oro, non il blu.
        </p>
      </div>
    ),
  },
};

/** All four blur steps side by side — the difference is subtle in isolation. */
export const BlurScale: Story = {
  args: { children: null },
  render: (args) => (
    <div className="grid grid-cols-2 gap-3">
      {([8, 12, 16, 24] as const).map((b) => (
        <GlassCard key={b} {...args} blur={b}>
          <p className="text-xs font-medium" style={{ fontFamily: "'DM Sans'" }}>
            blur={b}
          </p>
        </GlassCard>
      ))}
    </div>
  ),
};

/**
 * The card is a plain `div`, so it stretches to its container and needs no
 * responsive props. Pinned to 375px — the minimum supported width.
 */
export const Mobile: Story = {
  args: {
    children: (
      <p className="text-sm" style={{ fontFamily: "'DM Sans'" }}>
        Larghezza 375px
      </p>
    ),
  },
  globals: { viewport: { value: "mobile", isRotated: false } },
};
