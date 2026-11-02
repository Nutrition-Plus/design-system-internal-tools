import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const pkg = JSON.parse(readFileSync(resolve(import.meta.dirname, "package.json"), "utf8"))
const external = [...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.peerDependencies ?? {})]

// Library build for `bun add`: dependencies and peers stay external, the rest of src is bundled.
export default defineConfig({
  plugins: [react()],
  publicDir: false,
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    outDir: "dist-lib",
    emptyOutDir: true,
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: (id) => external.some((name) => id === name || id.startsWith(`${name}/`)),
      output: {
        banner: '"use client";',
      },
    },
  },
})
