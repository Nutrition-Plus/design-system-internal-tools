import type { Meta, StoryObj } from "@storybook/react-vite"

import { ORDERS } from "@/fixtures/orders"
import { OrderDetailSheet } from "./order-detail-sheet"

const meta = {
  // Lock the preview to iPad Air width (1180px). Without this the story uses the real pane width,
  // and below 768px the OMS pages switch to the mobile layout.
  globals: { viewport: { value: "ipadAir", isRotated: false } },
  title: "Patterns/Order Detail",
  component: OrderDetailSheet,
  parameters: {
    layout: "fullscreen",
    docs: {
      story: { inline: false, height: "820px" },
      description: {
        component: [
          "รูปแบบหน้ารายละเอียด เปิดเป็น **Sheet ด้านขวา** เมื่อแตะแถวในตาราง (ผู้ใช้ยังเห็นบริบทของรายการเดิม)",
          "",
          "1. **Header**: รหัส (mono) → เวลาและช่องทาง → สถานะงาน + ป้ายข้างเคียง",
          "2. **เงื่อนไขที่ต้องแก้**: Alert `warning` แสดงก่อนข้อมูลอื่น พร้อมรายการสาเหตุทั้งหมด",
          '3. **ข้อมูลจัดกลุ่ม**: การ์ด `size="sm"` บนพื้น Secondary ใช้ `<dl>` สำหรับคู่ label–ค่า',
          "4. **Action bar ด้านล่าง**: ปุ่มหลักขวาสุด · ถ้ายังทำไม่ได้ให้ disabled และบอกเหตุผลใน Alert ด้านบน",
          "",
          "ถ้ารายละเอียดยาวมากหรือต้องแชร์ลิงก์ ให้ทำเป็นหน้าเต็มด้วยโครงเดียวกัน",
        ].join("\n"),
      },
    },
  },
  args: { onOpenChange: () => undefined },
} satisfies Meta<typeof OrderDetailSheet>

export default meta
type Story = StoryObj<typeof meta>

export const WithBlockers: Story = { args: { order: ORDERS[1] } }
export const ReadyToConfirm: Story = { args: { order: ORDERS[2] } }
