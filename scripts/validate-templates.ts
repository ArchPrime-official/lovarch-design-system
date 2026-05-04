// Validates every template's blocks against the canonical AnyBlockSchema.
// Catches drift between template field names and the Zod schemas — e.g.
// `features` vs `items`, `title` vs `heading`. Run via `npm run validate:templates`.
//
// Exits 0 on success, 1 on first failure (with a friendly diff summary).
import { AnyBlockSchema } from "../src/blocks/registry";
import { TEMPLATES } from "../src/templates";

let failures = 0;

for (const [id, tpl] of Object.entries(TEMPLATES)) {
  console.log(`\n▶ Template: ${id} (${tpl.blocks.length} blocks)`);
  tpl.blocks.forEach((block, idx) => {
    const result = AnyBlockSchema.safeParse(block);
    if (result.success) {
      console.log(`  ✓ block[${idx}] (${block.type})`);
    } else {
      failures++;
      console.error(`  ✗ block[${idx}] (${block.type})`);
      result.error.errors.forEach((err) => {
        console.error(`     · ${err.path.join(".")} — ${err.message}`);
      });
    }
  });
}

console.log("");
if (failures > 0) {
  console.error(`✗ ${failures} block(s) failed validation. Templates would be rejected by the CMS backend.`);
  process.exit(1);
}
console.log("✓ All templates pass canonical schema validation.");
