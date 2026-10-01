/** Componentes · Overlay — Modal (Radix) e ModalFrame (apresentação). */
import { useState } from "react";
import { Modal, ModalFrame, ModalFooter, Button, Field, Input, Mono } from "../../primitives";
import { Section, Demo, Rules, Rule, Spec, Code } from "../shared";

function LiveModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="accent" onClick={() => setOpen(true)}>Abrir Modal real</Button>
      <Modal open={open} onOpenChange={setOpen} title="Nuovo progetto" description="Il nome è visibile al cliente nel portale." closeLabel="Chiudi" footer={<ModalFooter><Button variant="ghost" onClick={() => setOpen(false)}>Annulla</Button><Button variant="accent" onClick={() => setOpen(false)}>Crea</Button></ModalFooter>}>
        <Field label="Nome" htmlFor="m1"><Input id="m1" placeholder="Villa Moderna" /></Field>
      </Modal>
    </>
  );
}

export function OverlaySection() {
  return (
    <Section
      id="overlay"
      title="Modal e bottom-sheet"
      intro="Um só componente: no desktop é um diálogo centrado (rounded-2xl, shadow-xl); no mobile vira bottom-sheet com 90dvh e safe-area. Sempre em portal no body, sempre na escala z-modal, sempre com backdrop único."
    >
      <Demo title="Modal (interativo)" note="no HTML estático este botão não abre — veja o ModalFrame abaixo">
        <LiveModal />
      </Demo>
      <Demo title="ModalFrame" note="o visual do conteúdo, sem comportamento — tamanhos sm · md · lg">
        <div className="space-y-4">
          <ModalFrame size="sm" title="Eliminare il render?" description="Questa azione non si può annullare." closeLabel="Chiudi" footer={<ModalFooter><Button variant="ghost">Annulla</Button><Button variant="destructive">Elimina</Button></ModalFooter>}>
            <p className="text-sm text-muted-foreground">Il file resterà disponibile per 30 giorni nel cestino.</p>
          </ModalFrame>
          <ModalFrame size="md" title="Condividi con il cliente" description="Il link pubblico mostra solo gli asset selezionati." closeLabel="Chiudi" footer={<ModalFooter><Button variant="outline">Copia link</Button><Button variant="accent">Condividi</Button></ModalFooter>}>
            <Field label="Messaggio" htmlFor="mf1"><Input id="mf1" placeholder="Ciao Marco, ecco i render…" /></Field>
          </ModalFrame>
        </div>
      </Demo>
      <Spec
        rows={[
          ["Tamanhos", "sm 384 (confirmação) · md 512 (formulário curto, default) · lg 672 (formulário/preview) · xl 896 (editor) · full"],
          ["Mobile", "bottom-sheet: rounded-t-2xl, max-h-[90dvh], overflow-y-auto, padding com safe-area; ações empilhadas (primária em cima)"],
          ["Portal", "sempre document.body — dentro de painel da new-home qualquer z-index perde para a prompt bar (stacking context)"],
          ["Backdrop", "bg-backdrop + backdrop-blur-sm · fecha ao clicar fora, exceto formulários com alterações (confirmar)"],
          ["Foco", "Radix: foco preso, Esc fecha, retorna ao gatilho"],
          ["Destrutivo", "size sm, botão destructive à direita, Annulla ghost à esquerda; nunca dourado"],
          ["Sheet lateral / Drawer", "continuam os de @/components/ui/sheet|drawer para navegação lateral e pickers longos"],
        ]}
      />
      <Rules>
        <Rule><Mono>closeLabel</Mono> obrigatório (vem do i18n).</Rule>
        <Rule kind="dont"><Mono>{`<div className="fixed inset-0 z-[100] bg-black/50">`}</Mono> à mão — 48 arquivos, 41 backdrops, 21 z-index.</Rule>
        <Rule kind="dont">Modal que não cabe na tela do celular (altura fixa).</Rule>
      </Rules>
      <Code>{`<Modal open={open} onOpenChange={setOpen} size="md" title={t("project.new")} closeLabel={t("common.close")}
  footer={<ModalFooter><Button variant="ghost" onClick={close}>{t("common.cancel")}</Button><Button variant="accent" loading={saving} onClick={save}>{t("common.create")}</Button></ModalFooter>}>
  …
</Modal>`}</Code>
    </Section>
  );
}
