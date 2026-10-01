/**
 * Documentação viva do Design System V8.
 *
 *   import { DsDocument, DS_SECTIONS } from "@archprime/lovarch-ds/docs";
 *
 * A MESMA árvore React alimenta a rota /ds do app (admin) e o HTML estático
 * (docs/design/index.html) gerado por react-dom/server — ver docs/design/build-ds.mjs
 * no consumidor. Texto em português: documentação interna, não produto.
 */
export { DsDocument, type DsDocumentProps } from "./DsDocument";
export { DS_SECTIONS } from "./sections";
export { GROUP_LABEL, type DocSectionDef } from "./shared";
