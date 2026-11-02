// Screenshots Storybook stories for visual review.
// Usage: bun scripts/screenshot.ts <story-id> [--width 1180] [--height 820] [--density compact] [--out file.png] [--full] [--clip x,y,w,h] [--mode docs]
// Requires Storybook running at http://localhost:8000.
import { chromium } from "playwright"

const args = process.argv.slice(2)
const storyId = args[0]
const opt = (name: string, fallback: string) => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 ? args[i + 1] : fallback
}
if (!storyId) {
  console.error("Usage: bun scripts/screenshot.ts <story-id> [--width] [--height] [--density] [--out] [--full]")
  process.exit(1)
}

const width = Number(opt("width", "1180"))
const height = Number(opt("height", "820"))
const density = opt("density", "comfortable")
const out = opt("out", `screenshots/${storyId}-${width}-${density}.png`)

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 2 })
const errors: string[] = []
page.on("pageerror", (e) => errors.push(e.message))
page.on("console", (m) => m.type() === "error" && errors.push(m.text()))

await page.goto(
  `http://localhost:8000/iframe.html?id=${storyId}&viewMode=${opt("mode", "story")}&globals=density:${density}`,
  { waitUntil: "networkidle" }
)
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(300)
const clipArg = opt("clip", "")
const [x, y, w, h] = clipArg.split(",").map(Number)
await page.screenshot({
  path: out,
  fullPage: args.includes("--full"),
  clip: clipArg ? { x, y, width: w, height: h } : undefined,
})
const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
await browser.close()

console.log(`✓ ${out}`)
if (overflow) console.warn("! horizontal overflow detected")
if (errors.length) {
  console.error("Console errors:\n" + errors.join("\n"))
  process.exit(1)
}
