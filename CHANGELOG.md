# Changelog

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
