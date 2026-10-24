/**
 * O Lova animado no lugar do estático, sem tocar em quem usa `LovaMascot`/`LovaAvatar`:
 *
 *   const renderer = useMemo(() => createLovaClipRenderer({ manifest, baseUrl: "/lova" }), [manifest]);
 *   <LovaRendererContext.Provider value={renderer}> … telas do Lova … </LovaRendererContext.Provider>
 *
 * - `variant="body"`: o Lova fica com a MESMA altura da arte estática (pés no fundo da caixa); o quadro do clipe é
 *   maior que ele (pulo, braços para cima, as formas) e transborda a caixa para cima e para os lados, sem cortar.
 * - `variant="face"`: o rostinho (boina, rosto e a pinta) recortado do clipe pequeno — pisca e respira também.
 *   O rostinho é sempre o Lova (as formas por tela são do corpo).
 * - `animated={false}` no corpo → o pôster parado do estado. O rostinho é sempre vivo (pisca), salvo com
 *   `prefers-reduced-motion`.
 */
import type { CSSProperties } from "react";
import type { LovaForm, LovaRenderer, LovaRenderProps, LovaState } from "../LovaMascot";
import { LovaAnimated } from "./LovaAnimated";
import type { LovaFrame, LovaInstrument, LovaManifest, LovaPlayerEvent, LovaScreen } from "./maquina";

export interface LovaClipRendererOptions {
  manifest: LovaManifest;
  /** Onde estão os arquivos (`<base>/<versão>/<256|640>/<clipe>.webm|.mov|.png`). */
  baseUrl: string;
}

/** A forma do LovaMascot → a tela do player (que decide a forma). */
export const LOVA_FORM_SCREEN: Record<LovaForm, LovaScreen> = {
  lova: "home",
  compass: "progetta",
  house: "render",
  scale_ruler: "orcamento",
  helmet: "obra",
};

export const LOVA_FORM_INSTRUMENT: Record<LovaForm, LovaInstrument | null> = {
  lova: null,
  compass: "compass",
  house: "house",
  scale_ruler: "ruler",
  helmet: "helmet",
};

/** O estado do LovaMascot → evento do player (as expressões diretas viram a reação correspondente). */
export function mascotEvent(state: LovaState): LovaPlayerEvent {
  switch (state) {
    case "happy": return "celebrating";
    case "shy": return "praised";
    case "sad": return "error";
    default: return state;
  }
}

const QUADRO_PADRAO: LovaFrame = { top: 0.2006, feet: 0.8685, left: 0.2401, right: 0.7601, cx: 0.5001 };
/** O rostinho no quadro: um quadrado centrado entre a boina e a pinta. */
export const LOVA_FACE_CROP = { cx: 0.5, cy: 0.425, side: 0.48 };

/** Tamanho e posição do quadro do clipe para o Lova ficar com `altura` px, pés no fundo da caixa. */
export function bodyLayout(frame: LovaFrame | null | undefined, altura: number): { side: number; style: CSSProperties } {
  const f = frame ?? QUADRO_PADRAO;
  const side = Math.round(altura / (f.feet - f.top));
  return {
    side,
    style: { position: "absolute", left: "50%", marginLeft: -Math.round(f.cx * side), top: Math.round(altura - f.feet * side) },
  };
}

export function faceLayout(lado: number): { side: number; style: CSSProperties } {
  const side = Math.round(lado / LOVA_FACE_CROP.side);
  return {
    side,
    style: { position: "absolute", left: Math.round(lado / 2 - LOVA_FACE_CROP.cx * side), top: Math.round(lado / 2 - LOVA_FACE_CROP.cy * side) },
  };
}

export function LovaClipView({ manifest, baseUrl, state, form, variant, size, animated }: LovaClipRendererOptions & LovaRenderProps) {
  const face = variant === "face";
  const { side, style } = face ? faceLayout(size) : bodyLayout(manifest.frame, size);
  const ev = mascotEvent(state);
  const inst = ev === "working" && !face ? LOVA_FORM_INSTRUMENT[form] : null;
  const view = (
    <LovaAnimated manifest={manifest} baseUrl={baseUrl} size={side} screen={face ? "home" : LOVA_FORM_SCREEN[form]}
      state={ev} instrument={inst} still={!animated && !face} style={style} />
  );
  // o rostinho recorta (caixa própria, relativa); o corpo pode transbordar a caixa (pulo, braços, formas)
  return face ? <span className="relative block overflow-hidden" style={{ width: size, height: size }}>{view}</span> : view;
}

export function createLovaClipRenderer(o: LovaClipRendererOptions): LovaRenderer {
  return (p) => <LovaClipView key={p.variant} {...o} {...p} />;
}
