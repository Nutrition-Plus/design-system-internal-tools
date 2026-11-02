"use client"

import * as React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

type ConfirmDialogProps = {
  trigger: React.ReactNode
  title: string
  description: React.ReactNode
  confirmLabel: string
  cancelLabel?: string
  /** destructive for actions that delete or cannot be undone. */
  tone?: "default" | "destructive"
  /** May return a promise; the dialog stays open with a spinner until it settles, and stays open on failure. */
  onConfirm: () => void | Promise<void>
}

/**
 * Use for hard-to-undo actions (cancel booking, delete, mark shipped).
 * Focus starts on Cancel, so pressing Enter by accident is safe.
 */
function ConfirmDialog({
  trigger,
  title,
  description,
  confirmLabel,
  cancelLabel = "ยกเลิก",
  tone = "default",
  onConfirm,
}: ConfirmDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [pending, setPending] = React.useState(false)

  async function confirm(event: React.MouseEvent) {
    event.preventDefault()
    setPending(true)
    try {
      await onConfirm()
      setOpen(false)
    } catch {
      // Keep the dialog open so the user can retry; the caller shows the error toast.
    } finally {
      setPending(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={(next) => !pending && setOpen(next)}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" disabled={pending} autoFocus>
              {cancelLabel}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant={tone === "destructive" ? "destructive" : "default"}
              onClick={confirm}
              disabled={pending}
              aria-busy={pending}
            >
              {pending && <Spinner data-icon="inline-start" />}
              {confirmLabel}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { ConfirmDialog }
