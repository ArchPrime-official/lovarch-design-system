import type { Meta, StoryObj } from "@storybook/react-vite";
import { LovarchTracker } from "./lovarch-tracker";

const days = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

const meta = {
  title: "Charts/LovarchTracker",
  component: LovarchTracker,
  parameters: {
    docs: {
      description: {
        component:
          "Activity grid: one block per period, coloured by state. Blocks are `flex: 1 1 0` " +
          "with a 10px floor and the row wraps, so the component adapts to its container " +
          "rather than scrolling.\n\n" +
          "⚠️ **Known mobile-first violation — read before using.** Each block's only label " +
          "lives in a tooltip driven by `onMouseEnter`/`onMouseLeave`. Those events do not " +
          "fire on touch, so on a phone the blocks are decorative and unlabelled. The " +
          "platform rule is explicit that a tooltip holding essential information does not " +
          "exist on touch and the information must be surfaced inline.\n\n" +
          "Until that is fixed, do not rely on the tooltip to carry meaning: pair the " +
          "tracker with a visible legend, as `WithVisibleLegend` below does.",
      },
    },
  },
  argTypes: {
    data: { control: "object" },
    className: { control: "text" },
  },
  args: {
    data: days.map((d, i) => ({
      tooltip: d,
      color: i === 5 || i === 6 ? "bg-muted/30" : "bg-emerald-500/70",
    })),
  },
} satisfies Meta<typeof LovarchTracker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Mixed states across a fortnight, using the status palette. */
export const MixedStates: Story = {
  args: {
    data: [
      ...Array.from({ length: 6 }, () => ({ tooltip: "Completato", color: "bg-emerald-500/70" })),
      { tooltip: "In ritardo", color: "bg-amber-500/70" },
      { tooltip: "Completato", color: "bg-emerald-500/70" },
      { tooltip: "Fallito", color: "bg-red-400/70" },
      ...Array.from({ length: 3 }, () => ({ tooltip: "Completato", color: "bg-emerald-500/70" })),
      ...Array.from({ length: 3 }, () => ({ tooltip: "Nessun dato", color: "bg-muted/30" })),
    ],
  },
};

/** Empty state: no colour given, so every block falls back to `bg-muted/30`. */
export const NoData: Story = {
  args: { data: Array.from({ length: 14 }, () => ({ tooltip: "Nessun dato" })) },
};

/**
 * The recommended composition while the tooltip is touch-inaccessible: a
 * visible legend carries the meaning, and the tooltip is a bonus for pointer
 * users rather than the only route to the information.
 */
export const WithVisibleLegend: Story = {
  render: (args) => (
    <div className="space-y-2">
      <LovarchTracker {...args} />
      <div className="flex flex-wrap gap-3">
        {[
          { label: "Completato", color: "bg-emerald-500/70" },
          { label: "In ritardo", color: "bg-amber-500/70" },
          { label: "Nessun dato", color: "bg-muted/30" },
        ].map(({ label, color }) => (
          <span key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={`h-2.5 w-2.5 rounded-[3px] ${color}`} />
            {label}
          </span>
        ))}
      </div>
    </div>
  ),
};

/**
 * 90 blocks at 375px: the row wraps into several lines because each block holds
 * a 10px floor. This is the density limit worth knowing before you feed it a
 * full quarter.
 */
export const DenseOnMobile: Story = {
  args: {
    data: Array.from({ length: 90 }, (_, i) => ({
      tooltip: `Giorno ${i + 1}`,
      color: i % 9 === 0 ? "bg-amber-500/70" : "bg-emerald-500/70",
    })),
  },
  globals: { viewport: { value: "mobile", isRotated: false } },
};
