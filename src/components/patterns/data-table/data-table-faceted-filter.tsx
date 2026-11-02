"use client"

import type { Column, RowData } from "@tanstack/react-table"
import { CheckIcon, PlusCircleIcon } from "lucide-react"
import { cn } from "cn"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import type { DataTableFeatures } from "./features"

export type FacetOption = { label: string; value: string; count?: number }

type DataTableFacetedFilterProps<TData extends RowData, TValue> = {
  column?: Column<DataTableFeatures, TData, TValue>
  title: string
  options: FacetOption[]
}

/** Multi-select filter for enum columns (status, channel). Use filterFn "arrIncludesSome". */
function DataTableFacetedFilter<TData extends RowData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const selected = new Set((column?.getFilterValue() as string[] | undefined) ?? [])

  function toggle(value: string) {
    const next = new Set(selected)
    if (next.has(value)) next.delete(value)
    else next.add(value)
    column?.setFilterValue(next.size ? [...next] : undefined)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="border-dashed text-foreground">
          <PlusCircleIcon data-icon="inline-start" />
          {title}
          {selected.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-1 h-4" />
              {selected.size > 2 ? (
                <Badge variant="accent">เลือก {selected.size}</Badge>
              ) : (
                options
                  .filter((o) => selected.has(o.value))
                  .map((o) => (
                    <Badge key={o.value} variant="accent">
                      {o.label}
                    </Badge>
                  ))
              )}
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <Command>
          <CommandInput placeholder={`ค้นหา${title}`} />
          <CommandList>
            <CommandEmpty>ไม่พบตัวเลือก</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selected.has(option.value)
                return (
                  <CommandItem key={option.value} onSelect={() => toggle(option.value)} aria-selected={isSelected}>
                    <span
                      aria-hidden
                      className={cn(
                        "flex size-4 items-center justify-center rounded-sm border border-input",
                        isSelected && "border-primary bg-primary text-primary-foreground"
                      )}
                    >
                      {isSelected && <CheckIcon className="size-3" />}
                    </span>
                    <span className="flex-1">{option.label}</span>
                    {option.count !== undefined && (
                      <span className="font-mono text-xs text-muted-foreground tabular-nums">{option.count}</span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selected.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={() => column?.setFilterValue(undefined)} className="justify-center">
                    ล้างตัวกรองนี้
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { DataTableFacetedFilter }
