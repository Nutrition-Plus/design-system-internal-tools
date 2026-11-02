import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./field"
import { Textarea } from "./textarea"

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "ช่องกรอกข้อความหลายบรรทัด เช่น หมายเหตุ ที่อยู่ เหตุผล ใช้คู่กับ `Field` + `FieldLabel` เสมอ",
          "",
          "- กล่องเดียวกับ Input: พื้นขาว ขอบ 1px, hover ขอบเข้ม, โฟกัสขอบสีหลักพร้อมวงแสง, ปิดใช้งานเป็นพื้นเทา",
          "- สูงเริ่มต้น 4rem และขยายตามเนื้อหา (`field-sizing-content`) ผู้ใช้ลากปรับเองได้",
          "- ถ้ามีข้อจำกัดความยาว ให้แสดงตัวนับที่ `FieldDescription` ไม่ตัดข้อความเงียบ ๆ",
          "- Error: `aria-invalid` บน Textarea + `data-invalid` บน `Field` + `FieldError` ที่บอกวิธีแก้",
        ].join("\n"),
      },
    },
  },
  args: { placeholder: "พิมพ์ข้อความ" },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Field className="max-w-md">
      <FieldLabel htmlFor="ta-play">หมายเหตุ</FieldLabel>
      <Textarea id="ta-play" rows={3} {...args} />
    </Field>
  ),
}

export const States: Story = {
  render: () => (
    <FieldGroup className="grid max-w-3xl gap-6 md:grid-cols-2">
      <Field>
        <FieldLabel htmlFor="ta-default">ปกติ</FieldLabel>
        <Textarea
          id="ta-default"
          rows={3}
          placeholder="เช่น ลูกค้าขอรับของช่วงบ่าย"
        />
        <FieldDescription>ทีมแพ็กจะเห็นข้อความนี้</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="ta-filled">มีค่า</FieldLabel>
        <Textarea
          id="ta-filled"
          rows={3}
          defaultValue="99/1 หมู่ 4 ต.บางรักพัฒนา อ.บางบัวทอง จ.นนทบุรี 11110"
        />
      </Field>
      <Field data-invalid>
        <FieldLabel htmlFor="ta-error">ผิดพลาด *</FieldLabel>
        <Textarea
          id="ta-error"
          rows={3}
          aria-invalid
          aria-describedby="ta-error-msg"
          defaultValue="ซอย 5"
        />
        <FieldError id="ta-error-msg">
          กรอกที่อยู่อย่างน้อย 10 ตัวอักษร
        </FieldError>
      </Field>
      <Field data-disabled>
        <FieldLabel htmlFor="ta-disabled">ปิดใช้งาน</FieldLabel>
        <Textarea
          id="ta-disabled"
          rows={3}
          disabled
          defaultValue="แก้ไขไม่ได้หลังยืนยันที่อยู่"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="ta-readonly">อ่านอย่างเดียว</FieldLabel>
        <Textarea
          id="ta-readonly"
          rows={3}
          readOnly
          defaultValue="คัดลอกได้ แก้ไม่ได้"
        />
      </Field>
    </FieldGroup>
  ),
}

const LIMIT = 200

function CounterDemo() {
  const [value, setValue] = React.useState("")
  const over = value.length > LIMIT
  return (
    <Field className="max-w-md" data-invalid={over || undefined}>
      <FieldLabel htmlFor="ta-counter">เหตุผลที่เปลี่ยนขนส่ง *</FieldLabel>
      <Textarea
        id="ta-counter"
        rows={3}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-invalid={over || undefined}
        aria-describedby="ta-counter-desc"
      />
      <FieldDescription id="ta-counter-desc" className="tabular-nums">
        {value.length} / {LIMIT} ตัวอักษร
      </FieldDescription>
      {over && (
        <FieldError>
          เกิน {value.length - LIMIT} ตัวอักษร ตัดข้อความให้สั้นลง
        </FieldError>
      )}
    </Field>
  )
}

export const WithCounter: Story = {
  name: "With character counter",
  render: () => <CounterDemo />,
}

export const Typing: Story = {
  name: "Interaction: type and count",
  render: () => <CounterDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(
      canvas.getByLabelText(/เหตุผลที่เปลี่ยนขนส่ง/),
      "ลูกค้าขอเปลี่ยน"
    )
    await expect(canvas.getByText(/\d+ \/ 200 ตัวอักษร/)).toHaveTextContent(
      "15 / 200"
    )
  },
}
