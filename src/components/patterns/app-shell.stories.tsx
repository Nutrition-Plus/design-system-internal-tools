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
          "โครงหน้ามาตรฐาน `AppShell`: Sidebar (ยุบเป็นไอคอนได้ · เป็น Sheet บนจอ < 768px) + แถบบนพร้อม Breadcrumb",
          "",
          '- เมนูที่เลือกใช้พื้น Accent + ตัวอักษร Primary และมี `aria-current="page"`',
          "- เมนูที่มี `children` กางและพับได้ (ลูกศรหมุน) เมนูย่อยมีเส้นแนวตั้งด้านซ้าย ตามแบบ sidebar-07 ของ shadcn · เมนูที่ไม่มีลูกใช้ `badge` แสดงจำนวนงานที่ต้องจัดการ",
          "- กด `Ctrl/⌘ + B` เพื่อยุบหรือขยาย sidebar",
          "- **แต่ละระบบปรับได้:** ชื่อระบบ โลโก้ เมนู กลุ่มเมนู และส่วนขวาของแถบบน",
        ].join("\n"),
      },
    },
  },
  args: {
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
    breadcrumbs: [{ label: "หน้าแรก", href: "#" }, { label: "คำสั่งซื้อ" }],
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
