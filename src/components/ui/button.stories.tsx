import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  CalendarPlusIcon,
  DownloadIcon,
  MoreHorizontalIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react"
import { expect, fn, userEvent, within } from "storybook/test"

import { Guidance, Matrix, Row } from "@/docs/story-helpers"
import { Button } from "./button"
import { Spinner } from "./spinner"

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "ปุ่มสำหรับการกระทำ ความสูงตาม density: **44px** (comfortable) / **32px** (compact)",
          "",
          "| Variant | ใช้เมื่อ |",
          "|-|-|",
          "| `default` | การกระทำหลักของหน้าหรือของ dialog — **ไม่เกิน 1 ปุ่มต่อบริเวณ** |",
          "| `outline` | การกระทำรองที่อยู่ข้างปุ่มหลัก เช่น ยกเลิก ส่งออก |",
          "| `secondary` | การกระทำรองบนพื้นขาวที่ต้องการน้ำหนักน้อยกว่า outline |",
          "| `ghost` | ปุ่มในตาราง toolbar หรือปุ่มไอคอนที่ไม่ต้องการกรอบ |",
          "| `destructive` | ลบหรือการกระทำที่ย้อนกลับไม่ได้ — ใช้คู่กับ ConfirmDialog |",
          "| `link` | ลิงก์ในเนื้อหาหรือในตาราง เช่น เลขที่คำสั่งซื้อ |",
          "",
          '**Loading:** ไม่มี prop `isLoading` — ใส่ `<Spinner data-icon="inline-start" />` + `disabled` + `aria-busy` และเปลี่ยนข้อความเป็น “กำลัง…”',
          "",
          "**ข้อควรระวัง:** ปุ่มไอคอนต้องมี `aria-label` เสมอ · ปุ่ม `sm` ในโหมด comfortable ยังมีพื้นที่แตะ 44px ผ่าน pseudo-element",
        ].join("\n"),
      },
    },
  },
  args: { children: "บันทึก", onClick: fn() },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "secondary",
        "ghost",
        "destructive",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: () => (
    <Matrix>
      {(
        [
          "default",
          "outline",
          "secondary",
          "ghost",
          "destructive",
          "link",
        ] as const
      ).map((variant) => (
        <Row key={variant} label={variant}>
          <Button variant={variant}>ปุ่ม {variant}</Button>
          <Button variant={variant}>
            <PlusIcon data-icon="inline-start" />
            มีไอคอน
          </Button>
          <Button variant={variant} disabled>
            ปิดใช้งาน
          </Button>
          <Button variant={variant} disabled aria-busy>
            <Spinner data-icon="inline-start" />
            กำลังบันทึก…
          </Button>
        </Row>
      ))}
    </Matrix>
  ),
}

export const Sizes: Story = {
  render: () => (
    <Matrix>
      <Row label="sm / default / lg">
        <Button size="sm">เล็ก</Button>
        <Button>ปกติ</Button>
        <Button size="lg">ใหญ่</Button>
      </Row>
      <Row label="icon (ต้องมี aria-label)">
        <Button size="icon-sm" variant="ghost" aria-label="ตัวเลือกเพิ่มเติม">
          <MoreHorizontalIcon />
        </Button>
        <Button size="icon" variant="outline" aria-label="ดาวน์โหลด">
          <DownloadIcon />
        </Button>
        <Button size="icon-lg" variant="destructive" aria-label="ลบ">
          <Trash2Icon />
        </Button>
      </Row>
    </Matrix>
  ),
}

export const InContext: Story = {
  name: "In context: page actions",
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-end gap-2 rounded-xl border border-border p-4">
        <Button variant="outline">
          <DownloadIcon data-icon="inline-start" />
          ส่งออก
        </Button>
        <Button>
          <CalendarPlusIcon data-icon="inline-start" />
          จองรอบส่ง
        </Button>
      </div>
      <Guidance
        doItems={[
          "ใช้ข้อความเป็นคำกริยาที่บอกผลลัพธ์ เช่น “จองรอบส่ง”",
          "วางปุ่มหลักไว้ขวาสุดของกลุ่ม",
          "ปิดปุ่มระหว่างบันทึกเพื่อกันกดซ้ำ",
        ]}
        dontItems={[
          "ใช้ปุ่ม default หลายปุ่มในบริเวณเดียว",
          "ใช้ข้อความกำกวม เช่น “ตกลง” หรือ “ส่ง”",
          "ใช้สีปุ่มแทนความหมายสถานะ เช่น ปุ่มเขียวแปลว่าสำเร็จ",
        ]}
      />
    </div>
  ),
}

export const KeyboardFocus: Story = {
  name: "Interaction: keyboard focus ring",
  render: () => (
    <div className="flex gap-3">
      <Button variant="outline">ยกเลิก</Button>
      <Button>บันทึก</Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.tab()
    await expect(canvas.getByRole("button", { name: "ยกเลิก" })).toHaveFocus()
    await userEvent.tab()
    await expect(canvas.getByRole("button", { name: "บันทึก" })).toHaveFocus()
  },
}
