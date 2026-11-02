// Review overlay for the executive examples: marks which parts are the shared standard
// and which parts each system may customize. Not part of the design system itself.
import * as React from "react"
import { cn } from "cn"

export type AnnotationKind = "standard" | "custom"

export type AnnotationNote = { n: number; kind: AnnotationKind; title: string; detail: string }

const AnnotationsContext = React.createContext(false)

export function AnnotationsProvider({ show, children }: { show: boolean; children: React.ReactNode }) {
  return <AnnotationsContext.Provider value={show}>{children}</AnnotationsContext.Provider>
}

export function Annotated({
  n,
  kind,
  className,
  children,
}: {
  n: number
  kind: AnnotationKind
  className?: string
  children: React.ReactNode
}) {
  const show = React.useContext(AnnotationsContext)
  if (!show) return <>{children}</>
  return (
    <div
      className={cn(
        "relative rounded-lg outline-2 outline-offset-4 outline-dashed",
        kind === "standard" ? "outline-primary" : "outline-highlight",
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute -top-3 -left-3 z-30 flex size-6 items-center justify-center rounded-full text-xs font-semibold text-white shadow-md",
          kind === "standard" ? "bg-primary" : "bg-highlight"
        )}
      >
        {n}
      </span>
      {children}
    </div>
  )
}

export function AnnotationLegend({ notes }: { notes: AnnotationNote[] }) {
  const show = React.useContext(AnnotationsContext)
  if (!show) return null
  const groups: { kind: AnnotationKind; title: string }[] = [
    { kind: "standard", title: "มาตรฐานกลาง (ทุกระบบใช้เหมือนกัน)" },
    { kind: "custom", title: "ส่วนที่แต่ละระบบปรับได้" },
  ]
  return (
    <aside aria-label="คำอธิบายสำหรับผู้พิจารณา" className="grid gap-4 rounded-xl border border-border bg-secondary p-5 md:grid-cols-2">
      {groups.map((g) => (
        <section key={g.kind} className="flex flex-col gap-3">
          <h2 className="flex items-center gap-2 type-h4">
            <span className={cn("size-3 rounded-full", g.kind === "standard" ? "bg-primary" : "bg-highlight")} />
            {g.title}
          </h2>
          <ol className="flex flex-col gap-2">
            {notes
              .filter((note) => note.kind === g.kind)
              .map((note) => (
                <li key={note.n} className="grid grid-cols-[1.5rem_1fr] gap-2 text-sm">
                  <span
                    className={cn(
                      "flex size-6 items-center justify-center rounded-full text-xs font-semibold text-white",
                      note.kind === "standard" ? "bg-primary" : "bg-highlight"
                    )}
                  >
                    {note.n}
                  </span>
                  <span>
                    <strong className="font-semibold">{note.title}</strong>
                    <span className="block text-muted-foreground">{note.detail}</span>
                  </span>
                </li>
              ))}
          </ol>
        </section>
      ))}
    </aside>
  )
}
