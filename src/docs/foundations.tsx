// Documentation blocks rendered from the generated tokens, so docs never drift from code.
import { cn } from "cn"

import { tokens } from "@/tokens/tokens.generated"

const textOn = (hex: string) => {
  const h = hex.replace("#", "")
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
  return r * 0.299 + g * 0.587 + b * 0.114 > 150 ? "#0F1D26" : "#FFFFFF"
}

export function Palette() {
  const groups = [...new Set(tokens.palette.map((t) => t.name.split(".")[0]))]
  return (
    <div className="flex flex-col gap-4">
      {groups.map((group) => (
        <div key={group} className="flex flex-col gap-1">
          <span className="type-caption font-medium text-foreground-secondary">{group}</span>
          <div className="flex flex-wrap gap-1">
            {tokens.palette
              .filter((t) => t.name.startsWith(group + "."))
              .map((t) => (
                <div
                  key={t.name}
                  className="flex h-16 w-24 flex-col justify-end rounded-md border border-border p-2 text-[11px] leading-tight"
                  style={{ background: t.value, color: textOn(t.value) }}
                  title={t.description}
                >
                  <span className="font-medium">{t.name.split(".")[1]}</span>
                  <span className="font-mono">{t.value}</span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function SemanticColors({ filter }: { filter?: (name: string) => boolean }) {
  const list = tokens.colors.filter((t) => !filter || filter(t.name))
  return (
    <table className="w-full type-table">
      <thead>
        <tr className="border-b border-border text-left text-foreground-secondary">
          <th className="py-2 pr-3 font-medium">ตัวอย่าง</th>
          <th className="py-2 pr-3 font-medium">Token</th>
          <th className="py-2 pr-3 font-medium">ค่า</th>
          <th className="py-2 font-medium">ใช้กับ</th>
        </tr>
      </thead>
      <tbody>
        {list.map((t) => (
          <tr key={t.name} className="border-b border-border">
            <td className="py-2 pr-3">
              <span className="block size-8 rounded-md border border-border" style={{ background: t.value }} />
            </td>
            <td className="py-2 pr-3 font-mono text-[13px]">--{t.name}</td>
            <td className="py-2 pr-3 font-mono text-[13px] text-muted-foreground">
              {t.value}
              {t.ref && <span className="block text-xs">{t.ref.replace("palette.", "")}</span>}
            </td>
            <td className="py-2 text-muted-foreground">{t.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function ContrastTable() {
  return (
    <table className="w-full type-table">
      <thead>
        <tr className="border-b border-border text-left text-foreground-secondary">
          <th className="py-2 pr-3 font-medium">ตัวอย่าง</th>
          <th className="py-2 pr-3 font-medium">คู่สี (ข้อความ / พื้น)</th>
          <th className="py-2 pr-3 text-right font-medium">Contrast</th>
          <th className="py-2 pr-3 font-medium">เกณฑ์</th>
          <th className="py-2 font-medium">ใช้กับ</th>
        </tr>
      </thead>
      <tbody>
        {tokens.contrast.map((c) => {
          const ok = "forbidden" in c && c.forbidden ? false : c.passes
          return (
            <tr key={`${c.fg}-${c.bg}-${c.min}`} className="border-b border-border">
              <td className="py-2 pr-3">
                <span
                  className="inline-flex h-8 min-w-20 items-center justify-center rounded-md border border-border px-2 font-medium"
                  style={{ color: c.fgValue, background: c.bgValue }}
                >
                  {c.min === 3 ? "▬ ◉" : "ตัวอย่าง"}
                </span>
              </td>
              <td className="py-2 pr-3 font-mono text-[13px]">
                {c.fg} / {c.bg}
              </td>
              <td className="py-2 pr-3 text-right font-mono text-[13px] tabular-nums">{c.ratio.toFixed(2)}:1</td>
              <td className="py-2 pr-3">
                <span
                  className={cn(
                    "inline-flex h-6 items-center rounded-full border px-2 text-xs font-medium",
                    ok ? "border-success-border bg-success-subtle text-success-foreground" : "border-danger-border bg-danger-subtle text-danger-foreground"
                  )}
                >
                  {ok ? `ผ่าน ≥ ${c.min}` : "ห้ามใช้"}
                </span>
              </td>
              <td className="py-2 text-muted-foreground">{c.usage}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export function TypeScale() {
  return (
    <div className="flex flex-col divide-y divide-border">
      {tokens.type.map((t) => {
        const v = t.value as { fontSize: string; lineHeight: string; fontWeight: number }
        return (
          <div key={t.name} className="grid items-baseline gap-2 py-3 md:grid-cols-[10rem_1fr]">
            <div className="flex flex-col">
              <span className="font-mono text-[13px]">type-{t.name}</span>
              <span className="type-caption text-muted-foreground">
                {v.fontSize.startsWith("var") ? "14/20 · 13/20" : `${v.fontSize.replace("px", "")}/${v.lineHeight.replace("px", "")}`} · {v.fontWeight}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className={`type-${t.name}`}>คำสั่งซื้อ SP2510300001 · ฿1,280.00 · ปุ่ม ญี่ปุ่น</span>
              <span className="type-caption text-muted-foreground">{t.description}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function SpacingScale() {
  return (
    <div className="flex flex-col gap-1">
      {tokens.spacing.map((t) => (
        <div key={t.name} className="grid grid-cols-[4rem_4rem_1fr] items-center gap-3 text-sm">
          <span className="font-mono text-[13px]">{t.name}</span>
          <span className="font-mono text-[13px] text-muted-foreground">{t.value}</span>
          <span className="flex items-center gap-3">
            <span className="h-3 rounded-sm bg-primary" style={{ width: t.value }} />
            <span className="text-muted-foreground">{t.description}</span>
          </span>
        </div>
      ))}
    </div>
  )
}

export function DensityTable() {
  const names = [...new Set(tokens.density.map((t) => t.name.split(".")[1]))]
  const get = (mode: string, name: string) => tokens.density.find((t) => t.name === `${mode}.${name}`)
  return (
    <table className="w-full type-table">
      <thead>
        <tr className="border-b border-border text-left text-foreground-secondary">
          <th className="py-2 pr-3 font-medium">Token</th>
          <th className="py-2 pr-3 text-right font-medium">Comfortable (iPad)</th>
          <th className="py-2 pr-3 text-right font-medium">Compact (Desktop)</th>
          <th className="py-2 font-medium">ใช้กับ</th>
        </tr>
      </thead>
      <tbody>
        {names.map((n) => (
          <tr key={n} className="border-b border-border">
            <td className="py-2 pr-3 font-mono text-[13px]">--{n}</td>
            <td className="py-2 pr-3 text-right font-mono text-[13px]">{get("comfortable", n)?.value as string}</td>
            <td className="py-2 pr-3 text-right font-mono text-[13px]">{get("compact", n)?.value as string}</td>
            <td className="py-2 text-muted-foreground">{get("comfortable", n)?.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function RadiusAndShadow() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4">
        {tokens.radius.map((t) => (
          <div key={t.name} className="flex flex-col items-center gap-2 text-center">
            <span className="size-20 border-2 border-primary bg-accent" style={{ borderRadius: t.value as string }} />
            <span className="font-mono text-[13px]">rounded-{t.name === "full" ? "4xl" : t.name}</span>
            <span className="type-caption text-muted-foreground">
              {t.value as string}
              <br />
              {t.description}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-6 rounded-xl bg-secondary p-6">
        {tokens.shadows.map((t) => (
          <div key={t.name} className="flex w-40 flex-col gap-2">
            <span className="h-20 rounded-xl bg-background" style={{ boxShadow: t.value as string }} />
            <span className="font-mono text-[13px]">shadow-{t.name}</span>
            <span className="type-caption text-muted-foreground">{t.description}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
