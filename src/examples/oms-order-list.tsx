import * as React from "react"
import { useTable, type ColumnDef, type Row } from "@tanstack/react-table"
import {
  CalendarPlusIcon,
  DownloadIcon,
  EyeOffIcon,
  PlusIcon,
  XIcon,
} from "lucide-react"
import { toast } from "sonner"

import { BadgeOverflow } from "@/components/patterns/badge-overflow"
import { ConfirmDialog } from "@/components/patterns/confirm-dialog"
import {
  DataTable,
  type DataTableStatus,
} from "@/components/patterns/data-table/data-table"
import { DataTableColumnHeader } from "@/components/patterns/data-table/data-table-column-header"
import { DataTableFacetedFilter } from "@/components/patterns/data-table/data-table-faceted-filter"
import { DataTablePagination } from "@/components/patterns/data-table/data-table-pagination"
import { DataTableToolbar } from "@/components/patterns/data-table/data-table-toolbar"
import {
  dataTableFeatures,
  type DataTableFeatures,
} from "@/components/patterns/data-table/features"
import { EmptyState, ErrorState } from "@/components/patterns/feedback-states"
import { PageHeader } from "@/components/patterns/page-header"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CHANNELS,
  ORDERS,
  type Order,
  type WorkStatus,
} from "@/fixtures/orders"
import {
  Annotated,
  AnnotationLegend,
  AnnotationsProvider,
  type AnnotationNote,
} from "./annotations"
import {
  BlockerBadge,
  CHANNEL,
  ChannelBadge,
  formatBaht,
  formatDateTime,
  NoteBadge,
  WorkStatusBadge,
} from "./oms/labels"
import { OrderDetailSheet } from "./oms/order-detail-sheet"
import { OmsShell } from "./oms/shell"

const STATUS_TABS: { value: string; label: string; statuses?: WorkStatus[] }[] =
  [
    { value: "all", label: "ทั้งหมด" },
    { value: "review", label: "รอตรวจสอบ", statuses: ["new", "needs_review"] },
    { value: "ready", label: "พร้อมจองรอบ", statuses: ["ready_to_book"] },
    { value: "booked", label: "จองแล้ว", statuses: ["booked", "label_issued"] },
    {
      value: "shipped",
      label: "ส่งแล้ว",
      statuses: ["partially_shipped", "shipped"],
    },
  ]

const NOTES: AnnotationNote[] = [
  {
    n: 1,
    kind: "standard",
    title: "สีและฟอนต์",
    detail:
      "Primary #045275 เฉพาะปุ่มหลักและสิ่งที่เลือก พื้นขาวและ #F3F7FA เป็นพื้นที่ส่วนใหญ่ ฟอนต์ IBM Plex Sans Thai",
  },
  {
    n: 2,
    kind: "standard",
    title: "หัวหน้าและปุ่มหลัก",
    detail: "หนึ่งหน้ามีปุ่ม primary ปุ่มเดียว ปุ่มอื่นเป็น outline",
  },
  {
    n: 3,
    kind: "standard",
    title: "ค้นหา กรอง และเลือกคอลัมน์",
    detail:
      "ตำแหน่ง พฤติกรรม (debounce 300ms) และปุ่มล้างตัวกรองเหมือนกันทุกระบบ",
  },
  {
    n: 4,
    kind: "standard",
    title: "ตารางข้อมูล",
    detail:
      "ความสูงแถว ตัวเลขชิดขวา รหัสใช้ฟอนต์ mono สีสถานะ การเรียง และ pagination",
  },
  {
    n: 5,
    kind: "custom",
    title: "แท็บและคอลัมน์",
    detail: "เลือกได้ว่าจะแบ่งแท็บตามสถานะใด และแสดงคอลัมน์ใด",
  },
  {
    n: 6,
    kind: "custom",
    title: "ความหนาแน่น (Density)",
    detail:
      "Comfortable 44px สำหรับ iPad หรือ Compact 32px สำหรับ desktop ตั้งค่าครั้งเดียวต่อระบบ",
  },
]

// TValue differs per column, so the array is typed with `any` (same as the TanStack docs).
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
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label={`เลือก ${row.original.orderNo}`}
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderNo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="เลขที่คำสั่งซื้อ" />
    ),
    cell: ({ row, table }) => (
      <Button
        variant="link"
        className="h-auto p-0 font-mono text-[13px] font-medium"
        onClick={() =>
          (
            table.options.meta as { open?: (o: Order) => void } | undefined
          )?.open?.(row.original)
        }
      >
        {row.original.orderNo}
      </Button>
    ),
    enableHiding: false,
    meta: { label: "เลขที่คำสั่งซื้อ" },
  },
  {
    accessorKey: "status",
    header: "สถานะ",
    cell: ({ row }) => (
      <BadgeOverflow
        label="สถานะทั้งหมด"
        items={[
          <WorkStatusBadge key="status" status={row.original.status} />,
          ...row.original.blockers.map((b) => (
            <BlockerBadge key={b} cause={b} />
          )),
          ...(row.original.hasNote ? [<NoteBadge key="note" />] : []),
        ]}
      />
    ),
    filterFn: "arrIncludesSome",
    enableSorting: false,
    enableGlobalFilter: false,
    meta: { label: "สถานะ" },
  },
  {
    accessorKey: "channel",
    header: "ช่องทาง",
    cell: ({ row }) => <ChannelBadge channel={row.original.channel} />,
    filterFn: "arrIncludesSome",
    enableSorting: false,
    enableGlobalFilter: false,
    meta: { label: "ช่องทาง" },
  },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ลูกค้า" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span>{row.original.customer}</span>
        <span className="type-caption text-muted-foreground">
          {row.original.province}
        </span>
      </div>
    ),
    meta: { label: "ลูกค้า" },
  },
  {
    id: "items",
    accessorFn: (o) => o.items.map((i) => i.name).join(" "),
    header: "สินค้า",
    cell: ({ row }) => {
      const [first, ...rest] = row.original.items
      return (
        <div className="flex max-w-36 flex-col">
          <span className="truncate" title={first.name}>
            {first.name}
          </span>
          {rest.length > 0 && (
            <span className="type-caption text-muted-foreground">
              และอีก {rest.length} รายการ
            </span>
          )}
        </div>
      )
    },
    enableSorting: false,
    meta: { label: "สินค้า" },
  },
  {
    accessorKey: "totalQty",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="จำนวน" />
    ),
    cell: ({ row }) => row.original.totalQty,
    enableGlobalFilter: false,
    meta: { label: "จำนวน", align: "right" },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ยอด (฿)" />
    ),
    cell: ({ row }) => formatBaht(row.original.amount),
    enableGlobalFilter: false,
    meta: { label: "ยอด (฿)", align: "right" },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="สั่งซื้อเมื่อ" />
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {formatDateTime(row.original.createdAt)}
      </span>
    ),
    enableGlobalFilter: false,
    meta: { label: "สั่งซื้อเมื่อ" },
  },
]

function MobileOrderCards({
  rows,
  onOpen,
}: {
  rows: Row<DataTableFeatures, Order>[]
  onOpen: (order: Order) => void
}) {
  return (
    <ul className="flex flex-col gap-2 md:hidden" aria-label="รายการคำสั่งซื้อ">
      {rows.map(({ original: o }) => (
        <li key={o.id}>
          <button
            type="button"
            onClick={() => onOpen(o)}
            className="flex w-full flex-col gap-2 rounded-xl border border-border bg-card p-4 text-left hover:bg-secondary"
          >
            <span className="flex items-center justify-between gap-2">
              <span className="font-mono text-[13px] font-medium text-primary">
                {o.orderNo}
              </span>
              <span className="tabular-nums">฿{formatBaht(o.amount)}</span>
            </span>
            <span className="text-sm">
              {o.customer} · {o.province}
            </span>
            <span className="flex flex-wrap gap-1">
              <WorkStatusBadge status={o.status} />
              {o.blockers.map((b) => (
                <BlockerBadge key={b} cause={b} />
              ))}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}

export type OmsOrderListProps = {
  /** Simulates the data state for docs and review. */
  state?: DataTableStatus | "empty"
  /** Shows the standard/customizable overlay for reviewers. */
  annotations?: boolean
}

export function OmsOrderList({
  state = "ready",
  annotations = false,
}: OmsOrderListProps) {
  const data = React.useMemo(() => (state === "empty" ? [] : ORDERS), [state])
  const [tab, setTab] = React.useState("all")
  const [detail, setDetail] = React.useState<Order | null>(null)

  const table = useTable({
    features: dataTableFeatures,
    columns,
    data,
    getRowId: (row) => row.id,
    globalFilterFn: "includesString",
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
      pagination: { pageIndex: 0, pageSize: 20 },
    },
    meta: { open: setDetail },
  })

  const selectedCount = Object.keys(table.state.rowSelection ?? {}).length
  const isFiltered =
    table.state.columnFilters.length > 0 || Boolean(table.state.globalFilter)

  function changeTab(value: string) {
    setTab(value)
    table
      .getColumn("status")
      ?.setFilterValue(STATUS_TABS.find((t) => t.value === value)?.statuses)
    table.setPageIndex(0)
  }

  const counts = (statuses?: WorkStatus[]) =>
    statuses
      ? data.filter((o) => statuses.includes(o.status)).length
      : data.length

  return (
    <AnnotationsProvider show={annotations}>
      <OmsShell
        active="orders"
        breadcrumbs={[{ label: "OMS", href: "#home" }, { label: "คำสั่งซื้อ" }]}
      >
        <AnnotationLegend notes={NOTES} />

        <Annotated n={2} kind="standard">
          <PageHeader
            title="คำสั่งซื้อ"
            description="คำสั่งซื้อจาก Shopee, Lazada, TikTok Shop และ LINE Shopping · ข้อมูลตัวอย่าง (สังเคราะห์)"
            actions={
              <>
                <Button
                  variant="outline"
                  onClick={() =>
                    toast.success("เริ่มส่งออกไฟล์แล้ว", {
                      description: "ไฟล์จะพร้อมดาวน์โหลดในไม่กี่วินาที",
                    })
                  }
                >
                  <DownloadIcon data-icon="inline-start" />
                  ส่งออก
                </Button>
                <Annotated n={1} kind="standard">
                  <Button>
                    <PlusIcon data-icon="inline-start" />
                    สร้างคำสั่งซื้อ
                  </Button>
                </Annotated>
              </>
            }
          />
        </Annotated>

        <Tabs value={tab} onValueChange={changeTab} className="gap-6">
          <Annotated n={5} kind="custom">
            <TabsList variant="line" aria-label="กรองตามสถานะ">
              {STATUS_TABS.map((t) => (
                <TabsTrigger key={t.value} value={t.value}>
                  {t.label}
                  <span className="rounded-full bg-secondary px-1.5 text-xs text-muted-foreground tabular-nums">
                    {counts(t.statuses)}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Annotated>

          <TabsContent value={tab} className="flex flex-col gap-6">
            <Annotated n={3} kind="standard">
              <DataTableToolbar
                table={table}
                searchPlaceholder="ค้นหาเลขที่คำสั่งซื้อหรือชื่อลูกค้า"
                filters={
                  <DataTableFacetedFilter
                    column={table.getColumn("channel")}
                    title="ช่องทาง"
                    options={CHANNELS.map((c) => ({
                      value: c,
                      label: CHANNEL[c],
                      count: data.filter((o) => o.channel === c).length,
                    }))}
                  />
                }
              />
            </Annotated>

            {selectedCount > 0 && (
              <div
                role="region"
                aria-label="จัดการรายการที่เลือก"
                className="flex flex-wrap items-center gap-2 rounded-xl border border-primary/30 bg-accent px-4 py-2"
              >
                <span className="text-sm font-medium text-accent-foreground">
                  เลือก {selectedCount} รายการ
                </span>
                <div className="ml-auto flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    onClick={() =>
                      toast.success(`จองรอบส่ง ${selectedCount} รายการแล้ว`)
                    }
                  >
                    <CalendarPlusIcon data-icon="inline-start" />
                    จองรอบส่ง
                  </Button>
                  <ConfirmDialog
                    trigger={
                      <Button size="sm" variant="outline">
                        <EyeOffIcon data-icon="inline-start" />
                        ซ่อนจากคิว
                      </Button>
                    }
                    title={`ซ่อน ${selectedCount} รายการจากคิว?`}
                    description="รายการที่ซ่อนจะไม่แสดงในคิวงาน แต่สถานะและเงื่อนไขที่ต้องแก้ยังคงอยู่ เปิดดูได้จากตัวกรอง “ซ่อนอยู่”"
                    confirmLabel="ซ่อนรายการ"
                    onConfirm={async () => {
                      await new Promise((r) => setTimeout(r, 600))
                      table.resetRowSelection()
                      toast.success("ซ่อนรายการแล้ว")
                    }}
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => table.resetRowSelection()}
                  >
                    <XIcon data-icon="inline-start" />
                    ยกเลิกการเลือก
                  </Button>
                </div>
              </div>
            )}

            <Annotated n={4} kind="standard" className="flex flex-col gap-3">
              <div className="hidden md:block">
                <DataTable
                  table={table}
                  caption="รายการคำสั่งซื้อ"
                  status={state === "empty" ? "ready" : state}
                  loadingRows={8}
                  onRowClick={(row) => setDetail(row.original)}
                  empty={
                    isFiltered ? (
                      <EmptyState
                        kind="no-results"
                        action={
                          <Button
                            variant="outline"
                            onClick={() => {
                              table.resetColumnFilters()
                              table.setGlobalFilter(undefined)
                              setTab("all")
                            }}
                          >
                            ล้างตัวกรอง
                          </Button>
                        }
                      />
                    ) : (
                      <EmptyState
                        kind="no-data"
                        title="ยังไม่มีคำสั่งซื้อ"
                        description="คำสั่งซื้อใหม่จะเข้ามาอัตโนมัติเมื่อซิงก์จากช่องทางขาย"
                      />
                    )
                  }
                  error={
                    <ErrorState
                      reference="REQ-7F3A-0O12"
                      onRetry={() => toast.info("กำลังลองใหม่")}
                    />
                  }
                />
              </div>
              {state === "ready" && (
                <MobileOrderCards
                  rows={table.getRowModel().rows}
                  onOpen={setDetail}
                />
              )}
              {state === "ready" && <DataTablePagination table={table} />}
            </Annotated>
          </TabsContent>
        </Tabs>

        <Annotated n={6} kind="custom" className="self-center">
          <p className="px-4 py-1 text-center text-xs text-muted-foreground">
            ความหนาแน่นปัจจุบัน: เปลี่ยนได้จากแถบเครื่องมือ Density ใน Storybook
            หรือ <code>data-density</code> บน &lt;html&gt;
          </p>
        </Annotated>

        <OrderDetailSheet
          order={detail}
          onOpenChange={(open) => !open && setDetail(null)}
        />
      </OmsShell>
    </AnnotationsProvider>
  )
}
