// Generates registry.json (shadcn source registry) from the actual imports of each file,
// so dependencies never drift from the code. Then run `bunx shadcn build` to emit public/r/*.json.
// Usage: bun scripts/build-registry.ts
import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import { basename, join } from "node:path"

const root = join(import.meta.dirname, "..")
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"))
const NAMESPACE = "@moove"
const IGNORE = new Set(["react", "react-dom"])

type Item = {
  name: string
  type: string
  title: string
  description: string
  dependencies?: string[]
  registryDependencies?: string[]
  files: { path: string; type: string; target?: string }[]
  docs?: string
}

const pin = (name: string) => (pkg.dependencies?.[name] ? `${name}@${pkg.dependencies[name]}` : name)

function scan(files: string[], self: string[]) {
  const deps = new Set<string>()
  const reg = new Set<string>()
  for (const file of files) {
    const src = readFileSync(join(root, file), "utf8")
    for (const [, spec] of src.matchAll(/from\s+"([^"]+)"/g)) {
      if (spec.startsWith("@/components/ui/")) reg.add(basename(spec))
      else if (spec.startsWith("@/hooks/")) reg.add(basename(spec))
      else if (spec.startsWith("@/components/patterns/")) reg.add(spec.split("/")[3])
      else if (spec.startsWith("@/") || spec.startsWith(".")) continue
      else {
        const name = spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0]
        if (!IGNORE.has(name)) deps.add(pin(name))
      }
    }
  }
  for (const s of self) reg.delete(s)
  return {
    dependencies: [...deps].sort(),
    registryDependencies: [...reg].sort().map((n) => `${NAMESPACE}/${n}`),
  }
}

const items: Item[] = []

items.push({
  name: "moove-theme",
  type: "registry:item",
  title: "MOOVE theme",
  description: "Design tokens (colors, fonts, radius, shadows, density, type-* utilities), self-hosted IBM Plex fonts and base styles.",
  dependencies: [
    "@fontsource/ibm-plex-sans",
    "@fontsource/ibm-plex-sans-thai",
    "@fontsource/ibm-plex-mono",
    "tw-animate-css",
    "shadcn",
    "cn",
  ].map(pin),
  files: [
    { path: "src/styles/tokens.css", type: "registry:file", target: "src/styles/moove/tokens.css" },
    { path: "src/styles/fonts.css", type: "registry:file", target: "src/styles/moove/fonts.css" },
    { path: "src/styles/base.css", type: "registry:file", target: "src/styles/moove/base.css" },
    { path: "src/styles/chart-themes.css", type: "registry:file", target: "src/styles/moove/chart-themes.css" },
    { path: "src/lib/utils.ts", type: "registry:lib" },
  ],
  docs: 'Add to your Tailwind CSS entry, after @import "tailwindcss": @import "./styles/moove/fonts.css"; @import "./styles/moove/tokens.css"; @import "./styles/moove/chart-themes.css"; @import "./styles/moove/base.css"; then set <html data-density="comfortable"> (or "compact").',
})

for (const file of readdirSync(join(root, "src/hooks")).filter((f) => f.endsWith(".ts"))) {
  const name = basename(file, ".ts")
  items.push({
    name,
    type: "registry:hook",
    title: name,
    description: `Hook ${name}`,
    ...scan([`src/hooks/${file}`], [name]),
    files: [{ path: `src/hooks/${file}`, type: "registry:hook" }],
  })
}

for (const file of readdirSync(join(root, "src/components/ui")).filter((f) => f.endsWith(".tsx") && !f.includes(".stories."))) {
  const name = basename(file, ".tsx")
  const scanned = scan([`src/components/ui/${file}`], [name])
  items.push({
    name,
    type: "registry:ui",
    title: name.replace(/(^|-)(\w)/g, (_, s, c) => (s ? " " : "") + c.toUpperCase()),
    description: `MOOVE-styled ${name} (shadcn/ui radix-nova, restyled to MOOVE tokens).`,
    dependencies: scanned.dependencies,
    registryDependencies: [`${NAMESPACE}/moove-theme`, ...scanned.registryDependencies],
    files: [{ path: `src/components/ui/${file}`, type: "registry:ui" }],
  })
}

const blocks: { name: string; title: string; description: string; files: string[] }[] = [
  {
    name: "data-table",
    title: "Data Table",
    description: "TanStack Table v9 data table with toolbar (search, faceted filter, column picker), sortable headers, pagination and loading/empty/error states.",
    files: [
      "src/components/patterns/data-table/features.ts",
      "src/components/patterns/data-table/data-table.tsx",
      "src/components/patterns/data-table/data-table-column-header.tsx",
      "src/components/patterns/data-table/data-table-faceted-filter.tsx",
      "src/components/patterns/data-table/data-table-pagination.tsx",
      "src/components/patterns/data-table/data-table-toolbar.tsx",
    ],
  },
  { name: "badge-overflow", title: "Badge overflow", description: "Shows the first N badges in a table cell and collapses the rest into a hover card.", files: ["src/components/patterns/badge-overflow.tsx"] },
  { name: "feedback-states", title: "Feedback states", description: "EmptyState (no-data / no-results) and ErrorState with retry.", files: ["src/components/patterns/feedback-states.tsx"] },
  { name: "confirm-dialog", title: "Confirm dialog", description: "Confirmation for hard-to-undo actions; async confirm with spinner, focus starts on Cancel.", files: ["src/components/patterns/confirm-dialog.tsx"] },
  { name: "user-menu", title: "User menu", description: "Sidebar footer user card (shadcn sidebar-07 style) with a dropdown for role and sign out.", files: ["src/components/patterns/user-menu.tsx"] },
  { name: "date-picker", title: "Date picker", description: "DatePicker (single date, month/year dropdowns, presets), DateRangeFilter (start and end pickers side by side) and DateRangePicker (single-field range calendar).", files: ["src/components/patterns/date-picker.tsx"] },
  { name: "chart-card", title: "Chart card", description: "Card around a chart with a table-view twin. Use with the chart component and the --chart-1…8 tokens.", files: ["src/components/patterns/chart-card.tsx"] },
  { name: "page-header", title: "Page header", description: "Page title, description, meta badges and actions.", files: ["src/components/patterns/page-header.tsx"] },
  { name: "app-shell", title: "App shell", description: "Collapsible sidebar navigation with company brand and collapse button at the top, and the content area using the density gutter.", files: ["src/components/patterns/app-shell.tsx"] },
]

for (const block of blocks) {
  const scanned = scan(block.files, [block.name])
  items.push({
    name: block.name,
    type: "registry:block",
    title: block.title,
    description: block.description,
    dependencies: scanned.dependencies,
    registryDependencies: [`${NAMESPACE}/moove-theme`, ...scanned.registryDependencies],
    files: block.files.map((path) => ({
      path,
      type: "registry:component",
      target: path.replace("src/components/patterns/", "components/patterns/"),
    })),
  })
}

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "moove",
  homepage: "https://moove.in.th",
  items,
}
writeFileSync(join(root, "registry.json"), JSON.stringify(registry, null, 2) + "\n")
console.log(`✓ registry.json: ${items.length} items`)
