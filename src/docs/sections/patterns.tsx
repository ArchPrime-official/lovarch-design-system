/** Padrões — os três estados, painel da new-home, lista, navegação, mídia. */
import { FileText, Copy, ExternalLink, MoreHorizontal } from "lucide-react";
import { PanelTitle, Card, IconBadge, Badge, Button, IconButton, Chip, Skeleton, SkeletonText, Divider, Mono } from "../../primitives";
import { LovarchSymbol } from "../../brand/LovarchSymbol";
import { Section, Demo, Rules, Rule, Spec, Code } from "../shared";

const ITEMS = [
  { t: "Inspiring Visions: Minimalist Living", tag: "strategy" },
  { t: "Crafting Genma Spaces", tag: "reel" },
  { t: "Script: Hook → Retain → Reward", tag: "script" },
];

export function PatternsSection() {
  return (
    <Section
      id="padroes"
      title="Padrões de tela"
      intro="Como os primitivos se combinam nos painéis da new-home: cabeçalho, filtros, lista, os três estados, ações por item, deep link."
    >
      <Demo title="Painel da new-home" note="PanelTitle + Chips de filtro + lista de Cards surface">
        <div className="space-y-3">
          <PanelTitle title="Contenuti" description="12 bozze · 3 pubblicati questa settimana" icon={<FileText />} actions={<Button variant="accent" size="sm">Nuovo</Button>} />
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            <Chip selected size="sm">Tutti</Chip><Chip size="sm">Bozze</Chip><Chip size="sm">Pubblicati</Chip><Chip size="sm" suggested>Da ripubblicare</Chip>
          </div>
          <div className="space-y-1.5">
            {ITEMS.map((it) => (
              <Card key={it.t} variant="surface" padding="sm" interactive>
                <div className="flex items-center gap-3">
                  <IconBadge size="sm" tone="content"><FileText /></IconBadge>
                  <p className="min-w-0 flex-1 truncate font-dm-sans text-sm font-medium text-foreground">{it.t}</p>
                  <Badge tone="content">{it.tag}</Badge>
                  <IconButton label="Copia link" size="sm"><Copy /></IconButton>
                  <IconButton label="Altre azioni" size="sm"><MoreHorizontal /></IconButton>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Demo>
      <Demo title="Os três estados" note="carregando · vazio · erro — obrigatórios em toda lista">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="space-y-2 rounded-xl border border-line p-3"><p className="text-caption text-muted-foreground">carregando (skeleton = forma conhecida)</p><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /><SkeletonText lines={2} /></div>
          <div className="flex flex-col items-center justify-center rounded-xl border border-line p-3 text-center"><LovarchSymbol size={48} className="text-foreground" /><p className="mt-2 text-caption text-muted-foreground">carregando (loader = forma desconhecida)</p></div>
          <div className="rounded-xl border border-line p-3 text-caption text-muted-foreground">vazio → <Mono>{`<EmptyState>`}</Mono> com a ação que cria o primeiro item · erro → <Mono>{`<ErrorState retryAction>`}</Mono></div>
        </div>
      </Demo>
      <Demo title="Ações por item e deep link" note="mobile-visível · CopyLinkButton · PublicLinkButton">
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Ações de linha ficam sempre visíveis no toque (<Mono>opacity-100 sm:opacity-0 sm:group-hover:opacity-100</Mono>) e são <Mono>IconButton</Mono> com rótulo.</p>
          <p>Todo detalhe é deep-linkável (<Mono>?i=</Mono>) e tem <Mono>{`<CopyLinkButton>`}</Mono>; compartilhar público é opt-in via <Mono>{`<PublicLinkButton>`}</Mono> (<ExternalLink className="inline size-3.5" />).</p>
        </div>
      </Demo>
      <Divider label="regras" />
      <Spec
        rows={[
          ["Cabeçalho de painel", "PanelTitle (título Outfit base, descrição xs muted, ações à direita, ícone sm opcional)"],
          ["Filtros", "linha de Chips size=sm com scroll horizontal; o ativo é dourado sólido"],
          ["Lista", "Card surface padding=sm interactive, gap-1.5; ícone IconBadge sm, título DM Sans sm medium truncado, Badge de tipo, ações IconButton sm"],
          ["Grade", "grid-cols-2 sm:3 lg:4 gap-3 com Card card padding=md ou Stat"],
          ["Guided flow / quiz", "AbovePrompt (plugin da prompt bar): Chips normais/selected/suggested, contador N/Total, X — ver GuidedContentFlow"],
          ["Mídia", "preview leve (optimizedImageUrl), lightbox bg-black, download com nome amigável"],
          ["Modal em painel", "sempre Modal do DS (portal) — nunca overlay inline"],
          ["Persistência", "aba, filtro, rascunho e painel aberto persistem (URL/localStorage/Supabase)"],
        ]}
      />
      <Rules>
        <Rule>Toda lista nova nasce com os três estados escritos antes do conteúdo.</Rule>
        <Rule kind="dont">Hover-only, tooltip com informação essencial, tabela de 8 colunas no mobile.</Rule>
      </Rules>
      <Code>{`if (isLoading || data === undefined) return <LovarchSymbolLoader size={80} label="" className="text-foreground" />;
if (error) return <ErrorState size="compact" title={t("errors.load")} retryAction={<Button variant="outline" size="sm" onClick={refetch}>{t("common.retry")}</Button>} />;
if (data.length === 0) return <EmptyState size="compact" icon={<FileText />} title={t("content.empty")} action={…} />;`}</Code>
    </Section>
  );
}
