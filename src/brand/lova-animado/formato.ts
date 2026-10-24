/**
 * Lova animado — qual arquivo pedir ao navegador.
 *
 * Vídeo com fundo transparente na web exige dois formatos:
 * - WebM VP9 com alfa → Chrome, Edge, Firefox, Android;
 * - HEVC com alfa (.mov, `hvc1`) → Safari e TODO navegador do iPhone/iPad (são WebKit por baixo).
 * O Chrome do Mac também toca HEVC, mas SEM o alfa (o fundo sai preto): por isso a escolha é pelo motor,
 * não pelo `canPlayType`.
 */

export type LovaClipSize = 256 | 640;
export type LovaClipKind = "webm" | "mov" | "png";

export interface NavigatorLike {
  userAgent: string;
  platform?: string;
  maxTouchPoints?: number;
}

/** WebKit da Apple (Safari no Mac, qualquer navegador no iOS/iPadOS) → HEVC com alfa. */
export function prefersHevcAlpha(nav: NavigatorLike | null | undefined): boolean {
  if (!nav || !nav.userAgent) return false;
  const ua = nav.userAgent;
  const ios = /iPad|iPhone|iPod/.test(ua) || (nav.platform === "MacIntel" && (nav.maxTouchPoints ?? 0) > 1);
  if (ios) return true;
  if (!/AppleWebKit/.test(ua) || !/Macintosh|Mac OS X/.test(ua)) return false;
  return !/Chrome|Chromium|CriOS|Edg|OPR|Firefox|FxiOS|Android/.test(ua);
}

export function videoKind(nav: NavigatorLike | null | undefined): Exclude<LovaClipKind, "png"> {
  return prefersHevcAlpha(nav) ? "mov" : "webm";
}

/** `<base>/<versão>/<tamanho>/<clipe>.<webm|mov|png>` — a versão no caminho permite cache imutável. */
export function clipUrl(base: string, version: string, size: LovaClipSize, name: string, kind: LovaClipKind): string {
  const b = base.replace(/\/+$/, "");
  return `${b}/${encodeURIComponent(version)}/${size}/${encodeURIComponent(name)}.${kind}`;
}

/** Tamanho do arquivo para o tamanho em tela (com folga para telas retina). */
export function sizeFor(px: number, dpr = 1): LovaClipSize {
  return px * Math.max(1, dpr) > 300 ? 640 : 256;
}
