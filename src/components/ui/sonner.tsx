"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      richColors
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius-2xl)",
          "--success-bg": "var(--success-subtle)",
          "--success-text": "var(--success-foreground)",
          "--success-border": "var(--success-border)",
          "--error-bg": "var(--danger-subtle)",
          "--error-text": "var(--danger-foreground)",
          "--error-border": "var(--danger-border)",
          "--warning-bg": "var(--warning-subtle)",
          "--warning-text": "var(--warning-foreground)",
          "--warning-border": "var(--warning-border)",
          "--info-bg": "var(--info-subtle)",
          "--info-text": "var(--info-foreground)",
          "--info-border": "var(--info-border)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
