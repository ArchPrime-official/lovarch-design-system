/**
 * DataTable — DataTable, Table, TableHeader, TableBody, TableRow, TableHead,
 * TableCell, TableEmpty.
 *
 * O que é: tabela de dados do DS V8. `DataTable` é o wrapper responsivo
 * (moldura + rolagem horizontal) que já renderiza a `<table>` com
 * `minWidth` — no mobile a tabela ROLA em vez de espremer as colunas (regra
 * do app: tabela rola ou vira card). `Table` e as partes também saem soltas
 * para quem precisa do próprio wrapper.
 * Quando usar: dados tabulares comparáveis (transações, leads, usos). Lista
 * de cards/thumbnails não é tabela.
 *
 * Uso:
 *   <DataTable minWidth={720} aria-label={t("finance.transactions")}>
 *     <TableHeader><TableRow><TableHead>{t("date")}</TableHead><TableHead numeric>{t("amount")}</TableHead></TableRow></TableHeader>
 *     <TableBody>{rows.length === 0 ? <TableEmpty colSpan={2}>{t("empty")}</TableEmpty> : rows.map(…)}</TableBody>
 *   </DataTable>
 */
import * as React from "react";
import { cn } from "../lib/cn";

/* -------------------------------------------------------------------- Table */

const Table = React.forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <table ref={ref} className={cn("w-full text-sm", className)} {...props} />
  )
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn(className)} {...props} />
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={cn(className)} {...props} />
);
TableBody.displayName = "TableBody";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b border-line-soft transition-colors last:border-0 hover:bg-surface-hover data-[state=selected]:bg-accent/5",
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Coluna numérica: alinha à direita, DM Sans, dígitos tabulares. */
  numeric?: boolean;
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ numeric = false, className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-9 whitespace-nowrap bg-muted/40 px-3 text-left align-middle font-outfit text-micro font-semibold uppercase tracking-eyebrow text-muted-foreground",
        numeric && "text-right font-dm-sans tabular-nums",
        className
      )}
      {...props}
    />
  )
);
TableHead.displayName = "TableHead";

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  numeric?: boolean;
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ numeric = false, className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn("px-3 py-2.5 align-middle", numeric && "text-right font-dm-sans tabular-nums", className)}
      {...props}
    />
  )
);
TableCell.displayName = "TableCell";

export interface TableEmptyProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Número de colunas da tabela, para a célula ocupar a linha inteira. */
  colSpan: number;
}

/** Linha única de "sem dados" — para vazio dentro de tabela já montada. Vazio de painel inteiro → `EmptyState`. */
const TableEmpty = React.forwardRef<HTMLTableRowElement, TableEmptyProps>(
  ({ colSpan, className, children, ...props }, ref) => (
    <tr ref={ref} className={cn(className)} {...props}>
      <td colSpan={colSpan} className="py-10 text-center text-sm text-muted-foreground">
        {children}
      </td>
    </tr>
  )
);
TableEmpty.displayName = "TableEmpty";

/* ---------------------------------------------------------------- DataTable */

export interface DataTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Largura mínima da `<table>` (px ou CSS). Abaixo dela o wrapper rola. */
  minWidth?: number | string;
  /** Classes do wrapper rolável (a `className` vai na `<table>`). */
  wrapperClassName?: string;
}

const DataTable = React.forwardRef<HTMLTableElement, DataTableProps>(
  ({ minWidth = 640, wrapperClassName, className, style, ...props }, ref) => (
    <div
      className={cn(
        "relative w-full overflow-x-auto rounded-xl border border-line bg-card [-webkit-overflow-scrolling:touch]",
        wrapperClassName
      )}
    >
      <Table
        ref={ref}
        className={className}
        style={{ minWidth: typeof minWidth === "number" ? `${minWidth}px` : minWidth, ...style }}
        {...props}
      />
    </div>
  )
);
DataTable.displayName = "DataTable";

export { DataTable, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableEmpty };
