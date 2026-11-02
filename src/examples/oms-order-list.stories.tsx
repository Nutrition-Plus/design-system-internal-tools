import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { OmsOrderList } from "./oms-order-list"

const meta = {
  // Lock the preview to iPad Air width (1180px). Without this the story uses the real pane width,
  // and below 768px the OMS pages switch to the mobile layout.
  globals: { viewport: { value: "ipadAir", isRotated: false } },
  title: "Examples/OMS Order List",
  component: OmsOrderList,
  parameters: {
    layout: "fullscreen",
    docs: {
      story: { inline: false, height: "820px" },
      description: {
        component:
          "หน้ารายการคำสั่งซื้อ OMS ในบริบทจริง ใช้แสดงสี ฟอนต์ และ components ให้ผู้บริหารพิจารณา เปิด `annotations` เพื่อดูว่าส่วนใดเป็นมาตรฐานกลางและส่วนใดแต่ละระบบปรับได้",
      },
    },
  },
  args: { state: "ready", annotations: false },
  argTypes: {
    state: {
      control: "inline-radio",
      options: ["ready", "loading", "empty", "error"],
    },
  },
} satisfies Meta<typeof OmsOrderList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithAnnotations: Story = {
  name: "With annotations (for review)",
  args: { annotations: true },
}

export const Loading: Story = { args: { state: "loading" } }
export const Empty: Story = { args: { state: "empty" } }
export const Error: Story = { args: { state: "error" } }

export const Desktop: Story = {
  globals: { density: "compact", viewport: { value: "desktop" } },
}

// Walkthrough pace. Watching the story in Storybook plays it slowly so the flow can be followed;
// automated runs (Playwright / Vitest set navigator.webdriver) skip the waits so tests stay fast.
const slow = typeof navigator !== "undefined" && !navigator.webdriver
const pause = (ms = 900) =>
  slow ? new Promise((r) => setTimeout(r, ms)) : Promise.resolve()
const typingDelay = slow ? 110 : 0

export const SearchAndSelect: Story = {
  name: "Interaction: search, sort, select",
  parameters: {
    docs: {
      description: {
        story:
          "เล่นช้า ๆ ให้ดูขั้นตอนการใช้งาน: กดแท็บสถานะ → ค้นหา → เรียงยอด → เลือก 5 คอลัมน์ในเมนู → ติ๊กเลือก 5 แถว → เปิดรายละเอียดของแถว",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(document.body)
    const table = canvas.getByRole("table", { name: "รายการคำสั่งซื้อ" })
    await pause()

    // 1) Status tabs
    for (const name of [/^รอตรวจสอบ/, /^พร้อมจองรอบ/, /^ทั้งหมด/]) {
      const tab = canvas.getByRole("tab", { name })
      await userEvent.click(tab)
      await expect(tab).toHaveAttribute("aria-selected", "true")
      await pause()
    }

    // 2) Search
    const search = canvas.getByRole("searchbox", { name: /ค้นหา/ })
    await userEvent.type(search, "ลูกค้าทดสอบ 07", { delay: typingDelay })
    await expect(
      await within(table).findByText("ลูกค้าทดสอบ 07", {}, { timeout: 2000 })
    ).toBeInTheDocument()
    await pause(1400)
    await userEvent.clear(search)
    await pause()

    // 3) Sort by amount: largest first, then smallest first
    const amountHeader = within(table).getByRole("button", { name: /ยอด/ })
    await userEvent.click(amountHeader)
    await expect(amountHeader.closest("th")).toHaveAttribute(
      "aria-sort",
      "descending"
    )
    await pause(1200)
    await userEvent.click(amountHeader)
    await expect(amountHeader.closest("th")).toHaveAttribute(
      "aria-sort",
      "ascending"
    )
    await pause(1200)

    // 4) Column dropdown: hide five columns one by one, then bring them back
    const hideable = ["ช่องทาง", "ลูกค้า", "สินค้า", "จำนวน", "สั่งซื้อเมื่อ"]
    await userEvent.click(canvas.getByRole("button", { name: "คอลัมน์" }))
    await pause()
    for (const label of hideable) {
      const item = await body.findByRole("menuitemcheckbox", { name: label })
      await userEvent.click(item)
      await expect(item).toHaveAttribute("aria-checked", "false")
      await expect(
        within(table).queryByRole("columnheader", { name: new RegExp(label) })
      ).not.toBeInTheDocument()
      await pause(700)
    }
    await pause(900)
    for (const label of hideable) {
      const item = await body.findByRole("menuitemcheckbox", { name: label })
      await userEvent.click(item)
      await expect(item).toHaveAttribute("aria-checked", "true")
      await pause(350)
    }
    await userEvent.keyboard("{Escape}")
    await waitFor(() =>
      expect(body.queryByRole("menu")).not.toBeInTheDocument()
    )
    await pause()

    // 5) Tick five rows one by one: the bulk action bar counts up
    const rowBoxes = within(table)
      .getAllByRole("checkbox", { name: /^เลือก [A-Z]{2}\d{6,}/ })
      .slice(0, 5)
    for (const [index, box] of rowBoxes.entries()) {
      await userEvent.click(box)
      await expect(box).toBeChecked()
      await expect(
        await canvas.findByRole("region", { name: "จัดการรายการที่เลือก" })
      ).toHaveTextContent(`เลือก ${index + 1} รายการ`)
      await pause(700)
    }
    await pause(900)
    await userEvent.click(
      canvas.getByRole("button", { name: "ยกเลิกการเลือก" })
    )
    await pause()

    // 6) Open a row's detail sheet, then close it
    await userEvent.click(
      within(table).getAllByRole("button", { name: /^[A-Z]{2}\d{6,}/ })[0]
    )
    await expect(await body.findByRole("dialog")).toBeInTheDocument()
    await pause(1600)
    await userEvent.keyboard("{Escape}")
    await waitFor(() =>
      expect(body.queryByRole("dialog")).not.toBeInTheDocument()
    )
  },
}
