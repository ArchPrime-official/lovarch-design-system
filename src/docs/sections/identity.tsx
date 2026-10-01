/** Componentes · Identidade e números — IconBadge, Avatar, Stat, ProgressBar, Spinner, Skeleton. */
import { Image, Lightbulb, Zap, FileText, Users, Euro } from "lucide-react";
import { IconBadge, Avatar, initials, Stat, StatGrid, ProgressBar, Spinner, Skeleton, SkeletonText, Mono } from "../../primitives";
import { Section, Demo, Row, Rules, Rule, Code } from "../shared";

export function IdentitySection() {
  return (
    <Section
      id="identidade"
      title="Ícone em caixa, Avatar, KPI, Progresso, Loading"
      intro="Os padrões que o app repetia de 100 formas: ícone dentro de uma caixa, iniciais num círculo, número grande com rótulo, barra de progresso, estado de carregamento."
    >
      <Demo title="IconBadge" note="size sm 28 · md 40 · lg 56 · tone · shape">
        <Row>
          <IconBadge size="sm"><Lightbulb /></IconBadge>
          <IconBadge><Lightbulb /></IconBadge>
          <IconBadge size="lg"><Lightbulb /></IconBadge>
          <IconBadge tone="muted"><Image /></IconBadge>
          <IconBadge tone="success"><Zap /></IconBadge>
          <IconBadge tone="warning"><Zap /></IconBadge>
          <IconBadge tone="danger"><Zap /></IconBadge>
          <IconBadge tone="content"><FileText /></IconBadge>
          <IconBadge tone="solid"><Zap /></IconBadge>
          <IconBadge shape="circle"><Users /></IconBadge>
          <IconBadge shape="circle" tone="muted" size="sm"><Users /></IconBadge>
        </Row>
      </Demo>
      <Demo title="Avatar" note={`initials("Pablo Ruan") → "${initials("Pablo Ruan")}"`}>
        <Row>
          <Avatar name="Pablo Ruan" size="xs" />
          <Avatar name="Pablo Ruan" size="sm" />
          <Avatar name="Pablo Ruan" />
          <Avatar name="Pablo Ruan" size="lg" tone="accent" />
          <Avatar name="Pablo Ruan" size="xl" tone="solid" />
          <Avatar name="Michele" src="https://invalid.local/x.png" />
          <Avatar name="" />
        </Row>
        <p className="mt-2 text-caption text-muted-foreground">Imagem que falha cai nas iniciais. Uma única função <Mono>initials()</Mono> para toda a plataforma.</p>
      </Demo>
      <Demo title="Stat (KPI card) + StatGrid" note="label · value · delta · hint · icon">
        <StatGrid columns={4}>
          <Stat label="Lead" value="128" delta={{ value: "+12%", direction: "up" }} icon={<Users />} />
          <Stat label="Fatturato" value="€ 47.500" delta={{ value: "−3%", direction: "down" }} icon={<Euro />} tone="success" />
          <Stat label="Render" value="36" delta={{ value: "0", direction: "flat" }} hint="ultimi 30 giorni" icon={<Image />} tone="content" />
          <Stat label="Crediti" value="12.847" hint="rinnovo il 15" size="sm" />
        </StatGrid>
      </Demo>
      <Demo title="ProgressBar" note="size · tone · label/valueLabel">
        <div className="space-y-3">
          <ProgressBar value={68} label="Crediti usati" valueLabel="68%" ariaLabel="Crediti usati" />
          <ProgressBar value={35} size="sm" tone="success" ariaLabel="Avanzamento" />
          <ProgressBar value={82} size="lg" tone="warning" label="Spazio" valueLabel="82 / 100 GB" ariaLabel="Spazio" />
          <ProgressBar value={100} tone="danger" ariaLabel="Limite" />
          <ProgressBar value={50} tone="foreground" ariaLabel="Neutro" />
        </div>
      </Demo>
      <Demo title="Loading" note="Spinner inline 14–24 · Skeleton só para layout conhecido">
        <Row>
          <Spinner size={14} /><Spinner size={16} /><Spinner size={20} /><Spinner size={24} />
          <span className="text-caption text-muted-foreground">Spinner = símbolo pulsando. Para seção/tela: <Mono>LovarchSymbolLoader</Mono> 80 · 96 · 120 (de <Mono>/feedback</Mono>).</span>
        </Row>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="space-y-2"><Skeleton className="h-24 w-full rounded-xl" /><SkeletonText /></div>
          <div className="flex gap-3"><Skeleton className="size-10 rounded-full" /><div className="flex-1"><SkeletonText lines={2} /></div></div>
        </div>
      </Demo>
      <Rules>
        <Rule>Loader de seção = <Mono>{`<LovarchSymbolLoader size={80} label="" className="text-foreground" />`}</Mono>; de tela = 120; em botão = <Mono>loading</Mono>.</Rule>
        <Rule>Skeleton só quando a forma do conteúdo é conhecida (lista, card); senão loader.</Rule>
        <Rule kind="dont"><Mono>animate-spin</Mono>, <Mono>Loader2</Mono>, pontinhos, 22 tamanhos de loader.</Rule>
        <Rule kind="dont">Divs <Mono>w-10 h-10 rounded-xl bg-accent/10</Mono> à mão — é <Mono>{`<IconBadge>`}</Mono>.</Rule>
      </Rules>
      <Code>{`<StatGrid columns={4}>
  <Stat label={t("crm.leads")} value={count} delta={{ value: "+12%", direction: "up" }} icon={<Users />} />
</StatGrid>
<ProgressBar value={pct} tone="accent" label={t("credits.used")} valueLabel={\`\${pct}%\`} ariaLabel={t("credits.used")} />
<Avatar name={lead.name} src={lead.avatar_url} size="sm" />`}</Code>
    </Section>
  );
}
