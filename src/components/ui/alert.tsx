import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// MOOVE: one variant per status. Subtle background + dark text for contrast,
// the bright status color appears only on the 4px left bar.
const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-lg border border-l-4 px-4 py-3 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-28 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-(--icon-size)",
  {
    variants: {
      variant: {
        default:
          "border-border border-l-input bg-card text-card-foreground *:data-[slot=alert-description]:text-muted-foreground",
        info: "border-info-border border-l-info bg-info-subtle text-info-foreground",
        success:
          "border-success-border border-l-success bg-success-subtle text-success-foreground",
        warning:
          "border-warning-border border-l-warning bg-warning-subtle text-warning-foreground",
        destructive:
          "border-danger-border border-l-danger bg-danger-subtle text-danger-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      data-variant={variant}
      role={
        variant === "destructive" || variant === "warning" ? "alert" : "status"
      }
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-semibold group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-sm text-pretty text-current [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-2",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-1/2 right-3 -translate-y-1/2", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
