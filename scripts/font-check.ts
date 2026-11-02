// Checks which webfonts actually loaded in a Storybook story and renders glyph samples large.
// Usage: bun scripts/font-check.ts <story-id> [out.png]
import { chromium } from "playwright"

const [storyId, out = "screenshots/font-check.png"] = process.argv.slice(2)
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 2 })
await page.goto(`http://localhost:8000/iframe.html?id=${storyId}&viewMode=story`, { waitUntil: "networkidle" })
await page.evaluate(() => document.fonts.ready)
const fonts = await page.evaluate(() =>
  [...document.fonts].filter((f) => f.status === "loaded").map((f) => `${f.family} ${f.weight} ${f.unicodeRange.slice(0, 20)}`)
)
console.log([...new Set(fonts)].join("\n"))
const families = ["IBM Plex Mono", "JetBrains Mono Variable", "IBM Plex Sans", "Inter Variable", "IBM Plex Sans Thai", "Anuphan", "Noto Sans Thai Variable"]
await page.evaluate((families) => {
  document.body.innerHTML = families
    .map((f) => `<div style="font-family:'${f}';font-size:40px;line-height:1.4;padding:4px 16px">O0O0 1lI| ORD-O0O0 · ${f}</div>`)
    .join("") + `<div style="font-family:'IBM Plex Sans';font-size:44px;padding:4px 16px;font-feature-settings:'zero'">O0O0 zero-feature Plex Sans</div><div style="font-family:'Inter Variable';font-size:44px;padding:4px 16px;font-feature-settings:'zero'">O0O0 zero-feature Inter</div>`
}, families)
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(300)
await page.screenshot({ path: out })
await browser.close()
console.log(`✓ ${out}`)
