import * as React from "react";
import type { LeadFormBlock, LeadFormField } from "./schema";

// Context que permite ao parent (PrimeTeam CmsPageRenderer ou Lovarch
// equivalente) injetar o submit handler real. Mantem o block agnostico
// de fetch/URL — o DS nao deve saber de Supabase URL ou page_id.

export interface LeadFormSubmitInput {
  fields: LeadFormField[];
  data: Record<string, string>;
  block: LeadFormBlock;
}

export interface LeadFormSubmitResult {
  ok: boolean;
  // Quando ok=true e o block tem redirect_url, o parent pode redirecionar.
  // Quando ok=false, o componente mostra error_message (ou fallback generico).
  error_message?: string;
  // Echo de event_id para deduplicacao com pixel browser fbq('track', 'Lead', {}, {eventID}).
  event_id?: string;
}

export type LeadFormSubmitFn = (input: LeadFormSubmitInput) => Promise<LeadFormSubmitResult>;

interface LeadFormContextValue {
  submit: LeadFormSubmitFn;
  // Disparado apos submit bem-sucedido — usado para fbq('track','Lead',...) no parent.
  onSuccess?: (result: LeadFormSubmitResult) => void;
}

const LeadFormContext = React.createContext<LeadFormContextValue | null>(null);

export function LeadFormProvider(
  { value, children }: { value: LeadFormContextValue; children: React.ReactNode },
) {
  return React.createElement(LeadFormContext.Provider, { value }, children);
}

export function useLeadFormContext(): LeadFormContextValue | null {
  return React.useContext(LeadFormContext);
}
