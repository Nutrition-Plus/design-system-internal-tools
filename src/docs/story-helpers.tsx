// Layout helpers for documentation stories. Not part of the design system.
import * as React from "react"

export function Matrix({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-4">{children}</div>
}

export function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid items-center gap-3 md:grid-cols-[9rem_1fr]">
      <span className="type-caption text-muted-foreground">{label}</span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

export function Guidance({ doItems, dontItems }: { doItems: string[]; dontItems: string[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <section className="rounded-xl border border-success-border bg-success-subtle p-4 text-success-foreground">
        <h3 className="mb-2 type-body-strong">ควรทำ</h3>
        <ul className="list-disc pl-5 text-sm">
          {doItems.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </section>
      <section className="rounded-xl border border-danger-border bg-danger-subtle p-4 text-danger-foreground">
        <h3 className="mb-2 type-body-strong">ไม่ควรทำ</h3>
        <ul className="list-disc pl-5 text-sm">
          {dontItems.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}
