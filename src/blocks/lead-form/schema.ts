import { z } from "zod";

// Tipos de campo suportados pelo block lead-form. Mapeiam para inputs HTML
// nativos com validacao client-side leve. A validacao real acontece no
// edge function cms-form-submit (Zod server-side), entao este schema mantem
// apenas as restricoes de UI/admin.
export const LeadFormFieldTypeEnum = z.enum([
  "text",
  "email",
  "phone",
  "textarea",
  "select",
]);

export const LeadFormFieldSchema = z.object({
  // Chave estavel salva em form_responses.{key} no campaign_attribution.
  // Lowercase + snake_case. Reservadas: full_name, primary_email,
  // primary_phone (mapeadas para colunas de leads pelo cms-form-submit).
  key: z.string().regex(/^[a-z0-9_]+$/).min(1).max(40),
  type: LeadFormFieldTypeEnum,
  label: z.string().min(1).max(80),
  placeholder: z.string().max(120).optional(),
  required: z.boolean().default(true),
  // Para type=select. Min 2, max 20 opcoes.
  options: z.array(z.object({
    value: z.string().min(1).max(80),
    label: z.string().min(1).max(80),
  })).max(20).optional(),
  // Para type=textarea: numero de linhas visiveis (default 4).
  rows: z.number().int().min(2).max(10).optional(),
});

export const LeadFormSchema = z.object({
  type: z.literal("lead-form"),
  // Cabecalho (opcional — pode ser omitido se acima ja houver Hero).
  heading: z.string().max(140).optional(),
  subheading: z.string().max(280).optional(),
  // Lista de campos. Min 1, max 12. Default carrega name + email.
  fields: z.array(LeadFormFieldSchema).min(1).max(12),
  // Texto e estilo do botao de submit.
  submit_label: z.string().min(1).max(60).default("Invia"),
  submit_variant: z.enum(["primary", "secondary"]).default("primary"),
  // Mensagem mostrada apos submit bem-sucedido (sobrescrita por
  // cms_pages.form_config.thank_you_message se preenchido).
  success_message: z.string().min(1).max(600).default(
    "Grazie! Ti contatteremo a breve.",
  ),
  // URL para redirecionar apos submit (opcional). Se preenchido, success_message
  // nao e mostrado (browser navega imediatamente).
  redirect_url: z.string().url().optional(),
  // Texto de consenso/privacy (LGPD/GDPR). Renderizado abaixo do botao.
  consent_text: z.string().max(600).optional(),
  // Variante visual.
  variant: z.enum(["card", "inline"]).default("card"),
  align: z.enum(["left", "center"]).default("center"),
  // Anchor para deep-link (#contatti, #form, etc.)
  anchor_id: z.string().regex(/^[a-z0-9-]+$/).max(40).optional(),
});

export type LeadFormBlock = z.infer<typeof LeadFormSchema>;
export type LeadFormField = z.infer<typeof LeadFormFieldSchema>;
