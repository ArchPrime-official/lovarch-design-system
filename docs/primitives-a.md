# Primitives A — Button, IconButton, Spinner, Chip, Badge, IconBadge, Avatar, ProgressBar, Stat, Divider, Skeleton

Referência dos primitivos do Design System V8 que vivem em `src/primitives/`. Vale para agentes e humanos: antes de criar um botão, chip, badge ou KPI "na mão", use o componente daqui.

Regras comuns a todos:

- Import por subpath: `import { Button } from "@archprime/lovarch-ds/primitives/button"`.
- Zero texto fixo: todo texto visível ou acessível entra por prop (`t('…')`). O DS não sabe o idioma.
- Dark mode é automático pelos tokens (`bg-surface`, `border-line`, `text-accent`…). Nunca `dark:`.
- Fontes por classe (`font-dm-sans`, `font-outfit`), nunca `style={{ fontFamily }}`.
- Loading inline = `Spinner` (símbolo pulsando). `animate-spin` e `Loader2` são proibidos.
- Ícones só Lucide, dimensionados com `size-*`.
- Todo componente aceita `className` (mesclado com `cn`) e repassa `ref`.

---

## Button

Botão em pílula para QUALQUER ação. Superset da API do shadcn (mesmos `variant`/`size`, mais os novos). `accent` é o CTA principal dourado; `default` é a ação primária neutra; `outline`/`ghost` são secundárias.

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `variant` | `default` · `accent` · `outline` · `secondary` · `ghost` · `link` · `destructive` | `default` | Tom do botão. `link` é texto puro, sem padding. |
| `size` | `sm` · `default` · `lg` · `xl` · `icon` · `icon-sm` · `icon-xl` | `default` | `xl` e `icon-xl` garantem 44px (toque). |
| `asChild` | `boolean` | `false` | Renderiza o filho (ex.: `<a>`) com as classes do botão (Radix Slot). Ignora `loading`/`leftIcon`/`rightIcon`. |
| `loading` | `boolean` | `false` | Troca o ícone esquerdo pelo `Spinner`, desabilita e seta `aria-busy`. |
| `leftIcon` | `ReactNode` | — | Ícone antes do texto (Lucide, sem classe de tamanho). |
| `rightIcon` | `ReactNode` | — | Ícone depois do texto. |
| `disabled` | `boolean` | `false` | Nativo. `loading` também desabilita. |
| …`ButtonHTMLAttributes` | | | `onClick`, `type`, `form`, etc. |

```tsx
<Button variant="accent" size="xl" leftIcon={<Sparkles />} loading={isPending}>
  {t("render.generate")}
</Button>
<Button asChild variant="link"><a href="/docs">{t("common.learnMore")}</a></Button>
```

Não use para: botão só-ícone (`IconButton`), filtros ou opções selecionáveis (`Chip`), rótulo de estado (`Badge`), navegação de aba.

Exporta também `buttonVariants` (cva) para aplicar o visual em outro elemento.

---

## IconButton

Botão só-ícone que **exige `label`** (vira `aria-label` e `title`). `type="button"` por default. Reusa `buttonVariants`.

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `label` | `string` | **obrigatório** | Nome da ação, vindo do i18n. |
| `size` | `sm` (32px) · `md` (36px) · `lg` (44px) | `md` | Em touch prefira `lg`. |
| `variant` | `ghost` · `outline` · `accent` · `default` | `ghost` | |
| `loading` | `boolean` | `false` | Troca o ícone pelo `Spinner`, desabilita, `aria-busy`. |
| `children` | `ReactNode` | **obrigatório** | O ícone Lucide. |

```tsx
<IconButton label={t("common.close")} onClick={onClose}><X /></IconButton>
```

Não use para: botão com texto (`Button`), ação que precise de confirmação visível (o `title` não aparece em touch — se a informação é essencial, mostre-a inline).

---

## Spinner

Indicador de carregamento inline: o símbolo Lovarch estático em `animate-pulse`, na cor do texto ao redor (`text-current`).

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `size` | `14` · `16` · `20` · `24` | `16` | Lado em px. 16 casa com o ícone do `Button`. |
| `label` | `string` | — | `aria-label`. Sem ele o spinner é decorativo (`aria-hidden`). |
| `className` | `string` | — | Aplicado ao SVG (ex.: `text-accent`). |

```tsx
<Spinner />
<Spinner size={20} label={t("common.loading")} />
```

Não use para: loading de painel/página/geração de IA (`LovarchSymbolLoader` de `feedback`), placeholder de lista (`Skeleton`).

---

## Chip

Pílula **interativa**: filtro, chip de módulo, opção de quiz/fluxo guiado, tag removível. É um `<button type="button">` (ou `<span>` com `as="span"`).

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `as` | `button` · `span` | `button` | `span` para tag só visual (dentro de um input, por exemplo). |
| `selected` | `boolean` | `false` | Dourado sólido. No `button` vira `aria-pressed`. |
| `suggested` | `boolean` | `false` | Tom "sugerido pela IA": dourado translúcido + `Sparkles` (se não houver `icon`). |
| `size` | `sm` (28px) · `md` (36px) · `lg` (44px) | `md` | `lg` em listas touch (ex.: fluxo guiado). |
| `icon` | `ReactNode` | — | Ícone à esquerda, dimensionado em 14px. |
| `onRemove` | `() => void` | — | Mostra o X à direita. **Exige `removeLabel`** (há `console.warn` se faltar). |
| `removeLabel` | `string` | — | Texto acessível do X. |
| `disabled` | `boolean` | `false` | No `span` vira `aria-disabled`. |
| `children` | `ReactNode` | **obrigatório** | O texto. |

```tsx
<Chip selected={active === m.id} onClick={() => setActive(m.id)} icon={<Film />}>{m.label}</Chip>
<Chip suggested size="lg" onClick={pick}>{suggestion}</Chip>
<Chip onRemove={() => remove(tag)} removeLabel={t("common.remove")}>{tag}</Chip>
```

Detalhe: o X é `role="button"` (não um `<button>` aninhado — HTML inválido); funciona com Enter/Espaço e não propaga o clique para o chip.

Não use para: estado estático (`Badge`), ação principal (`Button`), navegação entre páginas.

---

## Badge

Rótulo **estático** de status, num `<span>`. `size="sm"` é o look clássico (10px uppercase eyebrow); `md` é o rótulo de 11px em caixa normal.

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `tone` | `neutral` · `accent` · `success` · `warning` · `danger` · `content` · `outline` · `solid` | `neutral` | `content` (roxo) é para tipos de conteúdo. |
| `size` | `sm` · `md` | `sm` | |
| `dot` | `boolean` | `false` | Bolinha à esquerda na cor do texto (status vivo). |

```tsx
<Badge tone="success" dot>{t("status.active")}</Badge>
<Badge tone="content" size="md">{t("content.type.reel")}</Badge>
```

Não use para: algo clicável (`Chip`), contadores enormes, texto longo (é `whitespace-nowrap`).

---

## IconBadge

Ícone dentro de caixa colorida (o padrão "ícone em quadrado/círculo" de listas de features, KPIs, cabeçalhos). O tamanho do ícone é aplicado pelo badge; passe o Lucide sem classe de tamanho.

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `size` | `sm` (28px, ícone 14) · `md` (40px, ícone 18) · `lg` (56px, ícone 24) | `md` | |
| `tone` | `accent` · `muted` · `success` · `warning` · `danger` · `content` · `solid` | `accent` | `solid` = dourado cheio com ícone branco. |
| `shape` | `square` · `circle` | `square` | `square` usa o raio proporcional (lg/xl/2xl). |
| `children` | `ReactNode` | **obrigatório** | O ícone. |
| `aria-label` | `string` | — | Se ausente, o badge é decorativo (`aria-hidden`). |

```tsx
<IconBadge tone="success" shape="circle"><Check /></IconBadge>
```

Não use para: botão (`IconButton`), avatar de pessoa (`Avatar`).

Exporta `IconBadgeTone` (tipo) e `iconBadgeVariants`.

---

## Avatar

Foto de pessoa/estúdio em círculo com fallback de iniciais (DM Sans). Se a imagem falhar (`onError`), cai nas iniciais sozinho.

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `name` | `string` | **obrigatório** | `aria-label` e fonte das iniciais. |
| `src` | `string` | — | URL da imagem (`object-cover`, `loading="lazy"`). |
| `size` | `xs` (24) · `sm` (28) · `md` (36) · `lg` (44) · `xl` (56) | `md` | |
| `tone` | `muted` · `accent` · `solid` | `muted` | Cor do fallback. |

Função utilitária exportada: `initials(name)` → 1 ou 2 letras maiúsculas (primeira do primeiro e do último nome); vazio → `"?"`.

```tsx
<Avatar name={member.name} src={member.avatar_url} />
<Avatar name="Maria Rossi" size="lg" tone="accent" />
```

Não use para: logotipo de marca, thumbnail de conteúdo (use `optimizedImageUrl` numa `<img>` comum), ícone genérico (`IconBadge`).

---

## ProgressBar

Trilho + preenchimento proporcional, determinado (0–100), com linha opcional acima (rótulo à esquerda, valor à direita em DM Sans tabular). `role="progressbar"` com `aria-valuenow/min/max`.

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `value` | `number` | **obrigatório** | 0–100; fora do intervalo é limitado (NaN → 0). |
| `size` | `sm` (4px) · `md` (6px) · `lg` (10px) | `md` | |
| `tone` | `accent` · `success` · `warning` · `danger` · `foreground` | `accent` | |
| `label` | `ReactNode` | — | Rótulo acima, à esquerda. Se for `string`, vira o `aria-label`. |
| `valueLabel` | `ReactNode` | — | Valor acima, à direita (`"62%"`, `"1.200 / 2.000"`). |
| `ariaLabel` | `string` | — | `aria-label` explícito (necessário quando `label` não é string). |

```tsx
<ProgressBar value={(used / limit) * 100} tone={used / limit > 0.9 ? "danger" : "accent"}
  label={t("credits.used")} valueLabel={`${used} / ${limit}`} />
```

Não use para: espera indeterminada (`Spinner`), stepper de wizard com rótulos por passo (componente próprio).

---

## Stat e StatGrid

`Stat` é o card de KPI: rótulo 11px, valor grande em DM Sans bold tabular, `delta` com seta e cor semântica, `hint` abaixo, ícone opcional num `IconBadge` sm. `StatGrid` é a grade responsiva padrão (2 colunas no mobile).

**Stat**

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `label` | `ReactNode` | **obrigatório** | Nome do indicador. |
| `value` | `ReactNode` | **obrigatório** | O número (já formatado no idioma). |
| `hint` | `ReactNode` | — | Linha pequena abaixo (período, unidade, comparação). |
| `icon` | `ReactNode` | — | Lucide, renderizado num `IconBadge size="sm"` no canto direito. |
| `tone` | `IconBadgeTone` | `accent` | Tom do `IconBadge`. |
| `delta` | `{ value: ReactNode; direction: "up" \| "down" \| "flat" }` | — | `up` = success + `TrendingUp`; `down` = destructive + `TrendingDown`; `flat` = muted + `Minus`. |
| `size` | `sm` (p-3, valor `text-xl`) · `md` (p-4, valor `text-2xl`) | `md` | |

**StatGrid**

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `columns` | `2` · `3` · `4` · `6` | `4` | Colunas no `lg`. Mobile sempre 2; `sm` é 3 (salvo `columns={2}`). |

```tsx
<StatGrid columns={4}>
  <Stat label={t("kpi.leads")} value={128} icon={<Users />}
    delta={{ value: "+12%", direction: "up" }} hint={t("kpi.vsLastMonth")} />
</StatGrid>
```

Não use para: gráfico de série temporal (`charts`), tabela de números (`DataTable`), número solto no meio do texto.

---

## Divider

Separador `role="separator"`, horizontal ou vertical, com rótulo opcional centrado em eyebrow.

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `orientation` | `horizontal` · `vertical` | `horizontal` | Vertical usa `self-stretch border-l` (dê altura pelo pai ou `className`). |
| `label` | `ReactNode` | — | Só no horizontal. Texto 10px uppercase entre as duas linhas. |
| `tone` | `soft` · `default` · `strong` | `soft` | `border-line-soft` / `border-line` / `border-line-strong`. |

```tsx
<Divider />
<Divider label={t("auth.or")} tone="default" />
<Divider orientation="vertical" className="h-6" />
```

Não use para: separar itens de uma lista (prefira `divide-y divide-line-soft` no container), espaçamento (use `gap`/`space-y`).

---

## Skeleton e SkeletonText

Placeholder pulsante (`bg-muted/60`, `animate-pulse`, `aria-hidden`) que reserva o espaço do conteúdo que vai chegar. `SkeletonText` empilha N linhas, a última com 2/3 da largura.

| Componente | Prop | Tipo | Default | Descrição |
|---|---|---|---|---|
| `Skeleton` | `className` | `string` | — | Dê a forma aqui (`h-40 w-full rounded-xl`, `size-9 rounded-full`). |
| `SkeletonText` | `lines` | `number` | `3` | Linhas de `h-3` com `space-y-2`. |

```tsx
<Skeleton className="h-40 w-full rounded-xl" />
<SkeletonText lines={2} />
```

Não use para: espera sem formato conhecido (geração de IA, painel inteiro → `LovarchSymbolLoader`), ação curta em botão (`Spinner`), estado vazio real (`EmptyState`).
