"use client"

import * as React from "react"
import type { ReactTable, Row, RowData } from "@tanstack/react-table"
import { cn } from "cn"

import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { DataTableFeatures } from "./features"

export type DataTableStatus = "ready" | "loading" | "error"

type DataTableProps<TData extends RowData> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: ReactTable<DataTableFeatures, TData, any>
  /** Accessible name of the table, read by screen readers. */
  caption: string
  status?: DataTableStatus
  /** Shown when there are no rows (use <DataTableEmpty />). */
  empty?: React.ReactNode
  /** Shown when status is "error" (use <ErrorState />). */
  error?: React.ReactNode
  /** Skeleton rows while loading; match the page size to avoid layout shift. */
  loadingRows?: number
  /** Row tap → detail. Clicks on buttons, links and checkboxes inside the row are ignored. */
  onRowClick?: (row: Row<DataTableFeatures, TData>) => void
  className?: string
}

const INTERACTIVE = "button, a, input, label, [role=checkbox], [role=menuitem]"

function DataTable<TData extends RowData>({
  table,
  caption,
  status = "ready",
  empty,
  error,
  loadingRows = 10,
  onRowClick,
  className,
}: DataTableProps<TData>) {
  const columns = table.getVisibleLeafColumns()
  const rows = table.getRowModel().rows

  return (
    <div
      data-slot="data-table"
      className={cn("overflow-hidden rounded-xl border border-border bg-card", className)}
    >
      <Table aria-busy={status === "loading"}>
        <caption className="sr-only">{caption}</caption>
        <TableHeader className="sticky top-0 z-10">
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => {
                const meta = header.column.columnDef.meta
                const sorted = header.column.getIsSorted()
                return (
                  <TableHead
                    key={header.id}
                    aria-sort={
                      sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : header.column.getCanSort() ? "none" : undefined
                    }
                    className={cn(
                      meta?.align === "right" && "text-right",
                      meta?.sticky && "sticky left-0 z-10 bg-secondary"
                    )}
                  >
                    {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {status === "loading" &&
            Array.from({ length: loadingRows }, (_, i) => (
              <TableRow key={`skeleton-${i}`} className="hover:bg-transparent">
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    <Skeleton className="h-4 w-full max-w-32" />
                  </TableCell>
                ))}
              </TableRow>
            ))}

          {status === "error" && (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columns.length} className="h-auto p-0 whitespace-normal">
                {error}
              </TableCell>
            </TableRow>
          )}

          {status === "ready" && rows.length === 0 && (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columns.length} className="h-auto p-0 whitespace-normal">
                {empty}
              </TableCell>
            </TableRow>
          )}

          {status === "ready" &&
            rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
                className={cn(onRowClick && "cursor-pointer")}
                onClick={
                  onRowClick
                    ? (event) => {
                        if ((event.target as HTMLElement).closest(INTERACTIVE)) return
                        onRowClick(row)
                      }
                    : undefined
                }
              >
                {row.getVisibleCells().map((cell) => {
                  const meta = cell.column.columnDef.meta
                  return (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        meta?.align === "right" && "text-right",
                        meta?.sticky && "sticky left-0 bg-inherit"
                      )}
                    >
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}

export { DataTable }
