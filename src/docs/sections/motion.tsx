/** Fundações · Movimento — as variantes de motion ao vivo, com "repetir". */
import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { FileText, Lightbulb, Zap, Image, PenTool } from "lucide-react";
import { stagger, fadeInUp, fadeInScale, slideInRight, scaleOnTap, hoverLift, scrollReveal, listItem, layoutTransition } from "../../lib/motion";
import { IconBadge, Mono, Chip } from "../../primitives";
import { Section, Demo, Grid, Rules, Rule, Spec, Code } from "../shared";
import { Replay } from "../replay";

const ITEMS = [
  { t: "Inspiring Visions: Minimalist Living", i: PenTool, tone: "content" as const },
  { t: "Crafting Genma Spaces", i: Zap, tone: "warning" as const },
  { t: "Beyond Aesthetics: Impact", i: Lightbulb, tone: "accent" as const },
  { t: "Script: Hook → Retain → Reward", i: FileText, tone: "success" as const },
];

const DURATIONS: Array<[string, string]> = [["fast", "150ms"], ["base", "200ms"], ["slow", "300ms"], ["reveal", "700ms"]];
const DURATION_CLASS: Record<string, string> = { fast: "duration-fast", base: "duration-base", slow: "duration-slow", reveal: "duration-reveal" };

function Box({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border border-line bg-card px-3 py-2 text-sm text-foreground">{children}</div>;
}

export function MotionSection() {
  const [moved, setMoved] = useState(false);
  const [tab, setTab] = useState("Tutti");
  return (
    <Section
      id="movimento"
      title="Movimento"
      intro="Movimento informa, nunca enfeita: entra rápido (Expo.out), sai mais rápido, aperta com 0,97 e sobe 2px no hover. Tudo abaixo está rodando de verdade — use “Repetir” para ver de novo."
    >
      <Grid cols={2}>
        <Demo title="fadeInUp · stagger(60)" note="entrada de lista/grade">
          <Replay>
            {() => (
              <motion.div variants={stagger(60)} initial="hidden" animate="visible" className="space-y-1.5">
                {ITEMS.map((it) => (
                  <motion.div key={it.t} variants={fadeInUp} className="flex items-center gap-2 rounded-lg border border-line bg-card px-2.5 py-2">
                    <IconBadge size="sm" tone={it.tone}><it.i /></IconBadge>
                    <span className="truncate font-dm-sans text-sm font-medium">{it.t}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </Replay>
        </Demo>
        <Demo title="fadeInScale · slideInRight" note="popover, card que aparece, painel lateral">
          <Replay>
            {() => (
              <div className="grid gap-2">
                <motion.div variants={fadeInScale} initial="hidden" animate="visible"><Box>fadeInScale — 0.95 → 1, 350ms</Box></motion.div>
                <motion.div variants={slideInRight} initial="hidden" animate="visible"><Box>slideInRight — x 24 → 0, 400ms</Box></motion.div>
                <motion.div variants={listItem} initial="hidden" animate="visible"><Box>listItem — y 12 → 0, 300ms</Box></motion.div>
              </div>
            )}
          </Replay>
        </Demo>
        <Demo title="scaleOnTap · hoverLift" note="aperte e passe o mouse">
          <div className="flex flex-wrap gap-3">
            <motion.button type="button" {...scaleOnTap} className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground">scaleOnTap (0,97)</motion.button>
            <motion.div {...hoverLift} className="cursor-pointer rounded-xl border border-line bg-card px-4 py-2.5 text-sm shadow-sm">hoverLift (−2px)</motion.div>
          </div>
        </Demo>
        <Demo title="layout · spring" note="troca de posição/aba sem salto">
          <div className="space-y-3">
            <LayoutGroup>
              <div className="flex gap-1.5">
                {["Tutti", "Bozze", "Pubblicati"].map((t) => (
                  <button key={t} type="button" onClick={() => setTab(t)} className="relative rounded-full px-3 py-1.5 text-xs font-medium text-foreground">
                    {tab === t && <motion.span layoutId="ds-tab-pill" transition={layoutTransition} className="absolute inset-0 rounded-full bg-accent" />}
                    <span className={`relative ${tab === t ? "text-accent-foreground" : ""}`}>{t}</span>
                  </button>
                ))}
              </div>
            </LayoutGroup>
            <button type="button" onClick={() => setMoved((m) => !m)} className="text-xs font-semibold text-accent underline-offset-4 hover:underline">mover o card</button>
            <div className={`flex ${moved ? "justify-end" : "justify-start"}`}>
              <motion.div layout transition={layoutTransition} className="rounded-xl border border-accent/30 bg-accent/5 px-4 py-2 text-sm">layout (stiffness 350 · damping 30)</motion.div>
            </div>
          </div>
        </Demo>
        <Demo title="AnimatePresence" note="entrada e saída">
          <div className="flex flex-wrap gap-1.5">
            {["Render", "Moodboard", "Branding"].map((c) => (
              <Chip key={c} size="sm" selected={tab === c} onClick={() => setTab(tab === c ? "Tutti" : c)}>{c}</Chip>
            ))}
          </div>
          <div className="mt-3 h-12">
            <AnimatePresence mode="wait">
              <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="text-sm text-muted-foreground">
                Painel: <span className="font-semibold text-foreground">{tab}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </Demo>
        <Demo title="scrollReveal" note="whileInView, uma vez">
          <Replay>
            {() => (
              <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20px" }} className="flex items-center gap-3 rounded-xl border border-line bg-card p-4">
                <IconBadge><Image /></IconBadge>
                <p className="text-sm text-foreground">Seções de página aparecem assim ao rolar (y 24 → 0, 700ms).</p>
              </motion.div>
            )}
          </Replay>
        </Demo>
      </Grid>

      <Demo title="Durações" note="passe o mouse na faixa — as barras usam as classes do DS">
        <div className="group space-y-2">
          {DURATIONS.map(([n, ms]) => (
            <div key={n} className="flex items-center gap-3">
              <span className="w-28 shrink-0 font-mono text-caption text-muted-foreground">duration-{n} · {ms}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div className={`h-full w-[8%] rounded-full bg-accent transition-[width] ease-expo-out ${DURATION_CLASS[n]} group-hover:w-full`} />
              </div>
            </div>
          ))}
        </div>
      </Demo>

      <Spec
        rows={[
          ["Engine", <span>Framer Motion para componentes (<Mono>@archprime/lovarch-ds/motion</Mono> = <Mono>@/lib/motion</Mono>); CSS (<Mono>animate-in</Mono>, keyframes do DS) só para entrada de overlay e efeitos contínuos</span>],
          ["Easing", <span><Mono>easeExpoOut</Mono> [0.16, 1, 0.3, 1] para entradas · <Mono>easeSmooth</Mono> [0.2, 0, 0, 1] para estado · springs só em layout e números</span>],
          ["Contínuo", "loops infinitos (loader, partículas, logo 3D, IA trabalhando) pausam com a aba oculta e param com prefers-reduced-motion"],
          ["Proibido", "bounce, rotação decorativa, entrada > 700ms, animar largura/altura de listas grandes, animate-spin como loader"],
        ]}
      />
      <Rules>
        <Rule>Listas e grades entram com <Mono>stagger(60)</Mono> + <Mono>fadeInUp</Mono>; uma vez por montagem, não a cada filtro.</Rule>
        <Rule>Tudo que é clicável tem <Mono>active:scale-[0.97]</Mono> (os primitivos já têm).</Rule>
        <Rule kind="dont">Animação que atrasa a tarefa (o usuário espera o efeito terminar para clicar).</Rule>
      </Rules>
      <Code>{`import { stagger, fadeInUp } from "@archprime/lovarch-ds/motion";
<motion.ul variants={stagger(60)} initial="hidden" animate="visible">
  {items.map((i) => <motion.li key={i.id} variants={fadeInUp}>…</motion.li>)}
</motion.ul>`}</Code>
    </Section>
  );
}
