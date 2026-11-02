"use client"

import type { Column, RowData } from "@tanstack/react-table"
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from "lucide-react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import type { DataTableFeatures } from "./features"

type DataTableColumnHeaderProps<TData extends RowData, TValue> = {
  column: Column<DataTableFeatures, TData, TValue>
  title: string
  className?: string
}

/**
 * Sortable header. Each tap moves to the next order TanStack defines for the column:
 * text starts ascending (ก→ฮ, A→Z); numbers and dates start descending (largest/newest first).
 * The <th> carries aria-sort (set by DataTable); the button says what the next tap does.
 */
function DataTableColumnHeader<TData extends RowData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) return <span className={className}>{title}</span>

  const sorted = column.getIsSorted()
  const Icon = sorted === "asc" ? ArrowUpIcon : sorted === "desc" ? ArrowDownIcon : ChevronsUpDownIcon
  const nextOrder = column.getNextSortingOrder()
  const next = nextOrder === "asc" ? "เรียงจากน้อยไปมาก" : nextOrder === "desc" ? "เรียงจากมากไปน้อย" : "ยกเลิกการเรียง"

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "-mx-3 h-control-sm px-3 font-medium text-foreground-secondary data-[sorted=true]:text-primary",
        column.columnDef.meta?.align === "right" && "flex-row-reverse",
        className
      )}
      data-sorted={Boolean(sorted)}
      aria-label={`${title}: ${next}`}
      onClick={column.getToggleSortingHandler()}
    >
      {title}
      <Icon data-icon="inline-end" className={cn("size-3.5", !sorted && "opacity-50")} aria-hidden />
    </Button>
  )
}

export { DataTableColumnHeader }
