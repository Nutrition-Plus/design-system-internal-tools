"use client"

import * as React from "react"
import { InboxIcon, RefreshCwIcon, SearchXIcon, ServerCrashIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

type EmptyStateProps = {
  /**
   * no-data: nothing exists yet (offer the create action).
   * no-results: data exists but filters hide it (offer "clear filters").
   */
  kind: "no-data" | "no-results"
  title?: string
  description?: string
  action?: React.ReactNode
}

function EmptyState({ kind, title, description, action }: EmptyStateProps) {
  const Icon = kind === "no-data" ? InboxIcon : SearchXIcon
  return (
    <Empty data-kind={kind} className="py-12">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{title ?? (kind === "no-data" ? "ยังไม่มีข้อมูล" : "ไม่พบรายการที่ตรงกับตัวกรอง")}</EmptyTitle>
        <EmptyDescription>
          {description ??
            (kind === "no-data"
              ? "เมื่อมีข้อมูลเข้ามา รายการจะแสดงที่นี่"
              : "ลองเปลี่ยนคำค้นหาหรือล้างตัวกรองเพื่อดูรายการทั้งหมด")}
        </EmptyDescription>
      </EmptyHeader>
      {action && <EmptyContent>{action}</EmptyContent>}
    </Empty>
  )
}

type ErrorStateProps = {
  title?: string
  description?: string
  /** Shown to support staff; e.g. a request id. Never show stack traces. */
  reference?: string
  onRetry?: () => void
  retrying?: boolean
}

function ErrorState({ title, description, reference, onRetry, retrying }: ErrorStateProps) {
  return (
    <Empty role="alert" className="py-12">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-danger-subtle text-danger-foreground">
          <ServerCrashIcon />
        </EmptyMedia>
        <EmptyTitle>{title ?? "โหลดข้อมูลไม่สำเร็จ"}</EmptyTitle>
        <EmptyDescription>
          {description ?? "เกิดข้อผิดพลาดระหว่างดึงข้อมูล ข้อมูลของคุณไม่ได้รับผลกระทบ ลองใหม่อีกครั้ง"}
          {reference && (
            <>
              <br />
              <span className="font-mono text-xs">รหัสอ้างอิง {reference}</span>
            </>
          )}
        </EmptyDescription>
      </EmptyHeader>
      {onRetry && (
        <EmptyContent>
          <Button variant="outline" onClick={onRetry} disabled={retrying} aria-busy={retrying}>
            <RefreshCwIcon data-icon="inline-start" className={retrying ? "animate-spin" : undefined} />
            ลองใหม่
          </Button>
        </EmptyContent>
      )}
    </Empty>
  )
}

export { EmptyState, ErrorState }
