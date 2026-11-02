"use client"

import * as React from "react"
import { cn } from "cn"
import { ChevronDownIcon, type LucideIcon } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

/**
 * Menu item states follow the input pattern: no box at rest, a visible border on hover,
 * a primary border + text when selected, and the same focus ring as fields.
 * Uses the same `data-active` variant as shadcn's sidebar so these classes replace its fill.
 */
const MENU_ITEM =
  "border border-transparent hover:border-muted-foreground hover:bg-background hover:text-foreground active:bg-background data-active:border-primary data-active:bg-background data-active:font-medium data-active:text-primary data-open:hover:bg-background focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"

export type NavItem = {
  title: string
  href: string
  icon: LucideIcon
  active?: boolean
  /** Count of items needing attention, e.g. open blockers. */
  badge?: number
  /** Sub-items. When present the item expands and collapses (shadcn sidebar-07 pattern). */
  children?: {
    title: string
    href: string
    active?: boolean
    /** Count shown on the right, e.g. open orders in that view. */
    count?: number
  }[]
}

export type NavGroup = { label?: string; items: NavItem[] }

type AppShellProps = {
  /** Optional sidebar header content. Empty by default: the sidebar starts with the menu. */
  header?: React.ReactNode
  nav: NavGroup[]
  breadcrumbs?: { label: string; href?: string }[]
  /** Right side of the top bar (user menu, sync status). */
  headerEnd?: React.ReactNode
  footer?: React.ReactNode
  defaultOpen?: boolean
  children: React.ReactNode
}

/**
 * SidebarInset renders the page's <main> landmark, so children must not add another one.
 * Standard layout: collapsible sidebar (Sheet on < 768px), top bar with breadcrumb,
 * content on the white surface with the page gutter from the density token.
 */
function AppShell({
  header,
  nav,
  breadcrumbs = [],
  headerEnd,
  footer,
  defaultOpen = true,
  children,
}: AppShellProps) {
  return (
    <SidebarProvider defaultOpen={defaultOpen} className="min-h-svh">
      <Sidebar collapsible="icon">
        {header && <SidebarHeader>{header}</SidebarHeader>}
        <SidebarContent>
          {nav.map((group, i) => (
            <SidebarGroup key={group.label ?? i}>
              {group.label && (
                <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) =>
                    item.children?.length ? (
                      <Collapsible
                        key={item.href}
                        asChild
                        defaultOpen={
                          item.active || item.children.some((c) => c.active)
                        }
                        className="group/collapsible"
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              tooltip={item.title}
                              className={cn(
                                MENU_ITEM,
                                (item.active ||
                                  item.children.some((c) => c.active)) &&
                                  "font-semibold"
                              )}
                            >
                              <item.icon />
                              <span>{item.title}</span>
                              <ChevronDownIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub className="gap-0.5 py-1">
                              {item.children.map((child) => (
                                <SidebarMenuSubItem
                                  key={child.href}
                                  className="relative"
                                >
                                  {/* dot sitting on the vertical guide line */}
                                  <span
                                    aria-hidden
                                    className={cn(
                                      "absolute top-1/2 -left-[13.5px] size-1.5 -translate-y-1/2 rounded-full",
                                      child.active ? "bg-primary" : "bg-border"
                                    )}
                                  />
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={child.active}
                                    className={MENU_ITEM}
                                  >
                                    <a
                                      href={child.href}
                                      aria-current={
                                        child.active ? "page" : undefined
                                      }
                                    >
                                      <span>{child.title}</span>
                                      {child.count !== undefined && (
                                        <span className="ml-auto text-xs text-muted-foreground tabular-nums">
                                          {child.count.toLocaleString("th-TH")}
                                        </span>
                                      )}
                                    </a>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    ) : (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          asChild
                          isActive={item.active}
                          tooltip={item.title}
                          className={MENU_ITEM}
                        >
                          <a
                            href={item.href}
                            aria-current={item.active ? "page" : undefined}
                          >
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                        {item.badge ? (
                          <SidebarMenuBadge
                            className="tabular-nums"
                            aria-label={`${item.badge} รายการ`}
                          >
                            {item.badge}
                          </SidebarMenuBadge>
                        ) : null}
                      </SidebarMenuItem>
                    )
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        {footer && <SidebarFooter>{footer}</SidebarFooter>}
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="min-w-0 bg-background">
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-(--page-gutter)">
          <SidebarTrigger className="-ml-2" aria-label="เปิดหรือปิดเมนู" />
          {breadcrumbs.length > 0 && (
            <>
              <Separator orientation="vertical" className="mr-1 h-full" />
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((crumb, i) => (
                    <React.Fragment key={crumb.label}>
                      {i > 0 && <BreadcrumbSeparator />}
                      <BreadcrumbItem>
                        {crumb.href && i < breadcrumbs.length - 1 ? (
                          <BreadcrumbLink href={crumb.href}>
                            {crumb.label}
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </>
          )}
          <div className="ml-auto flex items-center gap-2">{headerEnd}</div>
        </header>
        <div className="flex min-w-0 flex-1 flex-col gap-4 p-(--page-gutter)">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export { AppShell }
