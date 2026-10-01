/** Governança — fonte da verdade, enforcement, contribuição, superfícies. */
import { Mono } from "../../primitives";
import { Section, Demo, Rules, Rule, Spec, Code } from "../shared";

export function GovernanceSection() {
  return (
    <Section
      id="governanca"
      title="Governança: fonte da verdade, regras, contribuição"
      intro="O DS vive num submódulo versionado; o app, as Edge Functions, os plugins e os documentos consomem o MESMO tokens.json. O que não é gerado é verificado por detectores com baseline que só encolhe."
    >
      <Demo title="Fonte da verdade e pipeline">
        <Code>{`squads/lovarch-design-system/src/tokens/tokens.json      ← edite SÓ aqui
  └ node scripts/build-tokens.mjs
      ├ src/tokens/tokens.css          → app (main.tsx importa) + plugins + docs
      ├ src/tokens/tokens.ts           → Vite/Node/Deno (hex, fontFamily, zIndex…)
      └ src/tokens/tailwind-tokens.ts  → tailwind-preset.ts (classes)
npm run ds:sync (na Lovarch)
      ├ supabase/functions/_shared/dsTokens.ts   → e-mails, v-view, v-project, mcp, booking
      ├ integrations/cad-ui/src/ds-tokens.css    → SketchUp / Rhino / Revit
      └ docs/_ds/tokens.css                      → apresentações e auditorias HTML
npm run ds:check  → falha se algo saiu de sincronia (roda no vitest: dsTokens.test.ts)`}</Code>
      </Demo>
      <Spec
        rows={[
          ["Subpaths", <span><Mono>/primitives</Mono> (Button, Chip, Card, Field, Modal, EmptyState…) · <Mono>/feedback</Mono> (LovarchSymbolLoader) · <Mono>/charts</Mono> · <Mono>/animated</Mono> · <Mono>/effects</Mono> · <Mono>/brand</Mono> · <Mono>/motion</Mono> · <Mono>/tokens</Mono> · <Mono>/docs</Mono> (esta página) · <Mono>/blocks</Mono> e <Mono>/lp-blocks</Mono> (CMS/landing)</span>],
          ["No app", <span><Mono>@/components/ui/button|card|input|textarea</Mono> re-exportam o DS — importar de qualquer um dos dois é a mesma implementação</span>],
          ["Versão", "semver no package.json do submódulo + CHANGELOG; bump nos consumidores com bump-all-squads.sh; Lovarch e PrimeTeam têm de apontar para o mesmo commit"],
          ["Documentação", <span>esta página: rota <Mono>/ds</Mono> no app (admin) e <Mono>docs/design/index.html</Mono> offline, geradas da mesma fonte (<Mono>@archprime/lovarch-ds/docs</Mono>)</span>],
          ["Claude Design", "re-sync do projeto Lovarch DS V8 depois de cada release do DS (ver memória 2026-06-29)"],
        ]}
      />
      <Demo title="Detectores (src/test/projectRules) — a dívida só pode diminuir">
        <div className="overflow-x-auto rounded-xl border border-line bg-card">
          <table className="w-full text-caption">
            <thead><tr className="bg-muted/40 text-left font-outfit text-micro uppercase tracking-eyebrow text-muted-foreground"><th className="px-3 py-2">regra</th><th className="px-3 py-2">acusa</th><th className="px-3 py-2">use</th></tr></thead>
            <tbody className="divide-y divide-line-soft">
              {[
                ["cor-azul-banida", "blue/sky/#2563EB", "accent"],
                ["cor-hex-literal", "#A16207 no código", "tokens / hex.light.*"],
                ["superficie-cinza-crua", "bg-white, text-gray-500, bg-zinc-900", "bg-card, text-muted-foreground"],
                ["texto-px-arbitrario", "text-[10px]", "text-micro/caption/dense"],
                ["fonte-inline", "style={{ fontFamily }}", "font-outfit / primitivos"],
                ["z-index-arbitrario", "z-[9999]", "z-modal, z-toast…"],
                ["botao-cru-new-home", "<button> na new-home", "Button / IconButton / Chip"],
                ["campo-cru-new-home", "<input>/<textarea>/<select> na new-home", "Input / Textarea / Field"],
                ["title-em-botao", "title= em botão", "IconButton label + Tooltip"],
                ["toast-legado", "import use-toast", "toast de sonner"],
                ["loader-animate-spin / loader-loader2", "spinner girando", "LovarchSymbolLoader / Spinner"],
                ["altura-viewport-sem-dvh", "h-screen", "min-h-dvh"],
                ["acao-so-no-hover", "opacity-0 group-hover", "variante mobile-visível"],
                ["img-sem-optimizedImageUrl · download-manual · select-star-em-lista · draggable-nativo", "performance/UX", "helpers do projeto"],
              ].map(([a, b, c]) => (
                <tr key={a}><td className="px-3 py-1.5 font-mono text-foreground">{a}</td><td className="px-3 py-1.5 text-muted-foreground">{b}</td><td className="px-3 py-1.5 text-foreground">{c}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-caption text-muted-foreground">Baseline: <Mono>src/test/projectRules/baseline.json</Mono>. Arquivo novo tem de nascer limpo; arquivo tocado não pode piorar. <Mono>UPDATE_RULES_BASELINE=1</Mono> encolhe; <Mono>=force</Mono> só com justificativa no PR.</p>
      </Demo>
      <Rules>
        <Rule>Toda tela tocada migra a sua família (botão, card, chip, modal, toast, fonte) — mesma regra dos helpers de Edge Function.</Rule>
        <Rule>Componente novo nasce no DS (submódulo), com docs nesta página e nos <Mono>docs/primitives-*.md</Mono>; o app só re-exporta.</Rule>
        <Rule>Mudou token? <Mono>npm run ds:sync</Mono>, commit no submódulo, bump nos consumidores.</Rule>
        <Rule kind="dont">Editar <Mono>tokens.css</Mono>, <Mono>dsTokens.ts</Mono> ou <Mono>index.css</Mono> para mudar cor.</Rule>
        <Rule kind="dont">Copiar um primitivo para dentro de <Mono>src/components</Mono> "para ajustar".</Rule>
      </Rules>
    </Section>
  );
}
