/** Componentes · Ações — Button, IconButton, Chip, Badge em todos os estados. */
import { Sparkles, Plus, Trash2, Copy, Download, Settings, Filter, Check } from "lucide-react";
import { Button, IconButton, Chip, Badge, Mono } from "../../primitives";
import { Section, Demo, Row, Rules, Rule, Spec, Code } from "../shared";

export function ActionsSection() {
  return (
    <Section
      id="acoes"
      title="Ações: Button, IconButton, Chip, Badge"
      intro="Dourado é o CTA (uma por tela). Preto é a ação primária neutra. Outline/ghost são secundárias. Só-ícone exige rótulo. Chip é interação (filtro, seleção); Badge é estado (não clica)."
    >
      <Demo title="Button · variantes" note="variant">
        <Row>
          <Button variant="accent" leftIcon={<Sparkles />}>Accent (CTA)</Button>
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive" leftIcon={<Trash2 />}>Destructive</Button>
        </Row>
      </Demo>
      <Demo title="Button · tamanhos e estados" note="size · loading · disabled · ícones">
        <Row>
          <Button size="sm" variant="accent">sm 32</Button>
          <Button variant="accent">default 36</Button>
          <Button size="lg" variant="accent">lg 40</Button>
          <Button size="xl" variant="accent">xl 44 (toque)</Button>
        </Row>
        <Row className="mt-3">
          <Button variant="accent" loading>Generando…</Button>
          <Button variant="outline" loading>Salvando</Button>
          <Button variant="accent" disabled>Disabled</Button>
          <Button variant="outline" rightIcon={<Download />}>Com ícone à direita</Button>
          <Button size="icon" variant="outline" aria-label="Impostazioni"><Settings /></Button>
        </Row>
      </Demo>
      <Demo title="IconButton" note="label obrigatório → aria-label + title">
        <Row>
          <IconButton label="Copia" size="sm"><Copy /></IconButton>
          <IconButton label="Copia"><Copy /></IconButton>
          <IconButton label="Copia" size="lg"><Copy /></IconButton>
          <IconButton label="Aggiungi" variant="accent" size="lg"><Plus /></IconButton>
          <IconButton label="Elimina" variant="outline"><Trash2 /></IconButton>
          <IconButton label="Carico" loading><Copy /></IconButton>
        </Row>
      </Demo>
      <Demo title="Chip" note="normal · selected · suggested (IA) · com ícone · removível · tamanhos">
        <Row>
          <Chip>Render Studio</Chip>
          <Chip selected>Moodboard</Chip>
          <Chip suggested>Suggerito per te</Chip>
          <Chip icon={<Filter />}>Filtro</Chip>
          <Chip selected icon={<Check />}>Attivo</Chip>
          <Chip onRemove={() => undefined} removeLabel="Rimuovi">Removível</Chip>
          <Chip disabled>Disabled</Chip>
        </Row>
        <Row className="mt-3">
          <Chip size="sm">sm 28</Chip>
          <Chip>md 36</Chip>
          <Chip size="lg">lg 44</Chip>
        </Row>
      </Demo>
      <Demo title="Badge" note="tone · size · dot">
        <Row>
          <Badge>neutral</Badge>
          <Badge tone="accent">accent</Badge>
          <Badge tone="success" dot>attivo</Badge>
          <Badge tone="warning" dot>in attesa</Badge>
          <Badge tone="danger">errore</Badge>
          <Badge tone="content">reel</Badge>
          <Badge tone="outline">outline</Badge>
          <Badge tone="solid">solid</Badge>
        </Row>
        <Row className="mt-3">
          <Badge size="md" tone="accent">md · normal case</Badge>
          <Badge size="md" tone="success" dot>md com dot</Badge>
        </Row>
      </Demo>
      <Spec
        rows={[
          ["Quando dourado", "a ação que gera/cria/paga — uma por tela ou painel. Duas ações dourado lado a lado é erro."],
          ["Quando preto", "confirmar, enviar, salvar — ação primária sem custo. Cancelar = ghost."],
          ["Forma", "pílula sempre. Não existe botão retangular no DS."],
          ["Toque", "em listas e no mobile use size=\"xl\" (44px); icon-xl para só-ícone."],
          ["Chip × Badge", "Chip clica (filtro, módulo, resposta de quiz); Badge só informa (status, tipo). Chip selecionado = dourado sólido."],
          ["Sugestão IA", "Chip suggested (accent/5 + borda accent/20 + Sparkles) — igual ao Guided Flow."],
        ]}
      />
      <Rules>
        <Rule>Texto de botão é verbo no infinitivo, curto, i18n: <Mono>{`{t("render.generate")}`}</Mono>.</Rule>
        <Rule><Mono>loading</Mono> no Button (desabilita e mostra o Spinner) — nunca trocar o texto por "…".</Rule>
        <Rule kind="dont"><Mono>{`<button className="px-4 py-2 rounded-lg bg-accent text-white">`}</Mono> — detector <Mono>botao-cru-new-home</Mono>.</Rule>
        <Rule kind="dont"><Mono>title=</Mono> em botão (invisível no toque) — <Mono>IconButton label</Mono> + Tooltip no desktop.</Rule>
      </Rules>
      <Code>{`import { Button, IconButton, Chip, Badge } from "@archprime/lovarch-ds/primitives";

<Button variant="accent" size="xl" leftIcon={<Sparkles />} loading={isPending}>{t("render.generate")}</Button>
<IconButton label={t("common.copy")} onClick={copy}><Copy /></IconButton>
<Chip selected={tab === "all"} onClick={() => setTab("all")}>{t("crm.all")}</Chip>
<Badge tone="success" dot>{t("status.active")}</Badge>`}</Code>
    </Section>
  );
}
