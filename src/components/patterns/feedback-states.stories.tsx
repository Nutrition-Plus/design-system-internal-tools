import type { Meta, StoryObj } from "@storybook/react-vite"
import { CheckCircle2Icon, PlusIcon } from "lucide-react"
import { toast } from "sonner"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { EmptyState, ErrorState } from "./feedback-states"

const meta = {
  title: "Patterns/Feedback States",
  parameters: {
    docs: {
      description: {
        component: [
          "| สถานะ | ใช้ | ข้อควรระวัง |",
          "|-|-|-|",
          "| **Loading (ทั้งส่วน)** | `Skeleton` รูปร่างเดียวกับเนื้อหาจริง | ใส่ `aria-busy` บนส่วนนั้น · ไม่ใช้ spinner เต็มหน้า |",
          "| **Loading (การกระทำ)** | `Spinner` ในปุ่ม + disabled | คงความกว้างปุ่ม เปลี่ยนข้อความเป็น “กำลัง…” |",
          '| **Empty: ยังไม่มีข้อมูล** | `EmptyState kind="no-data"` | บอกว่าข้อมูลจะมาจากไหน หรือมีปุ่มสร้าง |',
          '| **Empty: ไม่พบตามตัวกรอง** | `EmptyState kind="no-results"` | มีปุ่ม “ล้างตัวกรอง” เสมอ |',
          "| **Error (โหลด)** | `ErrorState` + ลองใหม่ + รหัสอ้างอิง | ไม่แสดง stack trace หรือข้อความเทคนิค |",
          "| **Error (บันทึก)** | `toast.error` + คงค่าที่กรอก | บอกสิ่งที่ผู้ใช้ทำต่อได้ |",
          "| **Success** | `toast.success` สั้น ๆ | ถ้าผลสำคัญต่อเนื่อง ใช้ Alert `success` แทน |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const LoadingSkeleton: Story = {
  render: () => (
    <Card className="max-w-md" aria-busy>
      <CardHeader>
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-56" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  ),
}

export const LoadingAction: Story = {
  render: () => (
    <Button disabled aria-busy>
      <Spinner data-icon="inline-start" />
      กำลังบันทึก…
    </Button>
  ),
}

export const EmptyNoData: Story = {
  name: "Empty: no data",
  render: () => (
    <EmptyState
      kind="no-data"
      title="ยังไม่มีโน้ต"
      description="โน้ตช่วยให้ทีมแพ็กเห็นข้อมูลพิเศษของลูกค้า"
      action={
        <Button>
          <PlusIcon data-icon="inline-start" />
          เพิ่มโน้ต
        </Button>
      }
    />
  ),
}

export const EmptyNoResults: Story = {
  name: "Empty: no results",
  render: () => (
    <EmptyState
      kind="no-results"
      action={<Button variant="outline">ล้างตัวกรอง</Button>}
    />
  ),
}

export const ErrorWithRetry: Story = {
  render: () => (
    <ErrorState reference="REQ-7F3A-0O12" onRetry={() => undefined} />
  ),
}

export const Success: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-4">
      <Button
        variant="outline"
        className="self-start"
        onClick={() =>
          toast.success("บันทึกคำสั่งซื้อแล้ว", { description: "SP2510300001" })
        }
      >
        แสดง toast สำเร็จ
      </Button>
      <Alert variant="success">
        <CheckCircle2Icon />
        <AlertTitle>นำเข้าเลขพัสดุครบ 128 รายการ</AlertTitle>
        <AlertDescription>
          ระบบจะส่งเลขพัสดุกลับไปยังช่องทางขายภายใน 5 นาที
        </AlertDescription>
      </Alert>
    </div>
  ),
}
