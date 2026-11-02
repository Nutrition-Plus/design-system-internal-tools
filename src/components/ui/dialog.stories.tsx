import type { Meta, StoryObj } from "@storybook/react-vite"
import { Trash2Icon } from "lucide-react"
import { expect, fn, userEvent, waitFor, within } from "storybook/test"

import { ConfirmDialog } from "@/components/patterns/confirm-dialog"
import { Button } from "./button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import { Field, FieldGroup, FieldLabel } from "./field"
import { Textarea } from "./textarea"

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "หน้าต่างซ้อนที่ต้องจัดการก่อนกลับไปหน้าเดิม ใช้เท่าที่จำเป็น",
          "",
          "- **Dialog**: งานสั้น ๆ เช่น ใส่เหตุผล แก้ค่า 1–3 ช่อง",
          "- **ConfirmDialog** (pattern): ยืนยันการกระทำที่ย้อนกลับยาก เช่น ยกเลิกการจอง ลบ ส่งสินค้าแล้ว — focus เริ่มที่ปุ่ม “ยกเลิก”",
          "- **Sheet**: รายละเอียดยาวหรือฟอร์มยาว (เช่น รายละเอียดคำสั่งซื้อ)",
          "",
          "ต้องมี `DialogTitle` เสมอ · Esc ปิดได้ · focus ถูกกักไว้ใน dialog และกลับไปที่ปุ่มเดิมเมื่อปิด · ระหว่างบันทึกห้ามปิด",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const FormDialog: Story = {
  name: "Dialog with reason",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">เปลี่ยนขนส่ง</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>เปลี่ยนบริษัทขนส่ง</DialogTitle>
          <DialogDescription>
            ระบบต้องบันทึกเหตุผลทุกครั้งที่เปลี่ยนขนส่งจากที่กำหนดไว้
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="reason">เหตุผล *</FieldLabel>
            <Textarea id="reason" rows={3} placeholder="เช่น ลูกค้าขอเปลี่ยน" />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">ยกเลิก</Button>
          </DialogClose>
          <Button>บันทึก</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const Confirm: Story = {
  name: "ConfirmDialog (destructive)",
  args: {},
  render: () => (
    <ConfirmDialog
      trigger={
        <Button variant="destructive">
          <Trash2Icon data-icon="inline-start" />
          ยกเลิกการจองรอบ
        </Button>
      }
      tone="destructive"
      title="ยกเลิกการจองรอบส่ง?"
      description="คำสั่งซื้อ 3 รายการจะกลับไปที่สถานะ “พร้อมจองรอบ” เลขลำดับที่ออกไปแล้วจะไม่ถูกนำกลับมาใช้"
      confirmLabel="ยกเลิกการจอง"
      onConfirm={() => new Promise((r) => setTimeout(r, 800))}
    />
  ),
}

const onConfirm = fn(() => new Promise<void>((r) => setTimeout(r, 300)))

export const ConfirmFlow: Story = {
  name: "Interaction: confirm and cancel",
  render: () => (
    <ConfirmDialog
      trigger={<Button>ส่งสินค้าแล้ว</Button>}
      title="ยืนยันว่าส่งสินค้าแล้ว?"
      description="หลังยืนยัน พัสดุจะแก้ไขไม่ได้"
      confirmLabel="ยืนยัน"
      onConfirm={onConfirm}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(document.body)

    await userEvent.click(canvas.getByRole("button", { name: "ส่งสินค้าแล้ว" }))
    const dialog = await body.findByRole("alertdialog")
    await expect(
      within(dialog).getByRole("button", { name: "ยกเลิก" })
    ).toHaveFocus()
    await userEvent.keyboard("{Escape}")
    await waitFor(() =>
      expect(body.queryByRole("alertdialog")).not.toBeInTheDocument()
    )
    await expect(onConfirm).not.toHaveBeenCalled()

    await userEvent.click(canvas.getByRole("button", { name: "ส่งสินค้าแล้ว" }))
    await userEvent.click(
      within(await body.findByRole("alertdialog")).getByRole("button", {
        name: "ยืนยัน",
      })
    )
    await waitFor(() => expect(onConfirm).toHaveBeenCalledOnce())
    await waitFor(() =>
      expect(body.queryByRole("alertdialog")).not.toBeInTheDocument()
    )
  },
}
