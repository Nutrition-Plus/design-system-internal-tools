"use client"

import * as React from "react"
import { cn } from "cn"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import { CheckIcon, MinusIcon } from "lucide-react"

// MOOVE: 16px box: white with a 1px border when enabled, gray when disabled, ≥ 44px hit area in comfortable density (--hit-min),
// indeterminate state for "select all" in tables.
function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer group/checkbox relative flex size-4 shrink-0 items-center justify-center rounded-[3px] border border-input bg-background transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:inset-[min(-0.5rem,calc((16px-var(--hit-min))/2))] focus-visible:border-ring enabled:hover:border-muted-foreground disabled:cursor-not-allowed disabled:border-transparent disabled:bg-field-hover aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/30 data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground disabled:data-[state=indeterminate]:bg-field-hover disabled:data-[state=indeterminate]:text-muted-foreground data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground data-checked:hover:bg-primary-hover disabled:data-checked:bg-field-hover disabled:data-checked:text-muted-foreground",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3"
      >
        <CheckIcon className="group-data-[state=indeterminate]/checkbox:hidden" />
        <MinusIcon className="hidden group-data-[state=indeterminate]/checkbox:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
