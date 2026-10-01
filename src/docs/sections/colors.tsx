/** Fundações · Cor — paleta semântica, status, superfícies, regras. */
import tokens from "../../tokens/tokens.json";
import { hex } from "../../tokens/tokens";
import { Section, Demo, Grid, Rules, Rule, Spec, Code } from "../shared";

const SEMANTIC: Array<[string, string, string]> = [
  ["background", "bg-background", "Fundo da página (warm white / near-black)"],
  ["card", "bg-card", "Cards, modais, popovers"],
  ["muted", "bg-muted", "Preenchimento discreto, trilhos, skeleton"],
  ["foreground", "bg-foreground", "Texto principal (e botão default)"],
  ["muted-foreground", "bg-muted-foreground", "Texto secundário"],
  ["accent", "bg-accent", "DOURADO — CTA, ativo, destaque. Texto sobre ele: accent-foreground (branco)"],
  ["primary", "bg-primary", "Ação primária neutra (quase preto; claro no dark)"],
  ["border", "bg-border", "Base das bordas (ver line/line-soft)"],
];

const CHART = ["bg-chart-1", "bg-chart-2", "bg-chart-3", "bg-chart-4", "bg-chart-5", "bg-chart-6"];

const STATUS: Array<[string, string, string, string]> = [
  ["success", "bg-success", "text-success", "Sucesso, ativo, concluído"],
  ["warning", "bg-warning", "text-warning", "Atenção, pendente, em curso"],
  ["destructive", "bg-destructive", "text-destructive", "Erro, perigo, remoção"],
  ["content", "bg-content", "text-content", "Tipos de conteúdo / editorial"],
];

export function ColorsSection() {
  const light = tokens.color.light as Record<string, string>;
  const dark = { ...tokens.color.light, ...tokens.color.dark } as Record<string, string>;
  return (
    <Section
      id="cores"
      title="Cor"
      intro="Base monocromática quente + um único acento dourado. Nada de azul em lugar nenhum. Toda cor é um token semântico: o componente diz o que é (card, muted, success), nunca qual hex tem."
    >
      <Demo title="Semânticas" note="classes Tailwind · valor light / dark">
        <Grid cols={4}>
          {SEMANTIC.map(([name, cls, use]) => (
            <div key={name} className="flex items-start gap-3">
              <div className={`size-10 shrink-0 rounded-lg border border-line ${cls}`} />
              <div className="min-w-0">
                <p className="font-mono text-caption text-foreground">{cls}</p>
                <p className="text-caption text-muted-foreground">{use}</p>
                <p className="font-mono text-micro text-muted-foreground">
                  {hex.light[name as keyof typeof hex.light]} · {hex.dark[name as keyof typeof hex.dark]}
                </p>
              </div>
            </div>
          ))}
        </Grid>
      </Demo>

      <Demo title="Status" note="bg-*/10 para fundo, text-* para texto e ícone">
        <Grid cols={4}>
          {STATUS.map(([name, bg, text, use]) => (
            <div key={name} className={`rounded-lg border border-line p-3 ${bg}/10`}>
              <p className={`font-outfit text-sm font-semibold ${text}`}>{name}</p>
              <p className="text-caption text-muted-foreground">{use}</p>
              <p className="font-mono text-micro text-muted-foreground">
                {light[name]} · {dark[name]}
              </p>
            </div>
          ))}
        </Grid>
        <p className="mt-3 text-caption text-muted-foreground">
          Não existe "info" azul: avisos neutros usam <code className="font-mono">bg-muted/40</code> + <code className="font-mono">text-foreground</code>.
          Verde é sempre <code className="font-mono">success</code> (nunca <code className="font-mono">green-*</code>), amarelo é <code className="font-mono">warning</code> (nunca <code className="font-mono">yellow/orange</code>).
        </p>
      </Demo>

      <Demo title="Superfícies e bordas" note="valores literais — sem alpha no Tailwind">
        <Grid cols={3}>
          {[
            ["bg-surface", "Card leve sobre o fundo (o antigo style={{background:'var(--surface)'}})"],
            ["bg-surface-hover", "Hover de linha/card"],
            ["bg-surface-active", "Pressionado / selecionado neutro"],
            ["border-line", "Borda padrão de card (border/40)"],
            ["border-line-soft", "Divisor (border/30)"],
            ["border-line-strong", "Ênfase, hover de outline (border)"],
          ].map(([cls, use]) => (
            <div key={cls} className={`rounded-lg border p-3 ${cls.startsWith("border") ? cls + " bg-card" : cls + " border-line"}`}>
              <p className="font-mono text-caption text-foreground">{cls}</p>
              <p className="text-caption text-muted-foreground">{use}</p>
            </div>
          ))}
        </Grid>
        <div className="mt-3 rounded-lg bg-backdrop p-3 text-caption text-accent-foreground">bg-backdrop — overlay de modal (50% light · 70% dark)</div>
      </Demo>

      <Demo title="Alpha do acento" note="só estes degraus">
        <div className="flex flex-wrap gap-2">
          {["bg-accent/5", "bg-accent/10", "bg-accent/15", "bg-accent/20", "bg-accent/30", "bg-accent"].map((c) => (
            <div key={c} className={`rounded-lg border border-line px-3 py-2 font-mono text-caption ${c} ${c === "bg-accent" ? "text-accent-foreground" : "text-foreground"}`}>{c}</div>
          ))}
        </div>
        <p className="mt-2 text-caption text-muted-foreground">/5 fundo sugerido (IA) · /10 fundo de badge/ícone · /20 borda sugerida · /30 borda selecionada · sólido = CTA.</p>
      </Demo>

      <Demo title="Data-viz" note="chart-1 … chart-6">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={`h-10 flex-1 rounded-md `} title={`chart-`} />
          ))}
        </div>
        <p className="mt-2 text-caption text-muted-foreground">Ordem fixa por série: dourado, dourado claro, success, warning, content, foreground. Sequencial = alpha do dourado.</p>
      </Demo>

      <Spec
        rows={[
          ["Fonte da verdade", <code className="font-mono">squads/lovarch-design-system/src/tokens/tokens.json</code>],
          ["No app", "classes de token (bg-accent, text-muted-foreground, border-line). Nunca hex, nunca bg-white/gray/zinc."],
          ["Em Deno/HTML/PDF", <span><code className="font-mono">import {"{ hex }"} from "../_shared/dsTokens.ts"</code> → <code className="font-mono">hex.light.accent</code> = #A16207</span>],
          ["Dark mode", "classe .dark no <html>, só por escolha do usuário. Nenhum componente precisa de dark: — os tokens trocam."],
          ["Exceção de mídia", "lightbox, player, letterbox e canvas ficam bg-black nos dois temas."],
        ]}
      />
      <Rules>
        <Rule>Texto sobre dourado é sempre <code className="font-mono">text-accent-foreground</code> (branco nos dois temas).</Rule>
        <Rule>Status por token: <code className="font-mono">bg-success/10 text-success</code>.</Rule>
        <Rule kind="dont">Hex no código (<code className="font-mono">#A16207</code>, <code className="font-mono">bg-[#FAF9F7]</code>) — detector <code className="font-mono">cor-hex-literal</code>.</Rule>
        <Rule kind="dont"><code className="font-mono">bg-white</code>, <code className="font-mono">text-gray-500</code>, <code className="font-mono">bg-zinc-900</code> — detector <code className="font-mono">superficie-cinza-crua</code>.</Rule>
        <Rule kind="dont">Qualquer azul (blue/sky/indigo/cyan), inclusive como fallback.</Rule>
      </Rules>
      <Code>{`// app
<div className="rounded-xl border border-line bg-surface p-4">
  <span className="rounded-full bg-success/10 px-2 text-micro font-semibold uppercase tracking-eyebrow text-success">attivo</span>
</div>

// Edge Function / e-mail
import { hex, fontFamily } from "../_shared/dsTokens.ts";
const html = \`<body style="background:\${hex.light.background};color:\${hex.light.foreground}">\`;`}</Code>
    </Section>
  );
}
