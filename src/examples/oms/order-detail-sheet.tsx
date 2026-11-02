import { AlertTriangleIcon, CheckIcon, MapPinIcon, PencilIcon } from "lucide-react"
import { toast } from "sonner"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Order } from "@/fixtures/orders"
import { BLOCKER, BlockerBadge, ChannelBadge, formatBaht, formatDateTime, NoteBadge, WorkStatusBadge } from "./labels"

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-3 py-1.5 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  )
}

/** Order detail pattern: header (code + status) → blockers → grouped cards → actions. */
export function OrderDetailSheet({
  order,
  onOpenChange,
}: {
  order: Order | null
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Sheet open={order !== null} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-xl">
        {order && (
          <>
            <SheetHeader className="gap-2 border-b border-border p-6">
              <SheetTitle className="font-mono">{order.orderNo}</SheetTitle>
              <SheetDescription>
                สั่งซื้อเมื่อ {formatDateTime(order.createdAt)} · <ChannelBadge channel={order.channel} />
              </SheetDescription>
              <div className="flex flex-wrap gap-1">
                <WorkStatusBadge status={order.status} />
                {order.blockers.map((b) => (
                  <BlockerBadge key={b} cause={b} />
                ))}
                {order.hasNote && <NoteBadge />}
              </div>
            </SheetHeader>

            <div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-secondary p-6">
              {order.blockers.length > 0 && (
                <Alert variant="warning">
                  <AlertTriangleIcon />
                  <AlertTitle>ต้องแก้ {order.blockers.length} เงื่อนไขก่อนจองรอบส่ง</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc pl-4">
                      {order.blockers.map((b) => (
                        <li key={b}>{BLOCKER[b]}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              <Card size="sm">
                <CardHeader>
                  <CardTitle>ลูกค้าและที่อยู่จัดส่ง</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl>
                    <DetailRow label="ชื่อ">{order.customer}</DetailRow>
                    <DetailRow label="โทรศัพท์">
                      <span className="font-mono">{order.phone}</span>
                    </DetailRow>
                    <DetailRow label="จังหวัด">
                      <span className="inline-flex items-center gap-1">
                        <MapPinIcon className="size-4 text-muted-foreground" aria-hidden />
                        {order.province}
                      </span>
                    </DetailRow>
                  </dl>
                </CardContent>
              </Card>

              <Card size="sm">
                <CardHeader>
                  <CardTitle>รายการสินค้า</CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                  <Table>
                    <caption className="sr-only">รายการสินค้าในคำสั่งซื้อ</caption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>SKU</TableHead>
                        <TableHead>สินค้า</TableHead>
                        <TableHead className="text-right">จำนวน</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order.items.map((item, i) => (
                        <TableRow key={`${item.sku}-${i}`}>
                          <TableCell className="font-mono text-[13px]">{item.sku}</TableCell>
                          <TableCell className="whitespace-normal">{item.name}</TableCell>
                          <TableCell className="text-right">{item.qty}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Separator />
                  <div className="flex justify-between px-(--card-spacing) pt-3 text-sm">
                    <span className="text-muted-foreground">รวม {order.totalQty} ชิ้น</span>
                    <span className="font-semibold tabular-nums">฿{formatBaht(order.amount)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <SheetFooter className="flex-row justify-end gap-2 border-t border-border p-4">
              <Button variant="outline">
                <PencilIcon data-icon="inline-start" />
                แก้ไขที่อยู่
              </Button>
              <Button
                disabled={order.blockers.length > 0}
                onClick={() => toast.success(`ยืนยันคำสั่งซื้อ ${order.orderNo} แล้ว`)}
              >
                <CheckIcon data-icon="inline-start" />
                ยืนยันข้อมูล
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
