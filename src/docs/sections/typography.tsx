/** Fundações · Tipografia — famílias por papel, escala, eyebrow, primitivos. */
import tokens from "../../tokens/tokens.json";
import { Heading, Text, Eyebrow, PanelTitle, SectionLabel, Kpi, Mono } from "../../primitives";
import { Section, Demo, Rules, Rule, Spec, Code } from "../shared";

const SCALE = Object.entries(tokens.font.size).filter(([k]) => !k.startsWith("$")) as Array<[string, [string, string]]>;
const SCALE_CLASS: Record<string, string> = { micro: "text-micro", caption: "text-caption", xs: "text-xs", dense: "text-dense", sm: "text-sm", base: "text-base", lg: "text-lg", xl: "text-xl", "2xl": "text-2xl", "3xl": "text-3xl", "4xl": "text-4xl", "5xl": "text-5xl", hero: "text-hero", "hero-lg": "text-hero-lg" };

export function TypographySection() {
  return (
    <Section
      id="tipografia"
      title="Tipografia"
      intro="Quatro famílias com papéis fixos e uma escala que aceita a densidade real do produto (10–13px existem, com nome). A fonte nunca é escolhida inline: vem da classe ou do primitivo."
    >
      <Demo title="Famílias por papel">
        <div className="space-y-3">
          <div><p className="font-playfair text-3xl text-foreground">Playfair Display — display</p><p className="text-caption text-muted-foreground">só hero/landing ≥ 3rem · <Mono>font-playfair</Mono> · <Mono>{`<Heading display>`}</Mono></p></div>
          <div><p className="font-outfit text-xl font-semibold text-foreground">Outfit — títulos e eyebrows</p><p className="text-caption text-muted-foreground">painéis, seções, labels em caixa alta · <Mono>font-outfit</Mono> · <Mono>{`<Heading>`}</Mono> <Mono>{`<PanelTitle>`}</Mono> <Mono>{`<Eyebrow>`}</Mono></p></div>
          <div><p className="font-dm-sans text-2xl font-bold tabular-nums text-foreground">DM Sans — 12.847 números</p><p className="text-caption text-muted-foreground">KPIs, métricas, títulos de card · <Mono>font-dm-sans tabular-nums</Mono> · <Mono>{`<Kpi>`}</Mono></p></div>
          <div><p className="text-base text-foreground">Inter — corpo, labels, descrições (default, sem classe)</p><p className="text-caption text-muted-foreground"><Mono>{`<Text>`}</Mono></p></div>
          <div><p className="font-mono text-sm text-foreground">JetBrains Mono — código, IDs, valores técnicos</p><p className="text-caption text-muted-foreground"><Mono>font-mono</Mono> · <Mono>{`<Mono>`}</Mono></p></div>
        </div>
      </Demo>

      <Demo title="Escala" note="classe · tamanho / line-height">
        <div className="space-y-1.5">
          {SCALE.map(([name, [size, lh]]) => (
            <div key={name} className="flex items-baseline gap-4 border-b border-line-soft pb-1.5 last:border-0">
              <span className="w-24 shrink-0 font-mono text-caption text-muted-foreground">text-{name}</span>
              <span className="w-20 shrink-0 font-mono text-micro text-muted-foreground">{size} / {lh}</span>
              <span className={` truncate text-foreground ${name === "hero" || name === "hero-lg" ? "font-playfair" : ""}`}>Lovarch</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-caption text-muted-foreground">
          <Mono>micro</Mono> (10px) só em caixa alta (eyebrow, badge). Abaixo de 10px não existe. <Mono>caption</Mono> 11 e <Mono>dense</Mono> 13 substituem os antigos <Mono>text-[11px]</Mono>/<Mono>text-[13px]</Mono> — detector <Mono>texto-px-arbitrario</Mono>.
        </p>
      </Demo>

      <Demo title="Primitivos tipográficos" note="@archprime/lovarch-ds/primitives">
        <div className="space-y-4">
          <Heading level={1}>Heading level 1 (Outfit 2xl/3xl)</Heading>
          <Heading level={2}>Heading level 2</Heading>
          <Heading level={3}>Heading level 3</Heading>
          <Heading level={1} display size="hero">Display hero</Heading>
          <PanelTitle title="PanelTitle" description="Cabeçalho de painel da new-home: título Outfit + descrição + slot de ações." eyebrow="Eyebrow acima" actions={<span className="text-caption text-muted-foreground">ações →</span>} />
          <SectionLabel count={12}>SectionLabel com contagem</SectionLabel>
          <div className="flex items-end gap-6">
            <Kpi size="sm" prefix="€">4.500</Kpi>
            <Kpi>12.847</Kpi>
            <Kpi size="lg" tone="accent" suffix="%">94,7</Kpi>
          </div>
          <Eyebrow>Eyebrow muted</Eyebrow>
          <Eyebrow tone="accent">Eyebrow accent</Eyebrow>
          <Text>Text sm default — corpo.</Text>
          <Text size="xs" tone="muted">Text xs muted — legenda, descrição secundária.</Text>
          <Text tone="dim">Text dim — metadado de baixa prioridade.</Text>
        </div>
      </Demo>

      <Spec
        rows={[
          ["Pesos", "400 corpo · 500 labels/chips · 600 títulos e botões · 700 só KPIs e display"],
          ["Tracking", <span><Mono>tracking-tight</Mono> em títulos ≥ xl · <Mono>tracking-eyebrow</Mono> (0.14em) em caixa alta · normal no resto</span>],
          ["Números", <span><Mono>tabular-nums</Mono> em qualquer coluna/KPI que muda</span>],
          ["Mínimo legível", "11px texto normal · 10px só uppercase"],
          ["Largura de leitura", <span><Mono>max-w-layout-reading</Mono> (680px) para parágrafos</span>],
        ]}
      />
      <Rules>
        <Rule>Título de painel = <Mono>{`<PanelTitle>`}</Mono>; de seção = <Mono>{`<SectionLabel>`}</Mono>; número = <Mono>{`<Kpi>`}</Mono>.</Rule>
        <Rule kind="dont"><Mono>style={`{{ fontFamily: "'Outfit'" }}`}</Mono> — detector <Mono>fonte-inline</Mono>. Use <Mono>font-outfit</Mono> ou o primitivo.</Rule>
        <Rule kind="dont">Playfair fora de hero/landing.</Rule>
      </Rules>
      <Code>{`<PanelTitle title={t("crm.title")} description={t("crm.subtitle")} actions={<Button variant="accent" size="sm">{t("crm.new")}</Button>} />
<Kpi prefix="€" tone="accent">{formatNumber(total)}</Kpi>
<p className="text-caption text-muted-foreground">{t("common.updatedAt")}</p>`}</Code>
    </Section>
  );
}
