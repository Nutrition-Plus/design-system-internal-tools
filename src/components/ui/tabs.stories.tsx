import type { Meta, StoryObj } from "@storybook/react-vite"
import { CalendarDaysIcon, CalendarIcon, CalendarRangeIcon } from "lucide-react"
import { expect, userEvent, within } from "storybook/test"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "สลับมุมมองของข้อมูลชุดเดียวกัน",
          "",
          '- `variant="line"` ระดับหน้า เช่น แบ่งคำสั่งซื้อตามสถานะ พร้อมตัวนับ',
          '- `variant="default"` (segmented) ระดับส่วนย่อย เช่น สลับ รายวัน/รายสัปดาห์',
          "- ใช้ลูกศรซ้าย/ขวาเลื่อนระหว่างแท็บ · `TabsTrigger` ต้องอยู่ใน `TabsList`",
          "- ไม่ใช้แท็บแทนขั้นตอน (wizard) หรือแทนเมนูนำทางไปหน้าอื่น",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const Count = ({ n }: { n: number }) => (
  <span className="rounded-full bg-secondary px-1.5 text-xs text-muted-foreground tabular-nums">
    {n}
  </span>
)

export const Line: Story = {
  render: () => (
    <Tabs defaultValue="review">
      <TabsList variant="line" aria-label="สถานะคำสั่งซื้อ">
        <TabsTrigger value="all">
          ทั้งหมด <Count n={64} />
        </TabsTrigger>
        <TabsTrigger value="review">
          รอตรวจสอบ <Count n={19} />
        </TabsTrigger>
        <TabsTrigger value="ready">
          พร้อมจองรอบ <Count n={9} />
        </TabsTrigger>
        <TabsTrigger value="shipped" disabled>
          ส่งแล้ว <Count n={0} />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all">รายการทั้งหมด</TabsContent>
      <TabsContent value="review">รายการที่รอตรวจสอบ</TabsContent>
      <TabsContent value="ready">รายการที่พร้อมจองรอบ</TabsContent>
    </Tabs>
  ),
}

export const Segmented: Story = {
  render: () => (
    <Tabs defaultValue="day">
      <TabsList aria-label="ช่วงเวลา">
        <TabsTrigger value="day">
          <CalendarDaysIcon />
          รายวัน
        </TabsTrigger>
        <TabsTrigger value="week">
          <CalendarRangeIcon />
          รายสัปดาห์
        </TabsTrigger>
        <TabsTrigger value="month">
          <CalendarIcon />
          รายเดือน
        </TabsTrigger>
      </TabsList>
      <TabsContent value="day">ข้อมูลรายวัน</TabsContent>
      <TabsContent value="week">ข้อมูลรายสัปดาห์</TabsContent>
      <TabsContent value="month">ข้อมูลรายเดือน</TabsContent>
    </Tabs>
  ),
}

export const Keyboard: Story = {
  name: "Interaction: arrow keys",
  render: Segmented.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("tab", { name: "รายวัน" }))
    await userEvent.keyboard("{ArrowRight}")
    await expect(canvas.getByRole("tab", { name: "รายสัปดาห์" })).toHaveFocus()
  },
}
