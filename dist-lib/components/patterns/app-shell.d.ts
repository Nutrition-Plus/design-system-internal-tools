import * as React from "react";
import { type LucideIcon } from "lucide-react";
export type NavItem = {
    title: string;
    href: string;
    icon: LucideIcon;
    active?: boolean;
    /** Count of items needing attention, e.g. open blockers. */
    badge?: number;
    /** Sub-items. When present the item expands and collapses (shadcn sidebar-07 pattern). */
    children?: {
        title: string;
        href: string;
        active?: boolean;
        /** Count shown on the right, e.g. open orders in that view. */
        count?: number;
    }[];
};
export type NavGroup = {
    label?: string;
    items: NavItem[];
};
type AppShellProps = {
    /** Optional sidebar header content. Empty by default: the sidebar starts with the menu. */
    header?: React.ReactNode;
    nav: NavGroup[];
    breadcrumbs?: {
        label: string;
        href?: string;
    }[];
    /** Right side of the top bar (user menu, sync status). */
    headerEnd?: React.ReactNode;
    footer?: React.ReactNode;
    defaultOpen?: boolean;
    children: React.ReactNode;
};
/**
 * SidebarInset renders the page's <main> landmark, so children must not add another one.
 * Standard layout: collapsible sidebar (Sheet on < 768px), top bar with breadcrumb,
 * content on the white surface with the page gutter from the density token.
 */
declare function AppShell({ header, nav, breadcrumbs, headerEnd, footer, defaultOpen, children, }: AppShellProps): React.JSX.Element;
export { AppShell };
