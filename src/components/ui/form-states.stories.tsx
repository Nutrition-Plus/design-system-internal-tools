import type { Meta, StoryObj } from "@storybook/react-vite"
import { SearchIcon } from "lucide-react"

import { Guidance } from "@/docs/story-helpers"
import { Checkbox } from "./checkbox"
import { Field, FieldGroup, FieldLabel } from "./field"
import { Input } from "./input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"
import { Textarea } from "./textarea"

const meta = {
  title: "Components/Form States",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "เปรียบเทียบช่องกรอกที่ **ใช้งานได้ (enabled)** กับ **ปิดใช้งาน (disabled)** ในที่เดียว",
          "",
          "| สถานะ | หน้าตา |",
          "| --- | --- |",
          "| enabled | พื้นขาว มีขอบ 1px (`border-input`) ชี้เมาส์แล้วขอบเข้มขึ้น โฟกัสแล้วขอบเป็นสีหลักพร้อมวงแสง |",
          "| read-only | พื้นเทา ไม่มีขอบ ยังคัดลอกข้อความได้ และโฟกัสได้ |",
          "| disabled | พื้นเทา ไม่มีขอบ ตัวอักษรเทา กดหรือพิมพ์ไม่ได้ |",
          "",
          "ช่องที่ใช้งานได้ **ต้องไม่เป็นสีเทา** เพื่อให้ผู้ใช้แยกออกทันทีว่าช่องไหนกรอกได้ ส่วนช่องเทาหมายถึงกรอกไม่ได้",
        ].join("\n"),
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function Column({ title, disabled }: { title: string; disabled?: boolean }) {
  const id = disabled ? "d" : "e"
  return (
    <section className="flex flex-col gap-4">
      <h3 className="type-h4">{title}</h3>
      <FieldGroup className="gap-4">
        <Field data-disabled={disabled || undefined}>
          <FieldLabel htmlFor={`${id}-input`}>Input</FieldLabel>
          <Input
            id={`${id}-input`}
            disabled={disabled}
            defaultValue={disabled ? "กรุงเทพมหานคร" : undefined}
            placeholder="เช่น ผู้รับทดสอบ"
          />
        </Field>
        <Field data-disabled={disabled || undefined}>
          <FieldLabel htmlFor={`${id}-ta`}>Textarea</FieldLabel>
          <Textarea
            id={`${id}-ta`}
            rows={2}
            disabled={disabled}
            placeholder="หมายเหตุ"
          />
        </Field>
        <Field data-disabled={disabled || undefined}>
          <FieldLabel htmlFor={`${id}-select`}>Select</FieldLabel>
          <Select disabled={disabled}>
            <SelectTrigger id={`${id}-select`} className="w-full">
              <SelectValue placeholder="เลือกจังหวัด" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="bkk">กรุงเทพมหานคร</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field data-disabled={disabled || undefined}>
          <FieldLabel htmlFor={`${id}-group`}>Input group</FieldLabel>
          <InputGroup data-disabled={disabled || undefined}>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              id={`${id}-group`}
              disabled={disabled}
              placeholder="ค้นหา"
            />
          </InputGroup>
        </Field>
        <Field orientation="horizontal" data-disabled={disabled || undefined}>
          <Checkbox id={`${id}-cb`} disabled={disabled} />
          <FieldLabel htmlFor={`${id}-cb`}>Checkbox</FieldLabel>
        </Field>
        <Field orientation="horizontal" data-disabled={disabled || undefined}>
          <Checkbox id={`${id}-cb2`} disabled={disabled} defaultChecked />
          <FieldLabel htmlFor={`${id}-cb2`}>Checkbox (เลือกแล้ว)</FieldLabel>
        </Field>
      </FieldGroup>
    </section>
  )
}

export const EnabledVsDisabled: Story = {
  name: "Enabled vs disabled",
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="grid max-w-3xl gap-8 md:grid-cols-2">
        <Column title="Enabled (ใช้งานได้)" />
        <Column title="Disabled (ปิดใช้งาน)" disabled />
      </div>
      <Guidance
        doItems={[
          "ใช้ disabled เมื่อช่องนั้นกรอกไม่ได้ชั่วคราว เช่น ยังไม่มีสิทธิ์ หรือรอข้อมูลก่อนหน้า",
          "บอกเหตุผลที่ปิดไว้ในข้อความช่วย",
        ]}
        dontItems={[
          "ใช้พื้นเทากับช่องที่กรอกได้ เพราะผู้ใช้จะเข้าใจว่าปิดอยู่",
          "ปิดช่องโดยไม่บอกเหตุผล",
        ]}
      />
    </div>
  ),
}
