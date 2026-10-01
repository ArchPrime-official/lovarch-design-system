/** Fundações · Espaço, forma, elevação, motion, z-index, ícones, layout. */
import tokens from "../../tokens/tokens.json";
import { Sparkles, Plus, Check, Search, Settings } from "lucide-react";
import { Mono } from "../../primitives";
import { Section, Demo, Grid, Rules, Rule, Spec, Code } from "../shared";

const RADIUS_CLASS: Record<string, string> = { sm: "rounded-sm", md: "rounded-md", lg: "rounded-lg", xl: "rounded-xl", "2xl": "rounded-2xl", "3xl": "rounded-3xl", full: "rounded-full" };

export function SpaceSection() {
  const spacing = Object.entries(tokens.spacing).filter(([k]) => !k.startsWith("$"));
  const radius = Object.entries(tokens.radiusScale).filter(([k]) => !k.startsWith("$"));
  return (
    <Section
      id="espaco"
      title="Espaço, forma, z-index e ícones"
      intro="Escala de 4px, cinco raios com uso definido, quatro níveis de sombra, durações nomeadas, uma escala de z-index e cinco tamanhos de ícone."
    >
      <Demo title="Espaçamento (base 4px)" note="gap-*/p-* do Tailwind; nomes de uso">
        <Grid cols={3}>
          {spacing.map(([name, px]) => (
            <div key={name} className="flex items-center gap-3">
              <div className="h-4 rounded-sm bg-accent/40" style={{ width: px }} />
              <span className="font-mono text-caption text-foreground">{name}</span>
              <span className="font-mono text-micro text-muted-foreground">{px}</span>
            </div>
          ))}
        </Grid>
        <p className="mt-3 text-caption text-muted-foreground">Lista densa <Mono>gap-1.5</Mono> · lista normal <Mono>gap-2</Mono> · cards numa grade <Mono>gap-3</Mono> · seções <Mono>gap-6</Mono> · card <Mono>p-4</Mono> (compacto <Mono>p-3</Mono>) · painel <Mono>p-4</Mono> · gutter mobile 16px.</p>
      </Demo>

      <Demo title="Raio" note="lg e xl são iguais de propósito">
        <div className="flex flex-wrap gap-3">
          {radius.map(([name, px]) => (
            <div key={name} className={`flex size-16 flex-col items-center justify-center border border-line bg-card `}>
              <span className="font-mono text-caption text-foreground">{name}</span>
              <span className="font-mono text-micro text-muted-foreground">{px}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-caption text-muted-foreground"><Mono>rounded-full</Mono> botões, chips, avatar · <Mono>rounded-xl</Mono> cards e inputs · <Mono>rounded-lg</Mono> controles pequenos e ícones em caixa · <Mono>rounded-2xl</Mono> modais, painéis grandes, IconBadge lg · <Mono>rounded-md</Mono> skeleton, código. Nunca <Mono>rounded-[18px]</Mono>.</p>
      </Demo>

      <Demo title="Elevação" note="shadow-*">
        <Grid cols={4}>
          {[["shadow-sm", "card em repouso"], ["shadow-md", "card em hover, popover"], ["shadow-lg", "dropdown, toast"], ["shadow-xl", "modal desktop"]].map(([cls, use]) => (
            <div key={cls} className={`rounded-xl border border-line bg-card p-4 ${cls}`}>
              <p className="font-mono text-caption text-foreground">{cls}</p>
              <p className="text-caption text-muted-foreground">{use}</p>
            </div>
          ))}
        </Grid>
        <div className="mt-3 rounded-xl border border-accent/20 bg-card p-4 shadow-glow"><p className="font-mono text-caption text-foreground">shadow-glow</p><p className="text-caption text-muted-foreground">halo dourado — só prompt bar e elemento "IA ativa"</p></div>
      </Demo>

      <Demo title="Motion — tokens" note="demonstração ao vivo na seção Movimento">
        <Spec
          rows={[
            ["Durações", <span><Mono>duration-fast</Mono> 150ms hover/press · <Mono>duration-base</Mono> 200ms cor/borda · <Mono>duration-slow</Mono> 300ms layout/barras · <Mono>duration-reveal</Mono> 700ms entrada em scroll</span>],
            ["Easings", <span><Mono>ease-expo-out</Mono> (0.16,1,0.3,1) entradas · <Mono>ease-smooth</Mono> (0.2,0,0,1) transições de estado</span>],
            ["Variants", <span><Mono>fadeInUp</Mono> · <Mono>stagger(60)</Mono> · <Mono>listItem</Mono> · <Mono>scaleOnTap</Mono> (0.97) · <Mono>hoverLift</Mono> (-2px) · <Mono>scrollReveal</Mono> — de <Mono>@archprime/lovarch-ds/motion</Mono></span>],
            ["Press", <span><Mono>active:scale-[0.97]</Mono> em tudo que é clicável (já nos primitivos)</span>],
            ["Overlay", <span>Radix + <Mono>data-[state=open]:animate-in fade-in-0 zoom-in-95</Mono> (desktop) / <Mono>slide-in-from-bottom-8</Mono> (sheet mobile) — já no Modal</span>],
            ["Loading", "LovarchSymbolLoader (seção 80 · 96 · tela 120) · Spinner inline (14–24) · Skeleton só para layout conhecido"],
            ["Reduced motion", <span>partículas e loops contínuos param com <Mono>prefers-reduced-motion</Mono>; transições de 150–300ms ficam</span>],
          ]}
        />
      </Demo>

      <Demo title="z-index" note="escala nomeada — nunca z-[N]">
        <div className="flex flex-wrap gap-2">
          {Object.entries(tokens.zIndex).map(([name, v]) => (
            <div key={name} className="rounded-lg border border-line bg-card px-3 py-1.5 font-mono text-caption"><span className="text-foreground">z-{name}</span> <span className="text-muted-foreground">{v}</span></div>
          ))}
        </div>
        <p className="mt-3 text-caption text-muted-foreground">raised = card flutuante · sticky = headers · dropdown = menus/popovers · overlay = backdrop · modal = conteúdo do modal/sheet · toast · tooltip · max = só prompt bar global. Modal dentro de painel da new-home SEMPRE via portal (o Modal do DS já faz).</p>
      </Demo>

      <Demo title="Ícones (Lucide)" note="size-* · stroke 2 · cor do contexto">
        <div className="flex flex-wrap items-end gap-6">
          {[["size-3", 12], ["size-3.5", 14], ["size-4", 16], ["size-5", 20], ["size-6", 24]].map(([cls, px]) => (
            <div key={String(cls)} className="flex flex-col items-center gap-1">
              <Sparkles className={`${cls} text-foreground`} />
              <span className="font-mono text-micro text-muted-foreground">{cls} · {px}</span>
            </div>
          ))}
          <div className="flex items-center gap-3 border-l border-line-soft pl-6">
            <Plus className="size-4 text-accent" /><Check className="size-4 text-success" /><Search className="size-4 text-muted-foreground" /><Settings className="size-4 text-foreground" />
          </div>
        </div>
        <p className="mt-3 text-caption text-muted-foreground">Em texto <Mono>size-3.5</Mono>; em botão <Mono>size-4</Mono> (o Button já aplica); em IconBadge o tamanho é do badge; em empty state 24. Nunca emoji como ícone estrutural. Nunca <Mono>h-4 w-4</Mono> (duas ordens, uma classe: <Mono>size-4</Mono>).</p>
      </Demo>

      <Demo title="Layout e breakpoints">
        <Spec
          rows={[
            ["Breakpoints", "base (≤639) mobile · sm 640 · md 768 · lg 1024 — o produto é 3-breakpoint: base/sm/md; lg só para grades largas"],
            ["Larguras", <span><Mono>max-w-layout-reading</Mono> 680 · <Mono>max-w-layout-form</Mono> 560 · modais 384/512/672/896 · container 1200</span>],
            ["Mobile", "min-h-dvh (nunca h-screen) · gutter 16px · toque ≥ 44px · sem hover-only · tabela rola ou vira card · modal vira bottom-sheet"],
            ["Grade de painel", <span><Mono>grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3</Mono> para cards; listas em coluna única com <Mono>divide-y divide-line-soft</Mono></span>],
          ]}
        />
      </Demo>

      <Rules>
        <Rule>Espaço entre irmãos por <Mono>gap</Mono>, não por margem no filho.</Rule>
        <Rule kind="dont"><Mono>z-[9999]</Mono>, <Mono>z-[100]</Mono> — detector <Mono>z-index-arbitrario</Mono>.</Rule>
        <Rule kind="dont"><Mono>transition-all</Mono> em listas longas (custa layout); nos primitivos é intencional e pontual.</Rule>
      </Rules>
      <Code>{`<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
  <Card variant="surface" padding="md" interactive>…</Card>
</div>
<motion.ul variants={stagger(60)} initial="hidden" animate="visible">
  <motion.li variants={listItem}>…</motion.li>
</motion.ul>`}</Code>
    </Section>
  );
}
