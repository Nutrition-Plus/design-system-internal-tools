# Changelog

## 0.3.2 — 2026-11-04

### Fixed
- `package.json` version now matches the release tag. Tags `v0.3.0` and `v0.3.1` still report `0.2.0`.
- Install commands in the README and the Storybook guide point to `v0.3.2` and the real repository URL.

### Changed
- The package is internal only. `package.json` is `private` again, so `npm publish` is blocked; installing from git still works.
- Install over SSH (`git+ssh://`), since the repository will be private. The Storybook guide explains how to give a consumer's CI read access with a deploy key.

## 0.3.1 — 2026-11-03

### Added
- `AppShell` `brand` prop: company logo and name at the top of the sidebar (shadcn sidebar-07 pattern). Collapses to the logo; without `logo` it shows the first letter of `name`.

### Changed
- `AppShell`: the collapse button moved from the top bar into the sidebar header, as a small round button straddling the sidebar's right edge, level with the logo (chevron left when open, right when collapsed). In the mobile Sheet it is a close button inside the header.
- `AppShell`: no top bar on screens ≥ 768px, so content starts at the top. Below 768px a slim bar keeps the button to open the menu and the brand name.

### Removed (breaking)
- `AppShell` props `breadcrumbs` and `headerEnd`. Put page status such as the last sync time in `PageHeader` `meta` or `actions`. This shipped in a patch release; check `AppShell` usage when you upgrade from 0.3.0 or earlier.

## 0.3.0 — 2026-11-02

### Added
- `Input` `size` prop (`"sm"` | `"default"`). `size="sm"` uses the compact control height (`h-control-sm`) with tighter padding and smaller text.

### Changed
- `Select` `size="sm"` trigger has tighter padding and gap and smaller text.
- `dist-lib/index.js` starts with `"use client"`, so server components in the Next.js App Router can import them.

## 0.2.0 — 2026-11-02

### Added
- Installable package `@moove/design-system` (`bun add` from git): `dist-lib/` (ESM + type declarations, committed and checked in CI) and `styles.css` (tokens, fonts, base, chart themes, Tailwind and shadcn imports).
- Barrel export `src/index.ts` for all components, patterns, `dataTableFeatures`, `use-mobile` and `cn`.

### Changed
- `package.json` is no longer `private`. React and Tailwind are peer dependencies; components' runtime libraries are dependencies.
- `src/index.css` now imports `src/styles/moove.css`.

## 0.1.0 — 2026-10-30

### Added
- Design tokens (DTCG JSON) for color, typography, spacing, radius, border, shadow, motion and density (comfortable 44px / compact 32px), with a generator and automated contrast tests (40 pairs).
- Fonts: IBM Plex Sans Thai, IBM Plex Sans and IBM Plex Mono, self-hosted via Fontsource, chosen after a side-by-side comparison.
- shadcn/ui components (radix-nova) restyled to MOOVE tokens: Button, Input, InputGroup, Textarea, Select, Checkbox, Badge (+ BadgeDot, status variants), Alert (status variants), Dialog, AlertDialog, Sheet, Tabs (line + segmented), Card (+ muted variant), Table, Sidebar, Breadcrumb, Pagination, Field, Empty, Skeleton, Spinner, Sonner, Tooltip, DropdownMenu, Popover, Command, ToggleGroup, ScrollArea, Separator.
- Patterns: DataTable (TanStack Table v9: toolbar, faceted filter, column picker, sortable headers with aria-sort, pagination, loading/empty/error), ConfirmDialog, EmptyState/ErrorState, PageHeader, AppShell.
- Storybook (port 8000) with Foundations, Components, Patterns, Examples (OMS order list + order form with review annotations) and Guides.
- shadcn registry `@moove` (38 items).

### Changed (vs. shadcn defaults)
- Badge default variant is `secondary` instead of `default`.
- Destructive button is a solid fill (#DC2626) instead of a tinted one.
- Radius scale reduced (6px controls, 8px cards).
