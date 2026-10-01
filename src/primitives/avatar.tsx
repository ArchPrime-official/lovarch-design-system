/**
 * Avatar — foto de pessoa/estúdio com fallback de iniciais.
 *
 * O que é: círculo com a imagem (`object-cover`) ou, se não houver `src` ou a
 * imagem falhar ao carregar, as iniciais do nome em DM Sans.
 * Quando usar: membros do time, autor de um comentário, cliente no CRM, menu
 * de conta. Para logotipos de marca use `LovarchLogo`/imagem comum.
 *
 * Uso:
 *   <Avatar name={member.name} src={member.avatar_url} />
 *   <Avatar name="Maria Rossi" size="lg" tone="accent" />
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

/** Iniciais em maiúsculas: 1ª letra do primeiro e do último nome. Vazio → "?". */
export function initials(name: string): string {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = Array.from(parts[0])[0] ?? "";
  const last = parts.length > 1 ? Array.from(parts[parts.length - 1])[0] ?? "" : "";
  return (first + last).toUpperCase();
}

const avatarVariants = cva(
  "relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full font-dm-sans font-semibold",
  {
    variants: {
      size: {
        xs: "size-6 text-micro",
        sm: "size-7 text-micro",
        md: "size-9 text-xs",
        lg: "size-11 text-sm",
        xl: "size-14 text-base",
      },
      tone: {
        muted: "bg-muted text-muted-foreground",
        accent: "bg-accent/10 text-accent",
        solid: "bg-foreground text-background",
      },
    },
    defaultVariants: {
      size: "md",
      tone: "muted",
    },
  }
);

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    VariantProps<typeof avatarVariants> {
  /** URL da imagem. Se falhar, cai nas iniciais. */
  src?: string;
  /** Nome da pessoa: vira `aria-label` e a fonte das iniciais. */
  name: string;
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, tone, src, name, ...props }, ref) => {
    const [failed, setFailed] = React.useState(false);
    React.useEffect(() => setFailed(false), [src]);
    const showImage = Boolean(src) && !failed;

    return (
      <span
        ref={ref}
        role="img"
        aria-label={name}
        className={cn(avatarVariants({ size, tone }), className)}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="size-full object-cover"
          />
        ) : (
          <span aria-hidden>{initials(name)}</span>
        )}
      </span>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };
