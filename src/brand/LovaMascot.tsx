/**
 * Lova — o mascote do agente da Lovarch (bíblia aprovada em 23/10/2026).
 *
 * Duas peças, a mesma fonte:
 *   • `LovaMascot` — o corpo inteiro (início do chat, cantinho com a barra oculta, canto do 3D).
 *   • `LovaAvatar` — o rostinho (boina + rosto + a pinta de coração), 24–36 px, ao lado das respostas.
 *
 * As imagens são as OFICIAIS (renders da Sandra), só com o fundo tirado localmente — nunca redesenhe,
 * nunca gere outra pose com IA, nunca corte a pinta de coração. Estados da seção 11.13 do plano:
 *   idle (repouso, branco) · listening (= repouso por enquanto) · thinking/working (translúcido com o símbolo)
 *   · delivered (aceso por inteiro) · happy (feliz) · shy (tímido, ao receber elogio) · sad (errou e mostra a saída).
 * «Bravo» e «sem paciência» não existem aqui: nunca são dirigidos à pessoa.
 *
 * Movimento (`animated`): respira devagar e pisca de vez em quando; ao virar `delivered` dá um pulinho.
 * Com `prefers-reduced-motion` fica parado. É decorativo por padrão; passe `label` para virar imagem com nome.
 *
 * Uso:
 *   <LovaMascot state="idle" height={160} animated />
 *   <LovaAvatar state="thinking" size={28} />
 */
import { motion, useReducedMotion } from "framer-motion";
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
import { cn } from "../lib/cn";

export type LovaState = "idle" | "listening" | "thinking" | "working" | "delivered" | "happy" | "shy" | "sad";

type Art = { body: string; face: string; ratio: number; blink: boolean };

/** Proporção largura/altura real de cada corpo (WebP de 600 px de altura, medidos com Pillow). */
const ART: Record<"idle" | "thinking" | "delivered" | "happy" | "shy" | "sad", Art> = {
  idle: { body: idleBody, face: idleFace, ratio: 460 / 600, blink: true },
  thinking: { body: thinkingBody, face: thinkingFace, ratio: 456 / 600, blink: false },
  delivered: { body: deliveredBody, face: deliveredFace, ratio: 460 / 600, blink: true },
  happy: { body: happyBody, face: happyFace, ratio: 573 / 600, blink: false },
  shy: { body: shyBody, face: shyFace, ratio: 397 / 600, blink: false },
  sad: { body: sadBody, face: sadFace, ratio: 462 / 600, blink: false },
};

/** O desenho de cada estado (listening e working usam a arte mais próxima até a animação da L7). */
export function lovaArt(state: LovaState = "idle"): Art {
  if (state === "thinking" || state === "working") return ART.thinking;
  if (state === "listening") return ART.idle;
  return ART[state] ?? ART.idle;
}

/** Os olhos no corpo de repouso/aceso, em % da imagem (medidos): o piscar é uma pálpebra da cor da pele. */
const EYES = [
  { left: 33.4, width: 6.6 },
  { left: 59.7, width: 6.6 },
];
const EYE_TOP = 34.0;
const EYE_HEIGHT = 10.6;

export interface LovaMascotProps {
  state?: LovaState;
  /** Altura em px (a largura segue a proporção real da arte). */
  height?: number;
  /** Respira e pisca; pulinho ao entregar. Parado com `prefers-reduced-motion`. */
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
  const move = animated && !reduced;
  const width = Math.round(height * art.ratio);
  return (
    <span
      className={cn("relative inline-block select-none", className)}
      style={{ width, height }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      data-lova-state={state}
    >
      <motion.span
        key={state}
        className="absolute inset-0 block"
        style={{ transformOrigin: "50% 100%" }}
        initial={move && state === "delivered" ? { y: 0 } : false}
        animate={move ? (state === "delivered" ? { y: [0, -height * 0.06, 0, -height * 0.025, 0] } : { scaleY: [1, 1.018, 1], scaleX: [1, 0.994, 1] }) : undefined}
        transition={move ? (state === "delivered" ? { duration: 0.7, ease: "easeOut" } : { duration: 4.2, ease: "easeInOut", repeat: Infinity }) : undefined}
      >
        <img
          src={art.body}
          alt=""
          draggable={false}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="pointer-events-none block size-full object-contain"
        />
        {move && art.blink && EYES.map((eye) => (
          <motion.span
            key={eye.left}
            aria-hidden
            className="absolute block rounded-full"
            style={{
              left: `${eye.left}%`, width: `${eye.width}%`, top: `${EYE_TOP}%`, height: `${EYE_HEIGHT}%`,
              transformOrigin: "50% 0%",
              background: "radial-gradient(closest-side, rgb(255 236 196), rgb(255 238 204) 80%, rgb(255 238 204 / 0))",
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: [0, 0, 1, 0] }}
            transition={{ duration: 5.2, times: [0, 0.95, 0.975, 1], repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </motion.span>
    </span>
  );
}

export interface LovaAvatarProps {
  state?: LovaState;
  /** Lado em px (24–36 nas respostas; o arquivo tem 112 px para telas 3x). */
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

/** URLs das artes (para e-mail, OG, plugins que não renderizam React). */
export const LOVA_ASSETS = {
  idle: { body: idleBody, face: idleFace },
  thinking: { body: thinkingBody, face: thinkingFace },
  delivered: { body: deliveredBody, face: deliveredFace },
  happy: { body: happyBody, face: happyFace },
  shy: { body: shyBody, face: shyFace },
  sad: { body: sadBody, face: sadFace },
} as const;
