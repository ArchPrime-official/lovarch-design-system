/** Marca — logo (variantes, temas, tamanhos, posição por superfície), Powered by, símbolo. */
import { LovarchLogo } from "../../brand/LovarchLogo";
import { LovarchSymbol } from "../../brand/LovarchSymbol";
import { PoweredByLovarch } from "../../brand/PoweredByLovarch";
import { Mono } from "../../primitives";
import { Section, Demo, Grid, Rules, Rule, Spec, Code } from "../shared";

export function BrandSection() {
  return (
    <Section
      id="marca"
      title="Marca e logo"
      intro="Preto sobre claro, branco sobre escuro — e nada mais. O LovarchLogo escolhe o arquivo certo pelo tema; o consumidor escolhe variante, tamanho e posição. Tagline: AI GROWTH SYSTEM FOR ARCHITECTS & DESIGNERS."
    >
      <Demo title="Variantes" note="theme forçado para mostrar os dois artes">
        <Grid cols={2}>
          <div className="space-y-4 rounded-xl border border-line bg-background p-5">
            <LovarchLogo variant="horizontal" size="md" theme="light" />
            <LovarchLogo variant="icon" size="md" theme="light" />
            <LovarchLogo variant="vertical" height={96} theme="light" />
            <LovarchLogo variant="slogan" height={64} theme="light" />
            <LovarchSymbol size={32} className="text-foreground" />
            <p className="text-caption text-muted-foreground">fundo claro → arte preta</p>
          </div>
          <div className="space-y-4 rounded-xl border border-line bg-[hsl(240_10%_4%)] p-5">
            <LovarchLogo variant="horizontal" size="md" theme="dark" />
            <LovarchLogo variant="icon" size="md" theme="dark" />
            <LovarchLogo variant="vertical" height={96} theme="dark" />
            <LovarchLogo variant="slogan" height={64} theme="dark" />
            <LovarchSymbol size={32} className="text-[hsl(240_7%_94%)]" />
            <p className="text-caption text-[hsl(240_5%_65%)]">fundo escuro → arte branca</p>
          </div>
        </Grid>
      </Demo>
      <Demo title="Tamanhos" note="size xs…4xl (h-6…h-32) ou height em px">
        <div className="flex flex-wrap items-end gap-6">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
            <div key={s} className="flex flex-col items-center gap-1"><LovarchLogo size={s} /><span className="font-mono text-micro text-muted-foreground">{s}</span></div>
          ))}
          <div className="flex flex-col items-center gap-1"><LovarchLogo variant="icon" height={24} /><span className="font-mono text-micro text-muted-foreground">icon 24 (mínimo)</span></div>
        </div>
      </Demo>
      <Demo title="Powered by Lovarch" note="white-label: portal do cliente, sites, propostas">
        <div className="space-y-3">
          <PoweredByLovarch label="Powered by" />
          <div className="rounded-lg bg-[hsl(240_10%_4%)] p-3"><PoweredByLovarch label="Powered by" theme="dark" /></div>
        </div>
      </Demo>
      <Spec
        rows={[
          ["Clear space", "≥ altura do \"O\" do wordmark em todos os lados (≈ 0,8× a altura do logo horizontal)"],
          ["Mínimos", "icon 24px · horizontal 96px de largura (xs) · vertical/slogan 160px de largura"],
          ["Top nav do app", <span><Mono>{`<LovarchLogo size="sm" priority />`}</Mono> à esquerda, alinhado ao gutter</span>],
          ["Auth / login", <span><Mono>variant="vertical"</Mono> ou horizontal <Mono>size="3xl"</Mono>, centrado, acima do formulário</span>],
          ["E-mail", "logo-email (PNG) centrado, 160px de largura, sobre #FAF9F7 — sempre arte escura"],
          ["Páginas públicas (v-view, booking, proposta)", "horizontal sm no canto superior esquerdo; proposta usa o logo do ESTÚDIO e o Powered by no rodapé"],
          ["PDF", "horizontal 28mm no cabeçalho; rodapé com Powered by quando white-label"],
          ["Plugin CAD", "horizontal xs no header (PNG base64, offline)"],
          ["OG / favicon / app icon", "OG 1200×630 claro com traço dourado; favicon.ico multi-size; icons 16–512 + apple-touch 180 + maskable 512 (public/icons)"],
          ["Símbolo animado", "LovarchSymbolLoader (13 neurônios, 3,6 s) — só como loader; estático = LovarchSymbol"],
        ]}
      />
      <Rules>
        <Rule>Uma pasta de assets: <Mono>squads/lovarch-design-system/src/brand/assets</Mono>. O app usa <Mono>LovarchLogo</Mono> (ThemeAwareLogo é wrapper legado).</Rule>
        <Rule kind="dont">Sombra, gradiente, contorno, recolorir (nem dourado), girar, esticar, cortar o símbolo do wordmark, aplicar em foto sem véu.</Rule>
        <Rule kind="dont">Importar PNG de <Mono>src/assets</Mono> ou <Mono>public/brand</Mono> direto.</Rule>
      </Rules>
      <Code>{`import { LovarchLogo, PoweredByLovarch } from "@archprime/lovarch-ds/brand";
<LovarchLogo size="sm" priority />                 // top nav
<LovarchLogo variant="vertical" height={120} />    // auth
<PoweredByLovarch label={t("portal.poweredBy")} /> // rodapé white-label`}</Code>
    </Section>
  );
}
