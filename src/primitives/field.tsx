/**
 * Field — Field, FieldLabel, FieldHint, FieldError, Input, Textarea.
 *
 * O que é: a anatomia completa de um campo de formulário. `Field` empilha
 * rótulo, controle e dica/erro e propaga `aria-invalid`/`aria-describedby`
 * por contexto para o `Input`/`Textarea` (ou qualquer controle que leia
 * `useFieldContext`). `Input` e `Textarea` são a API do shadcn + `size`,
 * `variant` e `invalid`.
 * Quando usar: todo campo com rótulo. Controle solto (busca inline, filtro)
 * pode usar `Input` direto.
 *
 * Uso:
 *   <Field label={t("crm.email")} htmlFor="email" required requiredLabel={t("form.required")}
 *     hint={t("crm.emailHint")} error={errors.email}>
 *     <Input id="email" type="email" value={v} onChange={set} />
 *   </Field>
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

/* ------------------------------------------------------------------ contexto */

export interface FieldContextValue {
  invalid: boolean;
  id?: string;
  describedBy?: string;
}

const FieldContext = React.createContext<FieldContextValue>({ invalid: false });

/** Para controles próprios (select, combobox) herdarem `id`, `aria-invalid` e `aria-describedby`. */
export const useFieldContext = () => React.useContext(FieldContext);

/* --------------------------------------------------------------------- Field */

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  /** Texto de apoio; some enquanto houver `error`. */
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  /** `id` do controle — vai no `<label htmlFor>` e no contexto. */
  htmlFor?: string;
  /** Texto acessível do asterisco (ex.: "obrigatório"). */
  requiredLabel?: string;
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ label, hint, error, required, htmlFor, requiredLabel, className, children, ...props }, ref) => {
    const uid = React.useId();
    const hintId = `${uid}-hint`;
    const errorId = `${uid}-error`;
    const invalid = Boolean(error);
    const describedBy = error ? errorId : hint ? hintId : undefined;
    const ctx = React.useMemo<FieldContextValue>(
      () => ({ invalid, id: htmlFor, describedBy }),
      [invalid, htmlFor, describedBy]
    );

    return (
      <FieldContext.Provider value={ctx}>
        <div ref={ref} className={cn("space-y-1.5", className)} {...props}>
          {label && (
            <FieldLabel htmlFor={htmlFor} required={required} requiredLabel={requiredLabel}>
              {label}
            </FieldLabel>
          )}
          {children}
          {error ? (
            <FieldError id={errorId}>{error}</FieldError>
          ) : (
            hint && <FieldHint id={hintId}>{hint}</FieldHint>
          )}
        </div>
      </FieldContext.Provider>
    );
  }
);
Field.displayName = "Field";

/* ---------------------------------------------------------------- FieldLabel */

export interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  requiredLabel?: string;
}

const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ required, requiredLabel, className, children, ...props }, ref) => (
    <label ref={ref} className={cn("block text-xs font-medium text-foreground", className)} {...props}>
      {children}
      {required && (
        <>
          <span aria-hidden className="ml-0.5 text-destructive">
            *
          </span>
          {requiredLabel && <span className="sr-only">{requiredLabel}</span>}
        </>
      )}
    </label>
  )
);
FieldLabel.displayName = "FieldLabel";

/* ------------------------------------------------------- FieldHint / Error */

const FieldHint = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-caption text-muted-foreground", className)} {...props} />
  )
);
FieldHint.displayName = "FieldHint";

const FieldError = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} role="alert" className={cn("text-caption text-destructive", className)} {...props} />
  )
);
FieldError.displayName = "FieldError";

/* ------------------------------------------------------------- Input/Textarea */

const controlBase =
  "flex w-full rounded-xl border text-foreground ring-offset-background transition-colors duration-fast placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const controlVariants = {
  variant: {
    default: "border-input bg-background",
    ghost: "border-line-soft bg-transparent",
  },
  invalid: {
    true: "border-destructive focus-visible:ring-destructive",
    false: "",
  },
};

const inputVariants = cva(
  cn(
    controlBase,
    "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
  ),
  {
    variants: {
      ...controlVariants,
      size: {
        sm: "h-8 px-2.5 text-xs",
        md: "h-9 px-3 py-2 text-base md:text-sm",
        lg: "h-11 min-h-[44px] px-3.5 text-base",
      },
    },
    defaultVariants: { variant: "default", size: "md", invalid: false },
  }
);

const textareaVariants = cva(cn(controlBase, "min-h-[80px]"), {
  variants: {
    ...controlVariants,
    size: {
      sm: "px-2.5 py-1.5 text-xs",
      md: "px-3 py-2 text-base md:text-sm",
      lg: "px-3.5 py-2.5 text-base",
    },
  },
  defaultVariants: { variant: "default", size: "md", invalid: false },
});

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  /** O atributo nativo `size` (largura em caracteres), renomeado por conflito. */
  htmlSize?: number;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, invalid, htmlSize, id, type, ...props }, ref) => {
    const ctx = useFieldContext();
    const isInvalid = invalid ?? ctx.invalid;
    return (
      <input
        ref={ref}
        type={type}
        id={id ?? ctx.id}
        size={htmlSize}
        aria-invalid={isInvalid || undefined}
        aria-describedby={props["aria-describedby"] ?? ctx.describedBy}
        className={cn(inputVariants({ variant, size, invalid: isInvalid }), className)}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, invalid, id, ...props }, ref) => {
    const ctx = useFieldContext();
    const isInvalid = invalid ?? ctx.invalid;
    return (
      <textarea
        ref={ref}
        id={id ?? ctx.id}
        aria-invalid={isInvalid || undefined}
        aria-describedby={props["aria-describedby"] ?? ctx.describedBy}
        className={cn(textareaVariants({ variant, size, invalid: isInvalid }), className)}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Field, FieldLabel, FieldHint, FieldError, Input, Textarea, inputVariants, textareaVariants };
