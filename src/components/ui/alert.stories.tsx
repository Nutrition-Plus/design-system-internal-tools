import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  InfoIcon,
  OctagonXIcon,
  RefreshCwIcon,
} from "lucide-react"
import { toast } from "sonner"

import { Alert, AlertAction, AlertDescription, AlertTitle } from "./alert"
import { Button } from "./button"

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "ข้อความแจ้งที่อยู่ในหน้า (inline) จนกว่าจะแก้ปัญหา ต่างจาก Toast ที่หายไปเอง",
          "",
          "| ใช้ | เมื่อ |",
          "|-|-|",
          "| **Alert** | ข้อมูลที่ต้องเห็นต่อเนื่อง เช่น เงื่อนไขที่ต้องแก้ สรุปข้อผิดพลาดของฟอร์ม ซิงก์ล้มเหลว |",
          "| **Toast** (`toast.success / toast.error`) | ผลของการกระทำที่เพิ่งทำ เช่น บันทึกสำเร็จ |",
          "| **Dialog** | ต้องให้ผู้ใช้ตัดสินใจก่อนไปต่อ |",
          "",
          '`destructive` และ `warning` ใช้ role="alert" (อ่านทันที) ส่วนแบบอื่นใช้ role="status"',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-3">
      <Alert>
        <InfoIcon />
        <AlertTitle>ค่าเริ่มต้น</AlertTitle>
        <AlertDescription>ข้อความแจ้งทั่วไปบนพื้นขาว</AlertDescription>
      </Alert>
      <Alert variant="info">
        <InfoIcon />
        <AlertTitle>รอบส่งบ่ายปิดรับเวลา 13:00 น.</AlertTitle>
        <AlertDescription>
          คำสั่งซื้อที่ยืนยันหลังเวลานี้จะเข้ารอบถัดไป
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <CheckCircle2Icon />
        <AlertTitle>ซิงก์ครบทุกช่องทางแล้ว</AlertTitle>
        <AlertDescription>ข้อมูลล่าสุดเมื่อ 09:00 น.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTriangleIcon />
        <AlertTitle>ต้องแก้ 2 เงื่อนไขก่อนจองรอบส่ง</AlertTitle>
        <AlertDescription>สงสัยคำสั่งซื้อซ้ำ · รสชาติไม่ตรง</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <OctagonXIcon />
        <AlertTitle>ซิงก์ Lazada ไม่สำเร็จ</AlertTitle>
        <AlertDescription>
          โทเคนหมดอายุ ผู้ดูแลระบบต้องเชื่อมต่อร้านค้าใหม่
        </AlertDescription>
        <AlertAction>
          <Button size="sm" variant="outline">
            <RefreshCwIcon data-icon="inline-start" />
            ลองใหม่
          </Button>
        </AlertAction>
      </Alert>
    </div>
  ),
}

export const Toasts: Story = {
  name: "Toast (feedback after an action)",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast.success("บันทึกแล้ว", { description: "SP2510300001" })
        }
      >
        สำเร็จ
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.error("บันทึกไม่สำเร็จ", {
            description: "ข้อมูลที่กรอกยังอยู่ ลองอีกครั้ง",
          })
        }
      >
        ล้มเหลว
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.warning("มีคำสั่งซื้อ 3 รายการที่ยังไม่ยืนยัน")}
      >
        เตือน
      </Button>
      <Button variant="outline" onClick={() => toast.info("กำลังส่งออกไฟล์")}>
        ข้อมูล
      </Button>
    </div>
  ),
}
