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

/** Ordem de leitura = ordem desta lista. */
export const DS_SECTIONS: DocSectionDef[] = [
  { id: "cores", group: "fundacoes", title: "Cor", Component: ColorsSection },
  { id: "tipografia", group: "fundacoes", title: "Tipografia", Component: TypographySection },
  { id: "espaco", group: "fundacoes", title: "Espaço, forma e movimento", Component: SpaceSection },
  { id: "acoes", group: "componentes", title: "Ações", Component: ActionsSection },
  { id: "identidade", group: "componentes", title: "Ícone, avatar, KPI, progresso", Component: IdentitySection },
  { id: "superficies", group: "componentes", title: "Card, divider, tabela", Component: SurfacesSection },
  { id: "formulario", group: "componentes", title: "Formulário", Component: FormsSection },
  { id: "feedback", group: "componentes", title: "Vazio, erro, avisos, toast", Component: FeedbackSection },
  { id: "overlay", group: "componentes", title: "Modal", Component: OverlaySection },
  { id: "padroes", group: "padroes", title: "Padrões de tela", Component: PatternsSection },
  { id: "marca", group: "marca", title: "Marca e logo", Component: BrandSection },
  { id: "governanca", group: "governanca", title: "Governança", Component: GovernanceSection },
];
