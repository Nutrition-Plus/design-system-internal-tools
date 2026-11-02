// Builds design tokens: tokens/*.json → src/styles/tokens.css, src/tokens/tokens.generated.ts, tokens/build/tokens.json
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"

import { formatRatio } from "../src/lib/contrast"
import { render } from "./tokens/render"

const root = join(import.meta.dirname, "..")
export const OUTPUTS = {
  css: join(root, "src/styles/tokens.css"),
  ts: join(root, "src/tokens/tokens.generated.ts"),
  json: join(root, "tokens/build/tokens.json"),
}

if (import.meta.main) {
  const out = render()
  for (const [key, file] of Object.entries(OUTPUTS)) {
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, out[key as keyof typeof OUTPUTS])
    console.log(`✓ ${file.replace(root + "/", "")}`)
  }

  const failures = out.contrast.filter((c) => (c.forbidden ? c.passes : !c.passes))
  for (const c of failures) {
    console.error(
      `✗ contrast ${c.fg} on ${c.bg} = ${formatRatio(c.ratio)} (min ${c.min})${c.forbidden ? " — marked forbidden but passes; update contrast.json" : ""}`
    )
  }
  if (failures.length) process.exit(1)
  console.log(`✓ contrast: ${out.contrast.length} pairs checked`)
}
