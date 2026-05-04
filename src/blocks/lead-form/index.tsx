import * as React from "react";
import { motion } from "framer-motion";
import { fadeInUp, scaleOnTap } from "../../lib/motion";
import { cn } from "../../lib/cn";
import type { LeadFormBlock, LeadFormField } from "./schema";
import { useLeadFormContext } from "./context";

function FieldInput(
  { field, value, onChange, disabled }: {
    field: LeadFormField;
    value: string;
    onChange: (v: string) => void;
    disabled: boolean;
  },
) {
  const baseCls =
    "w-full px-4 py-3 rounded-xl border border-border/40 bg-background text-foreground text-sm md:text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50 min-h-[44px]";

  if (field.type === "textarea") {
    return (
      <textarea
        name={field.key}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        required={field.required}
        rows={field.rows ?? 4}
        disabled={disabled}
        className={cn(baseCls, "resize-y")}
        style={{ fontFamily: "'Outfit', sans-serif" }}
      />
    );
  }
  if (field.type === "select") {
    return (
      <select
        name={field.key}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={field.required}
        disabled={disabled}
        className={baseCls}
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <option value="" disabled>{field.placeholder ?? field.label}</option>
        {(field.options ?? []).map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    );
  }
  const htmlType = field.type === "email" ? "email" : field.type === "phone" ? "tel" : "text";
  return (
    <input
      name={field.key}
      type={htmlType}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      required={field.required}
      disabled={disabled}
      autoComplete={field.type === "email" ? "email" : field.type === "phone" ? "tel" : "off"}
      className={baseCls}
      style={{ fontFamily: "'Outfit', sans-serif" }}
    />
  );
}

export function LeadForm({ block }: { block: LeadFormBlock }) {
  const ctx = useLeadFormContext();
  const isCenter = block.align === "center";
  const isCard = block.variant === "card";

  const [values, setValues] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(block.fields.map((f) => [f.key, ""]))
  );
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    if (!ctx) {
      // Sem provider — provavelmente preview de admin. Nao tenta submeter.
      // eslint-disable-next-line no-console
      console.warn("[lead-form] no LeadFormProvider in tree — submit disabled (preview mode?)");
      setError("Anteprima: invio disabilitato.");
      return;
    }
    setSubmitting(true);
    try {
      const result = await ctx.submit({ fields: block.fields, data: values, block });
      if (!result.ok) {
        setError(result.error_message ?? "Errore durante l'invio. Riprova.");
        return;
      }
      ctx.onSuccess?.(result);
      if (block.redirect_url) {
        window.location.href = block.redirect_url;
        return;
      }
      setSuccess(block.success_message);
      setValues(Object.fromEntries(block.fields.map((f) => [f.key, ""])));
    } catch (err) {
      setError((err as Error).message ?? "Errore imprevisto.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id={block.anchor_id}
      className={cn("w-full py-12 md:py-20 px-5 md:px-8", isCenter && "text-center")}
    >
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className={cn(
          "max-w-xl mx-auto",
          isCard && "rounded-2xl border border-border/40 bg-card p-6 md:p-10 shadow-md",
        )}
      >
        {block.heading && (
          <h2
            className="text-2xl md:text-4xl font-bold leading-tight text-foreground"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {block.heading}
          </h2>
        )}
        {block.subheading && (
          <p className={cn("mt-3 text-sm md:text-base text-muted-foreground", !isCenter && "max-w-lg")}>
            {block.subheading}
          </p>
        )}

        {success ? (
          <div
            role="status"
            className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-700 dark:text-emerald-300"
          >
            {success}
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4 text-left" noValidate>
            {block.fields.map((field) => (
              <div key={field.key}>
                <label
                  htmlFor={field.key}
                  className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5"
                >
                  {field.label}{field.required && <span className="text-accent ml-0.5">*</span>}
                </label>
                <FieldInput
                  field={field}
                  value={values[field.key] ?? ""}
                  onChange={(v) => setValues((prev) => ({ ...prev, [field.key]: v }))}
                  disabled={submitting}
                />
              </div>
            ))}

            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-700 dark:text-red-300"
              >
                {error}
              </div>
            )}

            <div className={cn("pt-2", isCenter && "flex justify-center")}>
              <motion.button
                type="submit"
                {...scaleOnTap}
                disabled={submitting}
                className={cn(
                  "inline-flex items-center justify-center px-7 py-3 rounded-xl font-semibold text-sm md:text-base shadow-lg transition-shadow hover:shadow-xl min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed",
                  block.submit_variant === "primary"
                    ? "bg-accent text-accent-foreground"
                    : "bg-foreground text-background",
                )}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {submitting ? "…" : block.submit_label}
              </motion.button>
            </div>

            {block.consent_text && (
              <p className={cn("text-[11px] text-muted-foreground leading-relaxed", isCenter && "text-center")}>
                {block.consent_text}
              </p>
            )}
          </form>
        )}
      </motion.div>
    </section>
  );
}

export default LeadForm;
export { LeadFormSchema, type LeadFormBlock, type LeadFormField } from "./schema";
export { LeadFormProvider, useLeadFormContext, type LeadFormSubmitFn, type LeadFormSubmitInput, type LeadFormSubmitResult } from "./context";
