import type { Meta, StoryObj } from "@storybook/react-vite";
import { Instagram, Search, Users } from "lucide-react";
import { LovarchBarList } from "./lovarch-bar-list";

const meta = {
  title: "Charts/LovarchBarList",
  component: LovarchBarList,
  parameters: {
    docs: {
      description: {
        component:
          "Horizontal ranking list. Bars are scaled against the **largest value in the " +
          "data**, not against a fixed maximum — so the top row is always full width and " +
          "the chart shows proportion, never absolute progress. If you need progress " +
          "against a target, this is the wrong component.\n\n" +
          "Note the three-way chart split this component sits in: `@archprime/lovarch-ds/charts` " +
          "is canonical, while the app still carries six local `Lovarch*Chart` components " +
          "and a shadcn recharts wrapper. Prefer this one.",
      },
    },
  },
  argTypes: {
    valueFormatter: { control: false, description: "Formats the printed value. Defaults to `toLocaleString()`." },
    showAnimation: { control: "boolean" },
    color: { control: "text", description: "Tailwind background class for bars. Default `bg-accent/15`." },
    data: { control: "object" },
  },
  args: {
    showAnimation: true,
    data: [
      { name: "Instagram", value: 4210 },
      { name: "Ricerca organica", value: 2870 },
      { name: "Passaparola", value: 1940 },
      { name: "Newsletter", value: 620 },
    ],
  },
} satisfies Meta<typeof LovarchBarList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Values are formatted, not raw — currency, percentages and units all fit. */
export const WithValueFormatter: Story = {
  args: {
    data: [
      { name: "Progettazione", value: 48200 },
      { name: "Direzione lavori", value: 31500 },
      { name: "Rendering", value: 12800 },
      { name: "Consulenza", value: 4300 },
    ],
    valueFormatter: (v) => `€${v.toLocaleString("it-IT")}`,
  },
};

export const WithIcons: Story = {
  args: {
    data: [
      { name: "Instagram", value: 4210, icon: <Instagram className="h-4 w-4" /> },
      { name: "Ricerca organica", value: 2870, icon: <Search className="h-4 w-4" /> },
      { name: "Passaparola", value: 1940, icon: <Users className="h-4 w-4" /> },
    ],
  },
};

/**
 * Per-row `color` overrides the default. Status colours only — the palette is
 * `emerald-500` success, `amber-500` warning, `purple-500` content, `red-400`
 * error. No blue.
 */
export const PerRowColour: Story = {
  args: {
    data: [
      { name: "Completati", value: 34, color: "bg-emerald-500/20" },
      { name: "In corso", value: 21, color: "bg-amber-500/20" },
      { name: "In ritardo", value: 6, color: "bg-red-400/20" },
    ],
  },
};

/**
 * The edge case worth seeing: one value dwarfing the rest. Because scaling is
 * relative to the maximum, the small rows collapse to slivers — check your data
 * before choosing this chart.
 */
export const SkewedData: Story = {
  args: {
    data: [
      { name: "Instagram", value: 9800 },
      { name: "Newsletter", value: 120 },
      { name: "LinkedIn", value: 45 },
    ],
  },
};

/** Single row: the bar is full width, since it is its own maximum. */
export const SingleRow: Story = {
  args: { data: [{ name: "Instagram", value: 4210 }] },
};

/** Long labels at 375px — names must truncate rather than push the value off. */
export const Mobile: Story = {
  args: {
    data: [
      { name: "Ricerca organica da Google Italia", value: 2870 },
      { name: "Passaparola e referral clienti", value: 1940 },
      { name: "Instagram", value: 4210 },
    ],
  },
  globals: { viewport: { value: "mobile", isRotated: false } },
};
