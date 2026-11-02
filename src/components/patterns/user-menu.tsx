"use client"

import * as React from "react"
import { BadgeCheckIcon, LogOutIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export type UserProfile = {
  name: string
  email: string
  /** Display role, e.g. "Ops". */
  role: string
}

type UserMenuProps = {
  user: UserProfile
  /** Called when the user picks "ออกจากระบบ". May be async; the item shows its busy state meanwhile. */
  onLogout: () => void | Promise<void>
}

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()

function UserSummary({ user }: { user: UserProfile }) {
  return (
    <>
      <Avatar className="size-8 rounded-lg">
        <AvatarFallback className="rounded-lg">
          {initials(user.name)}
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user.name}</span>
        <span className="truncate text-xs text-muted-foreground">
          {user.email}
        </span>
      </div>
    </>
  )
}

/**
 * Sidebar footer user row: a round avatar and the name on one line. Tapping it opens a dropdown to the side
 * with the email, role and sign out. Collapses to the avatar in icon mode.
 */
function UserMenu({ user, onLogout }: UserMenuProps) {
  const [signingOut, setSigningOut] = React.useState(false)

  async function logout() {
    setSigningOut(true)
    try {
      await onLogout()
    } finally {
      setSigningOut(false)
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              tooltip={user.name}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-6 rounded-full">
                <AvatarFallback className="rounded-full text-[10px]">
                  {initials(user.name)}
                </AvatarFallback>
              </Avatar>
              <span className="truncate">{user.name}</span>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            side="right"
            align="end"
            sideOffset={8}
          >
            <DropdownMenuLabel className="flex items-center gap-2 p-1.5 font-normal">
              <UserSummary user={user} />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem disabled>
                <BadgeCheckIcon />
                บทบาท: {user.role}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={logout} disabled={signingOut}>
              <LogOutIcon />
              {signingOut ? "กำลังออกจากระบบ…" : "ออกจากระบบ"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export { UserMenu }
