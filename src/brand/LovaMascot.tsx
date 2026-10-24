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

export type LovaState = "idle" | "listening" | "thinking" | "working" | "delivered" | "happy" | "shy" | "sad";

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
  if (state === "thinking" || state === "working") return ART.thinking;
  if (state === "listening") return ART.idle;
  return ART[state] ?? ART.idle;
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

export function LovaMascot({ state = "idle", height = 160, animated = false, label, priority = false, className }: LovaMascotProps) {
  const reduced = useReducedMotion();
  const art = lovaArt(state);
  const kind = animated && !reduced ? lovaMotion(art.key) : null;
  const width = Math.round(height * art.ratio);
  return (
    <span
      className={cn("relative inline-block shrink-0 select-none", className)}
      style={{ width, height }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      data-lova-state={state}
    >
      <motion.img
        key={art.key}
        src={art.body}
        alt=""
        draggable={false}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="pointer-events-none absolute inset-0 block size-full object-contain"
        style={{ transformOrigin: "50% 100%" }}
        {...(kind ? MOTION[kind] : {})}
      />
    </span>
  );
}

export interface LovaAvatarProps {
  state?: LovaState;
  /** Lado em px (24–36 nas respostas; o arquivo tem 128 px para telas 3x). */
  size?: number;
  label?: string;
  className?: string;
}

/** O rostinho do Lova: boina, rosto e a pinta de coração. Sem fundo, sem círculo. */
export function LovaAvatar({ state = "idle", size = 28, label, className }: LovaAvatarProps) {
  const art = lovaArt(state);
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
