/**
 * Primitives — os blocos de interface do Design System V8 (desde v0.6.0).
 *
 *   import { Button, Chip, Card, EmptyState, PanelTitle } from "@archprime/lovarch-ds/primitives";
 *
 * Todos: tokens do DS (nunca hex), texto só por prop (i18n é do consumidor),
 * alvo de toque ≥ 44px nos tamanhos lg/xl, foco visível, dois temas.
 * Referência de uso: docs/primitives-a.md e docs/primitives-b.md.
 */

// Ações
export { Button, buttonVariants, type ButtonProps } from "./button";
export { IconButton, type IconButtonProps } from "./icon-button";
export { Chip, chipVariants, type ChipProps } from "./chip";

// Rótulos e identidade
export { Badge, badgeVariants, type BadgeProps } from "./badge";
export { IconBadge, iconBadgeVariants, type IconBadgeProps, type IconBadgeTone } from "./icon-badge";
export { Avatar, avatarVariants, initials, type AvatarProps } from "./avatar";

// Tipografia
export { Heading, Text, Eyebrow, PanelTitle, SectionLabel, Kpi, Mono } from "./typography";
export type {
  HeadingProps,
  TextProps,
  EyebrowProps,
  PanelTitleProps,
  SectionLabelProps,
  KpiProps,
  MonoProps,
} from "./typography";

// Superfícies
export { Card, cardVariants, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, type CardProps } from "./card";
export { Divider, type DividerProps } from "./divider";

// Formulário
export {
  Field,
  FieldLabel,
  FieldHint,
  FieldError,
  Input,
  Textarea,
  useFieldContext,
  type FieldProps,
  type FieldLabelProps,
  type InputProps,
  type TextareaProps,
} from "./field";

// Feedback e estados
export { Spinner, type SpinnerProps } from "./spinner";
export { Skeleton, SkeletonText, type SkeletonProps, type SkeletonTextProps } from "./skeleton";
export { ProgressBar, progressTrackVariants, progressFillVariants, type ProgressBarProps } from "./progress-bar";
export { Stat, StatGrid, type StatProps, type StatGridProps, type StatDelta } from "./stat";
export { EmptyState, ErrorState } from "./empty-state";
export type { EmptyStateProps, ErrorStateProps } from "./empty-state";
export { Banner, type BannerProps } from "./banner";

// Overlay
export {
  Modal,
  ModalFrame,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
} from "./modal";
export type { ModalProps, ModalFrameProps } from "./modal";

// Dados
export {
  DataTable,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableEmpty,
} from "./data-table";
export type { DataTableProps } from "./data-table";
