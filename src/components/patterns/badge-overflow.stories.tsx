import type { Meta, StoryObj } from "@storybook/react-vite"
import { AlertTriangleIcon, StickyNoteIcon } from "lucide-react"

import { Badge, BadgeDot } from "@/components/ui/badge"
import { BadgeOverflow } from "./badge-overflow"

const meta = {
  title: "Patterns/Badge Overflow",
  component: BadgeOverflow,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "ใช้ในช่องของตารางที่มีหลายป้าย: แสดงสูงสุด 2 ป้าย (ปรับด้วย `max`) ที่เหลือย่อเป็น “…” ชี้หรือโฟกัสเพื่อดูทั้งหมด",
          "",
          "- ป้ายอยู่ **บรรทัดเดียว** ไม่ตกบรรทัด เพื่อให้ทุกแถวสูงเท่ากัน ช่องจึงกว้างตามป้ายสองอัน + “…” ให้เผื่อความกว้างคอลัมน์ประมาณ 18rem",
          "- ใส่ป้ายที่สำคัญที่สุดไว้ก่อน (เช่น สถานะงาน) เพราะป้ายท้าย ๆ จะถูกซ่อน",
          "- ป้ายที่ผู้ใช้ต้องรู้ทันที (เช่น เงื่อนไขที่ต้องแก้) ไม่ควรอยู่หลังตำแหน่งที่ 2 ถ้าเป็นไปได้ หรือให้รายละเอียดซ้ำในหน้ารายละเอียด",
          "- บน iPad ไม่มี hover: เปิดดูทั้งหมดได้จากหน้ารายละเอียดของแถว",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BadgeOverflow>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  <Badge key="1" variant="warning">
    <BadgeDot />
    รอตรวจสอบ
  </Badge>,
  <Badge key="2" variant="destructive">
    <AlertTriangleIcon data-icon="inline-start" />
    ลูกค้ายกเลิก
  </Badge>,
  <Badge key="3" variant="destructive">
    <AlertTriangleIcon data-icon="inline-start" />
    สงสัยคำสั่งซื้อซ้ำ
  </Badge>,
  <Badge key="4" variant="highlight">
    <StickyNoteIcon data-icon="inline-start" />
    มีโน้ต
  </Badge>,
]

export const OverTwo: Story = {
  name: "More than 2 (collapsed)",
  args: { items },
}
export const TwoOrFewer: Story = {
  name: "2 or fewer (no ellipsis)",
  args: { items: items.slice(0, 2) },
}
