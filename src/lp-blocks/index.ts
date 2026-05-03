/**
 * LP Blocks subpath — landing-page level building blocks (sections + modals).
 *
 * These are React components (NOT CMS-renderable Zod blocks). They expose props
 * for content + callbacks, leaving i18n and data wiring to the consumer.
 *
 * Usage:
 *   import {
 *     Navbar, Footer, Faq,
 *     BeforeAfterSlider, BeforeAfterCarousel,
 *     EmailModal, EnterpriseModal,
 *   } from "@archprime/lovarch-ds/lp-blocks";
 */
export { Navbar, type NavbarProps, type NavbarLink } from "./navbar";
export { Footer, type FooterProps, type FooterLink } from "./footer";
export { Faq, type FaqProps, type FaqItem } from "./faq";
export { BeforeAfterSlider, type BeforeAfterSliderProps } from "./before-after-slider";
export {
  BeforeAfterCarousel,
  type BeforeAfterCarouselProps,
  type BeforeAfterSlide,
} from "./before-after-carousel";
export {
  EmailModal,
  type EmailModalProps,
  type EmailModalTexts,
} from "./email-modal";
export {
  EnterpriseModal,
  type EnterpriseModalProps,
  type EnterpriseModalTexts,
  type EnterpriseModalOption,
  type EnterpriseFormData,
} from "./enterprise-modal";
