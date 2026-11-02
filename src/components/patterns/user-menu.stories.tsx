import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, waitFor, within } from "storybook/test"

import {
  Sidebar,
  SidebarFooter,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { UserMenu } from "./user-menu"

const user = {
  name: "ผู้ใช้ ทดสอบ",
  email: "test.user@example.com",
  role: "Ops",
}

const meta = {
  title: "Components/User Menu",
  component: UserMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      story: { inline: false, height: "420px" },
      description: {
        component:
          "การ์ดผู้ใช้ใน footer ของ sidebar ตามแบบ sidebar-07 ของ shadcn: อวาตาร์ ชื่อ และอีเมล แตะแล้วเปิดเมนูขึ้นด้านบน มีบทบาทและปุ่มออกจากระบบ เมื่อ sidebar ยุบเป็นไอคอนจะเหลือเฉพาะอวาตาร์ ใช้ผ่าน `footer` ของ `AppShell`",
      },
    },
  },
  args: { user, onLogout: fn() },
  decorators: [
    (Story) => (
      <SidebarProvider className="min-h-[400px]">
        <Sidebar collapsible="icon">
          <div className="flex-1" />
          <SidebarFooter>
            <Story />
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    ),
  ],
} satisfies Meta<typeof UserMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const OpenAndLogout: Story = {
  name: "Interaction: open menu and sign out",
  // While the dropdown is open, Radix marks the rest of the page aria-hidden on purpose (modal menu).
  // That is expected, so this one rule is off for this interaction story only.
  parameters: {
    a11y: { config: { rules: [{ id: "aria-hidden-focus", enabled: false }] } },
  },
  play: async ({ canvasElement, args }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: /ผู้ใช้ ทดสอบ/ })
    )
    const body = within(document.body)
    await userEvent.click(
      await body.findByRole("menuitem", { name: "ออกจากระบบ" })
    )
    await waitFor(() => expect(args.onLogout).toHaveBeenCalledOnce())
  },
}
