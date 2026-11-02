// tsc keeps "@/..." alias paths in emitted .d.ts files, and consumers have no "@/" alias.
// Rewrites them to relative paths. dist-lib mirrors src, so "@/x" points to dist-lib/x.
// Usage: bun scripts/fix-dts-aliases.ts
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs"
import { dirname, join, relative } from "node:path"

const root = join(import.meta.dirname, "..", "dist-lib")

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : path.endsWith(".d.ts") ? [path] : []
  })
}

let changed = 0
for (const file of walk(root)) {
  const src = readFileSync(file, "utf8")
  const out = src.replace(/(["'])@\/([^"']+)\1/g, (_, quote: string, target: string) => {
    const rel = relative(dirname(file), join(root, target))
    return `${quote}${rel.startsWith(".") ? rel : `./${rel}`}${quote}`
  })
  if (out !== src) {
    writeFileSync(file, out)
    changed++
  }
}
console.log(`fix-dts-aliases: rewrote ${changed} .d.ts file(s)`)
