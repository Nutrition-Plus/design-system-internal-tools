import type { Meta, StoryObj } from "@storybook/react-vite"
import { PackageIcon } from "lucide-react"

import { Badge, BadgeDot } from "./badge"
import { Button } from "./button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "จัดกลุ่มข้อมูลที่เกี่ยวข้องกัน ใช้ครบโครงสร้าง `CardHeader` / `CardTitle` / `CardDescription` / `CardContent` / `CardFooter`",
          "",
          '- `variant="default"` พื้นขาว + เส้นขอบ — ใช้บนพื้นขาวหรือพื้น Secondary',
          '- `variant="muted"` พื้น Secondary ไม่มีขอบ — ใช้จัดกลุ่มข้อมูลบนพื้นขาว',
          '- `size="sm"` สำหรับหน้ารายละเอียดหรือ sheet ที่มีหลายการ์ด',
          "- ไม่ซ้อนการ์ดในการ์ด และไม่ใช้เงาแทนเส้นขอบ",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {
  render: () => (
    <div className="grid max-w-4xl gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลคำสั่งซื้อ</CardTitle>
          <CardDescription>การ์ดมาตรฐาน พื้นขาว</CardDescription>
          <CardAction>
            <Button size="sm" variant="outline">
              แก้ไข
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="text-sm">เนื้อหาของการ์ด</CardContent>
        <CardFooter className="justify-end border-t border-border py-3">
          <Button size="sm">บันทึก</Button>
        </CardFooter>
      </Card>
      <Card variant="muted">
        <CardHeader>
          <CardTitle>ที่อยู่จัดส่ง</CardTitle>
          <CardDescription>
            variant="muted" สำหรับจัดกลุ่มข้อมูลบนพื้นขาว
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm">
          99/1 หมู่ 4 ต.บางรักพัฒนา อ.บางบัวทอง จ.นนทบุรี 11110
        </CardContent>
      </Card>
    </div>
  ),
}

export const Kpi: Story = {
  name: "KPI cards",
  render: () => (
    <div className="grid max-w-4xl gap-4 sm:grid-cols-3">
      {[
        {
          label: "รอตรวจสอบ",
          value: 19,
          badge: "warning" as const,
          note: "มี 5 รายการเกิน 24 ชม.",
        },
        {
          label: "พร้อมจองรอบ",
          value: 9,
          badge: "accent" as const,
          note: "รอบบ่ายปิด 13:00",
        },
        {
          label: "ส่งแล้ววันนี้",
          value: 142,
          badge: "success" as const,
          note: "ข้อมูลตัวอย่าง",
        },
      ].map((k) => (
        <Card key={k.label} size="sm">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <PackageIcon className="size-4" aria-hidden />
              {k.label}
            </CardDescription>
            <CardTitle className="type-display tabular-nums">
              {k.value}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={k.badge}>
              <BadgeDot />
              {k.note}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}
