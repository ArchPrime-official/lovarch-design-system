/**
 * LovaAnimated — o Lova vivo: respira, pisca, reage aos eventos e muda de forma conforme a tela.
 *
 * Os clipes (render do rig 3D no Blender, fundo transparente) vêm do app: o componente recebe o manifesto e a URL
 * base. Sem manifesto, com `prefers-reduced-motion` ou se o vídeo falhar, mostra o pôster parado (ou o `fallback`).
 * A aba oculta pausa o vídeo; só o PRÓXIMO clipe provável é pré-carregado. Até o primeiro quadro do vídeo estar na
 * tela, fica no lugar o pôster do PRIMEIRO clipe que vai tocar — o repouso da tela, porque o player só corta no fim de
 * um clipe e o estado novo entra depois dele. É a mesma imagem do rostinho parado, já carregada: a passagem do parado
 * ao animado não deixa a caixa vazia (com o pôster do estado novo, ainda baixando, ficava ~6 quadros vazia — medido no
 * staging em 30/10/2026). O pôster de repouso fica sempre carregado para a volta ao parado também não piscar.
 *
 * Uso:
 *   <LovaAnimated manifest={LOVA_CLIPS} baseUrl="/lova" size={64} screen="progetta"
 *                 state={estadoDoServidor} instrument={instrumento} label="Lova" />
 */
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { LovaVideoController } from "./controlador";
import { clipUrl, sizeFor, videoKind, type LovaClipSize } from "./formato";
import {
  dispatch, eventFromServerState, restingClip, startPlayer,
  type LovaInstrument, type LovaManifest, type LovaPlayerEvent, type LovaPlayerState, type LovaScreen, type LovaServerState,
} from "./maquina";

const SERVER_STATES: readonly string[] = ["idle", "listening", "thinking", "working", "needs_you", "delivered", "celebrating", "shy", "error"];

/** Aceita o estado do servidor (protocolo v1) ou um evento do player. */
export function toPlayerEvent(v: LovaServerState | LovaPlayerEvent): LovaPlayerEvent {
  return SERVER_STATES.includes(v) ? eventFromServerState(v as LovaServerState) : (v as LovaPlayerEvent);
}

/** O pôster parado para o estado de agora (reduced motion / falha). */
export function posterFor(manifest: LovaManifest, screen: LovaScreen, state?: LovaServerState | LovaPlayerEvent | null,
  instrument?: LovaInstrument | null): string {
  let s: LovaPlayerState = startPlayer(manifest, screen, () => 0);
  if (state) s = dispatch(s, toPlayerEvent(state), instrument);
  return restingClip(s);
}

export function usePrefersReducedMotion(): boolean {
  const [reduz, setReduz] = useState(() =>
    typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const mq = typeof window !== "undefined" ? window.matchMedia?.("(prefers-reduced-motion: reduce)") : null;
    if (!mq) return;
    const fn = () => setReduz(mq.matches);
    mq.addEventListener?.("change", fn);
    return () => mq.removeEventListener?.("change", fn);
  }, []);
  return reduz;
}

export interface LovaAnimatedProps {
  manifest: LovaManifest | null | undefined;
  /** Onde estão os arquivos (`<base>/<versão>/<256|640>/<clipe>.webm|.mp4|.png`). */
  baseUrl: string;
  /** Lado em px na tela (o desenho é quadrado). O arquivo (256 ou 640) é escolhido por isto. */
  size?: number;
  /** Força o arquivo de 256 (avatar) ou 640 (corpo). */
  asset?: LovaClipSize;
  screen?: LovaScreen;
  /** Estado do servidor (`state` do protocolo v1) ou evento do player. */
  state?: LovaServerState | LovaPlayerEvent | null;
  instrument?: LovaInstrument | null;
  /** Mude para repetir a mesma reação (duas entregas seguidas). */
  stateKey?: string | number;
  /** Mostrado se não houver manifesto. */
  fallback?: ReactNode;
  /** Rótulo acessível; sem ele o Lova é decorativo (aria-hidden). */
  label?: string;
  /** Parado no pôster (ex.: `animated={false}` do LovaMascot). */
  still?: boolean;
  className?: string;
  style?: CSSProperties;
  onClip?: (clip: string, state: LovaPlayerState) => void;
  random?: () => number;
}

export function LovaAnimated({
  manifest, baseUrl, size = 64, asset, screen = "home", state = null, instrument = null, stateKey, fallback, label,
  still = false, className, style, onClip, random,
}: LovaAnimatedProps) {
  const reduz = usePrefersReducedMotion();
  const [falhou, setFalhou] = useState(false);
  // o vídeo já mostrou o 1º quadro? até lá o pôster fica no lugar
  const [pronto, setPronto] = useState(false);
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);
  const ctrl = useRef<LovaVideoController | null>(null);
  const tam: LovaClipSize = asset ?? sizeFor(size, typeof window !== "undefined" ? window.devicePixelRatio : 1);
  const kind = useMemo(() => videoKind(typeof navigator !== "undefined" ? navigator : null), []);
  const parado = still || reduz || falhou || !manifest;
  const ultimo = useRef({ screen, state, instrument });
  ultimo.current = { screen, state, instrument };

  useEffect(() => {
    if (parado || !aRef.current || !bRef.current || !manifest) return;
    setPronto(false);
    const c = new LovaVideoController({
      a: aRef.current, b: bRef.current, manifest, screen: ultimo.current.screen, random, onClip,
      urlFor: (n) => clipUrl(baseUrl, manifest.version, tam, n, kind),
      onError: () => setFalhou(true),
      onReady: () => setPronto(true),
    });
    const { state: st, instrument: ins } = ultimo.current;
    if (st) c.send(toPlayerEvent(st), ins);
    c.start();
    ctrl.current = c;
    const vis = () => (document.hidden ? c.pause() : c.resume());
    document.addEventListener("visibilitychange", vis);
    if (document.hidden) c.pause();
    return () => {
      document.removeEventListener("visibilitychange", vis);
      c.destroy();
      ctrl.current = null;
    };
    // onClip/random são de depuração: não recriam o player
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parado, manifest, baseUrl, tam, kind]);

  useEffect(() => {
    ctrl.current?.setScreen(screen);
  }, [screen]);

  useEffect(() => {
    if (state) ctrl.current?.send(toPlayerEvent(state), instrument);
  }, [state, instrument, stateKey]);

  // o `style` de quem usa pode trocar a caixa (ex.: o corpo em % da caixa do LovaMascot)
  const caixa: CSSProperties = { width: size, height: size, ...style };
  if (!manifest) {
    return <span className={cn("inline-block", className)} style={caixa} aria-hidden={!label} aria-label={label}>{fallback}</span>;
  }
  // A mídia (pôster ou vídeo) SEMPRE enche uma caixa <span> do tamanho do quadro — nunca é ela a caixa: o preflight do
  // Tailwind põe `max-width: 100%` em todo img/video, e um <img> de 50 px num pai de 24 px virava uma fatia de 24×50
  // (o rostinho do chip, 24/10/2026). `max-w-none` + inline garantem o quadro quadrado em qualquer CSS.
  const midia = { maxWidth: "none", maxHeight: "none" } as const;
  if (parado) {
    const poster = clipUrl(baseUrl, manifest.version, tam, posterFor(manifest, screen, state, instrument), "png");
    return (
      <span role={label ? "img" : undefined} aria-label={label} aria-hidden={!label}
        className={cn("relative inline-block shrink-0 select-none", className)} style={caixa} data-lova-quadro="">
        <img src={poster} alt="" aria-hidden draggable={false} decoding="async"
          className="pointer-events-none absolute inset-0 block size-full max-w-none object-contain" style={midia} />
      </span>
    );
  }
  const video = (ref: typeof aRef) => (
    <video ref={ref} muted playsInline disablePictureInPicture preload="none" aria-hidden
      className="pointer-events-none absolute inset-0 size-full max-w-none object-contain" style={{ ...midia, opacity: 0 }} />
  );
  // o repouso da tela: o 1º clipe que toca (até o 1º quadro) e o pôster da volta ao parado — sempre carregado
  const repouso = clipUrl(baseUrl, manifest.version, tam, posterFor(manifest, screen), "png");
  return (
    <span role={label ? "img" : undefined} aria-label={label} aria-hidden={!label}
      className={cn("relative inline-block shrink-0 select-none", className)} style={caixa} data-lova-quadro=""
      data-lova-pronto={pronto ? "" : undefined}>
      {pronto
        ? <img src={repouso} alt="" aria-hidden hidden />
        : <img src={repouso} alt="" aria-hidden draggable={false} decoding="async" data-lova-poster=""
            className="pointer-events-none absolute inset-0 block size-full max-w-none object-contain" style={midia} />}
      {video(aRef)}
      {video(bRef)}
    </span>
  );
}
