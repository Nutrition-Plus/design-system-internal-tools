"use client"

import * as React from "react"
import type { ReactTable, RowData } from "@tanstack/react-table"
import { Columns3Icon, SearchIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import type { DataTableFeatures } from "./features"

type DataTableToolbarProps<TData extends RowData> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: ReactTable<DataTableFeatures, TData, any>
  searchPlaceholder?: string
  /** Debounce for the search box (ms). Server-side search should keep ≥ 300. */
  debounce?: number
  /** <DataTableFacetedFilter /> elements. */
  filters?: React.ReactNode
  /** Actions on the right, e.g. Export. */
  actions?: React.ReactNode
}

function DataTableToolbar<TData extends RowData>({
  table,
  searchPlaceholder = "ค้นหา",
  debounce = 300,
  filters,
  actions,
}: DataTableToolbarProps<TData>) {
  const globalFilter = (table.state.globalFilter as string | undefined) ?? ""
  const [search, setSearch] = React.useState(globalFilter)
  const isFiltered = table.state.columnFilters.length > 0 || globalFilter !== ""

  React.useEffect(() => {
    if (search === globalFilter) return
    const timer = setTimeout(() => table.setGlobalFilter(search || undefined), debounce)
    return () => clearTimeout(timer)
  }, [search, globalFilter, debounce, table])

  function reset() {
    setSearch("")
    table.resetColumnFilters()
    table.setGlobalFilter(undefined)
  }

  return (
    <div data-slot="data-table-toolbar" className="flex flex-wrap items-center gap-2">
      <InputGroup className="w-full sm:w-72">
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput
          type="search"
          aria-label={searchPlaceholder}
          placeholder={searchPlaceholder}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        {search && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-xs" aria-label="ล้างคำค้นหา" onClick={() => setSearch("")}>
              <XIcon />
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>
      {filters}
      {isFiltered && (
        <Button variant="ghost" onClick={reset}>
          ล้างตัวกรอง
          <XIcon data-icon="inline-end" />
        </Button>
      )}
      <div className="ml-auto flex items-center gap-2">
        {actions}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Columns3Icon data-icon="inline-start" />
              คอลัมน์
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuGroup>
              <DropdownMenuLabel>แสดงคอลัมน์</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllLeafColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    onSelect={(event) => event.preventDefault()}
                  >
                    {column.columnDef.meta?.label ?? column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export { DataTableToolbar }
