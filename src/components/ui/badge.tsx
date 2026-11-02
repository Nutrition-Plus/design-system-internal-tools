import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

// MOOVE: every filled variant is borderless so badges look the same in one row; only `outline` has a border.
// Status variants use the subtle bg + dark text pairs (≥ 6:1). The bright
// status color is only used for the optional <BadgeDot />, never for text.
const badgeVariants = cva(
  "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-4xl border border-transparent px-2.5 text-xs leading-none font-medium whitespace-nowrap transition-colors has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 aria-invalid:border-destructive [&>svg]:pointer-events-none [&>svg]:size-3.5!",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground [a]:hover:bg-primary-hover",
        secondary:
          "bg-secondary text-foreground-secondary *:data-[slot=badge-dot]:bg-input [a]:hover:bg-secondary-hover",
        outline:
          "border-border bg-background text-foreground-secondary *:data-[slot=badge-dot]:bg-input [a]:hover:bg-secondary",
        accent:
          "bg-accent text-accent-foreground *:data-[slot=badge-dot]:bg-primary",
        success:
          "bg-success-subtle text-success-foreground *:data-[slot=badge-dot]:bg-success",
        warning:
          "bg-warning-subtle text-warning-foreground *:data-[slot=badge-dot]:bg-warning",
        destructive:
          "bg-danger-subtle text-danger-foreground *:data-[slot=badge-dot]:bg-danger",
        info: "bg-info-subtle text-info-foreground *:data-[slot=badge-dot]:bg-info",
        highlight:
          "bg-highlight-subtle text-highlight-foreground *:data-[slot=badge-dot]:bg-highlight",
        ghost: "hover:bg-muted hover:text-muted-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
)

function Badge({
  className,
  variant = "secondary",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

function BadgeDot({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="badge-dot"
      aria-hidden
      className={cn("size-1.5 shrink-0 rounded-full bg-current", className)}
      {...props}
    />
  )
}

export { Badge, BadgeDot, badgeVariants }
