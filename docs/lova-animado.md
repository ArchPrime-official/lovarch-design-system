# Lova animado — o mascote vivo (v0.8.0)

O `LovaMascot`/`LovaAvatar` (v0.7.0) desenham as artes oficiais paradas. O **Lova animado** troca o desenho por
clipes renderizados do **rig 3D no Blender** (o modelo final da Sandra, V2), com **fundo transparente** — sem vídeo
de IA. Quem usa o mascote não muda nada: o app liga o renderizador animado pelo `LovaRendererContext`.

```tsx
import { LovaRendererContext, createLovaClipRenderer } from "@archprime/lovarch-ds/brand";
import manifest from "./lova-clipes.json";           // gerado junto com os clipes

const renderer = useMemo(() => createLovaClipRenderer({ manifest, baseUrl: "/lova" }), []);
<LovaRendererContext.Provider value={renderer}>
  <LovaMascot state={estado} form="compass" height={150} animated />   // corpo: mesma altura da arte estática
  <LovaAvatar state={estado} size={28} />                              // rostinho recortado do clipe, pisca
</LovaRendererContext.Provider>
```

Ou direto: `<LovaAnimated manifest={manifest} baseUrl="/lova" size={240} screen="progetta" state="thinking" />`.

## O que ele faz

| Situação | Clipe(s) |
|---|---|
| Repouso (início, cantinho) | `repouso` + variantes que piscam e olham de lado; a próxima piscada cai **2–6 s** depois da última; nunca repete o mesmo loop seguido. Nunca parado: respira em todos. |
| `thinking` / `working` sem forma | `pensando-entra` → `pensando` (translúcido, o símbolo dourado gira por dentro) → `pensando-sai` |
| `working` com forma / tela com forma | Progetta/CAD → **compasso**, Render → **casinha** (orçamento → escalímetro e obra → capacete quando houver clipe). **Sempre pela luz**: `virar-luz` → `luz-<forma>` → `<forma>` → `<forma>-luz` → `luz-lova` |
| `delivered` / `celebrating` (`happy`) | `entregou` (acende + pulinho + feliz) |
| `needs_approval` | `precisa-entra` → `precisa` (segura o cartãozinho) → `precisa-sai` |
| `praised` (`shy`) | `timido` (mãos na boca, brilhinhos) |
| `error` (`sad`) | `triste`, e em seguida sorri (mostra a saída) |
| `listening` / `speaking` | ainda sem clipe (voz ao vivo não existe): fica no repouso |

Regras da máquina (`maquina.ts`, pura e testada):
- todo clipe começa e termina na pose de base do seu lugar → o player **só corta no fim de um clipe** (o evento
  muda o plano; o corte espera ≤ 3 s), e o corte nunca pula;
- o que não tem clipe no manifesto cai no Lova normal (nunca quebra);
- `prefers-reduced-motion` → o pôster parado do estado; aba oculta → pausa; só o **próximo** clipe provável é
  pré-carregado (dois `<video>` empilhados: o de trás já carregado; troca quando ele começa a tocar).

## Formatos e arquivos

`<base>/<versão>/<256|640>/<clipe>.webm|.mov|.png` — a versão no caminho permite cache imutável.

| Navegador | Arquivo |
|---|---|
| Chrome, Edge, Firefox, Android | WebM VP9 com alfa (`.webm`) |
| Safari e qualquer navegador do iPhone/iPad (WebKit) | HEVC com alfa, `hvc1` (`.mov`) — o Chrome do Mac toca HEVC mas sem o alfa, por isso a escolha é pelo motor (`prefersHevcAlpha`) |

O tamanho do arquivo segue o tamanho em tela (`sizeFor`: até 300 px reais → 256, acima → 640). O manifesto traz o
enquadramento (`frame`: onde a boina e os pés caem no quadro) para o corpo ficar com a mesma altura da arte estática.

## Como os clipes são feitos

`CREATIVI-CONTENUTI/LOVA-3D/app-clipes/render_todos.sh` (um comando): render do `lova-rig.blend` só com as funções do
`lova_pose.py`, conferência de TODOS os quadros (a pinta de coração à vista fora da luz; o corpo nunca passa da
proporção de repouso, amassa ≤ 3 % só ao pousar), WebM + HEVC + pôster nos dois tamanhos, manifesto e a página de
revisão com o simulador (que usa este mesmo código).

## Não faça

- ❌ esticar o vídeo (`object-fill`, caixa com outra proporção): o quadro é quadrado e o Lova nunca estica;
- ❌ cortar no meio de um clipe (pula a pose);
- ❌ escolher o formato por `canPlayType` (Chrome do Mac diz que toca HEVC e mostra o fundo preto);
- ❌ gerar pose nova com IA ou desenhar por cima: pose nova = clipe novo do rig.
