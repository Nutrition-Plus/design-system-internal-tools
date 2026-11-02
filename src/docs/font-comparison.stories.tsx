import type { Meta, StoryObj } from "@storybook/react-vite"

// Comparison candidates are loaded only in this story, not in the shipped theme.
import "@fontsource/anuphan/400.css"
import "@fontsource/anuphan/500.css"
import "@fontsource/anuphan/600.css"
import "@fontsource-variable/inter"
import "@fontsource-variable/jetbrains-mono"
import "@fontsource-variable/noto-sans-thai"

type Candidate = {
  id: string
  name: string
  sans: string
  mono: string
  note: string
}

const CANDIDATES: Candidate[] = [
  {
    id: "A",
    name: "IBM Plex Sans Thai + IBM Plex Sans + IBM Plex Mono",
    sans: '"IBM Plex Sans", "IBM Plex Sans Thai", sans-serif',
    mono: '"IBM Plex Mono", "IBM Plex Sans Thai", monospace',
    note: "ตัวตั้งต้น · ครอบครัวเดียวกันทั้งไทย อังกฤษ และ mono",
  },
  {
    id: "B",
    name: "Noto Sans Thai + Inter + JetBrains Mono",
    sans: '"Inter Variable", "Noto Sans Thai Variable", sans-serif',
    mono: '"JetBrains Mono Variable", "Noto Sans Thai Variable", monospace',
    note: "ทางเลือกที่ใช้กันแพร่หลาย · OMS ADR-009 กล่าวถึง Noto Sans Thai",
  },
  {
    id: "C",
    name: "Anuphan + Inter + IBM Plex Mono",
    sans: '"Inter Variable", "Anuphan", sans-serif',
    mono: '"IBM Plex Mono", "Anuphan", monospace',
    note: "Anuphan (Cadson Demak) ออกแบบให้เข้ากับฟอนต์ละตินสมัยใหม่",
  },
]

const ROWS = [
  {
    id: "ORD-O0O0-250930",
    sku: "CP-LYC-0O1",
    product: "Clear Protein รสลิ้นจี่ 350 มล.",
    qty: 24,
    amount: 1280,
  },
  {
    id: "ORD-0O0O-250931",
    sku: "HPM-CHO-I1l",
    product: "HPM นมโปรตีนสูง รสช็อกโกแลต",
    qty: 12,
    amount: 10000,
  },
  {
    id: "ORD-10O1-250932",
    sku: "LZM-PAD-O08",
    product: "Lazy Meal ผัดกะเพราไก่ ปุ้ยๆ",
    qty: 6,
    amount: 888.5,
  },
]

const fmt = (n: number) =>
  n.toLocaleString("th-TH", { minimumFractionDigits: 2 })

function Specimen({ c }: { c: Candidate }) {
  const numeric = {
    fontVariantNumeric: "tabular-nums",
    fontFeatureSettings: '"tnum", "zero"',
  } as const
  return (
    <section
      data-testid={`candidate-${c.id}`}
      className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5"
      style={{ fontFamily: c.sans }}
    >
      <header className="flex flex-col gap-0.5">
        <h2 className="type-h3">
          {c.id}. {c.name}
        </h2>
        <p className="type-caption text-muted-foreground">{c.note}</p>
      </header>

      {[12, 13, 14, 16].map((size) => (
        <div
          key={size}
          className="grid grid-cols-[3rem_1fr] items-baseline gap-3"
        >
          <span className="type-caption text-muted-foreground">{size}px</span>
          <p
            style={{ fontSize: size, lineHeight: size <= 13 ? "20px" : "1.6" }}
          >
            ที่อยู่จัดส่ง 99/123 หมู่ 4 ต.บางรักพัฒนา อ.บางบัวทอง จ.นนทบุรี
            11110 · ปุ่ม ญี่ปุ่น ฎีกา น้ำ ปู่ ฟุ้ง ปี่ ฐาน ปั้น · Order
            confirmed, ready to book · ฿1,280.00
          </p>
        </div>
      ))}

      <div className="grid grid-cols-[3rem_1fr] items-baseline gap-3">
        <span className="type-caption text-muted-foreground">weight</span>
        <p className="flex flex-wrap gap-4 text-sm">
          <span style={{ fontWeight: 400 }}>ปกติ 400 Regular</span>
          <span style={{ fontWeight: 500 }}>กลาง 500 Medium</span>
          <span style={{ fontWeight: 600 }}>หนา 600 Semibold</span>
        </p>
      </div>

      <div className="grid grid-cols-[3rem_1fr] items-baseline gap-3">
        <span className="type-caption text-muted-foreground">mono</span>
        <p
          style={{ fontFamily: c.mono, fontSize: 13 }}
          className="flex flex-wrap gap-x-6"
        >
          <span>ORD-O0O0-250930</span>
          <span>SKU 0O1lI|</span>
          <span>TH25093000O1</span>
          <span>รหัส 0O0O</span>
        </p>
      </div>

      <div className="grid grid-cols-[3rem_1fr] items-baseline gap-3">
        <span className="type-caption text-muted-foreground">sans 0/O</span>
        <p
          style={{ ...numeric, fontSize: 14 }}
          className="flex flex-wrap gap-x-6"
        >
          <span>O0O0 1Il| 8B</span>
          <span>1,111.00</span>
          <span>10,000.00</span>
        </p>
      </div>

      <table
        className="w-full border-collapse"
        style={{ fontSize: 13, lineHeight: "20px" }}
      >
        <thead className="bg-secondary text-left text-foreground-secondary">
          <tr>
            <th className="h-8 px-3 font-medium">เลขที่คำสั่งซื้อ</th>
            <th className="h-8 px-3 font-medium">สินค้า</th>
            <th className="h-8 px-3 text-right font-medium">จำนวน</th>
            <th className="h-8 px-3 text-right font-medium">ยอด (฿)</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.id} className="border-b border-border">
              <td className="h-9 px-3" style={{ fontFamily: c.mono }}>
                {r.id}
                <div className="text-xs text-muted-foreground">{r.sku}</div>
              </td>
              <td className="h-9 px-3">{r.product}</td>
              <td className="h-9 px-3 text-right" style={numeric}>
                {r.qty}
              </td>
              <td className="h-9 px-3 text-right" style={numeric}>
                {fmt(r.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

const meta = {
  title: "Foundations/Font Comparison",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "เปรียบเทียบฟอนต์ 3 ชุดด้วยข้อความไทย อังกฤษ ตัวเลข และรหัสจริง ที่ขนาด 12–16px. เกณฑ์: 0/O แยกชัดใน mono, ตัวเลขใช้ tnum, สระบน-ล่างไม่ถูกตัดที่ line-height 20px, ความสูงไทยกับอังกฤษใกล้กัน, มีน้ำหนัก 400/500/600",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const AllCandidates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {CANDIDATES.map((c) => (
        <Specimen key={c.id} c={c} />
      ))}
    </div>
  ),
}

export const SideBySide: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="grid gap-4 p-4 xl:grid-cols-3">
      {CANDIDATES.map((c) => (
        <Specimen key={c.id} c={c} />
      ))}
    </div>
  ),
}
