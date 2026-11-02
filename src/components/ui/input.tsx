import * as React from "react"
import { cn } from "cn"

function Input({
  className,
  type,
  size = "default",
  ...props
}: Omit<React.ComponentProps<"input">, "size"> & {
  size?: "sm" | "default"
}) {
  return (
    <input
      type={type}
      data-slot="input"
      data-size={size}
      className={cn(
        "h-control w-full min-w-0 rounded-lg border border-input bg-background px-2 py-0 text-base text-foreground data-[size=sm]:h-control-sm data-[size=sm]:px-1.5 data-[size=sm]:text-sm transition-colors duration-(--duration-fast) outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground read-only:border-transparent read-only:bg-secondary read-only:hover:border-transparent focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 read-only:focus-visible:ring-0 enabled:hover:border-muted-foreground disabled:cursor-not-allowed disabled:border-transparent disabled:bg-secondary disabled:text-muted-foreground aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/30 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }
