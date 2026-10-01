/** Componentes · Loading e "IA trabalhando" — loader neural, spinner, skeleton, efeitos dourados. */
import { useEffect, useState } from "react";
import { Wand2, Sparkles, Send } from "lucide-react";
import { LovarchSymbolLoader } from "../../feedback/lovarch-loader";
import { Button, Spinner, Skeleton, SkeletonText, ProgressBar, Mono } from "../../primitives";
import { Section, Demo, Grid, Rules, Rule, Spec, Code } from "../shared";

function useTicker(ms: number, max = 100) {
  const [v, setV] = useState(8);
  useEffect(() => {
    const id = setInterval(() => setV((x) => (x >= max ? 8 : x + 7)), ms);
    return () => clearInterval(id);
  }, [ms, max]);
  return v;
}

export function LoadingSection() {
  const pct = useTicker(450);
  return (
    <Section
      id="loading"
      title="Loading e “IA trabalhando”"
      intro="Todo carregamento é o símbolo neural da Lovarch — 13 neurônios que convergem e se desfazem em onda contínua (3,6 s) com o rótulo varrido por um brilho dourado (2,8 s). Inline (botão, chip) é o Spinner. Quando a IA está reescrevendo ou gerando, o campo ganha o brilho dourado."
    >
      <Demo title="LovarchSymbolLoader" note="tamanhos oficiais: 80 card · 96 seção · 120 tela">
        <div className="flex flex-wrap items-end justify-around gap-6">
          <div className="text-center"><LovarchSymbolLoader size={80} label="" className="text-foreground" /><p className="mt-1 font-mono text-micro text-muted-foreground">80 · card</p></div>
          <div className="text-center"><LovarchSymbolLoader size={96} label="Generando…" className="text-foreground" /><p className="mt-1 font-mono text-micro text-muted-foreground">96 · seção + rótulo</p></div>
          <div className="text-center"><LovarchSymbolLoader size={120} label="" className="text-foreground" /><p className="mt-1 font-mono text-micro text-muted-foreground">120 · tela</p></div>
        </div>
      </Demo>
      <Grid cols={2}>
        <Demo title="Sobre fundo escuro" note="variant dark / className text-white">
          <div className="flex items-center justify-center rounded-lg bg-[hsl(240_10%_4%)] py-6">
            <LovarchSymbolLoader size={80} label="Caricamento…" variant="dark" className="text-white" />
          </div>
        </Demo>
        <Demo title="Sobre imagem (overlay de geração)" note="véu + blur, loader claro">
          <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-accent/40 via-muted to-content/30">
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
            <div className="relative"><LovarchSymbolLoader size={80} label="Render in corso…" className="text-foreground" /></div>
          </div>
        </Demo>
      </Grid>
      <Grid cols={2}>
        <Demo title="Inline: Spinner e Button loading" note="14–24px · o símbolo pulsando">
          <div className="flex flex-wrap items-center gap-3">
            <Spinner size={14} /><Spinner size={16} /><Spinner size={20} /><Spinner size={24} />
            <Button variant="accent" loading>Generando</Button>
            <Button variant="outline" size="sm" loading>Salvando</Button>
          </div>
        </Demo>
        <Demo title="Progresso determinado" note="quando há porcentagem real">
          <ProgressBar value={pct} label="Upload della pianta" valueLabel={`${pct}%`} ariaLabel="Upload" />
          <p className="mt-2 text-caption text-muted-foreground">Barra só com número verdadeiro. Sem número → loader.</p>
        </Demo>
      </Grid>
      <Demo title="Skeleton" note="só quando a forma do conteúdo é conhecida">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="space-y-2"><Skeleton className="aspect-[4/3] w-full rounded-xl" /><SkeletonText lines={2} /></div>
          <div className="space-y-2"><Skeleton className="aspect-[4/3] w-full rounded-xl" /><SkeletonText lines={2} /></div>
          <div className="space-y-2"><Skeleton className="aspect-[4/3] w-full rounded-xl" /><SkeletonText lines={2} /></div>
        </div>
      </Demo>
      <Demo title="IA trabalhando — o brilho dourado" note="effects.css · usado no prompt enhancer do Render Studio">
        <div className="space-y-3">
          <div className="relative">
            <textarea
              readOnly
              rows={3}
              className="lv-prompt-enhancing w-full resize-none border border-accent/30 bg-card px-3 py-2.5 text-sm text-foreground outline-none"
              value="Soggiorno luminoso con travi a vista, pavimento in rovere chiaro, luce del tardo pomeriggio…"
            />
            <div className="lv-text-sweep-overlay pointer-events-none absolute inset-0" aria-hidden />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="lv-enhance-btn-active inline-flex h-9 items-center gap-2 rounded-full border border-accent/30 px-4 text-sm font-semibold text-accent">
              <Wand2 className="lv-enhance-icon-active size-4" /> Migliorando il prompt…
            </span>
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-accent/20 text-accent"><Sparkles className="lv-enhance-icon-active size-4" /></span>
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-accent text-accent-foreground"><Send className="size-4" /></span>
          </div>
        </div>
      </Demo>
      <Spec
        rows={[
          ["Tela / guard", <Mono>{`<LovarchSymbolLoader size={120} label="" className="text-foreground" />`}</Mono>],
          ["Seção / painel", <Mono>{`<LovarchSymbolLoader size={96} label={t("loading.generating")} />`}</Mono>],
          ["Card / galeria", <Mono>{`<LovarchSymbolLoader size={80} label="" />`}</Mono>],
          ["Botão / chip / linha", <span><Mono>{`<Button loading>`}</Mono> ou <Mono>{`<Spinner size={16} />`}</Mono></span>],
          ["IA reescrevendo", <span>campo <Mono>lv-prompt-enhancing</Mono> + overlay <Mono>lv-text-sweep-overlay</Mono> + ícone <Mono>lv-enhance-icon-active</Mono> + botão <Mono>lv-enhance-btn-active</Mono> (CSS em <Mono>@archprime/lovarch-ds/effects/effects.css</Mono>)</span>],
          ["Lista conhecida", "Skeleton com a forma real dos itens; nunca skeleton genérico em tela inteira"],
        ]}
      />
      <Rules>
        <Rule>Um loader por área: tela, seção ou card — nunca dois girando juntos (o boot já teve "3 carregando").</Rule>
        <Rule kind="dont"><Mono>animate-spin</Mono>, <Mono>Loader2</Mono>, pontinhos pulando, 22 tamanhos diferentes de loader.</Rule>
        <Rule kind="dont">Barra de progresso com porcentagem inventada.</Rule>
      </Rules>
      <Code>{`import { LovarchSymbolLoader } from "@archprime/lovarch-ds/feedback";
if (isLoading || data === undefined) return <LovarchSymbolLoader size={96} label={t("loading.generating")} className="text-foreground" />;`}</Code>
    </Section>
  );
}
