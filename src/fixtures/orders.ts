// Synthetic OMS orders for stories and examples. Never use real customer data here (OMS rule 9).
// Status and blocker enums mirror OMS v2 docs/00-overview/project-overview.md and data-model.md.

export const WORK_STATUSES = [
  "new",
  "needs_review",
  "ready_to_book",
  "booked",
  "label_issued",
  "partially_shipped",
  "shipped",
] as const
export type WorkStatus = (typeof WORK_STATUSES)[number]

export const BLOCKER_CAUSES = [
  "unmapped_status",
  "cancelled",
  "source_changed",
  "withdrawn",
  "duplicate_suspect",
  "flavor_conflict",
  "pack_changed",
] as const
export type BlockerCause = (typeof BLOCKER_CAUSES)[number]

export const CHANNELS = ["shopee", "lazada", "tiktok", "line"] as const
export type Channel = (typeof CHANNELS)[number]

export type Order = {
  id: string
  orderNo: string
  channel: Channel
  customer: string
  phone: string
  province: string
  items: { sku: string; name: string; qty: number }[]
  totalQty: number
  amount: number
  status: WorkStatus
  blockers: BlockerCause[]
  hasNote: boolean
  createdAt: string
}

const PRODUCTS = [
  { sku: "CP-LYC-350", name: "Clear Protein รสลิ้นจี่ 350 มล." },
  { sku: "CP-PCH-350", name: "Clear Protein รสพีช 350 มล." },
  { sku: "HPM-CHO-250", name: "HPM นมโปรตีนสูง รสช็อกโกแลต 250 มล." },
  { sku: "HPM-ORG-250", name: "HPM นมโปรตีนสูง รสออริจินัล 250 มล." },
  { sku: "LZM-KPR-001", name: "Lazy Meal ผัดกะเพราไก่" },
  { sku: "LZM-GRN-002", name: "Lazy Meal แกงเขียวหวานไก่" },
]

const PROVINCES = ["กรุงเทพมหานคร", "นนทบุรี", "ปทุมธานี", "สมุทรปราการ", "เชียงใหม่", "ขอนแก่น", "ชลบุรี", "ภูเก็ต"]

// Small deterministic PRNG so stories and screenshots are stable.
function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

export function makeOrders(count = 64, seed = 7): Order[] {
  const rand = rng(seed)
  const pick = <T,>(list: readonly T[]) => list[Math.floor(rand() * list.length)]
  const base = Date.UTC(2026, 9, 30, 9, 0)

  return Array.from({ length: count }, (_, i) => {
    const lines = Array.from({ length: 1 + Math.floor(rand() * 3) }, () => ({
      ...pick(PRODUCTS),
      qty: [6, 12, 24][Math.floor(rand() * 3)],
    }))
    const status = WORK_STATUSES[i % WORK_STATUSES.length]
    const blockers: BlockerCause[] =
      status === "needs_review" || (status === "new" && i % 3 === 0)
        ? [BLOCKER_CAUSES[i % BLOCKER_CAUSES.length]]
        : []
    if (i % 11 === 1) blockers.push("duplicate_suspect")
    const totalQty = lines.reduce((sum, l) => sum + l.qty, 0)
    const no = String(250930000 + i * 37).padStart(9, "0")

    return {
      id: `ord_${i + 1}`,
      orderNo: `${["SP", "LZ", "TT", "LN"][i % 4]}${no}O${i % 10}`,
      channel: CHANNELS[i % CHANNELS.length],
      customer: `ลูกค้าทดสอบ ${String(i + 1).padStart(2, "0")}`,
      phone: `08x-xxx-${String(1000 + ((i * 97) % 9000)).slice(0, 4)}`,
      province: pick(PROVINCES),
      items: lines,
      totalQty,
      amount: Math.round(totalQty * (35 + rand() * 30)) + 0.5 * (i % 2),
      status,
      blockers: [...new Set(blockers)],
      hasNote: i % 5 === 2,
      createdAt: new Date(base - i * 47 * 60_000).toISOString(),
    }
  })
}

export const ORDERS = makeOrders()
