/**
 * DsDocument — corpo da documentação do DS: sumário por grupo + todas as seções.
 * O host (rota /ds do app, HTML estático) põe o cabeçalho e o toggle de tema.
 */
import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { DS_SECTIONS } from "./sections";
import { GROUP_LABEL, type DocSectionDef } from "./shared";

export interface DsDocumentProps {
  /** Conteúdo acima do sumário (ex.: logo + toggle). */
  header?: ReactNode;
  /** Rodapé opcional. */
  footer?: ReactNode;
  className?: string;
  /** Subconjunto de seções (default: todas, na ordem canônica). */
  sections?: DocSectionDef[];
}

const GROUP_ORDER: DocSectionDef["group"][] = ["fundacoes", "componentes", "padroes", "marca", "governanca"];

export function DsDocument({ header, footer, className, sections = DS_SECTIONS }: DsDocumentProps) {
  return (
    <div className={cn("min-h-dvh bg-background text-foreground", className)}>
      {header}
      <div className="mx-auto flex w-full max-w-[1200px] gap-8 px-4 py-6 sm:px-6">
        <nav aria-label="Sumário" className="hidden w-52 shrink-0 lg:block">
          <div className="sticky top-6 space-y-4">
            {GROUP_ORDER.map((g) => (
              <div key={g}>
                <p className="mb-1 font-outfit text-micro font-semibold uppercase tracking-eyebrow text-muted-foreground">{GROUP_LABEL[g]}</p>
                <ul className="space-y-0.5">
                  {sections.filter((s) => s.group === g).map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="block rounded-md px-2 py-1 text-dense text-foreground/80 transition-colors duration-fast hover:bg-muted/60 hover:text-foreground">{s.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>
        <main className="min-w-0 flex-1 space-y-14">
          <div className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 lg:hidden">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="shrink-0 rounded-full border border-line bg-surface px-3 py-1.5 text-caption font-medium text-foreground/80">{s.title}</a>
            ))}
          </div>
          {sections.map(({ id, Component }) => (
            <Component key={id} />
          ))}
          {footer}
        </main>
      </div>
    </div>
  );
}
