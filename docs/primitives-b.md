# Primitives — lote B

Componentes em `src/primitives/`: tipografia, estados vazios, banner, campos de formulário, card, modal e tabela. Todos seguem o contrato do DS V8: zero texto fixo (toda string vem por prop), zero `style={{ fontFamily }}` (fontes via `font-outfit` / `font-dm-sans` / `font-playfair` / `font-mono`), dark mode só por tokens, alvo de toque ≥ 44 px, `forwardRef` + `displayName` em tudo que renderiza DOM.

Importe pelo subpath: `import { PanelTitle } from "@archprime/lovarch-ds/primitives/typography"`.

---

## Typography (`typography.tsx`)

Primitivos de texto que encapsulam a escolha de fonte. Use sempre que houver texto com papel semântico — são a substituição direta dos `style={{ fontFamily }}` inline do app.

### `Heading`

Título semântico `h1`–`h4`. Outfit semibold por padrão; `display` troca para Playfair (só hero).

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `level` | `1 \| 2 \| 3 \| 4` | — (obrigatório) | Tag renderizada e tamanho default (1 → `text-2xl sm:text-3xl`, 2 → `text-xl sm:text-2xl`, 3 → `text-lg`, 4 → `text-base`). |
| `display` | `boolean` | `false` | Playfair Display, peso normal. Só para hero. |
| `size` | `hero \| hero-lg \| 4xl \| 3xl \| 2xl \| xl \| lg \| base` | — | Destaca o tamanho visual sem mudar a tag. |
| `as` | `React.ElementType` | `h{level}` | Sobrescreve a tag mantendo o estilo. |

```tsx
<Heading level={1} display size="hero">{t("landing.hero")}</Heading>
<Heading level={2}>{t("section.title")}</Heading>
```

**Não use para:** título de painel da new-home (→ `PanelTitle`), rótulo de bloco (→ `SectionLabel`), texto corrido (→ `Text`).

### `Text`

Parágrafo (ou `as`) com tamanho, tom e peso controlados.

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `size` | `xs \| sm \| base \| lg` | `sm` | Tamanho. |
| `tone` | `default \| muted \| dim \| accent \| danger` | `default` | Cor (`dim` = muted a 70%). |
| `weight` | `normal \| medium \| semibold` | `normal` | Peso. |
| `as` | `React.ElementType` | `p` | Tag renderizada. |

```tsx
<Text tone="muted">{t("common.hint")}</Text>
<Text as="span" size="xs" tone="danger" weight="medium">{t("form.invalid")}</Text>
```

**Não use para:** números/KPIs (→ `Kpi`), código (→ `Mono`), rótulo em caixa alta (→ `Eyebrow`).

### `Eyebrow`

Rótulo pequeno em caixa alta (`text-micro`, `tracking-eyebrow`, Outfit) acima de um título.

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `tone` | `muted \| accent \| foreground` | `muted` | Cor. |
| `as` | `React.ElementType` | `p` | Tag renderizada. |

```tsx
<Eyebrow tone="accent">{t("plans.recommended")}</Eyebrow>
```

**Não use para:** texto legível de mais de 3–4 palavras (10 px em caixa alta só serve para rótulo curto).

### `PanelTitle`

Cabeçalho de painel/seção da new-home: ícone opcional em `IconBadge`, eyebrow, título `h2` Outfit, descrição e slot de ações à direita.

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `title` | `ReactNode` | — (obrigatório) | Título. |
| `description` | `ReactNode` | — | Linha abaixo do título (`Text size="xs" tone="muted"`). |
| `actions` | `ReactNode` | — | Slot à direita (botões, filtros). |
| `eyebrow` | `ReactNode` | — | String vira `<Eyebrow>`; um nó é renderizado como veio (para escolher o `tone`). |
| `icon` | `ReactNode` | — | Ícone Lucide sem classe de tamanho, dentro de `<IconBadge size="sm">`. |
| `as` | `h1 \| h2 \| h3 \| h4` | `h2` | Tag do título. |

```tsx
<PanelTitle
  title={t("crm.title")}
  description={t("crm.subtitle")}
  icon={<Users />}
  actions={<Button variant="accent" size="sm">{t("crm.new")}</Button>}
/>
```

**Não use para:** títulos dentro de card (→ `CardTitle`) ou de bloco dentro do painel (→ `SectionLabel`).

### `SectionLabel`

Título de bloco dentro do painel (`h3`, Outfit, `text-sm`) com contagem e ações opcionais.

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `count` | `number` | — | Contagem ao lado do título (`text-caption`, tabular). |
| `actions` | `ReactNode` | — | Slot à direita. |
| `as` | `h2 \| h3 \| h4` | `h3` | Tag do título. |
| `children` | `ReactNode` | — | O texto do rótulo. |

```tsx
<SectionLabel count={leads.length} actions={<Button variant="ghost" size="sm">{t("common.seeAll")}</Button>}>
  {t("crm.recent")}
</SectionLabel>
```

**Não use para:** o título principal do painel (→ `PanelTitle`).

### `Kpi`

Número grande (DM Sans bold, dígitos tabulares) com unidade antes/depois em tamanho menor.

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `size` | `sm \| md \| lg` | `md` | `text-lg` / `text-2xl` / `text-4xl`. |
| `tone` | `default \| accent \| success \| danger` | `default` | Cor. |
| `prefix` | `ReactNode` | — | Unidade antes (ex.: moeda), em `0.6em` muted. |
| `suffix` | `ReactNode` | — | Unidade depois (ex.: `%`). |
| `as` | `React.ElementType` | `span` | Tag renderizada. |

```tsx
<Kpi size="lg" tone="success" suffix="%">42</Kpi>
<Kpi prefix="€">1.280</Kpi>
```

**Não use para:** texto; para card de KPI completo (rótulo + número + delta) use o `Stat` do lote A.

### `Mono`

`<code>` inline em JetBrains Mono com fundo `muted/60`.

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `children` | `ReactNode` | — | O conteúdo. Aceita qualquer prop de `<code>`. |

```tsx
<Text>{t("api.useKey")} <Mono>lvk_…</Mono></Text>
```

**Não use para:** bloco de código multi-linha (precisa de `<pre>`).

---

## EmptyState / ErrorState (`empty-state.tsx`)

Bloco centrado com moldura tracejada, ícone em `IconBadge`, título, descrição e até duas ações. Vai no lugar da lista/grade/tabela quando ela está vazia (`EmptyState`) ou falhou ao carregar (`ErrorState`, tom `danger`, `role="alert"`).

### `EmptyState`

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `icon` | `ReactNode` | — (obrigatório) | Ícone Lucide sem classe de tamanho (o `IconBadge` dimensiona: `lg` no `full`, `md` no `compact`). |
| `title` | `ReactNode` | — (obrigatório) | Título Outfit (`text-base`; `text-sm` no `compact`). |
| `description` | `ReactNode` | — | Texto curto (`text-sm`, `max-w-sm`). |
| `action` | `ReactNode` | — | Ação principal — normalmente `<Button variant="accent">`. |
| `secondaryAction` | `ReactNode` | — | Ação secundária — normalmente `<Button variant="ghost">`. |
| `size` | `full \| compact` | `full` | `py-14 px-6` para o painel inteiro; `py-8 px-4` dentro de card/aba. |

```tsx
<EmptyState
  icon={<Inbox />}
  title={t("crm.empty.title")}
  description={t("crm.empty.body")}
  action={<Button variant="accent" onClick={create}>{t("crm.new")}</Button>}
/>
```

### `ErrorState`

Mesmas props de `EmptyState`, com estas diferenças:

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `icon` | `ReactNode` | `<AlertTriangle />` | Opcional. |
| `retryAction` | `ReactNode` | — | Substitui `action` — normalmente `<Button variant="outline">`. |

```tsx
<ErrorState title={t("errors.loadFailed")} retryAction={<Button variant="outline" onClick={refetch}>{t("common.retry")}</Button>} />
```

**Não use para:** feedback efêmero (→ toast), erro de campo (→ `FieldError`), aviso persistente com a lista ainda visível (→ `Banner`), "sem resultados" dentro de uma tabela já montada (→ `TableEmpty`).

---

## Banner (`banner.tsx`)

Aviso persistente no topo do painel (não é toast): ícone, título opcional, texto, ação à direita e X para dispensar. Fica até o usuário agir ou a condição sumir.

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `tone` | `neutral \| accent \| success \| warning \| danger` | `neutral` | Fundo/borda/ícone do tom. |
| `icon` | `ReactNode` | por tom: `Info` / `Sparkles` / `CheckCircle2` / `AlertTriangle` / `XCircle` | Substitui o ícone default. |
| `title` | `ReactNode` | — | Linha em `font-semibold`. |
| `children` | `ReactNode` | — | Texto (`text-sm`). |
| `action` | `ReactNode` | — | Slot à direita (botão `size="sm"`, link). |
| `onDismiss` | `() => void` | — | Mostra o X (`size-8`). |
| `dismissLabel` | `string` | — | `aria-label` do X. Obrigatório junto com `onDismiss` — sem ele há `console.warn`. |
| `role` | `status \| alert` | `status` (`alert` quando `tone="danger"`) | Papel ARIA. |

```tsx
<Banner tone="warning" title={t("credits.low.title")}
  action={<Button size="sm">{t("credits.buy")}</Button>}
  onDismiss={hide} dismissLabel={t("common.dismiss")}>
  {t("credits.low.body")}
</Banner>
```

**Não use para:** feedback de uma ação (→ toast), erro de carregamento que substitui o conteúdo (→ `ErrorState`), erro de campo (→ `FieldError`).

---

## Field / Input / Textarea (`field.tsx`)

Anatomia completa de um campo: `Field` empilha rótulo, controle e dica/erro e propaga `id`, `aria-invalid` e `aria-describedby` por contexto. `Input` e `Textarea` são a API do shadcn com `size`, `variant` e `invalid`. Controles próprios leem `useFieldContext()`.

### `Field`

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `label` | `ReactNode` | — | Rótulo (`text-xs font-medium`). |
| `hint` | `ReactNode` | — | Dica (`text-caption` muted). Some enquanto houver `error`. |
| `error` | `ReactNode` | — | Erro (`text-caption` destructive, `role="alert"`). Marca o controle como inválido. |
| `required` | `boolean` | `false` | Asterisco `aria-hidden` após o rótulo. |
| `requiredLabel` | `string` | — | Texto `sr-only` do asterisco (ex.: "obrigatório"). |
| `htmlFor` | `string` | — | `id` do controle: vai no `<label>` e, via contexto, no `Input`/`Textarea` sem `id`. |

### `Input`

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `size` | `sm \| md \| lg` | `md` | `h-8 text-xs` / `h-9 text-base md:text-sm` / `h-11 min-h-[44px]`. |
| `variant` | `default \| ghost` | `default` | `ghost` = sem fundo, borda `line-soft` (o que os inputs crus do app fazem). |
| `invalid` | `boolean` | herdado do `Field` | Borda e ring destructive + `aria-invalid`. |
| `htmlSize` | `number` | — | O atributo nativo `size` (largura em caracteres), renomeado por conflito. |

### `Textarea`

Mesmas props de `Input` (sem `htmlSize`), `min-h-[80px]`.

```tsx
<Field label={t("crm.email")} htmlFor="email" required requiredLabel={t("form.required")}
  hint={t("crm.emailHint")} error={errors.email}>
  <Input id="email" type="email" value={v} onChange={set} />
</Field>
```

**Não use para:** busca inline sem rótulo (use `Input` solto), select/combobox (use o controle próprio lendo `useFieldContext`).

---

## Card (`card.tsx`)

Superfície de agrupamento. Sub-componentes com os mesmos nomes e classes do `card.tsx` do shadcn (re-export compatível), mais `variant`, `padding` e `interactive` no `Card`.

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `variant` | `card \| surface \| glass \| selected \| ghost` | `card` | `card` = `bg-card border-line`; `surface` = fundo leve; `glass` = `bg-card/80 backdrop-blur-md`; `selected` = `bg-accent/5 border-accent/30`; `ghost` = sem borda nem fundo. |
| `padding` | `none \| sm \| md \| lg` | `none` | `p-3` / `p-4` / `p-5`. `none` porque `CardHeader`/`CardContent` já têm padding. |
| `interactive` | `boolean` | `false` | `cursor-pointer`, hover `border-line-strong` + `shadow-md`, ring de foco. |
| `as` | `React.ElementType` | `div` | Tag (ex.: `article`, `li`, `button`). |

Partes: `CardHeader` (`p-5`), `CardTitle` (`h3` DM Sans `text-lg`), `CardDescription` (`text-sm` muted), `CardContent` (`p-5 pt-0`), `CardFooter` (`flex items-center p-5 pt-0`).

```tsx
<Card variant="surface" padding="md" interactive as="button" onClick={open}>
  <Kpi>42</Kpi>
</Card>
```

**Não use para:** modal/painel flutuante (→ `Modal`), lista de linhas comparáveis (→ `DataTable`), fundo de página.

---

## Modal (`modal.tsx`)

Diálogo Radix. Mobile = bottom sheet (`rounded-t-2xl`, `max-h-[90dvh]`, safe-area); `sm:` = centrado. Sempre via Portal em `document.body` — dentro de painel da new-home, modal sem portal morre no stacking context e a prompt bar rouba os cliques.

### `Modal`

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `open` / `defaultOpen` / `onOpenChange` | Radix | — | Controle de abertura. |
| `title` | `ReactNode` | — | Título (`ModalTitle`). Sem ele, inclua `<ModalTitle>` nos children — o Radix exige para acessibilidade. |
| `description` | `ReactNode` | — | Descrição (`ModalDescription`). |
| `size` | `sm \| md \| lg \| xl \| full` | `md` | `sm:max-w-sm` / `-lg` / `-2xl` / `-4xl` / `calc(100vw-48px)`. |
| `footer` | `ReactNode` | — | Botões (no mobile empilhados e full-width, o último do JSX fica em cima). |
| `hideClose` | `boolean` | `false` | Esconde o X. |
| `closeLabel` | `string` | — (obrigatório) | `aria-label` do X. |
| `trigger` | `ReactNode` | — | Elemento que abre (`DialogTrigger asChild`). |
| `className` | `string` | — | Classes extras no content. |

Partes exportadas para composição livre: `ModalHeader`, `ModalTitle`, `ModalDescription`, `ModalBody`, `ModalFooter`.

### `ModalFrame`

Só o visual do content (sem Radix, sem portal, sem `fixed`/animação) para docs estáticos, previews e quem controla o posicionamento. Props: `title`, `description`, `size`, `footer`, `closeLabel` + `onClose` (renderiza o X só se `closeLabel` vier), `children`.

```tsx
<Modal open={open} onOpenChange={setOpen} title={t("crm.delete.title")}
  description={t("crm.delete.body")} closeLabel={t("common.close")}
  footer={<>
    <Button variant="ghost" onClick={() => setOpen(false)}>{t("common.cancel")}</Button>
    <Button variant="destructive" onClick={confirm}>{t("common.delete")}</Button>
  </>}>
  {children}
</Modal>
```

**Não use para:** fluxo guiado/quiz (→ zona AbovePrompt do prompt bar), menu de ações (→ dropdown/popover), aviso persistente (→ `Banner`).

---

## DataTable (`data-table.tsx`)

Tabela de dados. `DataTable` é o wrapper responsivo (moldura `rounded-xl border-line bg-card` + rolagem horizontal) que já renderiza a `<table>` com `minWidth`: no mobile a tabela rola em vez de espremer as colunas. `Table` e as partes também saem soltas.

### `DataTable`

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `minWidth` | `number \| string` | `640` | Largura mínima da `<table>`; abaixo dela o wrapper rola. |
| `wrapperClassName` | `string` | — | Classes do `<div>` rolável. |
| `className`, `aria-label`, … | `<table>` | — | Vão na `<table>` (o `ref` também). |

### Partes

| Componente | Prop extra | Descrição |
|---|---|---|
| `Table` | — | `w-full text-sm`, sem wrapper. |
| `TableHeader` / `TableBody` | — | `thead` / `tbody`. |
| `TableRow` | `data-state="selected"` | `border-b border-line-soft`, hover `bg-surface-hover`, selecionada `bg-accent/5`. |
| `TableHead` | `numeric?: boolean` | `h-9 px-3`, `text-micro uppercase tracking-eyebrow`, `bg-muted/40`. `numeric` alinha à direita em DM Sans tabular. |
| `TableCell` | `numeric?: boolean` | `px-3 py-2.5`. Idem `numeric`. |
| `TableEmpty` | `colSpan: number` | Linha única "sem dados" (`py-10` centrado, muted). |

```tsx
<DataTable minWidth={720} aria-label={t("finance.transactions")}>
  <TableHeader>
    <TableRow><TableHead>{t("date")}</TableHead><TableHead numeric>{t("amount")}</TableHead></TableRow>
  </TableHeader>
  <TableBody>
    {rows.length === 0
      ? <TableEmpty colSpan={2}>{t("finance.noTransactions")}</TableEmpty>
      : rows.map((r) => <TableRow key={r.id}><TableCell>{r.date}</TableCell><TableCell numeric>{r.amount}</TableCell></TableRow>)}
  </TableBody>
</DataTable>
```

**Não use para:** galeria de thumbnails/cards (não é tabela), layout de página, lista de 1 coluna (use lista com `Card`).
