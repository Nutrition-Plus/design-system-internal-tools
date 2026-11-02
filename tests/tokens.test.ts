import { describe, expect, test } from "bun:test"
import { readFileSync } from "node:fs"

import { contrastRatio } from "../src/lib/contrast"
import { OUTPUTS } from "../scripts/build-tokens"
import { flatten, loadTree, resolveTokens } from "../scripts/tokens/lib"
import { render } from "../scripts/tokens/render"

const out = render()

describe("contrast", () => {
  test("matches known WCAG values", () => {
    expect(contrastRatio("#045275", "#FFFFFF")).toBeCloseTo(8.51, 2)
    expect(contrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21, 2)
  })

  for (const pair of out.contrast.filter((p) => !p.forbidden)) {
    test(`${pair.fg} on ${pair.bg} ≥ ${pair.min}:1 (${pair.usage})`, () => {
      expect(pair.ratio).toBeGreaterThanOrEqual(pair.min)
    })
  }

  // Forbidden pairs document combinations we tell people not to use.
  // If one starts passing, the docs are wrong and contrast.json must be updated.
  for (const pair of out.contrast.filter((p) => p.forbidden)) {
    test(`forbidden: ${pair.fg} on ${pair.bg} really fails ${pair.min}:1`, () => {
      expect(pair.ratio).toBeLessThan(pair.min)
    })
  }
})

describe("tokens", () => {
  test("brand colors are unchanged", () => {
    const t = resolveTokens(flatten(loadTree()))
    expect(t.get("color.primary")?.value).toBe("#045275")
    expect(t.get("color.secondary")?.value).toBe("#F3F7FA")
    expect(t.get("color.background")?.value).toBe("#FFFFFF")
    expect(t.get("color.success")?.value).toBe("#22C55E")
    expect(t.get("color.warning")?.value).toBe("#F59E0B")
    expect(t.get("color.danger")?.value).toBe("#EF4444")
    expect(t.get("color.info")?.value).toBe("#0EA5E9")
  })

  test("comfortable density meets the 44px touch target", () => {
    const t = resolveTokens(flatten(loadTree()))
    expect(t.get("density.comfortable.control-h")?.value).toBe("44px")
    expect(t.get("density.comfortable.hit-min")?.value).toBe("44px")
  })

  test("generated files are up to date (run `bun run tokens`)", () => {
    expect(readFileSync(OUTPUTS.css, "utf8")).toBe(out.css)
    expect(readFileSync(OUTPUTS.ts, "utf8")).toBe(out.ts)
    expect(readFileSync(OUTPUTS.json, "utf8")).toBe(out.json)
  })
})
