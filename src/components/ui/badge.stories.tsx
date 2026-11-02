import type { Meta, StoryObj } from "@storybook/react-vite"
import { AlertTriangleIcon, StickyNoteIcon } from "lucide-react"

import { Guidance, Matrix, Row } from "@/docs/story-helpers"
import { Badge, BadgeDot } from "./badge"

const VARIANTS = [
  "secondary",
  "outline",
  "default",
  "accent",
  "info",
  "success",
  "warning",
  "destructive",
  "highlight",
] as const

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "ป้ายสถานะหรือหมวดหมู่ ความสูง 24px ทุก density",
          "",
          "| Variant | ความหมาย |",
          "|-|-|",
          "| `secondary` (ค่าเริ่มต้น) | ข้อมูลทั่วไป ไม่มีความหมายเชิงสถานะ |",
          "| `outline` | หมวดหมู่ เช่น ช่องทางขาย |",
          "| `accent` | ถูกเลือก / พร้อมดำเนินการ |",
          "| `info` · `success` · `warning` · `destructive` | สถานะตามสีมาตรฐาน |",
          "| `highlight` | ป้ายพิเศษ เช่น มีโน้ต (ใช้น้อย) |",
          "",
          "**กฎสี:** ตัวอักษรใช้สีเข้มบนพื้นอ่อน (≥ 6:1) สีสด (#22C55E, #F59E0B, #EF4444, #0EA5E9) ใช้เฉพาะ `BadgeDot` ห้ามใช้เป็นสีตัวอักษร",
          "",
          "**สื่อความหมายด้วยข้อความเสมอ** ห้ามใช้สีอย่างเดียว · ไม่รวมหลายสถานะไว้ในป้ายเดียว (แสดงสถานะงาน + ป้ายข้างเคียงแยกกัน)",
          "",
          "หมายเหตุ: ค่าเริ่มต้นเปลี่ยนจาก `default` (Primary ทึบ) ของ shadcn เป็น `secondary` เพื่อไม่ให้ป้ายแย่งความสนใจจากปุ่มหลัก",
        ].join("\n"),
      },
    },
  },
  args: { children: "ป้าย" },
  argTypes: { variant: { control: "select", options: VARIANTS } },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: () => (
    <Matrix>
      {VARIANTS.map((variant) => (
        <Row key={variant} label={variant}>
          <Badge variant={variant}>ข้อความ</Badge>
          <Badge variant={variant}>
            <BadgeDot />
            มีจุดสถานะ
          </Badge>
          <Badge variant={variant}>
            <AlertTriangleIcon data-icon="inline-start" />
            มีไอคอน
          </Badge>
        </Row>
      ))}
    </Matrix>
  ),
}

export const StatusWithSideLabels: Story = {
  name: "In context: status + side labels",
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-1">
        <Badge variant="warning">
          <BadgeDot />
          รอตรวจสอบ
        </Badge>
        <Badge variant="destructive">
          <AlertTriangleIcon data-icon="inline-start" />
          ลูกค้ายกเลิก
        </Badge>
        <Badge variant="highlight">
          <StickyNoteIcon data-icon="inline-start" />
          มีโน้ต
        </Badge>
      </div>
      <Guidance
        doItems={[
          "แสดงสถานะหลักก่อน ตามด้วยป้ายข้างเคียง",
          "ใช้ข้อความสั้น 1–3 คำ",
          "ใช้ไอคอนเตือนกับป้ายที่ต้องแก้ไข",
        ]}
        dontItems={[
          "รวมสถานะกับปัญหาเป็นป้ายเดียว เช่น “รอตรวจ-ยกเลิก”",
          "ใช้ป้ายเป็นปุ่ม (ใช้ Button แทน)",
          "สร้างสีใหม่นอกเหนือจาก variants",
        ]}
      />
    </div>
  ),
}
