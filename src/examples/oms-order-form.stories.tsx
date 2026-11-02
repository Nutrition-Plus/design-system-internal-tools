import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { OmsOrderForm } from "./oms-order-form"

const meta = {
  // Lock the preview to iPad Air width (1180px). Without this the story uses the real pane width,
  // and below 768px the OMS pages switch to the mobile layout.
  globals: { viewport: { value: "ipadAir", isRotated: false } },
  title: "Examples/OMS Order Form",
  component: OmsOrderForm,
  parameters: {
    layout: "fullscreen",
    docs: {
      story: { inline: false, height: "820px" },
      description: {
        component:
          "หน้าฟอร์มสร้างคำสั่งซื้อ แสดงรูปแบบฟอร์มมาตรฐาน: label อยู่บน, ตรวจตอนออกจากช่อง, สรุปข้อผิดพลาดด้านบน, ปุ่มบันทึกมี loading และไม่ล้างค่าที่กรอกเมื่อบันทึกไม่สำเร็จ",
      },
    },
  },
  args: { result: "success", annotations: false },
  argTypes: {
    result: { control: "inline-radio", options: ["success", "failure"] },
  },
} satisfies Meta<typeof OmsOrderForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithAnnotations: Story = {
  name: "With annotations (for review)",
  args: { annotations: true },
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "บันทึกคำสั่งซื้อ" })
    )
  },
}

export const ValidationErrors: Story = {
  name: "Interaction: submit empty form shows error summary",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(
      canvas.getByRole("button", { name: "บันทึกคำสั่งซื้อ" })
    )
    const summary = await canvas.findByRole("alert", {
      name: /ยังบันทึกไม่ได้/,
    })
    // Focus moves on the next animation frame after submit.
    await waitFor(() => expect(summary).toHaveFocus())
    await expect(canvas.getByLabelText("ชื่อผู้รับ *")).toHaveAttribute(
      "aria-invalid",
      "true"
    )
    await userEvent.click(
      within(summary).getByRole("link", { name: /ชื่อผู้รับ/ })
    )
    await expect(canvas.getByLabelText("ชื่อผู้รับ *")).toHaveFocus()
  },
}

const FILLED = {
  channel: "shopee",
  refNo: "SP2510300001",
  recipient: "ผู้รับทดสอบ",
  phone: "0812345678",
  address: "99/1 หมู่ 4 ต.บางรักพัฒนา อ.บางบัวทอง",
  province: "นนทบุรี",
  postcode: "11110",
  confirmed: true,
  lines: [{ key: 0, sku: "CP-LYC-350", qty: "24" }],
}

export const SaveSuccess: Story = {
  name: "Interaction: save success",
  args: { initialValues: FILLED, result: "success" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(
      canvas.getByRole("button", { name: "บันทึกคำสั่งซื้อ" })
    )
    await expect(
      canvas.getByRole("button", { name: /กำลังบันทึก/ })
    ).toBeDisabled()
    await expect(
      await within(document.body).findByText(
        "บันทึกคำสั่งซื้อแล้ว",
        {},
        { timeout: 3000 }
      )
    ).toBeInTheDocument()
  },
}

export const SaveFailureKeepsValues: Story = {
  name: "Interaction: save failure keeps input",
  args: { initialValues: FILLED, result: "failure" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(
      canvas.getByRole("button", { name: "บันทึกคำสั่งซื้อ" })
    )
    await expect(
      await within(document.body).findByText(
        "บันทึกไม่สำเร็จ",
        {},
        { timeout: 3000 }
      )
    ).toBeInTheDocument()
    await expect(canvas.getByLabelText("ชื่อผู้รับ *")).toHaveValue(
      "ผู้รับทดสอบ"
    )
  },
}
