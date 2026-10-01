/** Componentes · Formulário — Field, Input, Textarea; padrão de formulário. */
import { Search } from "lucide-react";
import { Field, Input, Textarea, Button, Mono } from "../../primitives";
import { Section, Demo, Grid, Rules, Rule, Spec, Code } from "../shared";

export function FormsSection() {
  return (
    <Section
      id="formulario"
      title="Formulário: Field, Input, Textarea"
      intro="Todo campo tem rótulo, pode ter dica e erro, e o erro é anunciado. O estado inválido é do Field, não do CSS de cada tela."
    >
      <Demo title="Field + Input" note="label · hint · error · required">
        <Grid cols={2}>
          <Field label="Nome del progetto" hint="Visibile al cliente nel portale" htmlFor="f1"><Input id="f1" placeholder="Villa Moderna" /></Field>
          <Field label="E-mail" required requiredLabel="obbligatorio" error="Inserisci un indirizzo valido" htmlFor="f2"><Input id="f2" type="email" defaultValue="pablo@" /></Field>
          <Field label="Budget" htmlFor="f3"><Input id="f3" type="number" placeholder="0" /></Field>
          <Field label="Disabilitato" htmlFor="f4"><Input id="f4" disabled value="—" readOnly /></Field>
        </Grid>
      </Demo>
      <Demo title="Input · tamanhos e variantes" note="size sm/md/lg · variant default/ghost">
        <div className="space-y-2">
          <Input size="sm" placeholder="sm 32 — filtros, toolbars" />
          <Input placeholder="md 36 — padrão" />
          <Input size="lg" placeholder="lg 44 — mobile, auth" />
          <Input variant="ghost" placeholder="ghost — inline em listas (o que os inputs crus faziam)" />
          <Input invalid placeholder="invalid sem Field" />
          <div className="relative"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" placeholder="Com ícone (padding à esquerda)" /></div>
        </div>
      </Demo>
      <Demo title="Textarea">
        <Field label="Brief" hint="Max 500 caratteri" htmlFor="f5"><Textarea id="f5" placeholder="Descrivi lo spazio, lo stile, i materiali…" /></Field>
      </Demo>
      <Demo title="Padrão de formulário" note="layout · ações · rascunho">
        <form className="max-w-layout-form space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Field label="Cliente" required requiredLabel="obbligatorio" htmlFor="p1"><Input id="p1" placeholder="Nome e cognome" /></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Telefono" htmlFor="p2"><Input id="p2" type="tel" /></Field>
            <Field label="Città" htmlFor="p3"><Input id="p3" /></Field>
          </div>
          <Field label="Note" htmlFor="p4"><Textarea id="p4" /></Field>
          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <Button variant="ghost" type="button">Annulla</Button>
            <Button variant="accent" type="submit">Salva cliente</Button>
          </div>
        </form>
      </Demo>
      <Spec
        rows={[
          ["Largura", <span><Mono>max-w-layout-form</Mono> (560px); campos curtos em grade 2 colunas a partir de <Mono>sm</Mono></span>],
          ["Ordem das ações", "mobile: primária em cima (flex-col-reverse); desktop: à direita, primária por último"],
          ["Validação", "inline no Field ao sair do campo; no submit, foco no primeiro erro; toast só para erro de servidor"],
          ["Rascunho", "formulários longos persistem em localStorage/Supabase (regra Persistence do CLAUDE.md)"],
          ["Select / Checkbox / Switch / Radio / Slider / Date", "continuam os de @/components/ui/* (Radix) — dentro de <Field> herdam id e aria-invalid via useFieldContext()"],
        ]}
      />
      <Rules>
        <Rule>Placeholder não substitui rótulo.</Rule>
        <Rule>Altura mínima 44px no mobile: <Mono>size="lg"</Mono> em telas de toque.</Rule>
        <Rule kind="dont"><Mono>{`<input className="rounded-lg border-border/30 bg-transparent py-1.5">`}</Mono> — detector <Mono>campo-cru-new-home</Mono>. É <Mono>{`<Input variant="ghost" size="sm">`}</Mono>.</Rule>
      </Rules>
      <Code>{`<Field label={t("lead.email")} required requiredLabel={t("common.required")} error={errors.email} htmlFor="email">
  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
</Field>`}</Code>
    </Section>
  );
}
