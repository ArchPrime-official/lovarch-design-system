/** Marca — logo (variantes, temas, tamanhos, posição por superfície), marca em movimento, GIFs de e-mail, Powered by. */
import { LovarchLogo } from "../../brand/LovarchLogo";
import { LovarchSymbol } from "../../brand/LovarchSymbol";
import { LovarchMark3D } from "../../brand/LovarchMark3D";
import { LOVARCH_EMAIL_ANIMATIONS } from "../../brand/assets";
import { LovarchSymbolLoader } from "../../feedback/lovarch-loader";
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
      <Demo title="Marca em movimento" note="LovarchMark3D (login/splash) · LovarchSymbolLoader (carregando)">
        <Grid cols={2}>
          <div
            className="relative flex flex-col items-center justify-center overflow-hidden rounded-xl border border-line px-6 py-10 text-center text-foreground"
            style={{ background: "radial-gradient(120% 90% at 30% 20%, hsl(38 40% 92%), hsl(40 27% 97%) 55%, hsl(33 12% 93%))" }}
          >
            <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "radial-gradient(hsl(var(--foreground)/.05) 1px, transparent 1.4px)", backgroundSize: "44px 44px" }} />
            <div className="absolute -right-24 -top-24 size-72 rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--accent)/.12), transparent 70%)", filter: "blur(10px)" }} />
            <div className="relative"><LovarchMark3D size={160} className="text-foreground" title="Lovarch" /></div>
            <p className="relative mt-4 font-playfair text-2xl leading-tight">Il tuo studio, <span className="italic text-accent">in crescita</span></p>
            <p className="relative mt-2 font-outfit text-micro font-semibold uppercase tracking-[0.22em] text-muted-foreground">AI Growth System for Architects &amp; Designers</p>
          </div>
          <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-xl px-6 py-10 text-center" style={{ background: "radial-gradient(120% 90% at 30% 20%, hsl(30 12% 12%), hsl(28 10% 8%) 55%, hsl(24 8% 7%))" }}>
            <div className="relative"><LovarchMark3D size={160} className="text-[hsl(240_7%_94%)]" title="Lovarch" /></div>
            <p className="relative mt-4 font-playfair text-2xl leading-tight text-[hsl(240_7%_94%)]">Il tuo studio, <span className="italic text-accent-light">in crescita</span></p>
            <p className="relative mt-2 font-outfit text-micro font-semibold uppercase tracking-[0.22em] text-[hsl(240_5%_65%)]">login · modo escuro</p>
          </div>
        </Grid>
        <div className="mt-4 flex flex-wrap items-end justify-around gap-6">
          <div className="text-center"><LovarchMark3D size={64} className="text-foreground" /><p className="mt-1 font-mono text-micro text-muted-foreground">Mark3D 64 · splash</p></div>
          <div className="text-center"><LovarchMark3D size={96} speed={1.6} className="text-foreground" /><p className="mt-1 font-mono text-micro text-muted-foreground">Mark3D 96 · speed 1.6</p></div>
          <div className="text-center"><LovarchSymbolLoader size={96} label="Caricamento…" className="text-foreground" /><p className="mt-1 font-mono text-micro text-muted-foreground">SymbolLoader 96 · carregando</p></div>
          <div className="text-center"><LovarchSymbol size={64} className="text-foreground" /><p className="mt-1 font-mono text-micro text-muted-foreground">Symbol estático</p></div>
        </div>
        <p className="mt-3 text-caption text-muted-foreground">
          Mark3D = presença da marca (login, splash, páginas de marca, fim de vídeo). SymbolLoader = o sistema está trabalhando. Nunca troque um pelo outro, e nunca pinte as linhas de dourado — o dourado é só o hub.
        </p>
      </Demo>
      <Demo title="Animações de e-mail" note="GIFs dos e-mails de ativação de módulo">
        <Grid cols={3}>
          {LOVARCH_EMAIL_ANIMATIONS.map((g) => (
            <figure key={g.id} className="space-y-1.5">
              <img src={g.src} alt={g.use} className="w-full rounded-lg border border-line bg-card" loading="lazy" />
              <figcaption className="text-caption text-muted-foreground"><span className="font-mono text-foreground">{g.id}</span> · {g.use}</figcaption>
            </figure>
          ))}
        </Grid>
        <p className="mt-2 text-caption text-muted-foreground">Fundo claro, cards do DS, ícones Lucide, loop curto (6–7 s). Servidos em <Mono>app.lovarch.com/email/&lt;nome&gt;.gif</Mono>; GIF é o único formato animado confiável em e-mail.</p>
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
          ["Símbolo animado", "LovarchMark3D = marca em movimento (login/splash); LovarchSymbolLoader (13 neurônios, 3,6 s) = só loader; estático = LovarchSymbol"],
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
