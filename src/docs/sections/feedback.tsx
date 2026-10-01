/** Componentes · Feedback — EmptyState, ErrorState, Banner, política de toast. */
import { Image, Users, Sparkles, RefreshCw } from "lucide-react";
import { EmptyState, ErrorState, Banner, Button, Mono } from "../../primitives";
import { Section, Demo, Grid, Rules, Rule, Spec, Code } from "../shared";

export function FeedbackSection() {
  return (
    <Section
      id="feedback"
      title="Vazio, erro, avisos e toasts"
      intro="Toda lista/painel tem três estados obrigatórios além do conteúdo: carregando, vazio e erro. O vazio orienta (ícone, título, o que fazer); o erro oferece tentar de novo; o aviso persistente é Banner; o efêmero é toast."
    >
      <Demo title="EmptyState" note="size full · compact · com ações">
        <Grid cols={2}>
          <EmptyState icon={<Image />} title="Nessun render ancora" description="Carica una foto o una pianta e genera il primo render fotorealistico." action={<Button variant="accent" leftIcon={<Sparkles />}>Genera un render</Button>} secondaryAction={<Button variant="ghost">Vedi esempi</Button>} />
          <EmptyState size="compact" icon={<Users />} title="Nessun lead in questa fase" description="Trascina un lead qui o creane uno nuovo." action={<Button variant="outline" size="sm">Nuovo lead</Button>} />
        </Grid>
      </Demo>
      <Demo title="ErrorState" note="role=alert · retryAction">
        <ErrorState size="compact" title="Non siamo riusciti a caricare i progetti" description="Controlla la connessione e riprova. Se persiste, scrivici." retryAction={<Button variant="outline" size="sm" leftIcon={<RefreshCw />}>Riprova</Button>} />
      </Demo>
      <Demo title="Banner" note="tone · title · action · onDismiss">
        <div className="space-y-2">
          <Banner title="Nuovo: Progetta in Studio">Genera un modello 3D dalla pianta in un click.</Banner>
          <Banner tone="accent" action={<Button size="sm" variant="accent">Attiva</Button>}>Hai 3 generazioni gratuite questa settimana.</Banner>
          <Banner tone="success" onDismiss={() => undefined} dismissLabel="Chiudi">Abbonamento rinnovato. Crediti ricaricati.</Banner>
          <Banner tone="warning" title="Crediti in esaurimento" action={<Button size="sm" variant="outline">Ricarica</Button>}>Restano 420 crediti — un render costa ~130.</Banner>
          <Banner tone="danger" title="Pagamento non riuscito" action={<Button size="sm" variant="destructive">Aggiorna carta</Button>}>Il rinnovo del 15/10 è stato rifiutato dalla banca.</Banner>
        </div>
      </Demo>
      <Spec
        rows={[
          ["Toast (sonner)", <span><Mono>{`import { toast } from "sonner"`}</Mono> → <Mono>toast.success(msg)</Mono>, <Mono>toast.error(msg, {"{ description }"})</Mono>. Único sistema desde 01/10/2026; <Mono>use-toast</Mono> é adaptador legado.</span>],
          ["Quando toast", "confirmação de ação concluída (salvo, copiado, enviado) e erro de servidor pontual. 3–5 s, sem ação crítica dentro."],
          ["Quando Banner", "estado que persiste (plano, créditos, pagamento, IA indisponível, tradução do browser) — no topo do painel, dispensável quando não crítico."],
          ["Quando EmptyState", "lista/galeria/kanban sem itens — sempre com a ação que cria o primeiro."],
          ["Quando ErrorState", "falha ao carregar a seção inteira — com retry. Erro de campo é do Field; erro de ação é toast."],
          ["Custo de crédito", "toda geração mostra credits_cost — o interceptor global já cuida (GlobalCreditCostToast)."],
        ]}
      />
      <Rules>
        <Rule>Vazio diz o que fazer, não só "nada aqui".</Rule>
        <Rule>Banner persistente tem <Mono>onDismiss</Mono> quando não é crítico, e o estado dispensado persiste (localStorage).</Rule>
        <Rule kind="dont">Toast caseiro com <Mono>fixed bottom-4 z-[9999]</Mono>.</Rule>
        <Rule kind="dont">Texto cru "Nessun risultato" centrado em <Mono>py-12</Mono> — é <Mono>{`<EmptyState size="compact">`}</Mono>.</Rule>
      </Rules>
      <Code>{`{items.length === 0 && (
  <EmptyState icon={<Image />} title={t("render.empty.title")} description={t("render.empty.body")}
    action={<Button variant="accent" onClick={start}>{t("render.generate")}</Button>} />
)}
toast.success(t("common.saved"));
toast.error(t("common.error"), { description: error.message });`}</Code>
    </Section>
  );
}
