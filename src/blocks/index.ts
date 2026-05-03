export * from "./hero";
export * from "./cta";
export * from "./feature-grid";
export * from "./testimonials";
export * from "./pricing";
export * from "./registry";

import { BLOCK_REGISTRY, AnyBlockSchema, type AnyBlock, type BlockType, isKnownBlockType } from "./registry";

import * as React from "react";

/**
 * BlockRenderer — given a parsed block JSON, renders the registered component.
 * Returns null and logs a warning if the type is unknown (forward-compat).
 */
export function BlockRenderer({ block }: { block: unknown }): React.ReactElement | null {
  const parsed = AnyBlockSchema.safeParse(block);
  if (!parsed.success) {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.warn("[lovarch-ds] BlockRenderer: invalid block", parsed.error.issues);
    }
    return null;
  }
  const { type } = parsed.data;
  if (!isKnownBlockType(type)) return null;
  const entry = BLOCK_REGISTRY[type];
  const Component = entry.component as unknown as React.ComponentType<{ block: AnyBlock }>;
  return React.createElement(Component, { block: parsed.data });
}

export type { AnyBlock, BlockType };
