/**
 * Lova animado — a máquina de estados (pura, sem DOM, testável).
 *
 * Decide QUAL clipe toca a seguir. Todos os clipes começam e terminam na pose de base do seu «lugar»
 * (Lova neutro, pensando, precisa, luz, compasso, casinha…): por isso o player só corta no FIM de um clipe,
 * e o corte nunca pula. Os clipes saem do rig 3D no Blender (`LOVA-3D/app-clipes`), com fundo transparente.
 *
 * Regras (bíblia do Lova, 11.13):
 * - nunca parado: em repouso alterna loops de respiração e sorteia a próxima piscada para 2–6 s depois da última;
 * - eventos mudam o estado (pensando, precisa de você) ou tocam uma reação (entregou, tímido, triste);
 * - cada tela tem a sua forma (Progetta → compasso, Render → casinha…), e mudar de forma passa SEMPRE pela luz;
 * - o que não tem clipe no manifesto cai no Lova normal (nunca quebra).
 */

export type LovaShape = "lova" | "compasso" | "escalimetro" | "casinha" | "capacete";

/** Telas conhecidas; qualquer outra string vale como "home" (o Lova normal). */
export type LovaScreen =
  | "home" | "progetta" | "cad" | "orcamento" | "medidas" | "render" | "obra"
  | (string & Record<never, never>);

/** Eventos do player (vocabulário do app). */
export type LovaPlayerEvent =
  | "idle" | "listening" | "thinking" | "speaking" | "working" | "delivered" | "praised" | "error"
  | "needs_approval" | "approval_done" | "celebrating";

/** Estados que o servidor manda no evento `state` (protocolo do Lova v1, `persona/states.ts`). */
export type LovaServerState =
  | "idle" | "listening" | "thinking" | "working" | "needs_you" | "delivered" | "celebrating" | "shy" | "error";

/** Instrumento do evento `state: working` (protocolo v1). */
export type LovaInstrument = "compass" | "ruler" | "house" | "helmet" | "paper_hat";

export interface LovaClipMeta {
  /** Quadros (a `fps` do manifesto). */
  frames: number;
  /** Loop: o último quadro emenda no primeiro. */
  loop: boolean;
  /** Lugar onde o clipe começa e onde termina. */
  from: string;
  to: string;
  /** Quadros (0-based) em que ele pisca — o sorteio do repouso usa isto. */
  blinks: number[];
}

/** Onde o Lova em repouso cai no quadro (frações 0–1): o quadro tem folga para o pulo, os braços e as formas. */
export interface LovaFrame {
  top: number;
  feet: number;
  left: number;
  right: number;
  cx: number;
}

export interface LovaManifest {
  /** Versão dos arquivos (vai no caminho: cache longo e imutável). */
  version: string;
  fps: number;
  frame?: LovaFrame | null;
  clips: Record<string, LovaClipMeta>;
}

export type LovaMood = "idle" | "thinking" | "needs_you";

export interface LovaPlayerState {
  manifest: LovaManifest;
  screen: LovaScreen;
  mood: LovaMood;
  /** Forma de trabalho pedida pelo servidor (working + instrumento). */
  work: LovaShape | null;
  /** Reação de um tiro só esperando a vez (toca no Lova normal). */
  reaction: string | null;
  /** O clipe que está tocando e o lugar onde ele termina. */
  current: string;
  place: string;
  /** Segundos desde a última piscada, contados até o FIM do clipe atual. */
  sinceBlink: number;
  /** Último loop de repouso (para não repetir o mesmo duas vezes seguidas). */
  lastIdle: string | null;
}

export const LOVA_HOME = "lova";
export const BLINK_MIN_S = 2;
export const BLINK_MAX_S = 6;

/** Tela → forma do Lova naquela tela. */
export const SCREEN_SHAPE: Record<string, LovaShape> = {
  home: "lova",
  progetta: "compasso",
  cad: "compasso",
  orcamento: "escalimetro",
  medidas: "escalimetro",
  render: "casinha",
  obra: "capacete",
};

/** Instrumento do protocolo → forma. */
export const INSTRUMENT_SHAPE: Record<LovaInstrument, LovaShape> = {
  compass: "compasso",
  ruler: "escalimetro",
  house: "casinha",
  helmet: "capacete",
  paper_hat: "capacete",
};

/** Evento → reação de um tiro só. */
export const REACTION_CLIP: Partial<Record<LovaPlayerEvent, string>> = {
  delivered: "entregou",
  celebrating: "entregou",
  praised: "timido",
  error: "triste",
};

/** Estado do servidor → evento do player. */
export function eventFromServerState(state: LovaServerState): LovaPlayerEvent {
  switch (state) {
    case "needs_you": return "needs_approval";
    case "shy": return "praised";
    default: return state;
  }
}

// ------------------------------------------------------------------ o grafo dos clipes
export function hasClip(m: LovaManifest, name: string | null | undefined): boolean {
  return !!name && Object.prototype.hasOwnProperty.call(m.clips, name);
}

/** Loops que começam e terminam no mesmo lugar (ex.: os repousos do Lova, o loop do compasso). */
export function loopsAt(m: LovaManifest, place: string): string[] {
  return Object.keys(m.clips).filter((n) => {
    const c = m.clips[n];
    return c.loop && c.from === place && c.to === place;
  });
}

/** Caminho mais curto (em clipes de passagem) de um lugar a outro; [] se já está lá; null se não há. */
export function pathBetween(m: LovaManifest, from: string, to: string): string[] | null {
  if (from === to) return [];
  const prev = new Map<string, { place: string; clip: string }>();
  const seen = new Set([from]);
  const fila = [from];
  while (fila.length) {
    const aqui = fila.shift() as string;
    for (const nome of Object.keys(m.clips).sort()) {
      const c = m.clips[nome];
      if (c.loop || c.from !== aqui || c.from === c.to || seen.has(c.to)) continue;
      seen.add(c.to);
      prev.set(c.to, { place: aqui, clip: nome });
      if (c.to === to) {
        const out: string[] = [];
        let p = to;
        while (p !== from) {
          const passo = prev.get(p) as { place: string; clip: string };
          out.unshift(passo.clip);
          p = passo.place;
        }
        return out;
      }
      fila.push(c.to);
    }
  }
  return null;
}

/** A forma existe quando tem loop E dá para chegar nela a partir do Lova e voltar. */
export function shapeAvailable(m: LovaManifest, shape: LovaShape | null | undefined): boolean {
  if (!shape) return false;
  if (shape === LOVA_HOME) return true;
  return loopsAt(m, shape).length > 0 && pathBetween(m, LOVA_HOME, shape) !== null && pathBetween(m, shape, LOVA_HOME) !== null;
}

export function screenShape(m: LovaManifest, screen: LovaScreen): LovaShape {
  const s = SCREEN_SHAPE[String(screen)] ?? LOVA_HOME;
  return shapeAvailable(m, s) ? s : LOVA_HOME;
}

/** Para onde ele deve ir agora (sem contar a reação pendente, que sempre toca no Lova normal). */
export function targetPlace(s: LovaPlayerState): string {
  const m = s.manifest;
  if (s.reaction && hasClip(m, s.reaction)) return m.clips[s.reaction].from;
  if (s.mood === "needs_you" && loopsAt(m, "precisa").length && pathBetween(m, s.place, "precisa")) return "precisa";
  if (s.work && shapeAvailable(m, s.work)) return s.work;
  if (s.mood === "thinking" && loopsAt(m, "pensando").length) return "pensando";
  return screenShape(m, s.screen);
}

// ------------------------------------------------------------------ piscadas: o sorteio do repouso
function duracao(m: LovaManifest, nome: string): number {
  return m.clips[nome].frames / m.fps;
}

/** Segundos desde a última piscada depois que o clipe terminar. */
export function blinkAfter(m: LovaManifest, nome: string, sinceBlink: number): number {
  const c = m.clips[nome];
  if (!c.blinks.length) return sinceBlink + c.frames / m.fps;
  return (c.frames - Math.max(...c.blinks)) / m.fps;
}

/** Quando cai a primeira piscada do clipe, contando desde a anterior (Infinity se o clipe não pisca). */
export function firstBlinkGap(m: LovaManifest, nome: string, sinceBlink: number): number {
  const c = m.clips[nome];
  if (!c.blinks.length) return Infinity;
  return sinceBlink + Math.min(...c.blinks) / m.fps;
}

/**
 * Escolhe o próximo loop de repouso: a próxima piscada tem de cair entre 2 e 6 s depois da última; um loop sem
 * piscada só vale se ainda der tempo de piscar depois dele. Evita repetir o mesmo; olhar de lado é mais raro.
 */
export function chooseIdle(m: LovaManifest, place: string, sinceBlink: number, last: string | null, rnd: () => number): string {
  const todos = loopsAt(m, place);
  if (!todos.length) throw new Error(`lova-animado: nenhum loop em «${place}»`);
  if (todos.length === 1) return todos[0];
  const valido = (n: string) => {
    const gap = firstBlinkGap(m, n, sinceBlink);
    if (gap === Infinity) return sinceBlink + duracao(m, n) + 0.25 <= BLINK_MAX_S;
    return gap >= BLINK_MIN_S && gap <= BLINK_MAX_S;
  };
  let pool = todos.filter(valido);
  if (!pool.length) {
    // atrasado: o que pisca mais cedo
    pool = [...todos].filter((n) => m.clips[n].blinks.length)
      .sort((a, b) => Math.min(...m.clips[a].blinks) - Math.min(...m.clips[b].blinks)).slice(0, 1);
    if (!pool.length) pool = todos;
  }
  if (pool.length > 1 && last) pool = pool.filter((n) => n !== last).length ? pool.filter((n) => n !== last) : pool;
  const peso = (n: string) => (/olha/.test(n) ? 0.5 : 1);
  const total = pool.reduce((t, n) => t + peso(n), 0);
  let r = Math.max(0, Math.min(0.999999, rnd())) * total;
  for (const n of pool) {
    r -= peso(n);
    if (r < 0) return n;
  }
  return pool[pool.length - 1];
}

// ------------------------------------------------------------------ a máquina
function toca(s: LovaPlayerState, nome: string, extra: Partial<LovaPlayerState> = {}): LovaPlayerState {
  const c = s.manifest.clips[nome];
  return {
    ...s,
    ...extra,
    current: nome,
    place: c.to,
    sinceBlink: blinkAfter(s.manifest, nome, s.sinceBlink),
  };
}

/** Estado inicial: já na forma da tela (sem transição ao montar). */
export function startPlayer(manifest: LovaManifest, screen: LovaScreen = "home", rnd: () => number = Math.random): LovaPlayerState {
  const place = screenShape(manifest, screen);
  const base: LovaPlayerState = {
    manifest, screen, mood: "idle", work: null, reaction: null, current: "", place, sinceBlink: 1.5, lastIdle: null,
  };
  return loopAt(base, place, rnd);
}

function loopAt(s: LovaPlayerState, place: string, rnd: () => number): LovaPlayerState {
  const nome = chooseIdle(s.manifest, place, s.sinceBlink, s.lastIdle, rnd);
  return toca(s, nome, { lastIdle: place === LOVA_HOME ? nome : s.lastIdle });
}

/** O próximo clipe, quando o atual terminar. */
export function advance(s: LovaPlayerState, rnd: () => number = Math.random): LovaPlayerState {
  const m = s.manifest;
  if (s.reaction && hasClip(m, s.reaction) && s.place === m.clips[s.reaction].from) {
    return toca(s, s.reaction, { reaction: null });
  }
  if (s.reaction && !hasClip(m, s.reaction)) s = { ...s, reaction: null };
  const alvo = targetPlace(s);
  if (s.place !== alvo) {
    const caminho = pathBetween(m, s.place, alvo);
    if (caminho && caminho.length) return toca(s, caminho[0]);
  }
  if (loopsAt(m, s.place).length) return loopAt(s, s.place, rnd);
  // lugar sem loop (ex.: a luz, se um clipe de chegada faltar): volta para casa pelo caminho que houver
  const volta = pathBetween(m, s.place, LOVA_HOME);
  if (volta && volta.length) return toca(s, volta[0]);
  return loopAt({ ...s, place: LOVA_HOME }, LOVA_HOME, rnd);
}

/** Um evento muda o que ele QUER fazer; o clipe muda no próximo corte. */
export function dispatch(s: LovaPlayerState, ev: LovaPlayerEvent, instrument?: LovaInstrument | null): LovaPlayerState {
  const reacao = REACTION_CLIP[ev];
  switch (ev) {
    case "thinking":
      return { ...s, mood: "thinking" };
    case "working": {
      const forma = instrument ? INSTRUMENT_SHAPE[instrument] ?? null : null;
      if (forma && shapeAvailable(s.manifest, forma)) return { ...s, mood: "idle", work: forma };
      return { ...s, mood: "thinking", work: null };
    }
    case "needs_approval":
      return { ...s, mood: "needs_you" };
    case "approval_done":
      return { ...s, mood: "idle" };
    case "idle":
    case "speaking":
      return { ...s, mood: "idle", work: null };
    case "listening":
      return s;
    case "praised":
      return { ...s, reaction: hasClip(s.manifest, reacao) ? reacao as string : s.reaction };
    case "delivered":
    case "celebrating":
    case "error":
      return { ...s, mood: "idle", work: null, reaction: hasClip(s.manifest, reacao) ? reacao as string : null };
    default:
      return s;
  }
}

export function setScreen(s: LovaPlayerState, screen: LovaScreen): LovaPlayerState {
  return { ...s, screen };
}

/** O lugar de descanso do momento (para o pôster parado do `prefers-reduced-motion`). */
export function restingClip(s: LovaPlayerState): string {
  const alvo = targetPlace({ ...s, reaction: null });
  const loops = loopsAt(s.manifest, alvo);
  if (!loops.length) return loopsAt(s.manifest, LOVA_HOME)[0];
  return loops.includes("repouso") ? "repouso" : loops[0];
}
