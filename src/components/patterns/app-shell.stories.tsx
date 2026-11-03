import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  BarChart3Icon,
  HomeIcon,
  PackageIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"

import { AppShell } from "./app-shell"
import { PageHeader } from "./page-header"

const meta = {
  // Lock the preview to iPad Air width (1180px). Without this the story uses the real pane width,
  // and below 768px the OMS pages switch to the mobile layout.
  globals: { viewport: { value: "ipadAir", isRotated: false } },
  title: "Components/Navigation",
  component: AppShell,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      story: { inline: false, height: "600px" },
      description: {
        component: [
          "โครงหน้ามาตรฐาน `AppShell`: Sidebar (ยุบเป็นไอคอนได้ · เป็น Sheet บนจอ < 768px) และเนื้อหาที่เริ่มจากขอบบนเลย ไม่มีแถบบนบนจอใหญ่",
          "",
          '- เมนูที่เลือกใช้พื้น Accent + ตัวอักษร Primary และมี `aria-current="page"`',
          "- เมนูที่มี `children` กางและพับได้ (ลูกศรหมุน) เมนูย่อยมีเส้นแนวตั้งด้านซ้าย ตามแบบ sidebar-07 ของ shadcn · เมนูที่ไม่มีลูกใช้ `badge` แสดงจำนวนงานที่ต้องจัดการ",
          "- ด้านบนของ sidebar มีโลโก้และชื่อบริษัท (`brand`) ตามแบบ sidebar-07 ของ shadcn ปุ่มยุบหรือขยายเป็นวงกลมเล็กคร่อมขอบขวาของ sidebar ระดับเดียวกับโลโก้ ลูกศรชี้ซ้ายเมื่อเปิดและชี้ขวาเมื่อยุบ (บนมือถือเป็นปุ่มปิดใน sidebar)",
          "- กดปุ่มด้านบนของ sidebar หรือ `Ctrl/⌘ + B` เพื่อยุบหรือขยาย · บนจอ < 768px มีแถบบนแบบบางไว้เปิดเมนู",
          "- **แต่ละระบบปรับได้:** ชื่อบริษัท โลโก้ (`brand.logo` ใส่ `<img>` หรือไอคอน ถ้าไม่ใส่จะใช้ตัวอักษรแรกของชื่อ) เมนู และกลุ่มเมนู · สถานะของหน้า เช่น เวลาซิงก์ล่าสุด ให้ใส่ใน `meta` หรือ `actions` ของ `PageHeader`",
        ].join("\n"),
      },
    },
  },
  args: {
    brand: { name: "MOOVE", description: "Order Management", href: "#" },
    nav: [
      {
        items: [
          { title: "ภาพรวม", href: "#", icon: HomeIcon },
          {
            title: "คำสั่งซื้อ",
            href: "#orders",
            icon: PackageIcon,
            active: true,
            children: [
              { title: "ทั้งหมด", href: "#orders", active: true },
              { title: "รอตรวจสอบ", href: "#orders-review" },
            ],
          },
          { title: "รายงาน", href: "#reports", icon: BarChart3Icon },
        ],
      },
      {
        label: "ผู้ดูแลระบบ",
        items: [
          { title: "ผู้ใช้", href: "#users", icon: UsersIcon },
          { title: "ตั้งค่า", href: "#settings", icon: SettingsIcon },
        ],
      },
    ],
    children: (
      <PageHeader
        title="คำสั่งซื้อ"
        description="เนื้อหาของหน้าอยู่บนพื้นขาว"
      />
    ),
  },
} satisfies Meta<typeof AppShell>

export default meta
type Story = StoryObj<typeof meta>

export const Expanded: Story = {}
export const Collapsed: Story = { args: { defaultOpen: false } }
export const Mobile: Story = { globals: { viewport: { value: "mobile" } } }
