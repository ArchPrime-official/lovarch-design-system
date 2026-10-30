/**
 * Lova — o mascote do agente da Lovarch (bíblia aprovada em 23/10/2026; telas do Claude Design de 24/10/2026).
 *
 * Duas peças, a mesma fonte:
 *   • `LovaMascot` — o corpo inteiro (início do chat, cantinho com a barra oculta, canto do 3D).
 *   • `LovaAvatar` — o rostinho (boina + rosto + a pinta de coração), 24–36 px, ao lado das respostas.
 *
 * As imagens são as OFICIAIS (renders da Sandra) recortadas com alfa — nunca redesenhe, nunca gere outra pose com IA,
 * nunca corte a pinta de coração, nunca estique (só escala UNIFORME, até 1,015). Estados da seção 11.13 do plano:
 *   idle (repouso, branco) · listening (= repouso até a pose chegar) · thinking/working (translúcido com o símbolo)
 *   · delivered (aceso por inteiro) · happy (feliz) · shy (tímido, ao receber elogio) · sad (errou e mostra a saída).
 * «Bravo» e «sem paciência» não existem aqui: nunca são dirigidos à pessoa. `LOVA_ASSETS.light` é a luz da
 * transição (o hexágono de luz): quem estica é a luz, nunca o Lova.
 *
 * Movimento (`animated`), os mesmos keyframes do Claude Design: repouso respira (4,8 s: sobe 1,5 px e cresce 1,5%,
 * uniforme); trabalhando pulsa a luz (2,4 s); `happy` dá um pulinho uma vez (1,4 s). Com `prefers-reduced-motion`
 * fica parado. Piscar, olhar de lado e acenar entram quando as poses novas chegarem (não se simula com máscara).
 *
 * Uso:
 *   <LovaMascot state="idle" height={150} animated />
 *   <LovaAvatar state="thinking" size={28} />
 */
import { createContext, useContext, type ReactNode } from "react";
import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import idleBody from "./assets/lova/lova-idle.webp";
import idleFace from "./assets/lova/lova-idle-face.webp";
import thinkingBody from "./assets/lova/lova-thinking.webp";
import thinkingFace from "./assets/lova/lova-thinking-face.webp";
import deliveredBody from "./assets/lova/lova-delivered.webp";
import deliveredFace from "./assets/lova/lova-delivered-face.webp";
import happyBody from "./assets/lova/lova-happy.webp";
import happyFace from "./assets/lova/lova-happy-face.webp";
import shyBody from "./assets/lova/lova-shy.webp";
import shyFace from "./assets/lova/lova-shy-face.webp";
import sadBody from "./assets/lova/lova-sad.webp";
import sadFace from "./assets/lova/lova-sad-face.webp";
import lightArt from "./assets/lova/lova-light.webp";
import { cn } from "../lib/cn";

/**
 * O estado do Lova (o mesmo vocabulário em todas as telas; quem decide é a tela/servidor):
 *   idle · listening · thinking · working · speaking · delivered · praised · error · needs_approval
 * e as expressões diretas happy · shy · sad (aliases das artes). Sem pose própria ainda, cada estado usa a arte
 * oficial mais próxima (`lovaArt`) — a versão animada (clipes com alfa) entra pelo `renderer` sem mudar quem usa.
 */
export type LovaState =
  | "idle" | "listening" | "thinking" | "working" | "speaking" | "delivered" | "praised" | "error" | "needs_approval"
  | "happy" | "shy" | "sad";

/** A forma do Lova por tela (ele vira o instrumento da tarefa). Estático hoje: todas desenham o Lova. */
export type LovaForm = "lova" | "compass" | "scale_ruler" | "house" | "helmet";

/** O que um renderizador (estático hoje, animado depois) recebe. */
export interface LovaRenderProps {
  state: LovaState;
  form: LovaForm;
  /** "body" = corpo inteiro (altura em px) · "face" = rostinho (lado em px) */
  variant: "body" | "face";
  size: number;
  animated: boolean;
  priority: boolean;
}
export type LovaRenderer = (props: LovaRenderProps) => ReactNode;

/** Troca o desenho do Lova para uma árvore inteira (ex.: o player animado), sem tocar em quem usa. */
export const LovaRendererContext = createContext<LovaRenderer | null>(null);

type ArtKey = "idle" | "thinking" | "delivered" | "happy" | "shy" | "sad";
type Art = { key: ArtKey; body: string; face: string; ratio: number };

/** Proporção largura/altura real de cada corpo (WebP de 600 px de altura, medidos com Pillow). */
const ART: Record<ArtKey, Art> = {
  idle: { key: "idle", body: idleBody, face: idleFace, ratio: 461 / 600 },
  thinking: { key: "thinking", body: thinkingBody, face: thinkingFace, ratio: 457 / 600 },
  delivered: { key: "delivered", body: deliveredBody, face: deliveredFace, ratio: 461 / 600 },
  happy: { key: "happy", body: happyBody, face: happyFace, ratio: 572 / 600 },
  shy: { key: "shy", body: shyBody, face: shyFace, ratio: 403 / 600 },
  sad: { key: "sad", body: sadBody, face: sadFace, ratio: 463 / 600 },
};

/** O desenho de cada estado (listening e working usam a arte mais próxima até as poses novas). */
export function lovaArt(state: LovaState = "idle"): Art {
  switch (state) {
    case "thinking": case "working": return ART.thinking;
    case "speaking": case "delivered": return ART.delivered;
    case "praised": case "shy": return ART.shy;
    case "error": case "sad": return ART.sad;
    case "happy": return ART.happy;
    default: return ART.idle; // idle · listening · needs_approval (até as poses novas)
  }
}

/** O movimento de cada arte: respirar (repouso), pulsar a luz (trabalhando), pulinho (feliz) ou nada. */
export function lovaMotion(art: ArtKey): "breathe" | "work" | "hop" | null {
  if (art === "idle" || art === "delivered") return "breathe";
  if (art === "thinking") return "work";
  if (art === "happy") return "hop";
  return null;
}

const MOTION: Record<"breathe" | "work" | "hop", Pick<MotionProps, "animate" | "transition">> = {
  breathe: { animate: { y: [0, -1.5, 0], scale: [1, 1.015, 1] }, transition: { duration: 4.8, ease: "easeInOut", repeat: Infinity } },
  work: { animate: { opacity: [1, 0.8, 1] }, transition: { duration: 2.4, ease: "easeInOut", repeat: Infinity } },
  hop: { animate: { y: [0, -12, 0, -4, 0, 0] }, transition: { duration: 1.4, ease: "easeOut", times: [0, 0.2, 0.4, 0.5, 0.62, 1] } },
};

export interface LovaMascotProps {
  state?: LovaState;
  /** A forma por tela (estático hoje: sempre o Lova). */
  form?: LovaForm;
  /** Desenha com outro renderizador (precede o `LovaRendererContext`). */
  renderer?: LovaRenderer;
  /** Altura em px (a largura segue a proporção real da arte). */
  height?: number;
  /** Respira / pulsa / pulinho. Parado com `prefers-reduced-motion`. */
  animated?: boolean;
  /** Nome acessível. Sem ele a imagem é decorativa. */
  label?: string;
  /** Carrega na hora (acima da dobra). */
  priority?: boolean;
  className?: string;
}

export function LovaMascot({ state = "idle", form = "lova", renderer, height = 160, animated = false, label, priority = false, className }: LovaMascotProps) {
  const reduced = useReducedMotion();
  const ctxRenderer = useContext(LovaRendererContext);
  const custom = renderer ?? ctxRenderer;
  const art = lovaArt(state);
  const kind = animated && !reduced ? lovaMotion(art.key) : null;
  // com o renderizador (o Lova animado, quadro quadrado) a caixa não muda com o estado: a largura de cada arte parada
  // (feliz é mais larga que o repouso) fazia o Lova pular de lado a cada reação
  const width = Math.round(height * (custom ? ART.idle.ratio : art.ratio));
  return (
    <span
      className={cn("relative inline-block shrink-0 select-none", className)}
      style={{ width, height }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      data-lova-state={state}
      data-lova-form={form}
    >
      {custom ? custom({ state, form, variant: "body", size: height, animated: animated && !reduced, priority }) : <motion.img
        key={art.key}
        src={art.body}
        alt=""
        draggable={false}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="pointer-events-none absolute inset-0 block size-full object-contain"
        style={{ transformOrigin: "50% 100%" }}
        {...(kind ? MOTION[kind] : {})}
      />}
    </span>
  );
}

export interface LovaAvatarProps {
  state?: LovaState;
  form?: LovaForm;
  renderer?: LovaRenderer;
  /** Lado em px (24–36 nas respostas; o arquivo tem 128 px para telas 3x). */
  size?: number;
  label?: string;
  className?: string;
}

/** O rostinho do Lova: boina, rosto e a pinta de coração. Sem fundo, sem círculo. */
export function LovaAvatar({ state = "idle", form = "lova", renderer, size = 28, label, className }: LovaAvatarProps) {
  const art = lovaArt(state);
  const ctxRenderer = useContext(LovaRendererContext);
  const custom = renderer ?? ctxRenderer;
  if (custom) {
    return (
      <span className={cn("inline-block shrink-0", className)} style={{ width: size, height: size }} role={label ? "img" : undefined}
        aria-label={label} aria-hidden={label ? undefined : true} data-lova-state={state} data-lova-form={form}>
        {custom({ state, form, variant: "face", size, animated: false, priority: false })}
      </span>
    );
  }
  return (
    <img
      src={art.face}
      alt={label ?? ""}
      aria-hidden={label ? undefined : true}
      width={size}
      height={size}
      draggable={false}
      decoding="async"
      data-lova-state={state}
      data-lova-form={form}
      className={cn("pointer-events-none inline-block shrink-0 select-none object-contain", className)}
      style={{ width: size, height: size }}
    />
  );
}

/** URLs das artes (para e-mail, OG, plugins que não renderizam React) e a luz da transição. */
export const LOVA_ASSETS = {
  idle: { body: idleBody, face: idleFace },
  thinking: { body: thinkingBody, face: thinkingFace },
  delivered: { body: deliveredBody, face: deliveredFace },
  happy: { body: happyBody, face: happyFace },
  shy: { body: shyBody, face: shyFace },
  sad: { body: sadBody, face: sadFace },
  light: lightArt,
} as const;
