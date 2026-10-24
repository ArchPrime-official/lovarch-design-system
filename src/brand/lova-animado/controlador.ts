/**
 * Lova animado — o controlador dos dois `<video>` (sem React; testável com vídeos de mentira).
 *
 * Dois vídeos empilhados: um toca na frente, o outro espera atrás já carregado com o PRÓXIMO clipe (só o próximo
 * provável, nada mais). Quando o da frente termina, o de trás começa e só então troca de lugar — o último quadro do
 * clipe que acabou fica na tela até o novo estar tocando, então nunca aparece um quadro vazio.
 */
import {
  advance, dispatch, setScreen, startPlayer,
  type LovaInstrument, type LovaManifest, type LovaPlayerEvent, type LovaPlayerState, type LovaScreen,
} from "./maquina";

export interface VideoLike {
  src: string;
  currentTime: number;
  preload: string;
  style: { opacity: string; zIndex?: string };
  play(): Promise<void> | void;
  pause(): void;
  load(): void;
  addEventListener(type: string, fn: () => void): void;
  removeEventListener(type: string, fn: () => void): void;
}

export interface LovaControllerOptions {
  a: VideoLike;
  b: VideoLike;
  manifest: LovaManifest;
  screen?: LovaScreen;
  urlFor: (clip: string) => string;
  random?: () => number;
  /** Avisa cada clipe que COMEÇA a tocar (para a página de demonstração e para depurar). */
  onClip?: (clip: string, state: LovaPlayerState) => void;
  /** Um vídeo falhou (formato, rede): a tela mostra o Lova parado. */
  onError?: () => void;
}

export class LovaVideoController {
  state: LovaPlayerState;
  pending: LovaPlayerState;
  private front: VideoLike;
  private back: VideoLike;
  private readonly rnd: () => number;
  private paused = false;
  private destroyed = false;
  private readonly handlers: Array<[VideoLike, string, () => void]> = [];

  constructor(private readonly o: LovaControllerOptions) {
    this.rnd = o.random ?? Math.random;
    this.front = o.a;
    this.back = o.b;
    this.state = startPlayer(o.manifest, o.screen ?? "home", this.rnd);
    this.pending = advance(this.state, this.rnd);
    for (const v of [o.a, o.b]) {
      this.on(v, "ended", () => { if (v === this.front) this.next(); });
      this.on(v, "error", () => { if (!this.destroyed) o.onError?.(); });
    }
  }

  private on(v: VideoLike, type: string, fn: () => void) {
    v.addEventListener(type, fn);
    this.handlers.push([v, type, fn]);
  }

  /** Monta o primeiro clipe na frente e o próximo atrás. */
  start(): void {
    this.mostra(this.front, this.back);
    this.carrega(this.front, this.state.current, "auto");
    this.toca(this.front);
    this.o.onClip?.(this.state.current, this.state);
    this.carrega(this.back, this.pending.current, "auto");
  }

  /** Um evento do Lova (pensando, entregou…): muda o plano; o corte acontece no fim do clipe atual. */
  send(ev: LovaPlayerEvent, instrument?: LovaInstrument | null): void {
    this.replaneja(dispatch(this.state, ev, instrument));
  }

  setScreen(screen: LovaScreen): void {
    if (screen === this.state.screen) return;
    this.replaneja(setScreen(this.state, screen));
  }

  pause(): void {
    this.paused = true;
    this.front.pause();
  }

  resume(): void {
    if (!this.paused || this.destroyed) return;
    this.paused = false;
    this.toca(this.front);
  }

  destroy(): void {
    this.destroyed = true;
    for (const [v, t, fn] of this.handlers) v.removeEventListener(t, fn);
    this.front.pause();
    this.back.pause();
  }

  private replaneja(novo: LovaPlayerState): void {
    // o clipe atual continua; o que muda é o PRÓXIMO — refeito a partir do lugar onde o atual termina
    this.state = { ...novo, current: this.state.current, place: this.state.place, sinceBlink: this.state.sinceBlink };
    const antes = this.pending.current;
    this.pending = advance(this.state, this.rnd);
    if (this.pending.current !== antes) this.carrega(this.back, this.pending.current, "auto");
  }

  /** O clipe da frente terminou: o de trás entra. */
  next(): void {
    if (this.destroyed) return;
    const entra = this.back;
    const sai = this.front;
    this.state = this.pending;
    const url = this.o.urlFor(this.state.current);
    if (!sameUrl(entra.src, url)) this.carrega(entra, this.state.current, "auto");
    entra.currentTime = 0;
    this.front = entra;
    this.back = sai;
    const troca = () => {
      entra.removeEventListener("playing", troca);
      if (this.front === entra) this.mostra(entra, sai);
    };
    entra.addEventListener("playing", troca);
    if (!this.paused) this.toca(entra);
    else troca();
    this.o.onClip?.(this.state.current, this.state);
    this.pending = advance(this.state, this.rnd);
    this.carrega(sai, this.pending.current, "auto");
  }

  private mostra(frente: VideoLike, tras: VideoLike) {
    frente.style.opacity = "1";
    frente.style.zIndex = "1";
    tras.style.opacity = "0";
    tras.style.zIndex = "0";
  }

  private carrega(v: VideoLike, clip: string, preload: string) {
    const url = this.o.urlFor(clip);
    if (sameUrl(v.src, url)) return;
    v.preload = preload;
    v.src = url;
    v.load();
  }

  private toca(v: VideoLike) {
    try {
      const p = v.play();
      if (p && typeof (p as Promise<void>).catch === "function") (p as Promise<void>).catch(() => undefined);
    } catch {
      /* autoplay recusado: fica no quadro parado */
    }
  }
}

/** `video.src` volta absoluto; a URL do manifesto pode ser relativa. */
export function sameUrl(atual: string, alvo: string): boolean {
  if (!atual) return false;
  if (atual === alvo) return true;
  return atual.endsWith(alvo.replace(/^\.?\//, "/")) || atual.endsWith(alvo);
}
