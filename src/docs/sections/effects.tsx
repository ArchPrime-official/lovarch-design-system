/** Componentes · Efeitos, fundos e animados — partículas, glow, grid/dots, shimmer, ticker, lista animada. */
import { Sparkles, Users, Euro, Image, Bell, MessageCircle, CheckCircle2 } from "lucide-react";
import { ConstellationParticles } from "../../effects/constellation-particles";
import { AmbientGlow } from "../../effects/ambient-glow";
import { BackgroundEffects } from "../../effects/background-effects";
import { DotPattern } from "../../animated/dot-pattern";
import { GridPattern } from "../../animated/grid-pattern";
import { ShimmerButton } from "../../animated/shimmer-button";
import { NumberTicker } from "../../animated/number-ticker";
import { AnimatedList } from "../../animated/animated-list";
import { IconBadge, Mono } from "../../primitives";
import { Section, Demo, Grid, Rules, Rule, Spec, Code } from "../shared";
import { Replay } from "../replay";

const NOTIFS = [
  { i: MessageCircle, t: "Elena Marchetti", d: "Avete disponibilità per un sopralluogo?", tone: "success" as const },
  { i: Image, t: "Render pronto", d: "Soggiorno · Villa Moderna — 4 varianti", tone: "content" as const },
  { i: Bell, t: "Pagamento ricevuto", d: "Acconto 30% · € 5.550", tone: "accent" as const },
  { i: CheckCircle2, t: "Contratto firmato", d: "Loft Navigli", tone: "success" as const },
];

export function EffectsSection() {
  return (
    <Section
      id="efeitos"
      title="Efeitos, fundos e animados"
      intro="A atmosfera da Lovarch: constelação de partículas (a assinatura do modo escuro), glow dourado que deriva devagar, grade arquitetônica de 96px com ruído, e micro-animações de número e lista. Efeito é fundo — nunca disputa atenção com o conteúdo."
    >
      <Demo title="ConstellationParticles" note="contained — no app ocupa a janela; desliga no mobile e com reduced-motion">
        <div className="relative h-56 overflow-hidden rounded-xl bg-[hsl(240_10%_4%)]">
          <ConstellationParticles contained forceOnMobile particleColor="white" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
            <p className="font-playfair text-3xl text-[hsl(240_7%_94%)]">Lovarch <span className="italic text-accent-light">Studio</span></p>
            <p className="mt-1 text-caption uppercase tracking-eyebrow text-[hsl(240_5%_65%)]">dark mode · partículas brancas</p>
          </div>
        </div>
        <div className="relative mt-3 h-40 overflow-hidden rounded-xl border border-line bg-background">
          <ConstellationParticles contained forceOnMobile particleColor="black" />
          <div className="relative z-10 flex h-full items-center justify-center"><p className="text-caption uppercase tracking-eyebrow text-muted-foreground">light mode · partículas escuras</p></div>
        </div>
      </Demo>
      <Grid cols={2}>
        <Demo title="BackgroundEffects + AmbientGlow" note="gradiente + grade 96px + ruído + glow dourado">
          <div className="relative h-48 overflow-hidden rounded-xl border border-line">
            <BackgroundEffects contained />
            <AmbientGlow contained />
            <div className="relative z-10 flex h-full items-center justify-center"><p className="font-outfit text-sm font-semibold text-foreground">Fundo das páginas de marca</p></div>
          </div>
        </Demo>
        <Demo title="DotPattern · GridPattern" note="textura de cards de destaque">
          <div className="grid h-48 grid-cols-2 gap-2">
            <div className="relative overflow-hidden rounded-xl border border-line bg-surface"><DotPattern className="text-foreground/20" /><p className="relative p-3 text-caption text-muted-foreground">DotPattern</p></div>
            <div className="relative overflow-hidden rounded-xl border border-line bg-surface"><GridPattern className="text-foreground/15" squares={[[1, 1], [2, 0], [3, 2]]} /><p className="relative p-3 text-caption text-muted-foreground">GridPattern</p></div>
          </div>
        </Demo>
      </Grid>
      <Grid cols={2}>
        <Demo title="ShimmerButton" note="varredura dourada — só para o CTA de campanha/upgrade">
          <div className="flex flex-wrap items-center gap-3">
            <ShimmerButton size="md"><Sparkles className="size-4" /> Passa a Studio</ShimmerButton>
            <ShimmerButton size="sm" variant="outline">Scopri Progetta</ShimmerButton>
          </div>
        </Demo>
        <Demo title="NumberTicker" note="spring ao entrar na tela">
          <Replay>
            {() => (
              <div className="flex justify-around text-center">
                <div><IconBadge size="sm" className="mx-auto mb-1"><Users /></IconBadge><NumberTicker value={1284} className="font-dm-sans text-2xl font-bold text-foreground" /><p className="text-caption text-muted-foreground">Lead</p></div>
                <div><IconBadge size="sm" tone="success" className="mx-auto mb-1"><Euro /></IconBadge><NumberTicker value={47500} prefix="€ " className="font-dm-sans text-2xl font-bold text-success" /><p className="text-caption text-muted-foreground">Fatturato</p></div>
                <div><IconBadge size="sm" tone="content" className="mx-auto mb-1"><Image /></IconBadge><NumberTicker value={94.7} decimals={1} suffix="%" className="font-dm-sans text-2xl font-bold text-accent" /><p className="text-caption text-muted-foreground">Score</p></div>
              </div>
            )}
          </Replay>
        </Demo>
      </Grid>
      <Demo title="AnimatedList" note="itens chegando em sequência — notificações, feed de atividade">
        <Replay>
          {() => (
            <AnimatedList delay={900} className="max-w-md">
              {NOTIFS.map((n) => (
                <div key={n.t} className="flex items-center gap-3 rounded-xl border border-line bg-card px-3 py-2.5 shadow-sm">
                  <IconBadge size="sm" tone={n.tone}><n.i /></IconBadge>
                  <div className="min-w-0"><p className="font-dm-sans text-sm font-semibold text-foreground">{n.t}</p><p className="truncate text-caption text-muted-foreground">{n.d}</p></div>
                </div>
              ))}
            </AnimatedList>
          )}
        </Replay>
      </Demo>
      <Spec
        rows={[
          ["Onde", "partículas + glow: login, páginas de marca, hero de landing, modo escuro do app. Grade/dots: cards de destaque, empty states grandes. Shimmer: 1 CTA de upgrade/campanha por tela."],
          ["Performance", "partículas param no mobile (<768px), com reduced-motion e com a aba oculta; máximo 50 pontos"],
          ["Contido", <span><Mono>contained</Mono> faz o efeito ocupar o pai (absolute) em vez da janela (fixed) — use em cards e heros</span>],
        ]}
      />
      <Rules>
        <Rule>Efeito sempre atrás (<Mono>z-0</Mono>, <Mono>pointer-events-none</Mono>); conteúdo por cima com <Mono>relative z-10</Mono>.</Rule>
        <Rule kind="dont">Partículas atrás de texto denso ou de formulário; shimmer em mais de um botão.</Rule>
      </Rules>
      <Code>{`import { ConstellationParticles, AmbientGlow } from "@archprime/lovarch-ds/effects";
<div className="relative overflow-hidden rounded-2xl">
  <ConstellationParticles contained />
  <div className="relative z-10">…</div>
</div>`}</Code>
    </Section>
  );
}
