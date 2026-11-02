import type { Meta, StoryObj } from "@storybook/react-vite"

import { Avatar, AvatarFallback } from "./avatar"
import { Button } from "./button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card"

const meta = {
  title: "Components/Hover Card",
  component: HoverCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "ข้อมูลเพิ่มเติมที่แสดงเมื่อเอาเมาส์ชี้ (หรือกดค้าง) ที่ element ใช้สำหรับข้อมูลที่ไม่จำเป็นต้องเห็นเสมอ เช่น ข้อมูลย่อของลูกค้า",
          "",
          "**กติกา:** ห้ามเก็บข้อมูลสำคัญหรือปุ่มกดไว้ใน hover card เพราะบน iPad ไม่มี hover ผู้ใช้ต้องเปิดได้ด้วยการแตะ และข้อมูลเดียวกันต้องหาได้จากหน้ารายละเอียด",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <HoverCard openDelay={150}>
      <HoverCardTrigger asChild>
        <Button variant="link">@ลูกค้าทดสอบ 01</Button>
      </HoverCardTrigger>
      <HoverCardContent className="flex w-72 gap-3">
        <Avatar className="size-10 rounded-lg">
          <AvatarFallback className="rounded-lg">ลท</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1 text-sm">
          <span className="font-medium">ลูกค้าทดสอบ 01</span>
          <span className="text-muted-foreground">
            สั่งซื้อ 12 ครั้ง · ภูเก็ต
          </span>
          <span className="text-xs text-muted-foreground">
            ลูกค้าตั้งแต่ ต.ค. 2026
          </span>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}
