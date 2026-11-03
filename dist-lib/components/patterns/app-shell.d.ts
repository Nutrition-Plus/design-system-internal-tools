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
export type AppShellBrand = {
    /** Company or system name, e.g. "MOOVE". */
    name: string;
    /** Second line, e.g. the system name "OMS". */
    description?: string;
    /** Logo mark shown in a 32px square: an <img> or a Lucide icon element. Defaults to the first letter of `name`. */
    logo?: React.ReactNode;
    /** Makes the brand a link, usually to the home page. */
    href?: string;
};
type AppShellProps = {
    /** Company name and logo at the top of the sidebar (shadcn sidebar-07 pattern). Collapses to the logo. */
    brand?: AppShellBrand;
    /** Extra sidebar header content below the brand, e.g. a search field. */
    header?: React.ReactNode;
    nav: NavGroup[];
    footer?: React.ReactNode;
    defaultOpen?: boolean;
    children: React.ReactNode;
};
/**
 * SidebarInset renders the page's <main> landmark, so children must not add another one.
 * Standard layout: collapsible sidebar (Sheet on < 768px) with the brand and collapse button at the top,
 * content on the white surface with the page gutter from the density token. No top bar on desktop.
 */
declare function AppShell({ brand, header, nav, footer, defaultOpen, children, }: AppShellProps): React.JSX.Element;
export { AppShell };
