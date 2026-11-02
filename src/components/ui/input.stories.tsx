import type { Meta, StoryObj } from "@storybook/react-vite"
import { SearchIcon, XIcon } from "lucide-react"

import { Guidance } from "@/docs/story-helpers"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./field"
import { Input } from "./input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "./input-group"

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "ช่องกรอกข้อความ ใช้คู่กับ `Field` + `FieldLabel` เสมอ (label อยู่ด้านบน)",
          "",
          "- **Error:** `data-invalid` บน `Field` + `aria-invalid` บน `Input` + `FieldError` ที่ผูกด้วย `aria-describedby`",
          "- **Disabled vs read-only:** disabled = แก้ไม่ได้และไม่ส่งค่า, read-only = แสดงค่าเพื่ออ่าน/คัดลอก (พื้น Secondary ทั้งคู่ ตัวหนังสือยังอ่านได้)",
          '- **รหัส/ID:** ใส่ `className="font-mono"` เพื่อแยก 0 กับ O',
          "- **ข้อควรระวัง:** ขอบช่องใช้ token `input` (3.6:1) ห้ามใช้ `border` (1.36:1) เพราะผู้ใช้จะมองไม่เห็นขอบ",
        ].join("\n"),
      },
    },
  },
  args: { placeholder: "พิมพ์ข้อความ" },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="playground">ชื่อผู้รับ</FieldLabel>
      <Input id="playground" {...args} />
    </Field>
  ),
}

export const States: Story = {
  render: () => (
    <FieldGroup className="grid max-w-3xl gap-6 md:grid-cols-2">
      <Field>
        <FieldLabel htmlFor="s-default">ปกติ</FieldLabel>
        <Input id="s-default" placeholder="เช่น ผู้รับทดสอบ" />
        <FieldDescription>ข้อความช่วยอธิบาย</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="s-filled">มีค่า</FieldLabel>
        <Input id="s-filled" defaultValue="99/1 หมู่ 4 ต.บางรักพัฒนา" />
      </Field>
      <Field data-invalid>
        <FieldLabel htmlFor="s-error">ผิดพลาด *</FieldLabel>
        <Input
          id="s-error"
          aria-invalid
          aria-describedby="s-error-msg"
          defaultValue="1234"
        />
        <FieldError id="s-error-msg">
          รหัสไปรษณีย์ต้องเป็นตัวเลข 5 หลัก
        </FieldError>
      </Field>
      <Field data-disabled>
        <FieldLabel htmlFor="s-disabled">ปิดใช้งาน</FieldLabel>
        <Input id="s-disabled" disabled defaultValue="กรุงเทพมหานคร" />
      </Field>
      <Field>
        <FieldLabel htmlFor="s-readonly">อ่านอย่างเดียว</FieldLabel>
        <Input
          id="s-readonly"
          readOnly
          defaultValue="SP2510300001"
          className="font-mono"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="s-code">รหัส (mono)</FieldLabel>
        <Input
          id="s-code"
          className="font-mono uppercase"
          defaultValue="ORD-O0O0-250930"
        />
      </Field>
    </FieldGroup>
  ),
}

export const WithAddons: Story = {
  name: "Input group: search, prefix, suffix",
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput
          aria-label="ค้นหา"
          placeholder="ค้นหาเลขที่คำสั่งซื้อ"
          defaultValue="SP25"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" aria-label="ล้างคำค้นหา">
            <XIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>฿</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          aria-label="ราคา"
          inputMode="decimal"
          className="text-right tabular-nums"
          defaultValue="1,280.00"
        />
      </InputGroup>
      <InputGroup>
        <InputGroupInput
          aria-label="น้ำหนัก"
          inputMode="decimal"
          className="tabular-nums"
          defaultValue="12.5"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupText>กก.</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}

export const Usage: Story = {
  render: () => (
    <Guidance
      doItems={[
        "ใส่ label ทุกช่อง (placeholder ไม่ใช่ label)",
        "ใช้ inputMode ให้ตรงกับข้อมูล เช่น numeric, tel",
        "บอกรูปแบบที่ถูกต้องในข้อความ error",
      ]}
      dontItems={[
        "ใช้ placeholder ที่ดูเหมือนค่าจริง",
        "ตรวจและแสดง error ระหว่างที่ผู้ใช้ยังพิมพ์ไม่เสร็จ",
        "ล้างค่าที่กรอกเมื่อบันทึกไม่สำเร็จ",
      ]}
    />
  ),
}
