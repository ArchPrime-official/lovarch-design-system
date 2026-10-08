/**
 * Modal — Modal (Radix Dialog), ModalFrame (visual puro) e as partes
 * ModalHeader / ModalTitle / ModalDescription / ModalBody / ModalFooter.
 *
 * O que é: o diálogo do DS V8. No mobile é bottom sheet (encosta embaixo,
 * respeita safe-area, rola por dentro); de `sm:` para cima é centrado.
 * SEMPRE via Portal em `document.body` — dentro de painel da new-home um modal
 * sem portal morre no stacking context e a prompt bar rouba os cliques.
 * Quando usar: confirmação, formulário curto, detalhe. Fluxo guiado/quiz vai
 * na zona AbovePrompt, não em modal. `ModalFrame` é só o visual (sem Radix,
 * sem portal, sem `fixed`) para docs estáticos e previews.
 *
 * Uso:
 *   <Modal open={open} onOpenChange={setOpen} title={t("crm.delete.title")}
 *     description={t("crm.delete.body")} closeLabel={t("common.close")}
 *     footer={<><Button variant="ghost" onClick={close}>{t("common.cancel")}</Button>
 *              <Button variant="destructive" onClick={confirm}>{t("common.delete")}</Button></>}>
 *     {children}
 *   </Modal>
 */
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "../lib/cn";

/* ------------------------------------------------------------------ classes */

const modalSurfaceVariants = cva(
  "relative flex w-full max-h-[90dvh] flex-col gap-4 overflow-y-auto rounded-t-2xl border-t border-line bg-card p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-xl sm:max-h-[85dvh] sm:rounded-2xl sm:border",
  {
    variants: {
      size: {
        sm: "sm:max-w-sm",
        md: "sm:max-w-lg",
        lg: "sm:max-w-2xl",
        xl: "sm:max-w-4xl",
        full: "sm:max-w-[calc(100vw-48px)]",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export type ModalSize = NonNullable<VariantProps<typeof modalSurfaceVariants>["size"]>;

const modalPositionClasses =
  "fixed inset-x-0 bottom-0 z-modal duration-base data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:slide-in-from-bottom-8 data-[state=closed]:slide-out-to-bottom-8 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:data-[state=open]:zoom-in-95 sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:slide-in-from-left-1/2 sm:data-[state=open]:slide-in-from-top-[48%] sm:data-[state=closed]:slide-out-to-left-1/2 sm:data-[state=closed]:slide-out-to-top-[48%]";

const overlayClasses =
  "fixed inset-0 z-modal bg-backdrop backdrop-blur-sm duration-base data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0";

const closeButtonClasses =
  "absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full text-muted-foreground ring-offset-background transition-colors duration-fast hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none";

const titleClasses = "font-outfit text-lg font-semibold leading-tight text-foreground";
const descriptionClasses = "text-sm text-muted-foreground";

/* ------------------------------------------------------------------- partes */

const ModalHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1 pr-8", className)} {...props} />
  )
);
ModalHeader.displayName = "ModalHeader";

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn(titleClasses, className)} {...props} />
));
ModalTitle.displayName = "ModalTitle";

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn(descriptionClasses, className)} {...props} />
));
ModalDescription.displayName = "ModalDescription";

const ModalBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  // O corpo é quem ROLA: sem overflow próprio ele encolhia (min-h-0) e o conteúdo longo vazava
  // por baixo do rodapé — as últimas linhas ficavam inalcançáveis (lista de 13 vistas, 08/10/2026).
  // `-mx-1 px-1` devolve o espaço do anel de foco que o overflow cortaria nas bordas.
  ({ className, ...props }, ref) => <div ref={ref} className={cn("-mx-1 min-h-0 flex-1 overflow-y-auto px-1", className)} {...props} />
);
ModalBody.displayName = "ModalBody";

/** Mobile: botões empilhados e full-width (o principal por último no JSX fica em cima). */
const ModalFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end [&>*]:w-full sm:[&>*]:w-auto", className)}
      {...props}
    />
  )
);
ModalFooter.displayName = "ModalFooter";

/* -------------------------------------------------------------------- Modal */

export interface ModalProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Sem `title`, inclua um `<ModalTitle>` nos children (Radix exige para a11y). */
  title?: React.ReactNode;
  description?: React.ReactNode;
  size?: ModalSize;
  footer?: React.ReactNode;
  hideClose?: boolean;
  /** aria-label do X. Obrigatório — o DS não tem texto fixo. */
  closeLabel: string;
  /** Elemento que abre o modal (`DialogTrigger asChild`). */
  trigger?: React.ReactNode;
  /** Classes extras no content (ex.: `sm:max-w-xl`). */
  className?: string;
  children?: React.ReactNode;
}

const Modal = ({
  open,
  defaultOpen,
  onOpenChange,
  title,
  description,
  size,
  footer,
  hideClose = false,
  closeLabel,
  trigger,
  className,
  children,
}: ModalProps) => (
  <DialogPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
    {trigger && <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>}
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={overlayClasses} />
      <DialogPrimitive.Content
        className={cn(modalSurfaceVariants({ size }), modalPositionClasses, className)}
        {...(description ? {} : { "aria-describedby": undefined })}
      >
        {(title || description) && (
          <ModalHeader>
            {title && <ModalTitle>{title}</ModalTitle>}
            {description && <ModalDescription>{description}</ModalDescription>}
          </ModalHeader>
        )}
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
        {!hideClose && (
          <DialogPrimitive.Close aria-label={closeLabel} className={closeButtonClasses}>
            <X className="size-4" />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
);
Modal.displayName = "Modal";

/* --------------------------------------------------------------- ModalFrame */

export interface ModalFrameProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  size?: ModalSize;
  footer?: React.ReactNode;
  /** Se vier, renderiza o X (chama `onClose`). */
  closeLabel?: string;
  onClose?: () => void;
}

const ModalFrame = React.forwardRef<HTMLDivElement, ModalFrameProps>(
  ({ title, description, size, footer, closeLabel, onClose, className, children, ...props }, ref) => (
    <div ref={ref} className={cn(modalSurfaceVariants({ size }), className)} {...props}>
      {(title || description) && (
        <ModalHeader>
          {title && <h2 className={titleClasses}>{title}</h2>}
          {description && <p className={descriptionClasses}>{description}</p>}
        </ModalHeader>
      )}
      <ModalBody>{children}</ModalBody>
      {footer && <ModalFooter>{footer}</ModalFooter>}
      {closeLabel && (
        <button type="button" aria-label={closeLabel} onClick={onClose} className={closeButtonClasses}>
          <X className="size-4" />
        </button>
      )}
    </div>
  )
);
ModalFrame.displayName = "ModalFrame";

export {
  Modal,
  ModalFrame,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  modalSurfaceVariants,
};
