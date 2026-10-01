/**
 * Peças de layout da documentação viva do DS (usadas pelas seções em ./sections).
 * Texto em português: é documentação interna (rota /ds do app + HTML gerado),
 * não interface de produto.
 */
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface DocSectionDef {
  id: string;
  group: "fundacoes" | "componentes" | "padroes" | "marca" | "governanca";
  title: string;
  Component: () => JSX.Element;
}

export const GROUP_LABEL: Record<DocSectionDef["group"], string> = {
  fundacoes: "Fundações",
  componentes: "Componentes",
  padroes: "Padrões",
  marca: "Marca",
  governanca: "Governança",
};

export function Section({ id, title, intro, children }: { id: string; title: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 space-y-5">
      <header className="space-y-1 border-b border-line-soft pb-3">
        <h2 className="font-outfit text-xl font-semibold tracking-tight text-foreground">{title}</h2>
        {intro ? <p className="max-w-layout-reading text-sm text-muted-foreground">{intro}</p> : null}
      </header>
      {children}
    </section>
  );
}

export function Demo({ title, note, children, className, dense }: { title: string; note?: ReactNode; children: ReactNode; className?: string; dense?: boolean }) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-outfit text-sm font-semibold text-foreground">{title}</h3>
        {note ? <span className="text-caption text-muted-foreground">{note}</span> : null}
      </div>
      <div className={cn("rounded-xl border border-line bg-surface", dense ? "p-3" : "p-4", className)}>{children}</div>
    </div>
  );
}

export function Row({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-wrap items-center gap-2", className)}>{children}</div>;
}

export function Grid({ children, cols = 3, className }: { children: ReactNode; cols?: 2 | 3 | 4; className?: string }) {
  const map = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" } as const;
  return <div className={cn("grid grid-cols-1 gap-3", map[cols], className)}>{children}</div>;
}

export function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-line-soft bg-muted/40 p-3 font-mono text-caption leading-relaxed text-foreground">
      <code>{children}</code>
    </pre>
  );
}

export function Rule({ children, kind = "do" }: { children: ReactNode; kind?: "do" | "dont" }) {
  return (
    <li className={cn("flex items-start gap-2 text-sm", kind === "dont" ? "text-foreground" : "text-foreground")}>
      <span
        className={cn(
          "mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full text-micro font-bold",
          kind === "do" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
        )}
        aria-hidden
      >
        {kind === "do" ? "✓" : "✕"}
      </span>
      <span>{children}</span>
    </li>
  );
}

export function Rules({ children }: { children: ReactNode }) {
  return <ul className="space-y-1.5">{children}</ul>;
}

export function Spec({ rows }: { rows: Array<[ReactNode, ReactNode]> }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-card">
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([k, v], i) => (
            <tr key={i} className="border-b border-line-soft last:border-0">
              <td className="w-44 px-3 py-2 align-top font-outfit text-caption font-semibold uppercase tracking-eyebrow text-muted-foreground">{k}</td>
              <td className="px-3 py-2 align-top text-foreground">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
