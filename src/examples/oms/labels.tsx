// OMS-specific display helpers used by the examples only. In the OMS repo these become
// domain components (WorkStatusBadge, BlockerBadge, ChannelTag) in src/components/domain/.
import { AlertTriangleIcon, StickyNoteIcon } from "lucide-react"

import { Badge, BadgeDot } from "@/components/ui/badge"
import type { BlockerCause, Channel, WorkStatus } from "@/fixtures/orders"

type BadgeVariant = React.ComponentProps<typeof Badge>["variant"]

export const STATUS: Record<WorkStatus, { label: string; variant: BadgeVariant }> = {
  new: { label: "ใหม่", variant: "info" },
  needs_review: { label: "รอตรวจสอบ", variant: "warning" },
  ready_to_book: { label: "พร้อมจองรอบ", variant: "accent" },
  booked: { label: "จองรอบแล้ว", variant: "highlight" },
  label_issued: { label: "ออกใบปะหน้าแล้ว", variant: "secondary" },
  partially_shipped: { label: "ส่งบางส่วน", variant: "success" },
  shipped: { label: "ส่งแล้ว", variant: "success" },
}

export const BLOCKER: Record<BlockerCause, string> = {
  unmapped_status: "สถานะยังไม่จับคู่",
  cancelled: "ลูกค้ายกเลิก",
  source_changed: "ข้อมูลต้นทางเปลี่ยน",
  withdrawn: "ถอนการยืนยัน",
  duplicate_suspect: "สงสัยคำสั่งซื้อซ้ำ",
  flavor_conflict: "รสชาติไม่ตรง",
  pack_changed: "รายการแพ็กเปลี่ยน",
}

export const CHANNEL: Record<Channel, string> = {
  shopee: "Shopee",
  lazada: "Lazada",
  tiktok: "TikTok Shop",
  line: "LINE Shopping",
}

export function WorkStatusBadge({ status }: { status: WorkStatus }) {
  const s = STATUS[status]
  return (
    <Badge variant={s.variant}>
      <BadgeDot />
      {s.label}
    </Badge>
  )
}

export function BlockerBadge({ cause }: { cause: BlockerCause }) {
  return (
    <Badge variant="destructive">
      <AlertTriangleIcon data-icon="inline-start" />
      {BLOCKER[cause]}
    </Badge>
  )
}

export function NoteBadge() {
  return (
    <Badge variant="highlight">
      <StickyNoteIcon data-icon="inline-start" />
      มีโน้ต
    </Badge>
  )
}

/** Marketplace names are shown as neutral text badges; we never use other brands' colors. */
export function ChannelBadge({ channel }: { channel: Channel }) {
  return <Badge variant="secondary">{CHANNEL[channel]}</Badge>
}

export const formatBaht = (n: number) =>
  n.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("th-TH-u-ca-gregory", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Bangkok",
  })
