"use client"

import * as React from "react"

import { Badge } from "@/components/ui/badge"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

type BadgeOverflowProps = {
  /** Badges to show, in priority order. */
  items: React.ReactNode[]
  /** How many badges stay visible before the rest collapse into "…". */
  max?: number
  /** Heading inside the hover card. */
  label?: string
}

/**
 * Keeps table cells one line tall (badges never wrap, so every row has the same height): shows the first `max` badges and collapses the rest into a "…" badge.
 * Hovering or focusing "…" lists every badge. The full list is also exposed to screen readers
 * through the trigger's accessible name, so nothing is hidden from them.
 */
function BadgeOverflow({
  items,
  max = 2,
  label = "ทั้งหมด",
}: BadgeOverflowProps) {
  const visible = items.slice(0, max)
  const hidden = items.length - visible.length

  return (
    <div
      data-slot="badge-overflow"
      className="flex flex-nowrap items-center gap-1"
    >
      {visible.map((item, i) => (
        <React.Fragment key={i}>{item}</React.Fragment>
      ))}
      {hidden > 0 && (
        <HoverCard openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>
            <button
              type="button"
              aria-label={`อีก ${hidden} รายการ`}
              className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Badge variant="secondary" className="cursor-default px-2">
                …
              </Badge>
            </button>
          </HoverCardTrigger>
          <HoverCardContent align="start" className="w-auto min-w-44 p-3">
            <p className="mb-2 text-xs text-muted-foreground">
              {label} ({items.length})
            </p>
            <div className="flex flex-col items-start gap-1">
              {items.map((item, i) => (
                <React.Fragment key={i}>{item}</React.Fragment>
              ))}
            </div>
          </HoverCardContent>
        </HoverCard>
      )}
    </div>
  )
}

export { BadgeOverflow }
