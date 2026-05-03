/**
 * EnterpriseModal — B2B contact form modal with role + team_size + needs.
 *
 * Submits via consumer-provided onSubmit (consumer wires Supabase / API / etc).
 * Shows success state for 4s after submit completes.
 *
 * Uses Radix Dialog + Radix Select (peerDeps).
 *
 * Usage:
 *   <EnterpriseModal
 *     open={open}
 *     onOpenChange={setOpen}
 *     texts={{ ... }}
 *     roleOptions={[ { value: 'architect', label: 'Architetto' }, ... ]}
 *     teamSizeOptions={[ { value: '1-3', label: '1-3 persone' }, ... ]}
 *     onSubmit={async (data) => {
 *       const { error } = await supabase.functions.invoke('enterprise-lead', { body: data });
 *       if (error) throw error;
 *     }}
 *   />
 */
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import { Building2, Loader2, CheckCircle, ChevronDown, Check } from "lucide-react";
import { cn } from "../lib/cn";

export interface EnterpriseModalTexts {
  modalTitle: string;
  modalDesc: string;
  name: string;
  namePlaceholder?: string;
  email: string;
  emailPlaceholder?: string;
  phone: string;
  phonePlaceholder?: string;
  company: string;
  companyPlaceholder?: string;
  role: string;
  rolePlaceholder?: string;
  teamSize: string;
  teamSizePlaceholder?: string;
  needs: string;
  needsPlaceholder?: string;
  people?: string;
  submit: string;
  submitting?: string;
  errorRequired?: string;
  errorInvalidEmail?: string;
  errorSubmit?: string;
  successTitle?: string;
  successDesc?: string;
}

export interface EnterpriseModalOption {
  value: string;
  label: string;
}

export interface EnterpriseFormData {
  name: string;
  email: string;
  phone: string;
  company_name: string;
  role: string;
  team_size: string;
  main_needs: string;
}

export interface EnterpriseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  texts: EnterpriseModalTexts;
  roleOptions: EnterpriseModalOption[];
  teamSizeOptions: EnterpriseModalOption[];
  onSubmit: (data: EnterpriseFormData) => Promise<void>;
  /** Called on validation/submit error (toast wiring is consumer's responsibility). */
  onError?: (message: string) => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EnterpriseModal({
  open,
  onOpenChange,
  texts,
  roleOptions,
  teamSizeOptions,
  onSubmit,
  onError,
}: EnterpriseModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState<EnterpriseFormData>({
    name: "",
    email: "",
    phone: "",
    company_name: "",
    role: "",
    team_size: "",
    main_needs: "",
  });

  const update = (key: keyof EnterpriseFormData, value: string) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !data.name ||
      !data.email ||
      !data.phone ||
      !data.company_name ||
      !data.role ||
      !data.team_size ||
      !data.main_needs
    ) {
      onError?.(texts.errorRequired ?? "All fields required");
      return;
    }
    if (!EMAIL_REGEX.test(data.email)) {
      onError?.(texts.errorInvalidEmail ?? "Invalid email");
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit(data);
      setSuccess(true);
      setTimeout(() => {
        setData({
          name: "",
          email: "",
          phone: "",
          company_name: "",
          role: "",
          team_size: "",
          main_needs: "",
        });
        setSuccess(false);
        onOpenChange(false);
      }, 4000);
    } catch (err: any) {
      onError?.(texts.errorSubmit ?? err?.message ?? "Submit failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = (next: boolean) => {
    if (!submitting) {
      onOpenChange(next);
      if (!next) setSuccess(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] sm:max-w-md -translate-x-1/2 -translate-y-1/2",
            "bg-white text-black rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto"
          )}
        >
          {success ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <Dialog.Title className="text-xl font-semibold text-gray-900 mb-2">
                {texts.successTitle ?? "Thanks!"}
              </Dialog.Title>
              <Dialog.Description className="text-gray-600">
                {texts.successDesc ?? "We'll be in touch soon."}
              </Dialog.Description>
            </div>
          ) : (
            <>
              <Dialog.Title className="flex items-center gap-2 text-lg font-semibold">
                <Building2 className="w-5 h-5 text-black" />
                {texts.modalTitle}
              </Dialog.Title>
              <Dialog.Description className="text-sm text-gray-600 mt-1">
                {texts.modalDesc}
              </Dialog.Description>

              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-3">
                  <FormField label={texts.name} required>
                    <input
                      type="text"
                      value={data.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder={texts.namePlaceholder}
                      required
                      className="w-full h-9 px-3 rounded-md border border-black/15 text-sm focus:outline-none focus:ring-2 focus:ring-black/40"
                    />
                  </FormField>
                  <FormField label={texts.email} required>
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder={texts.emailPlaceholder}
                      required
                      className="w-full h-9 px-3 rounded-md border border-black/15 text-sm focus:outline-none focus:ring-2 focus:ring-black/40"
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <FormField label={texts.phone} required>
                    <input
                      type="tel"
                      value={data.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder={texts.phonePlaceholder}
                      required
                      className="w-full h-9 px-3 rounded-md border border-black/15 text-sm focus:outline-none focus:ring-2 focus:ring-black/40"
                    />
                  </FormField>
                  <FormField label={texts.company} required>
                    <input
                      type="text"
                      value={data.company_name}
                      onChange={(e) => update("company_name", e.target.value)}
                      placeholder={texts.companyPlaceholder}
                      required
                      className="w-full h-9 px-3 rounded-md border border-black/15 text-sm focus:outline-none focus:ring-2 focus:ring-black/40"
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <FormField label={texts.role} required>
                    <NativeSelect
                      value={data.role}
                      onChange={(v) => update("role", v)}
                      placeholder={texts.rolePlaceholder ?? ""}
                      options={roleOptions}
                    />
                  </FormField>
                  <FormField label={texts.teamSize} required>
                    <NativeSelect
                      value={data.team_size}
                      onChange={(v) => update("team_size", v)}
                      placeholder={texts.teamSizePlaceholder ?? ""}
                      options={teamSizeOptions.map((o) => ({
                        ...o,
                        label: texts.people ? `${o.label} ${texts.people}` : o.label,
                      }))}
                    />
                  </FormField>
                </div>

                <FormField label={texts.needs} required>
                  <textarea
                    value={data.main_needs}
                    onChange={(e) => update("main_needs", e.target.value)}
                    placeholder={texts.needsPlaceholder}
                    rows={3}
                    required
                    className="w-full px-3 py-2 rounded-md border border-black/15 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black/40"
                  />
                </FormField>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center h-10 px-4 rounded-md bg-black text-white text-sm font-medium hover:bg-black/90 transition-colors disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {texts.submitting ?? texts.submit}
                    </>
                  ) : (
                    texts.submit
                  )}
                </button>
              </form>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium">
        {label} {required && "*"}
      </label>
      {children}
    </div>
  );
}

function NativeSelect({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: EnterpriseModalOption[];
}) {
  return (
    <Select.Root value={value || undefined} onValueChange={onChange}>
      <Select.Trigger
        className="w-full h-9 px-3 rounded-md border border-black/15 text-sm flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-black/40 bg-white"
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDown className="w-4 h-4" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="z-[60] overflow-hidden bg-white rounded-md border border-black/15 shadow-lg">
          <Select.Viewport className="p-1">
            {options.map((opt) => (
              <Select.Item
                key={opt.value}
                value={opt.value}
                className="relative flex items-center px-8 py-2 text-sm rounded-sm cursor-pointer hover:bg-black/5 focus:bg-black/5 focus:outline-none data-[state=checked]:font-medium"
              >
                <Select.ItemText>{opt.label}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <Check className="w-4 h-4" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
