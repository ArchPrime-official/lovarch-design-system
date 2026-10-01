/** Componentes · Gráficos — BarList, ProgressCircle, Tracker + paleta de séries. */
import { LovarchBarList } from "../../charts/lovarch-bar-list";
import { LovarchProgressCircle } from "../../charts/lovarch-progress-circle";
import { LovarchTracker } from "../../charts/lovarch-tracker";
import { Mono } from "../../primitives";
import { Section, Demo, Grid, Rules, Rule, Spec, Code } from "../shared";

export function ChartsSection() {
  return (
    <Section
      id="graficos"
      title="Gráficos"
      intro="Três gráficos do DS cobrem quase todo KPI do produto: ranking (BarList), proporção (ProgressCircle) e atividade no tempo (Tracker). Barras animam ao entrar; cores seguem a ordem chart-1…6."
    >
      <Grid cols={3}>
        <Demo title="LovarchBarList" note="ranking horizontal, anima ao entrar">
          <LovarchBarList data={[{ name: "Instagram", value: 42 }, { name: "Passaparola", value: 28 }, { name: "LinkedIn", value: 15 }, { name: "Ads", value: 8 }]} />
        </Demo>
        <Demo title="LovarchProgressCircle" note="proporção com rótulo central">
          <div className="flex items-center justify-around">
            <div className="text-center"><LovarchProgressCircle value={72} size={64} label="72%" /><p className="mt-1 text-caption text-muted-foreground">Crediti</p></div>
            <div className="text-center"><LovarchProgressCircle value={45} size={64} label="45%" color="hsl(var(--success))" /><p className="mt-1 text-caption text-muted-foreground">Conversione</p></div>
            <div className="text-center"><LovarchProgressCircle value={88} size={64} label="88%" color="hsl(var(--content))" /><p className="mt-1 text-caption text-muted-foreground">Qualità</p></div>
          </div>
        </Demo>
        <Demo title="LovarchTracker" note="atividade por dia/semana">
          <LovarchTracker
            data={[
              { tooltip: "Lun", color: "bg-accent/60" }, { tooltip: "Mar", color: "bg-accent" }, { tooltip: "Mer", color: "bg-success" },
              { tooltip: "Gio", color: "bg-accent/30" }, { tooltip: "Ven", color: "bg-success" }, { tooltip: "Sab" }, { tooltip: "Dom" },
              { tooltip: "Lun", color: "bg-accent" }, { tooltip: "Mar", color: "bg-accent/60" }, { tooltip: "Mer", color: "bg-accent" },
              { tooltip: "Gio", color: "bg-success" }, { tooltip: "Ven", color: "bg-accent/30" }, { tooltip: "Sab" }, { tooltip: "Dom" },
            ]}
          />
          <p className="mt-2 text-caption text-muted-foreground">vazio = sem atividade · intensidade = alpha do dourado · verde = concluído</p>
        </Demo>
      </Grid>
      <Spec
        rows={[
          ["Séries", <span><Mono>chart-1</Mono> dourado · <Mono>chart-2</Mono> dourado claro · <Mono>chart-3</Mono> success · <Mono>chart-4</Mono> warning · <Mono>chart-5</Mono> content · <Mono>chart-6</Mono> foreground — nessa ordem, sempre</span>],
          ["Sequencial", "um valor em intensidades → alpha do dourado (/30 /60 /100)"],
          ["Área/linha/donut", <span>gráficos completos (recharts) ainda vivem em <Mono>@/components/charts</Mono> no app; convergência para o DS é débito (issue #2786 F4)</span>],
          ["Números", <span>valores em <Mono>font-dm-sans tabular-nums</Mono>; eixo e legenda em <Mono>text-caption text-muted-foreground</Mono></span>],
        ]}
      />
      <Rules>
        <Rule>Rótulo e valor sempre visíveis (tooltip não existe no toque).</Rule>
        <Rule kind="dont">Azul, arco-íris de séries, gráfico 3D, pizza com mais de 5 fatias.</Rule>
      </Rules>
      <Code>{`import { LovarchBarList, LovarchProgressCircle } from "@archprime/lovarch-ds/charts";
<LovarchBarList data={sources} valueFormatter={(v) => \`\${v}%\`} />`}</Code>
    </Section>
  );
}
