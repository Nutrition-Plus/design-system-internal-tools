import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination"

/** 1 … 4 5 6 … 20 : first, last, and the neighbours of the current page. */
function pageItems(
  current: number,
  total: number
): (number | "gap-start" | "gap-end")[] {
  const pages = new Set([1, total, current - 1, current, current + 1])
  const sorted = [...pages]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b)
  const out: (number | "gap-start" | "gap-end")[] = []
  sorted.forEach((p, i) => {
    const prev = sorted[i - 1]
    if (prev && p - prev > 1)
      out.push(i < sorted.length / 2 ? "gap-start" : "gap-end")
    out.push(p)
  })
  return out
}

function Demo({
  total = 20,
  initial = 1,
}: {
  total?: number
  initial?: number
}) {
  const [page, setPage] = React.useState(initial)
  const go = (p: number) => (event: React.MouseEvent) => {
    event.preventDefault()
    setPage(Math.min(total, Math.max(1, p)))
  }
  return (
    <div className="flex flex-col gap-3">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={go(page - 1)}
              aria-disabled={page === 1}
              className={
                page === 1 ? "pointer-events-none opacity-50" : undefined
              }
            />
          </PaginationItem>
          {pageItems(page, total).map((item) =>
            typeof item === "number" ? (
              <PaginationItem key={item}>
                <PaginationLink
                  href="#"
                  isActive={item === page}
                  onClick={go(item)}
                  aria-label={`หน้า ${item}`}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            ) : (
              <PaginationItem key={item}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={go(page + 1)}
              aria-disabled={page === total}
              className={
                page === total ? "pointer-events-none opacity-50" : undefined
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <p
        role="status"
        className="text-center text-sm text-muted-foreground tabular-nums"
      >
        หน้า {page} จาก {total}
      </p>
    </div>
  )
}

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "ตัวเลขหน้าสำหรับแบ่งรายการยาว ๆ แสดงหน้าแรก หน้าสุดท้าย และหน้าที่อยู่ติดกับหน้าปัจจุบัน ส่วนที่เหลือย่อเป็น “…”",
          "",
          '- หน้าปัจจุบันมี `aria-current="page"` และกรอบเด่น · ปุ่ม “ก่อนหน้า/ถัดไป” ปิดเมื่อสุดทาง',
          "- ตารางข้อมูลใช้ **DataTablePagination** (แสดง “แสดง 1–20 จาก 64 รายการ” + จำนวนแถวต่อหน้า + ปุ่มก่อนหน้า/ถัดไป) ซึ่งเหมาะกับตารางมากกว่า",
          "- เก็บเลขหน้าไว้ใน URL เพื่อแชร์ลิงก์และกดย้อนกลับได้ และกลับไปหน้า 1 เมื่อเปลี่ยนตัวกรอง",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <Demo /> }
export const MiddlePage: Story = {
  name: "Middle page",
  render: () => <Demo initial={10} />,
}
export const FewPages: Story = {
  name: "Few pages (no ellipsis)",
  render: () => <Demo total={4} />,
}

export const Navigate: Story = {
  name: "Interaction: next, jump, previous",
  render: () => <Demo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("link", { name: "ถัดไป" }))
    await expect(canvas.getByRole("status")).toHaveTextContent("หน้า 2 จาก 20")
    await userEvent.click(canvas.getByRole("link", { name: "หน้า 20" }))
    await expect(canvas.getByRole("status")).toHaveTextContent("หน้า 20 จาก 20")
    await expect(canvas.getByRole("link", { name: "หน้า 20" })).toHaveAttribute(
      "aria-current",
      "page"
    )
    await userEvent.click(canvas.getByRole("link", { name: "ก่อนหน้า" }))
    await expect(canvas.getByRole("status")).toHaveTextContent("หน้า 19 จาก 20")
  },
}
