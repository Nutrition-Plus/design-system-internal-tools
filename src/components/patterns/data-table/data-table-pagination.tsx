"use client"

import * as React from "react"
import type { ReactTable, RowData } from "@tanstack/react-table"
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { DataTableFeatures } from "./features"

type DataTablePaginationProps<TData extends RowData> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: ReactTable<DataTableFeatures, TData, any>
  pageSizes?: number[]
}

const nf = new Intl.NumberFormat("th-TH")

function DataTablePagination<TData extends RowData>({
  table,
  pageSizes = [20, 50, 100],
}: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.state.pagination
  const total = table.getRowCount()
  const from = total === 0 ? 0 : pageIndex * pageSize + 1
  const to = Math.min(total, (pageIndex + 1) * pageSize)
  const selected = Object.keys(table.state.rowSelection ?? {}).length
  const labelId = React.useId()

  return (
    <nav
      aria-label="แบ่งหน้า"
      data-slot="data-table-pagination"
      className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground"
    >
      <p aria-live="polite" className="tabular-nums">
        แสดง {nf.format(from)}–{nf.format(to)} จาก {nf.format(total)} รายการ
        {selected > 0 && <span className="text-foreground"> · เลือกแล้ว {nf.format(selected)}</span>}
      </p>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span id={labelId} className="hidden sm:inline">
            แถวต่อหน้า
          </span>
          <Select value={String(pageSize)} onValueChange={(v) => table.setPageSize(Number(v))}>
            <SelectTrigger className="w-20" aria-labelledby={labelId}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {pageSizes.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <span className="tabular-nums text-foreground">
          หน้า {nf.format(pageIndex + 1)} / {nf.format(Math.max(1, table.getPageCount()))}
        </span>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="hidden lg:inline-flex" aria-label="หน้าแรก" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
            <ChevronsLeftIcon />
          </Button>
          <Button variant="outline" size="icon" aria-label="หน้าก่อนหน้า" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <ChevronLeftIcon />
          </Button>
          <Button variant="outline" size="icon" aria-label="หน้าถัดไป" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <ChevronRightIcon />
          </Button>
          <Button variant="outline" size="icon" className="hidden lg:inline-flex" aria-label="หน้าสุดท้าย" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
            <ChevronsRightIcon />
          </Button>
        </div>
      </div>
    </nav>
  )
}

export { DataTablePagination }
