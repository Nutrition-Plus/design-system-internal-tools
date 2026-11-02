import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select"

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "เลือก 1 ค่าจากรายการ **ไม่เกินประมาณ 10 ตัวเลือก** ถ้ามากกว่านั้นหรือต้องค้นหา ให้ใช้ Combobox (Popover + Command) แบบในตัวกรองของ DataTable · ถ้ามี 2–5 ตัวเลือกที่ควรเห็นพร้อมกัน ใช้ ToggleGroup",
          "",
          "- `SelectItem` ต้องอยู่ใน `SelectGroup` เสมอ",
          "- ในโหมด comfortable รายการในเมนูสูงอย่างน้อย 44px เพื่อแตะบน iPad ได้",
          "- Error: `aria-invalid` บน `SelectTrigger` + `data-invalid` บน `Field`",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const PROVINCES = [
  "กรุงเทพมหานคร",
  "นนทบุรี",
  "ปทุมธานี",
  "สมุทรปราการ",
  "เชียงใหม่",
]

function ProvinceSelect(props: {
  id: string
  invalid?: boolean
  disabled?: boolean
  defaultValue?: string
}) {
  return (
    <Select defaultValue={props.defaultValue} disabled={props.disabled}>
      <SelectTrigger
        id={props.id}
        className="w-full"
        aria-invalid={props.invalid || undefined}
      >
        <SelectValue placeholder="เลือกจังหวัด" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>ภาคกลาง</SelectLabel>
          {PROVINCES.slice(0, 4).map((p) => (
            <SelectItem key={p} value={p}>
              {p}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>ภาคเหนือ</SelectLabel>
          <SelectItem value="เชียงใหม่">เชียงใหม่</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export const States: Story = {
  render: () => (
    <FieldGroup className="grid max-w-3xl gap-6 md:grid-cols-2">
      <Field>
        <FieldLabel htmlFor="sel-default">ยังไม่เลือก</FieldLabel>
        <ProvinceSelect id="sel-default" />
        <FieldDescription>จังหวัดปลายทาง</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="sel-value">เลือกแล้ว</FieldLabel>
        <ProvinceSelect id="sel-value" defaultValue="นนทบุรี" />
      </Field>
      <Field data-invalid>
        <FieldLabel htmlFor="sel-error">ผิดพลาด *</FieldLabel>
        <ProvinceSelect id="sel-error" invalid />
        <FieldError>เลือกจังหวัด</FieldError>
      </Field>
      <Field data-disabled>
        <FieldLabel htmlFor="sel-disabled">ปิดใช้งาน</FieldLabel>
        <ProvinceSelect
          id="sel-disabled"
          disabled
          defaultValue="กรุงเทพมหานคร"
        />
      </Field>
    </FieldGroup>
  ),
}

export const Open: Story = {
  name: "Open menu",
  parameters: {
    docs: { story: { height: "360px" } },
    // Radix hides everything outside an open Select (incl. its trigger) from assistive tech while
    // focus is inside the menu. That is intended modal behavior, not a defect, so this one rule is off
    // for this static "open" snapshot only.
    a11y: { config: { rules: [{ id: "aria-hidden-focus", enabled: false }] } },
  },
  render: () => (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="sel-open">จังหวัด</FieldLabel>
      <Select defaultOpen defaultValue="นนทบุรี">
        <SelectTrigger id="sel-open" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {PROVINCES.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  ),
}
