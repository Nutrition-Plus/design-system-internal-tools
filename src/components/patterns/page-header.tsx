import * as React from "react"
import { cn } from "cn"

type PageHeaderProps = {
  title: React.ReactNode
  description?: React.ReactNode
  /** Badges next to the title (e.g. status). */
  meta?: React.ReactNode
  /** One primary action at most; others secondary or outline. */
  actions?: React.ReactNode
  className?: string
}

function PageHeader({ title, description, meta, actions, className }: PageHeaderProps) {
  return (
    <header data-slot="page-header" className={cn("flex flex-wrap items-start justify-between gap-4", className)}>
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="type-h1 text-foreground">{title}</h1>
          {meta}
        </div>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  )
}

export { PageHeader }
