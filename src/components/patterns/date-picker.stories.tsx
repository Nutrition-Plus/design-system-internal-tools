import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { ORDERS } from "@/fixtures/orders"
import {
  DatePicker,
  defaultDatePresets,
  DateRangeFilter,
  DateRangePicker,
  formatDate,
  type DateRange,
} from "./date-picker"

const OCT = new Date(2026, 9, 1)

const meta = {
  title: "Components/Date Picker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      story: { inline: false, height: "520px" },
      description: {
        component: [
          "เลือกวันที่จากปฏิทินในป๊อปอัป ใช้ **DatePicker** สำหรับวันเดียว และ **DateRangeFilter** สำหรับกรองรายการตามช่วงเวลา (สอง picker วางซ้ายขวา: ซ้ายคือวันเริ่ม ขวาคือวันสิ้นสุด)",
          "",
          "- ช่องวันที่ใช้กล่องเดียวกับ Input (พื้นขาว ขอบ 1px ความสูงเท่ากัน) ปิดใช้งานเป็นพื้นเทา",
          "- แสดงปี **ค.ศ.** (เช่น 30 ต.ค. 2026) ตามกติกาของโปรเจกต์",
          "- ปฏิทินมีเมนู **เดือน** และ **ปี** ให้กระโดดได้เร็ว (ไม่ต้องกดเดือนถัดไปทีละครั้ง) ปีแสดงเป็น ค.ศ. ปรับช่วงปีด้วย `yearRange`",
          "- **DateRangeFilter** วางสองช่องซ้าย-ขวาเสมอ (ไม่ตกบรรทัด) วันสิ้นสุดเลือกก่อนวันเริ่มไม่ได้ และกลับกัน ตัวกรองจึงไม่มีทางกลับด้าน เว้นช่องใดช่องหนึ่งว่างได้ (ช่วงปลายเปิด) มีป้ายลัด วันนี้ / เมื่อวาน / 7 วันที่แล้ว / 30 วันที่แล้วในแต่ละช่อง",
          "- **DateRangePicker** ทางเลือกแบบช่องเดียว: ปฏิทินแบบ Range กดวันเริ่มแล้วกดวันสิ้นสุด จอกว้างแสดง 2 เดือนซ้าย-ขวา จอแคบ (< 768px) แสดงเดือนเดียว",
          "- ใช้คีย์บอร์ดได้: ลูกศรเลื่อนวัน, PageUp/PageDown เปลี่ยนเดือน, Enter เลือก, Esc ปิด",
          "- ช่วงที่ใช้บ่อย เช่น วันนี้ / 7 วันล่าสุด ควรทำเป็นปุ่มลัดแยกต่างหาก ไม่ซ่อนในปฏิทิน",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

function SinglePicker({
  initial,
  disabled,
}: {
  initial?: Date
  disabled?: boolean
}) {
  const [value, setValue] = React.useState<Date | undefined>(initial)
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="dp-single">วันที่สั่งซื้อ</FieldLabel>
      <DatePicker
        id="dp-single"
        value={value}
        onChange={setValue}
        defaultMonth={OCT}
        disabled={disabled}
      />
      <FieldDescription>
        {value ? `เลือก ${formatDate(value)}` : "ยังไม่ได้เลือกวันที่"}
      </FieldDescription>
    </Field>
  )
}

export const Single: Story = {
  args: { onChange: () => undefined },
  render: () => <SinglePicker />,
}

export const SingleStates: Story = {
  name: "Single: filled and disabled",
  args: { onChange: () => undefined },
  render: () => (
    <div className="grid max-w-2xl gap-6 md:grid-cols-2">
      <SinglePicker initial={new Date(2026, 9, 15)} />
      <Field className="max-w-xs">
        <FieldLabel htmlFor="dp-disabled">ปิดใช้งาน</FieldLabel>
        <DatePicker
          id="dp-disabled"
          onChange={() => undefined}
          disabled
          placeholder="เลือกไม่ได้"
        />
      </Field>
    </div>
  ),
}

const TODAY = new Date(2026, 9, 30)

function matchesIn(range: DateRange) {
  return ORDERS.filter((order) => {
    const day = new Date(order.createdAt)
    day.setHours(0, 0, 0, 0)
    if (range.from && day < range.from) return false
    if (range.to && day > range.to) return false
    return true
  }).length
}

function FilterDemo() {
  const [range, setRange] = React.useState<DateRange>({})
  return (
    <div className="flex flex-col gap-4">
      <DateRangeFilter
        value={range}
        onChange={setRange}
        defaultMonth={OCT}
        today={TODAY}
      />
      <p role="status" className="text-sm text-muted-foreground tabular-nums">
        {range.from || range.to
          ? `สั่งซื้อ ${range.from ? formatDate(range.from) : "ตั้งแต่ต้น"} – ${range.to ? formatDate(range.to) : "ถึงล่าสุด"}`
          : "ทุกช่วงเวลา"}
        {" · "}พบ {matchesIn(range)} จาก {ORDERS.length} รายการ (ข้อมูลตัวอย่าง)
      </p>
    </div>
  )
}

export const RangeFilter: Story = {
  name: "Range filter (start | end)",
  args: { onChange: () => undefined },
  parameters: { docs: { story: { inline: false, height: "560px" } } },
  render: () => <FilterDemo />,
}

export const PickRange: Story = {
  name: "Interaction: pick start and end",
  args: { onChange: () => undefined },
  render: () => <FilterDemo />,
  // While a popover is open Radix hides the rest of the page from assistive tech on purpose.
  parameters: {
    a11y: { config: { rules: [{ id: "aria-hidden-focus", enabled: false }] } },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(document.body)

    // Start (left)
    await userEvent.click(canvas.getByRole("button", { name: "จากวันที่" }))
    await userEvent.click(
      await body.findByRole("button", { name: /29 ตุลาคม/ })
    )
    await waitFor(() =>
      expect(
        canvas.getByRole("button", { name: "จากวันที่" })
      ).toHaveTextContent("29 ต.ค. 2026")
    )

    // End (right): days before the start are disabled, so the range cannot be inverted
    await userEvent.click(canvas.getByRole("button", { name: "ถึงวันที่" }))
    await expect(
      await body.findByRole("button", { name: /28 ตุลาคม/ })
    ).toBeDisabled()
    await userEvent.click(body.getByRole("button", { name: /30 ตุลาคม/ }))
    await expect(await canvas.findByRole("status")).toHaveTextContent(
      "29 ต.ค. 2026 – 30 ต.ค. 2026"
    )
  },
}

function RangeCalendarDemo() {
  const [range, setRange] = React.useState<DateRange>({})
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="drp">วันที่สั่งซื้อ</FieldLabel>
      <DateRangePicker
        id="drp"
        value={range}
        onChange={setRange}
        defaultMonth={OCT}
        today={TODAY}
      />
      <FieldDescription>
        {range.from
          ? `${formatDate(range.from)} – ${range.to ? formatDate(range.to) : "…"}`
          : "ยังไม่ได้เลือกช่วง"}
      </FieldDescription>
    </Field>
  )
}

export const RangeCalendar: Story = {
  name: "Range calendar (single field)",
  args: { onChange: () => undefined },
  parameters: { docs: { story: { inline: false, height: "560px" } } },
  render: () => <RangeCalendarDemo />,
}

export const YearSelect: Story = {
  name: "Interaction: jump to another year",
  args: { onChange: () => undefined },
  render: () => <SinglePicker />,
  parameters: {
    a11y: { config: { rules: [{ id: "aria-hidden-focus", enabled: false }] } },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(document.body)
    await userEvent.click(
      canvas.getByRole("button", { name: "วันที่สั่งซื้อ" })
    )
    // Year dropdown instead of clicking "previous month" dozens of times
    await userEvent.selectOptions(
      await body.findByRole("combobox", { name: "ปี" }),
      "2024"
    )
    await userEvent.click(
      await body.findByRole("button", { name: /(^|\D)15(\D|$)/ })
    )
    await expect(
      canvas.getByRole("button", { name: "วันที่สั่งซื้อ" })
    ).toHaveTextContent("15 ต.ค. 2024")
  },
}

function PresetPicker() {
  const [value, setValue] = React.useState<Date | undefined>()
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="dp-presets">วันที่สั่งซื้อ</FieldLabel>
      <DatePicker
        id="dp-presets"
        value={value}
        onChange={setValue}
        defaultMonth={OCT}
        presets={defaultDatePresets(TODAY)}
      />
      <FieldDescription>
        {value ? `เลือก ${formatDate(value)}` : "ยังไม่ได้เลือกวันที่"}
      </FieldDescription>
    </Field>
  )
}

export const WithPresets: Story = {
  name: "Single with presets",
  args: { onChange: () => undefined },
  parameters: { docs: { story: { inline: false, height: "560px" } } },
  render: () => <PresetPicker />,
}

export const PickPreset: Story = {
  name: "Interaction: pick a preset",
  args: { onChange: () => undefined },
  render: () => <PresetPicker />,
  parameters: {
    a11y: { config: { rules: [{ id: "aria-hidden-focus", enabled: false }] } },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(document.body)
    await userEvent.click(
      canvas.getByRole("button", { name: "วันที่สั่งซื้อ" })
    )
    await userEvent.click(await body.findByRole("button", { name: "เมื่อวาน" }))
    await expect(
      canvas.getByRole("button", { name: "วันที่สั่งซื้อ" })
    ).toHaveTextContent("29 ต.ค. 2026")
  },
}
