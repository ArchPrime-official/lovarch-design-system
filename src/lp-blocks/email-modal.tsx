/**
 * EmailModal — lead capture modal with email + name + phone fields.
 *
 * Headless validation: regex email + simple phone min-length. Consumer can override
 * onValidate to plug in libphonenumber or similar.
 *
 * Uses Radix Dialog (peerDep). Provide all texts via props.
 *
 * Usage:
 *   <EmailModal
 *     open={open}
 *     onOpenChange={setOpen}
 *     texts={{
 *       title: "Quasi pronto",
 *       subtitle: "Inserisci email e telefono per continuare",
 *       email: "Email", emailPlaceholder: "tu@esempio.it",
 *       name: "Nome", namePlaceholder: "Giulia",
 *       phone: "Telefono", phonePlaceholder: "+39 333 123 4567",
 *       cancel: "Annulla", submit: "Continua",
 *     }}
 *     onSubmit={async ({ email, name, phone }) => { ... }}
 *   />
 */
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/cn";

export interface EmailModalTexts {
  title: string;
  subtitle?: string;
  email: string;
  emailPlaceholder?: string;
  name: string;
  namePlaceholder?: string;
  phone: string;
  phonePlaceholder?: string;
  cancel: string;
  submit: string;
  submitting?: string;
  emailRequired?: string;
  invalidEmail?: string;
  phoneRequired?: string;
  invalidPhone?: string;
}

export interface EmailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  texts: EmailModalTexts;
  initialEmail?: string;
  initialName?: string;
  initialPhone?: string;
  onSubmit: (data: { email: string; name: string; phone: string }) => Promise<void> | void;
  /** Override default validation. Return error message string or null if valid. */
  onValidate?: (data: { email: string; name: string; phone: string }) => string | null;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailModal({
  open,
  onOpenChange,
  texts,
  initialEmail = "",
  initialName = "",
  initialPhone = "",
  onSubmit,
  onValidate,
}: EmailModalProps) {
  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): string | null => {
    if (onValidate) return onValidate({ email, name, phone });
    if (!email) return texts.emailRequired ?? "Email is required";
    if (!EMAIL_REGEX.test(email)) return texts.invalidEmail ?? "Invalid email";
    if (!phone) return texts.phoneRequired ?? "Phone is required";
    if (phone.replace(/\D/g, "").length < 8) return texts.invalidPhone ?? "Invalid phone";
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({ email, name, phone });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50" />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] sm:max-w-md -translate-x-1/2 -translate-y-1/2",
            "bg-white text-black rounded-2xl shadow-xl p-6",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          )}
        >
          <Dialog.Title className="text-lg font-semibold">{texts.title}</Dialog.Title>
          {texts.subtitle && (
            <Dialog.Description className="text-sm text-black/60 mt-1">
              {texts.subtitle}
            </Dialog.Description>
          )}

          <div className="space-y-4 py-4">
            <div className="space-y-1.5">
              <label htmlFor="lp-email" className="block text-sm font-medium">
                {texts.email} *
              </label>
              <input
                id="lp-email"
                type="email"
                placeholder={texts.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-black/15 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/40"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="lp-name" className="block text-sm font-medium">
                {texts.name}
              </label>
              <input
                id="lp-name"
                type="text"
                placeholder={texts.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-black/15 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/40"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="lp-phone" className="block text-sm font-medium">
                {texts.phone} *
              </label>
              <input
                id="lp-phone"
                type="tel"
                placeholder={texts.phonePlaceholder}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-black/15 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/40"
                required
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={submitting}
              className="inline-flex items-center justify-center h-10 px-4 rounded-md border border-black/15 bg-white text-sm font-medium hover:bg-black/5 transition-colors disabled:opacity-50"
            >
              {texts.cancel}
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex items-center justify-center h-10 px-4 rounded-md bg-black text-white text-sm font-medium hover:bg-black/90 transition-colors disabled:opacity-50"
            >
              {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {submitting ? (texts.submitting ?? texts.submit) : texts.submit}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
