/** Componentes · Superfícies e dados — Card, Divider, DataTable. */
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Divider, DataTable, TableHeader, TableBody, TableRow, TableHead, TableCell, TableEmpty, Badge, Button, Mono } from "../../primitives";
import { Section, Demo, Grid, Rules, Rule, Spec, Code } from "../shared";

const ROWS = [
  ["Villa Moderna · Lago", "Progetto", "attivo", "€ 18.500"],
  ["Studio Bianchi", "Branding", "in attesa", "€ 4.200"],
  ["Loft Navigli", "Render", "concluso", "€ 950"],
];

export function SurfacesSection() {
  return (
    <Section
      id="superficies"
      title="Card, Divider, DataTable"
      intro="Um card canônico (rounded-xl · border-line · bg-card) com quatro variantes, um divisor com uma cor, uma tabela que rola no mobile em vez de espremer."
    >
      <Demo title="Card · variantes" note="variant · padding · interactive">
        <Grid cols={3}>
          <Card padding="md"><p className="font-outfit text-sm font-semibold">card (default)</p><p className="text-caption text-muted-foreground">bg-card · border-line · rounded-xl</p></Card>
          <Card variant="surface" padding="md"><p className="font-outfit text-sm font-semibold">surface</p><p className="text-caption text-muted-foreground">bg-surface — o card leve de lista</p></Card>
          <Card variant="glass" padding="md"><p className="font-outfit text-sm font-semibold">glass</p><p className="text-caption text-muted-foreground">bg-card/80 + blur — sobre imagem/hero</p></Card>
          <Card variant="selected" padding="md"><p className="font-outfit text-sm font-semibold">selected</p><p className="text-caption text-muted-foreground">accent/5 + borda accent/30</p></Card>
          <Card variant="surface" padding="md" interactive><p className="font-outfit text-sm font-semibold">interactive</p><p className="text-caption text-muted-foreground">hover: borda forte + shadow-md</p></Card>
          <Card variant="ghost" padding="md"><p className="font-outfit text-sm font-semibold">ghost</p><p className="text-caption text-muted-foreground">sem borda nem fundo — agrupador</p></Card>
        </Grid>
      </Demo>
      <Demo title="Card · anatomia shadcn" note="CardHeader/Title/Description/Content/Footer">
        <Card className="max-w-md">
          <CardHeader><CardTitle>Villa Moderna · Lago</CardTitle><CardDescription>Consegna · settembre 2026</CardDescription></CardHeader>
          <CardContent><div className="flex items-center gap-2"><Badge tone="success" dot>attivo</Badge><Badge tone="content">render</Badge></div></CardContent>
          <CardFooter className="gap-2"><Button variant="accent" size="sm">Apri</Button><Button variant="ghost" size="sm">Condividi</Button></CardFooter>
        </Card>
      </Demo>
      <Demo title="Divider" note="tone soft (default) · default · strong · label · vertical">
        <div className="space-y-3">
          <Divider />
          <Divider tone="default" />
          <Divider tone="strong" />
          <Divider label="oppure" />
          <div className="flex h-8 items-center gap-3 text-sm text-muted-foreground"><span>A</span><Divider orientation="vertical" /><span>B</span></div>
        </div>
      </Demo>
      <Demo title="DataTable" note="rola no mobile (minWidth) · th micro uppercase · numeric">
        <DataTable minWidth={560} aria-label="Progetti">
          <TableHeader><TableRow><TableHead>Nome</TableHead><TableHead>Tipo</TableHead><TableHead>Stato</TableHead><TableHead numeric>Valore</TableHead></TableRow></TableHeader>
          <TableBody>
            {ROWS.map(([n, t, s, v]) => (
              <TableRow key={n}>
                <TableCell className="font-medium text-foreground">{n}</TableCell>
                <TableCell className="text-muted-foreground">{t}</TableCell>
                <TableCell><Badge tone={s === "attivo" ? "success" : s === "concluso" ? "neutral" : "warning"} dot>{s}</Badge></TableCell>
                <TableCell numeric>{v}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </DataTable>
        <div className="mt-3">
          <DataTable minWidth={320} aria-label="Vuoto"><TableBody><TableEmpty colSpan={3}>Nessun risultato</TableEmpty></TableBody></DataTable>
        </div>
      </Demo>
      <Spec
        rows={[
          ["Card em lista", "variant=\"surface\" padding=\"sm\" interactive — o padrão das 500+ linhas de lista da new-home"],
          ["Card em grade/KPI", "variant=\"card\" padding=\"md\" (ou Stat)"],
          ["Modal/painel grande", "rounded-2xl (o Modal já faz)"],
          ["Tabela no mobile", "DataTable rola horizontalmente; se a tabela é de 2–3 colunas, prefira lista de Cards"],
        ]}
      />
      <Rules>
        <Rule>Toda borda de card é <Mono>border-line</Mono>; todo divisor é <Mono>border-line-soft</Mono> / <Mono>{`<Divider>`}</Mono>.</Rule>
        <Rule kind="dont"><Mono>rounded-[18px] border-border/60 bg-card/80 backdrop-blur</Mono> à mão — 131 combinações viraram 5 variantes.</Rule>
        <Rule kind="dont"><Mono>{`<table>`}</Mono> cru com 24 estilos de <Mono>{`<th>`}</Mono>.</Rule>
      </Rules>
      <Code>{`<Card variant="surface" padding="sm" interactive onClick={open}>
  <div className="flex items-center gap-3">
    <IconBadge size="sm" tone="content"><FileText /></IconBadge>
    <p className="min-w-0 flex-1 truncate font-dm-sans text-sm font-medium">{item.title}</p>
    <Badge tone="success" dot>{t("status.active")}</Badge>
  </div>
</Card>`}</Code>
    </Section>
  );
}
