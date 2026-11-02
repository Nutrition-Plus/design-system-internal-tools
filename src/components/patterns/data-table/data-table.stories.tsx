import type { Meta, StoryObj } from "@storybook/react-vite"
import { useTable, type ColumnDef } from "@tanstack/react-table"
import { expect, userEvent, within } from "storybook/test"

import { Badge, BadgeDot } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { STATUS, CHANNEL, formatBaht } from "@/examples/oms/labels"
import { CHANNELS, ORDERS, type Order } from "@/fixtures/orders"
import { EmptyState, ErrorState } from "../feedback-states"
import { DataTable, type DataTableStatus } from "./data-table"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar } from "./data-table-toolbar"
import { dataTableFeatures, type DataTableFeatures } from "./features"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: ColumnDef<DataTableFeatures, Order, any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label="เลือกทุกแถวในหน้านี้"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label={`เลือก ${row.original.orderNo}`}
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderNo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="เลขที่" />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-[13px]">{row.original.orderNo}</span>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "สถานะ",
    cell: ({ row }) => (
      <Badge variant={STATUS[row.original.status].variant}>
        <BadgeDot />
        {STATUS[row.original.status].label}
      </Badge>
    ),
    enableSorting: false,
    meta: { label: "สถานะ" },
  },
  {
    accessorKey: "channel",
    header: "ช่องทาง",
    cell: ({ row }) => CHANNEL[row.original.channel],
    filterFn: "arrIncludesSome",
    enableSorting: false,
    meta: { label: "ช่องทาง" },
  },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ลูกค้า" />
    ),
    meta: { label: "ลูกค้า" },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ยอด (฿)" />
    ),
    cell: ({ row }) => formatBaht(row.original.amount),
    meta: { label: "ยอด (฿)", align: "right" },
  },
]

function Demo({
  status = "ready",
  rows = ORDERS,
}: {
  status?: DataTableStatus
  rows?: Order[]
}) {
  const table = useTable({
    features: dataTableFeatures,
    columns,
    data: rows,
    getRowId: (r) => r.id,
    globalFilterFn: "includesString",
    initialState: { pagination: { pageIndex: 0, pageSize: 20 } },
  })
  const filtered =
    table.state.columnFilters.length > 0 || Boolean(table.state.globalFilter)
  return (
    <div className="flex flex-col gap-3">
      <DataTableToolbar
        table={table}
        searchPlaceholder="ค้นหาเลขที่หรือลูกค้า"
        filters={
          <DataTableFacetedFilter
            column={table.getColumn("channel")}
            title="ช่องทาง"
            options={CHANNELS.map((c) => ({ value: c, label: CHANNEL[c] }))}
          />
        }
      />
      <DataTable
        table={table}
        caption="ตัวอย่างตารางคำสั่งซื้อ"
        status={status}
        loadingRows={6}
        empty={
          filtered ? (
            <EmptyState
              kind="no-results"
              action={
                <Button
                  variant="outline"
                  onClick={() => {
                    table.resetColumnFilters()
                    table.setGlobalFilter(undefined)
                  }}
                >
                  ล้างตัวกรอง
                </Button>
              }
            />
          ) : (
            <EmptyState kind="no-data" />
          )
        }
        error={<ErrorState reference="REQ-1A2B" onRetry={() => undefined} />}
      />
      {status === "ready" && rows.length > 0 && (
        <DataTablePagination table={table} />
      )}
    </div>
  )
}

const meta = {
  title: "Components/Data Table",
  component: Demo,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "ตารางข้อมูลมาตรฐาน สร้างบน **TanStack Table v9** + shadcn `Table` ใช้ `dataTableFeatures` ชุดเดียวกันทุกระบบ",
          "",
          "**ประกอบด้วย:** `DataTableToolbar` (ค้นหา debounce 300ms, ตัวกรอง, เลือกคอลัมน์) → `DataTable` → `DataTablePagination`",
          "",
          "**กติกา**",
          '- ตัวเลขและยอดเงินชิดขวา (`meta.align = "right"`) และใช้ tabular-nums · รหัสใช้ `font-mono`',
          "- หัวคอลัมน์ที่เรียงได้มี `aria-sort` · ข้อความเริ่มเรียง ก→ฮ, ตัวเลขและวันที่เริ่มจากมากไปน้อย, กดซ้ำเพื่อสลับ",
          "- State ครบ: `loading` (skeleton เท่าจำนวนแถว), `empty` แยก “ยังไม่มีข้อมูล” กับ “ไม่พบตามตัวกรอง”, `error` (ลองใหม่ + รหัสอ้างอิง)",
          "- แตะแถวเพื่อเปิดรายละเอียด (`onRowClick`) — ไม่ใช้ double-click และไม่มีการกระทำที่เห็นเฉพาะตอน hover",
          "- ข้อมูลจาก server: ส่ง `manualPagination`, `manualSorting`, `manualFiltering`, `rowCount` ให้ `useTable` และเก็บ state ไว้ใน URL",
          "- บนจอ < 768px ให้แสดงเป็นรายการการ์ดแทนตาราง (ดู Examples/OMS Order List)",
          "",
          "**ตัวอย่างการใช้งาน (ข้อมูลจาก server)**",
          "",
          "```tsx",
          "const table = useTable({",
          "  features: dataTableFeatures,",
          "  columns,",
          "  data,",
          "  getRowId: (row) => row.id,",
          "  // server-side:",
          "  manualPagination: true, manualSorting: true, manualFiltering: true,",
          "  rowCount: data.total,",
          "  state: { pagination, sorting, columnFilters },",
          "  onPaginationChange: setPagination,",
          "  onSortingChange: setSorting,",
          "  onColumnFiltersChange: setColumnFilters,",
          "})",
          "",
          "<DataTableToolbar table={table} filters={<DataTableFacetedFilter … />} />",
          `<DataTable table={table} caption="รายการคำสั่งซื้อ" status={query.status}`,
          `  empty={<EmptyState kind="no-data" />} error={<ErrorState onRetry={query.refetch} />} />`,
          "<DataTablePagination table={table} />",
          "```",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Demo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Loading: Story = { args: { status: "loading" } }
export const EmptyNoData: Story = { name: "Empty: no data", args: { rows: [] } }
export const Error: Story = { args: { status: "error" } }

export const NoResults: Story = {
  name: "Empty: no results for filter",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByRole("searchbox"), "ไม่มีข้อมูลนี้")
    await expect(
      await canvas.findByText(
        "ไม่พบรายการที่ตรงกับตัวกรอง",
        {},
        { timeout: 2000 }
      )
    ).toBeInTheDocument()
  },
}

export const SortAndSelect: Story = {
  name: "Interaction: sort and select",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const header = canvas.getByRole("button", { name: /ยอด/ })
    // Amounts sort largest first, then smallest first.
    await userEvent.click(header)
    await expect(header.closest("th")).toHaveAttribute(
      "aria-sort",
      "descending"
    )
    await expect(header).toHaveAccessibleName(/เรียงจากน้อยไปมาก/)
    await userEvent.click(header)
    await expect(header.closest("th")).toHaveAttribute("aria-sort", "ascending")
    const first = canvas.getAllByRole("checkbox", { name: /^เลือก [A-Z]/ })[0]
    await userEvent.click(first)
    await expect(first.closest("tr")).toHaveAttribute("data-state", "selected")
    await expect(
      canvas.getByRole("checkbox", { name: "เลือกทุกแถวในหน้านี้" })
    ).toHaveAttribute("data-state", "indeterminate")
  },
}

export const Compact: Story = {
  name: "Density: compact",
  globals: { density: "compact" },
}
