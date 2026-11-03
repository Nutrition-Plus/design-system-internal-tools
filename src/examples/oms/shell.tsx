import type * as React from "react"
import {
  BookOpenIcon,
  CalendarClockIcon,
  HomeIcon,
  PackageIcon,
  PrinterIcon,
  SettingsIcon,
  StickyNoteIcon,
  TagIcon,
  LifeBuoyIcon,
} from "lucide-react"

import { toast } from "sonner"

import { AppShell, type NavGroup } from "@/components/patterns/app-shell"
import { UserMenu } from "@/components/patterns/user-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type Page = "home" | "orders" | "booking"

function nav(active: Page): NavGroup[] {
  return [
    {
      items: [
        {
          title: "งานวันนี้",
          href: "#home",
          icon: HomeIcon,
          active: active === "home",
        },
        {
          title: "คำสั่งซื้อ",
          href: "#orders",
          icon: PackageIcon,
          active: active === "orders",
          children: [
            {
              title: "ทั้งหมด",
              href: "#orders",
              active: active === "orders",
              count: 64,
            },
            { title: "รอตรวจสอบ", href: "#orders-review", count: 19 },
            { title: "พร้อมจองรอบ", href: "#orders-ready", count: 9 },
          ],
        },
        {
          title: "จองรอบส่ง",
          href: "#booking",
          icon: CalendarClockIcon,
          active: active === "booking",
        },
        { title: "ใบปะหน้าและส่งออก", href: "#labels", icon: PrinterIcon },
        { title: "รหัสสินค้า", href: "#product-codes", icon: TagIcon },
        { title: "โน้ต", href: "#notes", icon: StickyNoteIcon },
        { title: "คำถามที่พบบ่อย", href: "#faqs", icon: BookOpenIcon },
        {
          title: "ตั้งค่า",
          href: "#settings",
          icon: SettingsIcon,
          children: [
            { title: "ร้านค้าและช่องทาง", href: "#settings-shops" },
            { title: "ขนส่ง", href: "#settings-couriers" },
          ],
        },
      ],
    },
  ]
}

export function OmsShell({
  active,
  children,
}: {
  active: Page
  children: React.ReactNode
}) {
  return (
    <AppShell
      // iPad (< 1280px): start with the icon rail so the table gets the width.
      defaultOpen={typeof window === "undefined" || window.innerWidth >= 1280}
      brand={{ name: "MOOVE", description: "Order Management", href: "#home" }}
      nav={nav(active)}
      footer={
        <>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="ช่วยเหลือ">
                <a href="#support">
                  <LifeBuoyIcon />
                  <span>ช่วยเหลือ</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <UserMenu
            user={{
              name: "ผู้ใช้ ทดสอบ",
              email: "test.user@example.com",
              role: "Ops",
            }}
            onLogout={async () => {
              await new Promise((r) => setTimeout(r, 600))
              toast.success("ออกจากระบบแล้ว", {
                description: "ตัวอย่างเท่านั้น ไม่ได้ออกจากระบบจริง",
              })
            }}
          />
          <p className="text-center text-[10px] leading-none text-foreground-subtle group-data-[collapsible=icon]:hidden">
            @nutrionplus
          </p>
        </>
      }
    >
      {children}
    </AppShell>
  )
}
