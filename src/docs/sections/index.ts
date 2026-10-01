import type { DocSectionDef } from "../shared";
import { ColorsSection } from "./colors";
import { TypographySection } from "./typography";
import { SpaceSection } from "./space";
import { ActionsSection } from "./actions";
import { IdentitySection } from "./identity";
import { SurfacesSection } from "./surfaces";
import { FormsSection } from "./forms";
import { FeedbackSection } from "./feedback";
import { OverlaySection } from "./overlay";
import { PatternsSection } from "./patterns";
import { BrandSection } from "./brand";
import { GovernanceSection } from "./governance";
import { MotionSection } from "./motion";
import { LoadingSection } from "./loading";
import { EffectsSection } from "./effects";
import { ChartsSection } from "./charts";

/** Ordem de leitura = ordem desta lista. */
export const DS_SECTIONS: DocSectionDef[] = [
  { id: "cores", group: "fundacoes", title: "Cor", Component: ColorsSection },
  { id: "tipografia", group: "fundacoes", title: "Tipografia", Component: TypographySection },
  { id: "espaco", group: "fundacoes", title: "Espaço, forma, z-index, ícones", Component: SpaceSection },
  { id: "movimento", group: "fundacoes", title: "Movimento (ao vivo)", Component: MotionSection },
  { id: "acoes", group: "componentes", title: "Ações", Component: ActionsSection },
  { id: "identidade", group: "componentes", title: "Ícone, avatar, KPI, progresso", Component: IdentitySection },
  { id: "superficies", group: "componentes", title: "Card, divider, tabela", Component: SurfacesSection },
  { id: "formulario", group: "componentes", title: "Formulário", Component: FormsSection },
  { id: "loading", group: "componentes", title: "Loading e IA trabalhando", Component: LoadingSection },
  { id: "feedback", group: "componentes", title: "Vazio, erro, avisos, toast", Component: FeedbackSection },
  { id: "overlay", group: "componentes", title: "Modal", Component: OverlaySection },
  { id: "efeitos", group: "componentes", title: "Efeitos, fundos, animados", Component: EffectsSection },
  { id: "graficos", group: "componentes", title: "Gráficos", Component: ChartsSection },
  { id: "padroes", group: "padroes", title: "Padrões de tela", Component: PatternsSection },
  { id: "marca", group: "marca", title: "Marca e logo", Component: BrandSection },
  { id: "governanca", group: "governanca", title: "Governança", Component: GovernanceSection },
];
