// Serves the built registry (public/r) for local install tests.
// Usage: bun scripts/serve-registry.ts [port]   →   http://localhost:8787/r/button.json
import { join } from "node:path"

const port = Number(process.argv[2] ?? 8787)
const dir = join(import.meta.dirname, "../public")

Bun.serve({
  port,
  async fetch(req) {
    const path = new URL(req.url).pathname
    const file = Bun.file(join(dir, path))
    if (path.includes("..") || !(await file.exists())) return new Response("Not found", { status: 404 })
    return new Response(file, { headers: { "content-type": "application/json" } })
  },
})
console.log(`Registry: http://localhost:${port}/r/{name}.json`)
