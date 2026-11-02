import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { Checkbox } from "./checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "./field"

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "เลือกได้หลายค่า หรือยืนยันเงื่อนไข 1 ข้อ กล่องขนาด 18px แต่พื้นที่แตะ ≥ 44px ในโหมด comfortable",
          "",
          "- **indeterminate** ใช้กับ “เลือกทั้งหมด” ในตารางเมื่อเลือกบางแถว",
          "- จัดกลุ่มด้วย `FieldSet` + `FieldLegend` ไม่ใช้ div + หัวข้อ",
          "- ถ้ามีผลทันที (เปิด/ปิดฟีเจอร์) ให้ใช้ Switch แทน",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const States: Story = {
  render: () => (
    <FieldGroup className="max-w-md">
      <Field orientation="horizontal">
        <Checkbox id="c1" />
        <FieldLabel htmlFor="c1">ยังไม่เลือก</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="c2" defaultChecked />
        <FieldLabel htmlFor="c2">เลือกแล้ว</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="c3" checked="indeterminate" aria-label="เลือกบางรายการ" />
        <FieldLabel htmlFor="c3">เลือกบางรายการ (indeterminate)</FieldLabel>
      </Field>
      <Field orientation="horizontal" data-disabled>
        <Checkbox id="c4" disabled />
        <FieldLabel htmlFor="c4">ปิดใช้งาน</FieldLabel>
      </Field>
      <Field orientation="horizontal" data-invalid>
        <Checkbox id="c5" aria-invalid aria-describedby="c5-error" />
        <div className="flex flex-col gap-1">
          <FieldLabel htmlFor="c5">ยืนยันที่อยู่กับลูกค้าแล้ว *</FieldLabel>
          <FieldError id="c5-error">ต้องยืนยันก่อนบันทึก</FieldError>
        </div>
      </Field>
    </FieldGroup>
  ),
}

export const Group: Story = {
  render: () => (
    <FieldSet className="max-w-md">
      <FieldLegend variant="label">ช่องทางที่ต้องการซิงก์</FieldLegend>
      <FieldDescription>เลือกได้มากกว่า 1 ช่องทาง</FieldDescription>
      <FieldGroup className="gap-3">
        {["Shopee", "Lazada", "TikTok Shop", "LINE Shopping"].map((c, i) => (
          <Field key={c} orientation="horizontal">
            <Checkbox id={`ch-${i}`} defaultChecked={i < 2} />
            <FieldLabel htmlFor={`ch-${i}`}>{c}</FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </FieldSet>
  ),
}

export const Toggle: Story = {
  name: "Interaction: toggle with keyboard",
  render: () => (
    <Field orientation="horizontal">
      <Checkbox id="kb" />
      <FieldLabel htmlFor="kb">รับแจ้งเตือน</FieldLabel>
    </Field>
  ),
  play: async ({ canvasElement }) => {
    const box = within(canvasElement).getByRole("checkbox", {
      name: "รับแจ้งเตือน",
    })
    await userEvent.tab()
    await expect(box).toHaveFocus()
    await userEvent.keyboard(" ")
    await expect(box).toBeChecked()
  },
}
