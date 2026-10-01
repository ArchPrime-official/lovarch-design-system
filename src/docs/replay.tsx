/** Utilitário da doc: remonta os filhos para repetir uma animação de entrada. */
import { useState, type ReactNode } from "react";
import { RotateCcw } from "lucide-react";

export function Replay({ children, label = "Repetir" }: { children: (key: number) => ReactNode; label?: string }) {
  const [k, setK] = useState(0);
  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setK((x) => x + 1)}
        className="inline-flex h-8 items-center gap-1.5 rounded-full border border-line bg-card px-3 text-xs font-semibold text-foreground transition-colors duration-fast hover:bg-muted/60 active:scale-[0.97]"
      >
        <RotateCcw className="size-3.5" />
        {label}
      </button>
      <div key={k}>{children(k)}</div>
    </div>
  );
}
