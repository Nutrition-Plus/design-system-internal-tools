import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts"

import { ChartCard } from "@/components/patterns/chart-card"
import { ToggleGroup, ToggleGroupItem } from "./toggle-group"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./chart"

// Synthetic data. Each channel keeps the same series slot in every chart (color follows the entity).
const DAYS = [
  { day: "24 ต.ค.", shopee: 38, lazada: 22, tiktok: 14, line: 9 },
  { day: "25 ต.ค.", shopee: 41, lazada: 25, tiktok: 18, line: 10 },
  { day: "26 ต.ค.", shopee: 36, lazada: 21, tiktok: 25, line: 8 },
  { day: "27 ต.ค.", shopee: 44, lazada: 28, tiktok: 22, line: 12 },
  { day: "28 ต.ค.", shopee: 49, lazada: 31, tiktok: 27, line: 11 },
  { day: "29 ต.ค.", shopee: 46, lazada: 27, tiktok: 33, line: 14 },
  { day: "30 ต.ค.", shopee: 52, lazada: 30, tiktok: 36, line: 13 },
].map((d) => ({ ...d, total: d.shopee + d.lazada + d.tiktok + d.line }))

const CHANNELS = {
  shopee: { label: "Shopee", color: "var(--chart-1)" },
  lazada: { label: "Lazada", color: "var(--chart-2)" },
  tiktok: { label: "TikTok Shop", color: "var(--chart-3)" },
  line: { label: "LINE Shopping", color: "var(--chart-4)" },
} satisfies ChartConfig

const TOTAL = {
  total: { label: "คำสั่งซื้อทั้งหมด", color: "var(--chart-1)" },
} satisfies ChartConfig

const STATUS = [
  { status: "รอตรวจสอบ", orders: 19 },
  { status: "ส่งแล้ว", orders: 18 },
  { status: "ใหม่", orders: 14 },
  { status: "จองรอบแล้ว", orders: 12 },
  { status: "พร้อมจองรอบ", orders: 9 },
  { status: "ออกใบปะหน้าแล้ว", orders: 6 },
  { status: "ส่งบางส่วน", orders: 4 },
]
const STATUS_CONFIG = {
  orders: { label: "คำสั่งซื้อ", color: "var(--chart-1)" },
} satisfies ChartConfig

const SHARE = ["shopee", "lazada", "tiktok", "line"].map((key) => ({
  channel: key,
  orders: DAYS.reduce((sum, d) => sum + d[key as "shopee"], 0),
  fill: `var(--color-${key})`,
}))

// Recessive chrome shared by every cartesian chart: solid hairline grid, no tick marks.
const grid = <CartesianGrid vertical={false} stroke="var(--border)" />
const xAxis = (
  <XAxis
    dataKey="day"
    tickLine={false}
    tickMargin={8}
    padding={{ left: 12, right: 12 }}
    axisLine={{ stroke: "var(--border)" }}
  />
)
const yAxis = <YAxis tickLine={false} axisLine={false} width={36} />
const BOX = "h-64 w-full aspect-auto"

const dayTable = (columns: { key: string; label: string }[]) => ({
  rowKey: "day",
  rowLabel: "วันที่",
  columns,
  rows: DAYS as unknown as Record<string, string | number>[],
})

const meta = {
  title: "Components/Chart",
  component: ChartContainer,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      story: { inline: false, height: "480px" },
      description: {
        component: [
          "กราฟสร้างบน Recharts ผ่าน `ChartContainer` ของ shadcn ข้อมูลในตัวอย่างทั้งหมดเป็นข้อมูลสังเคราะห์ ใช้ `ChartCard` ครอบเพื่อให้มีปุ่ม **ดูเป็นตาราง** ทุกกราฟ",
          "",
          "| ประเภท | ใช้เมื่อ |",
          "| --- | --- |",
          "| **Column (แท่งตั้ง)** | เทียบปริมาณตามช่วงเวลาสั้น ๆ เช่น คำสั่งซื้อรายวัน |",
          "| **Bar (แท่งนอน)** | จัดอันดับหมวดที่ชื่อยาว เช่น จำนวนตามสถานะ |",
          "| **Line** | แนวโน้มตามเวลาของหลายชุดข้อมูล (ไม่เกิน 4 เส้น) |",
          "| **Area** | แนวโน้มของชุดข้อมูลเดียวที่ต้องการเน้นปริมาณสะสม |",
          "| **Stacked column** | ยอดรวมต่อวันและสัดส่วนของแต่ละส่วนในวันนั้น |",
          "| **Donut** | สัดส่วนของทั้งหมดเมื่อมีไม่เกิน 4–6 ส่วนและไม่ต้องเทียบค่าใกล้กัน |",
          "",
          "**กติกา (ตรวจแล้วด้วยสคริปต์ตรวจสี)**",
          "- สีชุดข้อมูลใช้ `--chart-1` ถึง `--chart-8` **ตามลำดับเสมอ ไม่วนซ้ำ** และสีติดกับ **ช่องทางขาย** ไม่ใช่ลำดับแถว (Shopee เป็น chart-1 ทุกกราฟ) ชุดที่ 9 ให้รวมเป็น “อื่น ๆ”",
          "- ชุดข้อมูลเดียว ใช้สีเดียว (chart-1) ทุกแท่ง ห้ามไล่เฉดตามค่า",
          "- ห้ามกราฟสองแกน Y ถ้าหน่วยต่างกันให้แยกเป็นสองกราฟ",
          "- เส้น 2px, แท่งหนาไม่เกิน 24px มุมบนโค้ง 4px, พื้นที่โปร่ง 10%, เส้นตารางบางและทึบ ไม่ใช่เส้นประ",
          "- มี legend เมื่อมี 2 ชุดขึ้นไป · ไม่ใส่ตัวเลขทุกจุด (ใส่เฉพาะค่าสูงสุดหรือปลายแท่ง) ที่เหลือดูจาก tooltip และตาราง",
          "- สี chart-3, 4, 5 บนพื้นขาวต่ำกว่า 3:1 จึง **ต้องมี legend, tooltip และตารางข้อมูล** (ปุ่ม “ดูเป็นตาราง”) ห้ามให้สีเป็นช่องทางเดียวที่บอกความหมาย",
          "- v1 ยังไม่มีโหมดมืด ชุดสีของโหมดมืดต้องตรวจแยก",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof ChartContainer>

export default meta
type Story = StoryObj<typeof meta>

const maxIndex = DAYS.findIndex(
  (d) => d.total === Math.max(...DAYS.map((x) => x.total))
)

export const Column: Story = {
  name: "Column (bar vertical)",
  args: { config: TOTAL, children: <div /> },
  render: () => (
    <ChartCard
      title="คำสั่งซื้อรายวัน"
      description="จำนวนคำสั่งซื้อทุกช่องทาง 24–30 ต.ค. 2026 (ข้อมูลตัวอย่าง)"
      table={dayTable([{ key: "total", label: "คำสั่งซื้อ" }])}
    >
      <ChartContainer
        config={TOTAL}
        className={BOX}
        role="group"
        aria-label="กราฟแท่งคำสั่งซื้อรายวัน"
      >
        <BarChart data={DAYS} accessibilityLayer>
          {grid}
          {xAxis}
          {yAxis}
          <ChartTooltip
            cursor={{ fill: "var(--secondary)" }}
            content={<ChartTooltipContent hideLabel={false} />}
          />
          <Bar
            dataKey="total"
            fill="var(--color-total)"
            radius={[4, 4, 0, 0]}
            maxBarSize={24}
          >
            {/* label only the peak; the axis, tooltip and table carry the rest */}
            <LabelList
              dataKey="total"
              content={({ x, y, width, value, index }) =>
                index === maxIndex ? (
                  <text
                    x={Number(x) + Number(width) / 2}
                    y={Number(y) - 6}
                    textAnchor="middle"
                    className="fill-foreground text-xs font-medium"
                  >
                    {value}
                  </text>
                ) : null
              }
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ChartCard>
  ),
}

export const BarHorizontal: Story = {
  name: "Bar (horizontal ranking)",
  args: { config: STATUS_CONFIG, children: <div /> },
  render: () => (
    <ChartCard
      title="คำสั่งซื้อตามสถานะ"
      description="เรียงจากมากไปน้อย ณ วันที่ 30 ต.ค. 2026 (ข้อมูลตัวอย่าง)"
      table={{
        rowKey: "status",
        rowLabel: "สถานะ",
        columns: [{ key: "orders", label: "คำสั่งซื้อ" }],
        rows: STATUS,
      }}
    >
      <ChartContainer
        config={STATUS_CONFIG}
        className="aspect-auto h-72 w-full"
        role="group"
        aria-label="กราฟแท่งนอนคำสั่งซื้อตามสถานะ"
      >
        <BarChart
          data={STATUS}
          layout="vertical"
          margin={{ right: 32 }}
          accessibilityLayer
        >
          <YAxis
            dataKey="status"
            type="category"
            tickLine={false}
            axisLine={false}
            width={110}
          />
          <XAxis type="number" hide />
          <ChartTooltip
            cursor={{ fill: "var(--secondary)" }}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar
            dataKey="orders"
            fill="var(--color-orders)"
            radius={[0, 4, 4, 0]}
            maxBarSize={20}
          >
            <LabelList
              dataKey="orders"
              position="right"
              className="fill-foreground text-xs"
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ChartCard>
  ),
}

export const LineMulti: Story = {
  name: "Line (multiple series)",
  args: { config: CHANNELS, children: <div /> },
  render: () => (
    <ChartCard
      title="คำสั่งซื้อรายวันแยกช่องทาง"
      description="4 ช่องทาง 24–30 ต.ค. 2026 (ข้อมูลตัวอย่าง)"
      table={dayTable(
        Object.entries(CHANNELS).map(([key, c]) => ({ key, label: c.label }))
      )}
    >
      <ChartContainer
        config={CHANNELS}
        className={BOX}
        role="group"
        aria-label="กราฟเส้นคำสั่งซื้อรายวันแยกช่องทาง"
      >
        <LineChart data={DAYS} margin={{ right: 12 }} accessibilityLayer>
          {grid}
          {xAxis}
          {yAxis}
          <ChartTooltip
            cursor={{ stroke: "var(--border)" }}
            content={<ChartTooltipContent />}
          />
          <ChartLegend itemSorter={null} content={<ChartLegendContent />} />
          {Object.keys(CHANNELS).map((key) => (
            <Line
              key={key}
              dataKey={key}
              type="monotone"
              stroke={`var(--color-${key})`}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, stroke: "var(--card)", strokeWidth: 2 }}
            />
          ))}
        </LineChart>
      </ChartContainer>
    </ChartCard>
  ),
}

export const AreaSingle: Story = {
  name: "Area (single series)",
  args: { config: TOTAL, children: <div /> },
  render: () => (
    <ChartCard
      title="แนวโน้มคำสั่งซื้อรวม"
      description="ทุกช่องทาง 24–30 ต.ค. 2026 (ข้อมูลตัวอย่าง)"
      table={dayTable([{ key: "total", label: "คำสั่งซื้อ" }])}
    >
      <ChartContainer
        config={TOTAL}
        className={BOX}
        role="group"
        aria-label="กราฟพื้นที่แนวโน้มคำสั่งซื้อรวม"
      >
        <AreaChart data={DAYS} margin={{ right: 12 }} accessibilityLayer>
          {grid}
          {xAxis}
          {yAxis}
          <ChartTooltip
            cursor={{ stroke: "var(--border)" }}
            content={<ChartTooltipContent />}
          />
          <Area
            dataKey="total"
            type="monotone"
            stroke="var(--color-total)"
            strokeWidth={2}
            fill="var(--color-total)"
            fillOpacity={0.1}
            activeDot={{ r: 4, stroke: "var(--card)", strokeWidth: 2 }}
          />
        </AreaChart>
      </ChartContainer>
    </ChartCard>
  ),
}

export const StackedColumn: Story = {
  name: "Stacked column",
  args: { config: CHANNELS, children: <div /> },
  render: () => (
    <ChartCard
      title="คำสั่งซื้อรายวันแยกช่องทาง"
      description="ยอดรวมและสัดส่วนแต่ละช่องทาง (ข้อมูลตัวอย่าง)"
      table={dayTable(
        Object.entries(CHANNELS).map(([key, c]) => ({ key, label: c.label }))
      )}
    >
      <ChartContainer
        config={CHANNELS}
        className={BOX}
        role="group"
        aria-label="กราฟแท่งซ้อนคำสั่งซื้อรายวันแยกช่องทาง"
      >
        <BarChart data={DAYS} accessibilityLayer>
          {grid}
          {xAxis}
          {yAxis}
          <ChartTooltip
            cursor={{ fill: "var(--secondary)" }}
            content={<ChartTooltipContent />}
          />
          <ChartLegend itemSorter={null} content={<ChartLegendContent />} />
          {Object.keys(CHANNELS).map((key, i, all) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="orders"
              fill={`var(--color-${key})`}
              // 2px surface-colored gap between segments instead of a drawn border
              stroke="var(--card)"
              strokeWidth={2}
              maxBarSize={24}
              radius={i === all.length - 1 ? [4, 4, 0, 0] : 0}
            />
          ))}
        </BarChart>
      </ChartContainer>
    </ChartCard>
  ),
}

export const Donut: Story = {
  name: "Donut (part of whole)",
  args: { config: CHANNELS, children: <div /> },
  render: () => (
    <ChartCard
      title="สัดส่วนตามช่องทาง"
      description="คำสั่งซื้อรวม 7 วัน (ข้อมูลตัวอย่าง)"
      table={{
        rowKey: "label",
        rowLabel: "ช่องทาง",
        columns: [{ key: "orders", label: "คำสั่งซื้อ" }],
        rows: SHARE.map((s) => ({
          label: CHANNELS[s.channel as keyof typeof CHANNELS].label,
          orders: s.orders,
        })),
      }}
    >
      <ChartContainer
        config={CHANNELS}
        className="aspect-auto h-72 w-full"
        role="group"
        aria-label="กราฟโดนัทสัดส่วนคำสั่งซื้อตามช่องทาง"
      >
        <PieChart accessibilityLayer>
          <ChartTooltip
            content={<ChartTooltipContent nameKey="channel" hideLabel />}
          />
          <Pie
            data={SHARE}
            dataKey="orders"
            nameKey="channel"
            innerRadius={64}
            outerRadius={96}
            paddingAngle={2}
            strokeWidth={0}
          >
            <Label
              content={({ viewBox }) => {
                if (!viewBox || !("cx" in viewBox)) return null
                const total = SHARE.reduce((s, x) => s + x.orders, 0)
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      dy="-0.2em"
                      className="fill-foreground text-2xl font-semibold"
                    >
                      {total}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      dy="1.6em"
                      className="fill-muted-foreground text-xs"
                    >
                      คำสั่งซื้อ
                    </tspan>
                  </text>
                )
              }}
            />
          </Pie>
          <ChartLegend
            itemSorter={null}
            content={<ChartLegendContent nameKey="channel" />}
          />
        </PieChart>
      </ChartContainer>
    </ChartCard>
  ),
}

// ---- Changing colors -------------------------------------------------------------------------

const HUE = {
  blue: "น้ำเงิน",
  orange: "ส้ม",
  aqua: "เขียวอมฟ้า",
  yellow: "เหลือง",
  magenta: "ชมพู",
  green: "เขียว",
  violet: "ม่วง",
  red: "แดง",
} as const

// Hue order of each theme; the colors themselves come from --chart-1…8 in tokens.css / chart-themes.css.
const THEMES = [
  {
    id: "default",
    label: "น้ำเงิน (ค่าเริ่มต้น)",
    order: [
      "blue",
      "orange",
      "aqua",
      "yellow",
      "magenta",
      "green",
      "violet",
      "red",
    ],
    note: "CVD ΔE 9.1 · สายตาปกติ ΔE 19.6",
  },
  {
    id: "violet",
    label: "ม่วง",
    order: [
      "violet",
      "magenta",
      "green",
      "yellow",
      "red",
      "blue",
      "aqua",
      "orange",
    ],
    note: "CVD ΔE 9.2 · สายตาปกติ ΔE 20.8",
  },
  {
    id: "orange",
    label: "ส้ม",
    order: [
      "orange",
      "aqua",
      "green",
      "yellow",
      "magenta",
      "blue",
      "violet",
      "red",
    ],
    note: "CVD ΔE 9.2 · สายตาปกติ ΔE 15.0 (พอดีเกณฑ์ขั้นต่ำ)",
  },
] as const

function Swatches({ order }: { order: readonly (keyof typeof HUE)[] }) {
  return (
    <ol className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-foreground-secondary">
      {order.map((hue, i) => (
        <li key={hue} className="flex items-center gap-1.5">
          <span
            aria-hidden
            className="size-3 rounded-sm"
            style={{ background: `var(--chart-${i + 1})` }}
          />
          {i + 1}. {HUE[hue]}
        </li>
      ))}
    </ol>
  )
}

function ThemeDemo() {
  const [theme, setTheme] =
    React.useState<(typeof THEMES)[number]["id"]>("default")
  const current = THEMES.find((t) => t.id === theme)!
  return (
    <div data-chart-theme={theme} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span id="theme-label" className="text-sm font-medium">
          ชุดสีของกราฟ
        </span>
        <ToggleGroup
          type="single"
          variant="outline"
          size="sm"
          aria-labelledby="theme-label"
          value={theme}
          onValueChange={(v) => v && setTheme(v as typeof theme)}
          className="justify-start"
        >
          {THEMES.map((t) => (
            <ToggleGroupItem key={t.id} value={t.id}>
              {t.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <Swatches order={current.order} />
        <p className="text-xs text-muted-foreground">
          ตรวจด้วยสคริปต์ตรวจสีแล้ว: {current.note}
        </p>
      </div>
      <ChartCard
        title="คำสั่งซื้อรายวันแยกช่องทาง"
        description="ช่องทางเดิมได้สีตามลำดับของชุดสีที่เลือก (ข้อมูลตัวอย่าง)"
        table={dayTable(
          Object.entries(CHANNELS).map(([key, c]) => ({ key, label: c.label }))
        )}
      >
        <ChartContainer
          config={CHANNELS}
          className={BOX}
          role="group"
          aria-label="กราฟแท่งซ้อนคำสั่งซื้อรายวันแยกช่องทาง"
        >
          <BarChart data={DAYS} accessibilityLayer>
            {grid}
            {xAxis}
            {yAxis}
            <ChartTooltip
              cursor={{ fill: "var(--secondary)" }}
              content={<ChartTooltipContent />}
            />
            <ChartLegend itemSorter={null} content={<ChartLegendContent />} />
            {Object.keys(CHANNELS).map((key, i, all) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="orders"
                fill={`var(--color-${key})`}
                stroke="var(--card)"
                strokeWidth={2}
                maxBarSize={24}
                radius={i === all.length - 1 ? [4, 4, 0, 0] : 0}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </ChartCard>
    </div>
  )
}

export const ColorThemes: Story = {
  name: "Color change: themes",
  args: { config: CHANNELS, children: <div /> },
  parameters: {
    docs: {
      story: { inline: false, height: "720px" },
      description: {
        story: [
          'สลับชุดสีของกราฟได้ 3 ชุด ตั้งครั้งเดียวที่ระดับแอป: `<html data-chart-theme="violet">` กราฟทุกตัวใต้ element นั้นเปลี่ยนตาม ไม่ต้องแก้โค้ดกราฟ',
          "",
          "- ทุกชุดใช้ 8 สีเดิม **เปลี่ยนแค่ลำดับ** เพราะลำดับคือสิ่งที่ทำให้สีแยกกันได้ในผู้ตาบอดสี ทุกชุดตรวจด้วยสคริปต์แล้ว (ตัวเลขใต้ชุดสี)",
          "- สีติดกับ **ช่องทางขาย** ในแอปเดียวกัน ห้ามให้กราฟหนึ่งใช้ชุดสีหนึ่งและอีกกราฟใช้อีกชุด ไม่เช่นนั้น Shopee จะเป็นคนละสีในแต่ละกราฟ",
          "- แดงและเขียวไม่เป็นสีแรกของชุดใด เพราะสงวนไว้เป็นสีสถานะ (ผิดพลาด / สำเร็จ)",
          "- จะเพิ่มชุดสีใหม่ ให้ลองลำดับกับสคริปต์ตรวจก่อนแล้วจึงเพิ่มใน `src/styles/chart-themes.css`",
        ].join("\n"),
      },
    },
  },
  render: () => <ThemeDemo />,
}

function SingleColorDemo() {
  const [slot, setSlot] = React.useState("1")
  const config = {
    total: { label: "คำสั่งซื้อทั้งหมด", color: `var(--chart-${slot})` },
  } satisfies ChartConfig
  const hue = THEMES[0].order[Number(slot) - 1]
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span id="slot-label" className="text-sm font-medium">
          สีของชุดข้อมูล
        </span>
        <ToggleGroup
          type="single"
          variant="outline"
          size="sm"
          aria-labelledby="slot-label"
          value={slot}
          onValueChange={(v) => v && setSlot(v)}
          className="justify-start"
        >
          {THEMES[0].order.map((h, i) => (
            <ToggleGroupItem
              key={h}
              value={String(i + 1)}
              aria-label={`${HUE[h]} (ช่องสี ${i + 1})`}
            >
              <span
                aria-hidden
                className="size-3 rounded-sm"
                style={{ background: `var(--chart-${i + 1})` }}
              />
              {i + 1}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <p className="text-xs text-muted-foreground">
          ใช้ช่องสี {slot}: {HUE[hue]} · ชุดข้อมูลเดียวใช้สีเดียวทุกแท่ง
        </p>
      </div>
      <ChartCard
        title="คำสั่งซื้อรายวัน"
        description="เลือกสีของชุดข้อมูลเดียวจาก 8 ช่องสีที่ตรวจแล้ว (ข้อมูลตัวอย่าง)"
        table={dayTable([{ key: "total", label: "คำสั่งซื้อ" }])}
      >
        <ChartContainer
          config={config}
          className={BOX}
          role="group"
          aria-label="กราฟแท่งคำสั่งซื้อรายวัน"
        >
          <BarChart data={DAYS} accessibilityLayer>
            {grid}
            {xAxis}
            {yAxis}
            <ChartTooltip
              cursor={{ fill: "var(--secondary)" }}
              content={<ChartTooltipContent />}
            />
            <Bar
              dataKey="total"
              fill="var(--color-total)"
              radius={[4, 4, 0, 0]}
              maxBarSize={24}
            />
          </BarChart>
        </ChartContainer>
      </ChartCard>
    </div>
  )
}

export const SingleSeriesColor: Story = {
  name: "Color change: single series",
  args: { config: TOTAL, children: <div /> },
  parameters: {
    docs: {
      story: { inline: false, height: "720px" },
      description: {
        story: [
          'ชุดข้อมูลเดียวเลือกสีได้จากช่องสี `--chart-1` ถึง `--chart-8` เท่านั้น (ส่งใน `ChartConfig` เป็น `color: "var(--chart-N)"`) ไม่ใช้ค่า hex ที่เลือกเอง',
          "",
          "- **สีต้องติดกับสิ่งที่วัด ไม่ใช่กราฟ**: ถ้า “คำสั่งซื้อรวม” เป็นสีม่วง กราฟอื่นที่แสดงสิ่งเดียวกันต้องเป็นสีม่วงเหมือนกัน",
          "- ห้ามใช้สีแดง (ช่อง 8) หรือเขียว (ช่อง 6) กับข้อมูลที่ไม่ใช่สถานะผิดพลาด/สำเร็จ ผู้อ่านจะตีความเป็นสถานะ",
          "- เหลือง ชมพู เขียวอมฟ้า บนพื้นขาวต่ำกว่า 3:1 ใช้ได้เมื่อมีตารางข้อมูลและ tooltip (มีให้ในทุกกราฟ)",
        ].join("\n"),
      },
    },
  },
  render: () => <SingleColorDemo />,
}
