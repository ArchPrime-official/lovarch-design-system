import type { Meta, StoryObj } from "@storybook/react-vite";
import { LovarchAlert } from "./lovarch-alert";

const meta = {
  title: "Feedback/LovarchAlert",
  component: LovarchAlert,
  parameters: {
    docs: {
      description: {
        component:
          "Inline alert with four variants. Worth knowing before you reach for it: only " +
          "`error` carries a colour of its own (`destructive`). `info`, `warning` and " +
          "`success` are deliberately monochrome — they differ by **icon**, not by hue.\n\n" +
          "So if you need a green success banner or an amber warning banner, this is not " +
          "that component, and overriding the variant with `className` fights the design. " +
          "The status palette (`emerald-500`, `amber-500`) exists for badges and metrics.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["info", "warning", "success", "error"],
      description: "Selects the icon. Only `error` also changes the colour.",
    },
    hideIcon: { control: "boolean" },
    icon: { control: false, description: "Overrides the variant's default icon." },
  },
  args: {
    variant: "info",
    hideIcon: false,
    children: "Il preventivo è stato salvato come bozza.",
  },
} satisfies Meta<typeof LovarchAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Questo cliente non ha un conto bancario associato.",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Contratto firmato dal cliente.",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    children: "Crediti insufficienti per completare la generazione.",
  },
};

/**
 * The four variants together, which is the only way to see that three of them
 * share one colour. Read this before picking a variant for its tint.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-2">
      <LovarchAlert variant="info">info — monocromatico</LovarchAlert>
      <LovarchAlert variant="warning">warning — monocromatico, cambia solo l'icona</LovarchAlert>
      <LovarchAlert variant="success">success — monocromatico, cambia solo l'icona</LovarchAlert>
      <LovarchAlert variant="error">error — l'unico con colore proprio</LovarchAlert>
    </div>
  ),
};

/** Rich content: the body is a slot, so headings and actions compose freely. */
export const WithRichContent: Story = {
  args: {
    variant: "warning",
    children: (
      <div className="space-y-1">
        <p className="font-semibold" style={{ fontFamily: "'DM Sans'" }}>
          Verifica in corso
        </p>
        <p className="text-muted-foreground">
          Meta sta verificando l'accesso all'account. La connessione riprende automaticamente.
        </p>
      </div>
    ),
  },
};

export const WithoutIcon: Story = {
  args: { hideIcon: true, children: "Senza icona, il testo occupa tutta la larghezza." },
};

/** Long text at 375px — the icon must not squash and the text must wrap. */
export const Mobile: Story = {
  args: {
    variant: "error",
    children:
      "Non è stato possibile completare il rendering: il modello ha superato il limite di 180 secondi. Riprova con una qualità inferiore.",
  },
  globals: { viewport: { value: "mobile", isRotated: false } },
};
