/**
 * Lova animado — o mascote vivo (clipes do rig 3D, fundo transparente) e a máquina que decide o que ele faz.
 *
 *   import { LovaAnimated } from "@archprime/lovarch-ds/brand";
 *
 * Especificação, eventos e como gerar os clipes: `docs/lova-animado.md`.
 */
export { LovaAnimated, posterFor, toPlayerEvent, usePrefersReducedMotion, type LovaAnimatedProps } from "./LovaAnimated";
export {
  bodyLayout, createLovaClipRenderer, faceLayout, LOVA_FACE_CROP, LOVA_FORM_INSTRUMENT, LOVA_FORM_SCREEN, LovaClipView, mascotEvent,
  type LovaClipRendererOptions,
} from "./renderer";
export { LovaVideoController, sameUrl, type LovaControllerOptions, type VideoLike } from "./controlador";
export { clipUrl, prefersHevcAlpha, sizeFor, videoKind, type LovaClipKind, type LovaClipSize, type NavigatorLike } from "./formato";
export {
  advance, blinkAfter, BLINK_MAX_S, BLINK_MIN_S, chooseIdle, dispatch, eventFromServerState, firstBlinkGap, hasClip,
  INSTRUMENT_SHAPE, LOVA_HOME, loopsAt, pathBetween, REACTION_CLIP, restingClip, SCREEN_SHAPE, screenShape, setScreen,
  shapeAvailable, startPlayer, targetPlace,
  type LovaClipMeta, type LovaFrame, type LovaInstrument, type LovaManifest, type LovaMood, type LovaPlayerEvent, type LovaPlayerState,
  type LovaScreen, type LovaServerState, type LovaShape,
} from "./maquina";
