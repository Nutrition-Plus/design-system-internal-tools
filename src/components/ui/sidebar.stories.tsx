import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  HomeIcon,
  PackageIcon,
  SettingsIcon,
  TagIcon,
  UsersIcon,
} from "lucide-react"

import { PageHeader } from "@/components/patterns/page-header"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "./sidebar"

type DemoProps = { defaultOpen?: boolean }

function SidebarDemo({ defaultOpen = true }: DemoProps) {
  return (
    <SidebarProvider defaultOpen={defaultOpen} className="min-h-[560px]">
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="งานวันนี้">
                    <a href="#home">
                      <HomeIcon />
                      <span>งานวันนี้</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive tooltip="คำสั่งซื้อ">
                    <a href="#orders" aria-current="page">
                      <PackageIcon />
                      <span>คำสั่งซื้อ</span>
                    </a>
                  </SidebarMenuButton>
                  <SidebarMenuBadge aria-label="12 รายการ">12</SidebarMenuBadge>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>ข้อมูลอ้างอิง</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="รหัสสินค้า">
                    <a href="#codes">
                      <TagIcon />
                      <span>รหัสสินค้า</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="ผู้ใช้">
                    <a href="#users">
                      <UsersIcon />
                      <span>ผู้ใช้</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="ตั้งค่า">
                <a href="#settings">
                  <SettingsIcon />
                  <span>ตั้งค่า</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 px-4">
          <SidebarTrigger aria-label="เปิดหรือปิดเมนู" />
        </header>
        <div className="p-4">
          <PageHeader title="คำสั่งซื้อ" description="เนื้อหาของหน้า" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

const meta = {
  // Lock the preview to iPad Air width (1180px). Without this the story uses the real pane width,
  // and below 768px the OMS pages switch to the mobile layout.
  globals: { viewport: { value: "ipadAir", isRotated: false } },
  title: "Components/Sidebar",
  component: SidebarDemo,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      story: { inline: false, height: "600px" },
      description: {
        component: [
          "Sidebar ของ shadcn/ui ตามต้นฉบับ (ไม่ได้ปรับแก้) ประกอบด้วย `SidebarProvider` → `Sidebar` (`SidebarContent`, `SidebarGroup`, `SidebarMenu`, `SidebarFooter`, `SidebarRail`) และ `SidebarInset` สำหรับเนื้อหา",
          "",
          '- `collapsible="icon"` ยุบเป็นแถบไอคอน และใส่ `tooltip` ให้ทุกเมนู เพื่อให้ยังรู้ว่าไอคอนคืออะไร',
          '- เมนูที่เปิดอยู่ใช้ `isActive` และ `aria-current="page"`',
          "- กด `Ctrl/⌘ + B` เพื่อยุบหรือขยาย · บนจอ < 768px จะเป็น Sheet",
          "- ในแอปจริงใช้ผ่าน `AppShell` (ดู Components/Navigation) ซึ่งเพิ่มชื่อบริษัทและปุ่มยุบหรือขยายที่ด้านบนของ sidebar",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof SidebarDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Expanded: Story = {}
export const CollapsedToIcons: Story = { args: { defaultOpen: false } }
