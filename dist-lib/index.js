import * as e from "react";
import { useMemo as t } from "react";
import { cn as n, cn as r } from "cn";
import { AlertDialog as i, Avatar as a, Checkbox as o, Collapsible as s, Dialog as c, DropdownMenu as l, HoverCard as u, Label as d, Popover as f, Progress as p, ScrollArea as m, Select as h, Separator as g, Slot as _, Tabs as v, Toggle as ee, ToggleGroup as te, Tooltip as y } from "radix-ui";
import { cva as b } from "class-variance-authority";
import { Fragment as x, jsx as S, jsxs as C } from "react/jsx-runtime";
import { ArrowDownIcon as ne, ArrowUpIcon as re, BadgeCheckIcon as ie, CalendarIcon as ae, ChartNoAxesColumnIcon as oe, CheckIcon as w, ChevronDownIcon as T, ChevronLeftIcon as se, ChevronRightIcon as E, ChevronUpIcon as ce, ChevronsLeftIcon as le, ChevronsRightIcon as ue, ChevronsUpDownIcon as de, CircleCheckIcon as fe, Columns3Icon as pe, InboxIcon as me, InfoIcon as he, Loader2Icon as ge, LogOutIcon as _e, MinusIcon as ve, MoreHorizontalIcon as ye, OctagonXIcon as be, PanelLeftIcon as xe, PlusCircleIcon as Se, RefreshCwIcon as Ce, SearchIcon as we, SearchXIcon as Te, ServerCrashIcon as Ee, TableIcon as De, TriangleAlertIcon as Oe, XIcon as D } from "lucide-react";
import { DayPicker as ke, getDefaultClassNames as Ae } from "react-day-picker";
import * as je from "recharts";
import { Command as O } from "cmdk";
import { Toaster as Me } from "sonner";
import { th as Ne } from "react-day-picker/locale";
import { columnFilteringFeature as Pe, columnVisibilityFeature as Fe, createFilteredRowModel as Ie, createPaginatedRowModel as Le, createSortedRowModel as Re, filterFn_arrIncludesSome as ze, filterFn_includesString as Be, globalFilteringFeature as Ve, rowPaginationFeature as He, rowSelectionFeature as Ue, rowSortingFeature as We, sortFn_alphanumeric as Ge, sortFn_basic as Ke, sortFn_datetime as qe, sortFn_text as Je, tableFeatures as Ye } from "@tanstack/react-table";
// src/components/ui/button.tsx
var k = b("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-colors duration-(--duration-fast) outline-none select-none active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-busy:cursor-progress aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-(--icon-size)", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary-hover",
			outline: "border-input bg-background text-primary shadow-xs hover:bg-accent aria-expanded:bg-accent",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover aria-expanded:bg-secondary-hover",
			ghost: "text-foreground hover:bg-accent hover:text-accent-foreground aria-expanded:bg-accent aria-expanded:text-accent-foreground",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive-hover",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-control gap-2 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
			xs: "h-6 gap-1 rounded-md px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
			sm: "h-control-sm gap-1.5 px-3 in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-4",
			lg: "h-control-lg gap-2 px-5 text-base has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
			icon: "size-control",
			"icon-xs": "size-6 rounded-md in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
			"icon-sm": "size-control-sm in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-4",
			"icon-lg": "size-control-lg"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function A({ className: e, variant: t = "default", size: n = "default", asChild: i = !1, ...a }) {
	let o = i ? _.Root : "button";
	return /* @__PURE__ */ S(o, {
		"data-slot": "button",
		"data-variant": t,
		"data-size": n,
		className: r(k({
			variant: t,
			size: n,
			className: e
		})),
		...a
	});
}
// src/components/ui/alert-dialog.tsx
function Xe({ ...e }) {
	return /* @__PURE__ */ S(i.Root, {
		"data-slot": "alert-dialog",
		...e
	});
}
function Ze({ ...e }) {
	return /* @__PURE__ */ S(i.Trigger, {
		"data-slot": "alert-dialog-trigger",
		...e
	});
}
function Qe({ ...e }) {
	return /* @__PURE__ */ S(i.Portal, {
		"data-slot": "alert-dialog-portal",
		...e
	});
}
function $e({ className: e, ...t }) {
	return /* @__PURE__ */ S(i.Overlay, {
		"data-slot": "alert-dialog-overlay",
		className: r("fixed inset-0 z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", e),
		...t
	});
}
function et({ className: e, size: t = "default", ...n }) {
	return /* @__PURE__ */ C(Qe, { children: [/* @__PURE__ */ S($e, {}), /* @__PURE__ */ S(i.Content, {
		"data-slot": "alert-dialog-content",
		"data-size": t,
		className: r("group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl border border-border bg-popover p-6 text-popover-foreground shadow-lg duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
		...n
	})] });
}
function tt({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "alert-dialog-header",
		className: r("grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]", e),
		...t
	});
}
function nt({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "alert-dialog-footer",
		className: r("-mx-6 -mb-6 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-secondary px-6 py-4 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end", e),
		...t
	});
}
function rt({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "alert-dialog-media",
		className: r("mb-2 inline-flex size-10 items-center justify-center rounded-md bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-6", e),
		...t
	});
}
function it({ className: e, ...t }) {
	return /* @__PURE__ */ S(i.Title, {
		"data-slot": "alert-dialog-title",
		className: r("font-heading type-h3 sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2", e),
		...t
	});
}
function at({ className: e, ...t }) {
	return /* @__PURE__ */ S(i.Description, {
		"data-slot": "alert-dialog-description",
		className: r("text-sm text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", e),
		...t
	});
}
function ot({ className: e, variant: t = "default", size: n = "default", ...a }) {
	return /* @__PURE__ */ S(A, {
		variant: t,
		size: n,
		asChild: !0,
		children: /* @__PURE__ */ S(i.Action, {
			"data-slot": "alert-dialog-action",
			className: r(e),
			...a
		})
	});
}
function st({ className: e, variant: t = "outline", size: n = "default", ...a }) {
	return /* @__PURE__ */ S(A, {
		variant: t,
		size: n,
		asChild: !0,
		children: /* @__PURE__ */ S(i.Cancel, {
			"data-slot": "alert-dialog-cancel",
			className: r(e),
			...a
		})
	});
}
// src/components/ui/alert.tsx
var ct = b("group/alert relative grid w-full gap-0.5 rounded-lg border border-l-4 px-4 py-3 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-28 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-(--icon-size)", {
	variants: { variant: {
		default: "border-border border-l-input bg-card text-card-foreground *:data-[slot=alert-description]:text-muted-foreground",
		info: "border-info-border border-l-info bg-info-subtle text-info-foreground",
		success: "border-success-border border-l-success bg-success-subtle text-success-foreground",
		warning: "border-warning-border border-l-warning bg-warning-subtle text-warning-foreground",
		destructive: "border-danger-border border-l-danger bg-danger-subtle text-danger-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function lt({ className: e, variant: t, ...n }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "alert",
		"data-variant": t,
		role: t === "destructive" || t === "warning" ? "alert" : "status",
		className: r(ct({ variant: t }), e),
		...n
	});
}
function ut({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "alert-title",
		className: r("font-semibold group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3", e),
		...t
	});
}
function dt({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "alert-description",
		className: r("text-sm text-pretty text-current [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-2", e),
		...t
	});
}
function ft({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "alert-action",
		className: r("absolute top-1/2 right-3 -translate-y-1/2", e),
		...t
	});
}
// src/components/ui/avatar.tsx
function pt({ className: e, size: t = "default", ...n }) {
	return /* @__PURE__ */ S(a.Root, {
		"data-slot": "avatar",
		"data-size": t,
		className: r("group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6", e),
		...n
	});
}
function mt({ className: e, ...t }) {
	return /* @__PURE__ */ S(a.Image, {
		"data-slot": "avatar-image",
		className: r("aspect-square size-full rounded-full object-cover", e),
		...t
	});
}
function j({ className: e, ...t }) {
	return /* @__PURE__ */ S(a.Fallback, {
		"data-slot": "avatar-fallback",
		className: r("flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs", e),
		...t
	});
}
function ht({ className: e, ...t }) {
	return /* @__PURE__ */ S("span", {
		"data-slot": "avatar-badge",
		className: r("absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none", "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden", "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2", "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2", e),
		...t
	});
}
function gt({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "avatar-group",
		className: r("group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background", e),
		...t
	});
}
function _t({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "avatar-group-count",
		className: r("relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3", e),
		...t
	});
}
// src/components/ui/badge.tsx
var vt = b("group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-4xl border border-transparent px-2.5 text-xs leading-none font-medium whitespace-nowrap transition-colors has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 aria-invalid:border-destructive [&>svg]:pointer-events-none [&>svg]:size-3.5!", {
	variants: { variant: {
		default: "bg-primary text-primary-foreground [a]:hover:bg-primary-hover",
		secondary: "bg-secondary text-foreground-secondary *:data-[slot=badge-dot]:bg-input [a]:hover:bg-secondary-hover",
		outline: "border-border bg-background text-foreground-secondary *:data-[slot=badge-dot]:bg-input [a]:hover:bg-secondary",
		accent: "bg-accent text-accent-foreground *:data-[slot=badge-dot]:bg-primary",
		success: "bg-success-subtle text-success-foreground *:data-[slot=badge-dot]:bg-success",
		warning: "bg-warning-subtle text-warning-foreground *:data-[slot=badge-dot]:bg-warning",
		destructive: "bg-danger-subtle text-danger-foreground *:data-[slot=badge-dot]:bg-danger",
		info: "bg-info-subtle text-info-foreground *:data-[slot=badge-dot]:bg-info",
		highlight: "bg-highlight-subtle text-highlight-foreground *:data-[slot=badge-dot]:bg-highlight",
		ghost: "hover:bg-muted hover:text-muted-foreground",
		link: "text-primary underline-offset-4 hover:underline"
	} },
	defaultVariants: { variant: "secondary" }
});
function M({ className: e, variant: t = "secondary", asChild: n = !1, ...i }) {
	let a = n ? _.Root : "span";
	return /* @__PURE__ */ S(a, {
		"data-slot": "badge",
		"data-variant": t,
		className: r(vt({ variant: t }), e),
		...i
	});
}
function yt({ className: e, ...t }) {
	return /* @__PURE__ */ S("span", {
		"data-slot": "badge-dot",
		"aria-hidden": !0,
		className: r("size-1.5 shrink-0 rounded-full bg-current", e),
		...t
	});
}
// src/components/ui/breadcrumb.tsx
function bt({ className: e, ...t }) {
	return /* @__PURE__ */ S("nav", {
		"aria-label": "breadcrumb",
		"data-slot": "breadcrumb",
		className: r(e),
		...t
	});
}
function xt({ className: e, ...t }) {
	return /* @__PURE__ */ S("ol", {
		"data-slot": "breadcrumb-list",
		className: r("flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground", e),
		...t
	});
}
function St({ className: e, ...t }) {
	return /* @__PURE__ */ S("li", {
		"data-slot": "breadcrumb-item",
		className: r("inline-flex items-center gap-1", e),
		...t
	});
}
function Ct({ asChild: e, className: t, ...n }) {
	let i = e ? _.Root : "a";
	return /* @__PURE__ */ S(i, {
		"data-slot": "breadcrumb-link",
		className: r("transition-colors hover:text-foreground", t),
		...n
	});
}
function wt({ className: e, ...t }) {
	return /* @__PURE__ */ S("span", {
		"data-slot": "breadcrumb-page",
		role: "link",
		"aria-disabled": "true",
		"aria-current": "page",
		className: r("font-normal text-foreground", e),
		...t
	});
}
function Tt({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ S("li", {
		"data-slot": "breadcrumb-separator",
		role: "presentation",
		"aria-hidden": "true",
		className: r("[&>svg]:size-3.5", t),
		...n,
		children: e ?? /* @__PURE__ */ S(E, {})
	});
}
function Et({ className: e, ...t }) {
	return /* @__PURE__ */ C("span", {
		"data-slot": "breadcrumb-ellipsis",
		role: "presentation",
		"aria-hidden": "true",
		className: r("flex size-5 items-center justify-center [&>svg]:size-4", e),
		...t,
		children: [/* @__PURE__ */ S(ye, {}), /* @__PURE__ */ S("span", {
			className: "sr-only",
			children: "More"
		})]
	});
}
// src/components/ui/calendar.tsx
function N({ className: e, classNames: t, showOutsideDays: n = !0, captionLayout: i = "label", buttonVariant: a = "ghost", locale: o, formatters: s, components: c, ...l }) {
	let u = Ae();
	return /* @__PURE__ */ S(ke, {
		showOutsideDays: n,
		className: r("group/calendar bg-background p-2 [--cell-radius:var(--radius-md)] [--cell-size:var(--control-h-sm)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent", String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`, String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`, e),
		captionLayout: i,
		locale: o,
		formatters: {
			formatMonthDropdown: (e) => e.toLocaleString(o?.code, { month: "short" }),
			...s
		},
		classNames: {
			root: r("w-fit", u.root),
			months: r("relative flex flex-col gap-4 md:flex-row", u.months),
			month: r("flex w-full flex-col gap-4", u.month),
			nav: r("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", u.nav),
			button_previous: r(k({ variant: a }), "size-(--cell-size) p-0 select-none aria-disabled:opacity-50", u.button_previous),
			button_next: r(k({ variant: a }), "size-(--cell-size) p-0 select-none aria-disabled:opacity-50", u.button_next),
			month_caption: r("flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)", u.month_caption),
			dropdowns: r("flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium", u.dropdowns),
			dropdown_root: r("relative rounded-(--cell-radius)", u.dropdown_root),
			dropdown: r("absolute inset-0 bg-popover opacity-0", u.dropdown),
			caption_label: r("font-medium select-none", i === "label" ? "text-sm" : "flex items-center gap-1 rounded-(--cell-radius) text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground", u.caption_label),
			month_grid: r("w-full border-collapse", u.month_grid),
			weekdays: r("flex", u.weekdays),
			weekday: r("flex-1 rounded-(--cell-radius) text-[0.8rem] font-normal text-muted-foreground select-none", u.weekday),
			week: r("mt-2 flex w-full", u.week),
			week_number_header: r("w-(--cell-size) select-none", u.week_number_header),
			week_number: r("text-[0.8rem] text-muted-foreground select-none", u.week_number),
			day: r("group/day relative aspect-square h-full w-full rounded-(--cell-radius) p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)", l.showWeekNumber ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)" : "[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)", u.day),
			range_start: r("relative isolate z-0 rounded-l-(--cell-radius) bg-accent after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-accent", u.range_start),
			range_middle: r("rounded-none bg-accent", u.range_middle),
			range_end: r("relative isolate z-0 rounded-r-(--cell-radius) bg-accent after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-accent", u.range_end),
			today: r("rounded-(--cell-radius) bg-secondary-hover text-foreground data-[selected=true]:rounded-none", u.today),
			outside: r("text-muted-foreground aria-selected:text-muted-foreground", u.outside),
			disabled: r("text-muted-foreground opacity-50", u.disabled),
			hidden: r("invisible", u.hidden),
			...t
		},
		components: {
			Root: ({ className: e, rootRef: t, ...n }) => /* @__PURE__ */ S("div", {
				"data-slot": "calendar",
				ref: t,
				className: r(e),
				...n
			}),
			Chevron: ({ className: e, orientation: t, ...n }) => S(t === "left" ? se : t === "right" ? E : T, {
				className: r("size-4", e),
				...n
			}),
			DayButton: ({ ...e }) => /* @__PURE__ */ S(Dt, {
				locale: o,
				...e
			}),
			WeekNumber: ({ children: e, ...t }) => /* @__PURE__ */ S("td", {
				...t,
				children: /* @__PURE__ */ S("div", {
					className: "flex size-(--cell-size) items-center justify-center text-center",
					children: e
				})
			}),
			...c
		},
		...l
	});
}
function Dt({ className: t, day: n, modifiers: i, locale: a, ...o }) {
	let s = Ae(), c = e.useRef(null);
	return e.useEffect(() => {
		i.focused && c.current?.focus();
	}, [i.focused]), /* @__PURE__ */ S(A, {
		ref: c,
		variant: "ghost",
		size: "icon",
		"data-day": n.date.toLocaleDateString(a?.code),
		"data-selected-single": i.selected && !i.range_start && !i.range_end && !i.range_middle,
		"data-range-start": i.range_start,
		"data-range-end": i.range_end,
		"data-range-middle": i.range_middle,
		className: r("relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:rounded-r-(--cell-radius) data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-muted data-[range-middle=true]:text-foreground data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-l-(--cell-radius) data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-foreground [&>span]:text-xs [&>span]:opacity-70", s.day, t),
		...o
	});
}
// src/components/ui/card.tsx
function Ot({ className: e, size: t = "default", variant: n = "default", interactive: i = !1, ...a }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "card",
		"data-size": t,
		"data-variant": n,
		"data-interactive": i || void 0,
		className: r("group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl border border-border bg-card py-(--card-spacing) text-sm text-card-foreground [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[interactive]:cursor-pointer data-[interactive]:transition-colors data-[interactive]:hover:bg-secondary data-[size=sm]:[--card-spacing:--spacing(4)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 data-[variant=muted]:border-transparent data-[variant=muted]:bg-secondary *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl", e),
		...a
	});
}
function kt({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "card-header",
		className: r("group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)", e),
		...t
	});
}
function At({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "card-title",
		className: r("font-heading type-h4 group-data-[size=sm]/card:type-body-strong", e),
		...t
	});
}
function jt({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "card-description",
		className: r("text-sm text-muted-foreground", e),
		...t
	});
}
function Mt({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "card-action",
		className: r("col-start-2 row-span-2 row-start-1 self-start justify-self-end", e),
		...t
	});
}
function Nt({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "card-content",
		className: r("px-(--card-spacing)", e),
		...t
	});
}
function Pt({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "card-footer",
		className: r("flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)", e),
		...t
	});
}
// src/components/ui/chart.tsx
var Ft = {
	light: "",
	dark: ".dark"
}, It = {
	width: 320,
	height: 200
}, Lt = e.createContext(null);
function Rt() {
	let t = e.useContext(Lt);
	if (!t) throw Error("useChart must be used within a <ChartContainer />");
	return t;
}
function zt({ id: t, className: n, children: i, config: a, initialDimension: o = It, ...s }) {
	let c = e.useId(), l = `chart-${t ?? c.replace(/:/g, "")}`;
	return /* @__PURE__ */ S(Lt.Provider, {
		value: { config: a },
		children: /* @__PURE__ */ C("div", {
			"data-slot": "chart",
			"data-chart": l,
			className: r("flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden", n),
			...s,
			children: [/* @__PURE__ */ S(Bt, {
				id: l,
				config: a
			}), /* @__PURE__ */ S(je.ResponsiveContainer, {
				initialDimension: o,
				children: i
			})]
		})
	});
}
var Bt = ({ id: e, config: t }) => {
	let n = Object.entries(t).filter(([, e]) => e.theme ?? e.color);
	return n.length ? /* @__PURE__ */ S("style", { dangerouslySetInnerHTML: { __html: Object.entries(Ft).map(([t, r]) => `
${r} [data-chart=${e}] {
${n.map(([e, n]) => {
		let r = n.theme?.[t] ?? n.color;
		return r ? `  --color-${e}: ${r};` : null;
	}).join("\n")}
}
`).join("\n") } }) : null;
}, Vt = je.Tooltip;
function Ht({ active: t, payload: n, className: i, indicator: a = "dot", hideLabel: o = !1, hideIndicator: s = !1, label: c, labelFormatter: l, labelClassName: u, formatter: d, color: f, nameKey: p, labelKey: m }) {
	let { config: h } = Rt(), g = e.useMemo(() => {
		if (o || !n?.length) return null;
		let [e] = n, t = `${m ?? e?.dataKey ?? e?.name ?? "value"}`, i = P(h, e, t), a = !m && typeof c == "string" ? h[c]?.label ?? c : i?.label;
		return l ? /* @__PURE__ */ S("div", {
			className: r("font-medium", u),
			children: l(a, n)
		}) : a ? /* @__PURE__ */ S("div", {
			className: r("font-medium", u),
			children: a
		}) : null;
	}, [
		c,
		l,
		n,
		o,
		u,
		h,
		m
	]);
	if (!t || !n?.length) return null;
	let _ = n.length === 1 && a !== "dot";
	return /* @__PURE__ */ C("div", {
		className: r("grid min-w-32 items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl", i),
		children: [_ ? null : g, /* @__PURE__ */ S("div", {
			className: "grid gap-1.5",
			children: n.filter((e) => e.type !== "none").map((e, t) => {
				let n = `${p ?? e.name ?? e.dataKey ?? "value"}`, i = P(h, e, n), o = f ?? e.payload?.fill ?? e.color;
				return /* @__PURE__ */ S("div", {
					className: r("flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground", a === "dot" && "items-center"),
					children: d && e?.value !== void 0 && e.name ? d(e.value, e.name, e, t, e.payload) : /* @__PURE__ */ C(x, { children: [i?.icon ? /* @__PURE__ */ S(i.icon, {}) : !s && /* @__PURE__ */ S("div", {
						className: r("shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)", {
							"h-2.5 w-2.5": a === "dot",
							"w-1": a === "line",
							"w-0 border-[1.5px] border-dashed bg-transparent": a === "dashed",
							"my-0.5": _ && a === "dashed"
						}),
						style: {
							"--color-bg": o,
							"--color-border": o
						}
					}), /* @__PURE__ */ C("div", {
						className: r("flex flex-1 justify-between leading-none", _ ? "items-end" : "items-center"),
						children: [/* @__PURE__ */ C("div", {
							className: "grid gap-1.5",
							children: [_ ? g : null, /* @__PURE__ */ S("span", {
								className: "text-muted-foreground",
								children: i?.label ?? e.name
							})]
						}), e.value != null && /* @__PURE__ */ S("span", {
							className: "font-mono font-medium text-foreground tabular-nums",
							children: typeof e.value == "number" ? e.value.toLocaleString() : String(e.value)
						})]
					})] })
				}, t);
			})
		})]
	});
}
var Ut = je.Legend;
function Wt({ className: e, hideIcon: t = !1, payload: n, verticalAlign: i = "bottom", nameKey: a }) {
	let { config: o } = Rt();
	return n?.length ? /* @__PURE__ */ S("div", {
		className: r("flex items-center justify-center gap-4", i === "top" ? "pb-3" : "pt-3", e),
		children: n.filter((e) => e.type !== "none").map((e, n) => {
			let i = `${a ?? e.dataKey ?? "value"}`, s = P(o, e, i);
			return /* @__PURE__ */ C("div", {
				className: r("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"),
				children: [s?.icon && !t ? /* @__PURE__ */ S(s.icon, {}) : /* @__PURE__ */ S("div", {
					className: "h-2 w-2 shrink-0 rounded-[2px]",
					style: { backgroundColor: e.color }
				}), s?.label]
			}, n);
		})
	}) : null;
}
function P(e, t, n) {
	if (typeof t != "object" || !t) return;
	let r = "payload" in t && typeof t.payload == "object" && t.payload !== null ? t.payload : void 0, i = n;
	return n in t && typeof t[n] == "string" ? i = t[n] : r && n in r && typeof r[n] == "string" && (i = r[n]), i in e ? e[i] : e[n];
}
// src/components/ui/checkbox.tsx
function Gt({ className: e, ...t }) {
	return /* @__PURE__ */ S(o.Root, {
		"data-slot": "checkbox",
		className: r("peer group/checkbox relative flex size-4 shrink-0 items-center justify-center rounded-[3px] border border-input bg-background transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:inset-[min(-0.5rem,calc((16px-var(--hit-min))/2))] focus-visible:border-ring enabled:hover:border-muted-foreground disabled:cursor-not-allowed disabled:border-transparent disabled:bg-field-hover aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/30 data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground disabled:data-[state=indeterminate]:bg-field-hover disabled:data-[state=indeterminate]:text-muted-foreground data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground data-checked:hover:bg-primary-hover disabled:data-checked:bg-field-hover disabled:data-checked:text-muted-foreground", e),
		...t,
		children: /* @__PURE__ */ C(o.Indicator, {
			"data-slot": "checkbox-indicator",
			className: "grid place-content-center text-current transition-none [&>svg]:size-3",
			children: [/* @__PURE__ */ S(w, { className: "group-data-[state=indeterminate]/checkbox:hidden" }), /* @__PURE__ */ S(ve, { className: "hidden group-data-[state=indeterminate]/checkbox:block" })]
		})
	});
}
// src/components/ui/collapsible.tsx
function Kt({ ...e }) {
	return /* @__PURE__ */ S(s.Root, {
		"data-slot": "collapsible",
		...e
	});
}
function qt({ ...e }) {
	return /* @__PURE__ */ S(s.CollapsibleTrigger, {
		"data-slot": "collapsible-trigger",
		...e
	});
}
function Jt({ ...e }) {
	return /* @__PURE__ */ S(s.CollapsibleContent, {
		"data-slot": "collapsible-content",
		...e
	});
}
// src/components/ui/dialog.tsx
function Yt({ ...e }) {
	return /* @__PURE__ */ S(c.Root, {
		"data-slot": "dialog",
		...e
	});
}
function Xt({ ...e }) {
	return /* @__PURE__ */ S(c.Trigger, {
		"data-slot": "dialog-trigger",
		...e
	});
}
function Zt({ ...e }) {
	return /* @__PURE__ */ S(c.Portal, {
		"data-slot": "dialog-portal",
		...e
	});
}
function Qt({ ...e }) {
	return /* @__PURE__ */ S(c.Close, {
		"data-slot": "dialog-close",
		...e
	});
}
function $t({ className: e, ...t }) {
	return /* @__PURE__ */ S(c.Overlay, {
		"data-slot": "dialog-overlay",
		className: r("fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", e),
		...t
	});
}
function en({ className: e, children: t, showCloseButton: n = !0, ...i }) {
	return /* @__PURE__ */ C(Zt, { children: [/* @__PURE__ */ S($t, {}), /* @__PURE__ */ C(c.Content, {
		"data-slot": "dialog-content",
		className: r("fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl border border-border bg-popover p-6 text-sm text-popover-foreground shadow-lg duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
		...i,
		children: [t, n && /* @__PURE__ */ S(c.Close, {
			"data-slot": "dialog-close",
			asChild: !0,
			children: /* @__PURE__ */ C(A, {
				variant: "ghost",
				className: "absolute top-2 right-2",
				size: "icon-sm",
				children: [/* @__PURE__ */ S(D, {}), /* @__PURE__ */ S("span", {
					className: "sr-only",
					children: "Close"
				})]
			})
		})]
	})] });
}
function tn({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "dialog-header",
		className: r("flex flex-col gap-2", e),
		...t
	});
}
function nn({ className: e, showCloseButton: t = !1, children: n, ...i }) {
	return /* @__PURE__ */ C("div", {
		"data-slot": "dialog-footer",
		className: r("-mx-6 -mb-6 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-secondary px-6 py-4 sm:flex-row sm:justify-end", e),
		...i,
		children: [n, t && /* @__PURE__ */ S(c.Close, {
			asChild: !0,
			children: /* @__PURE__ */ S(A, {
				variant: "outline",
				children: "Close"
			})
		})]
	});
}
function rn({ className: e, ...t }) {
	return /* @__PURE__ */ S(c.Title, {
		"data-slot": "dialog-title",
		className: r("font-heading type-h3", e),
		...t
	});
}
function an({ className: e, ...t }) {
	return /* @__PURE__ */ S(c.Description, {
		"data-slot": "dialog-description",
		className: r("text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", e),
		...t
	});
}
// src/components/ui/input.tsx
function F({ className: e, type: t, ...n }) {
	return /* @__PURE__ */ S("input", {
		type: t,
		"data-slot": "input",
		className: r("h-control w-full min-w-0 rounded-lg border border-input bg-background px-2 py-0 text-base text-foreground transition-colors duration-(--duration-fast) outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground read-only:border-transparent read-only:bg-secondary read-only:hover:border-transparent focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 read-only:focus-visible:ring-0 enabled:hover:border-muted-foreground disabled:cursor-not-allowed disabled:border-transparent disabled:bg-secondary disabled:text-muted-foreground aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/30 md:text-sm", e),
		...n
	});
}
// src/components/ui/textarea.tsx
function on({ className: e, ...t }) {
	return /* @__PURE__ */ S("textarea", {
		"data-slot": "textarea",
		className: r("flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-background px-2 py-1 text-base text-foreground transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 enabled:hover:border-muted-foreground disabled:cursor-not-allowed disabled:border-transparent disabled:bg-secondary disabled:text-muted-foreground aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/30 md:text-sm", e),
		...t
	});
}
// src/components/ui/input-group.tsx
function sn({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "input-group",
		role: "group",
		className: r("group/input-group relative flex h-control w-full min-w-0 items-center rounded-lg border border-input bg-background transition-colors outline-none hover:border-muted-foreground in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:border-transparent has-disabled:bg-secondary has-disabled:text-muted-foreground has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/40 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-2 has-[[data-slot][aria-invalid=true]]:ring-destructive/30 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5", e),
		...t
	});
}
var cn = b("flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4", {
	variants: { align: {
		"inline-start": "order-first pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]",
		"inline-end": "order-last pr-2 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]",
		"block-start": "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
		"block-end": "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2"
	} },
	defaultVariants: { align: "inline-start" }
});
function I({ className: e, align: t = "inline-start", ...n }) {
	return /* @__PURE__ */ S("div", {
		role: "group",
		"data-slot": "input-group-addon",
		"data-align": t,
		className: r(cn({ align: t }), e),
		onClick: (e) => {
			e.target.closest("button") || e.currentTarget.parentElement?.querySelector("input")?.focus();
		},
		...n
	});
}
var ln = b("flex items-center gap-2 text-sm shadow-none", {
	variants: { size: {
		xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
		sm: "",
		"icon-xs": "size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0",
		"icon-sm": "size-control-sm p-0 has-[>svg]:p-0"
	} },
	defaultVariants: { size: "xs" }
});
function un({ className: e, type: t = "button", variant: n = "ghost", size: i = "xs", ...a }) {
	return /* @__PURE__ */ S(A, {
		type: t,
		"data-size": i,
		variant: n,
		className: r(ln({ size: i }), e),
		...a
	});
}
function dn({ className: e, ...t }) {
	return /* @__PURE__ */ S("span", {
		className: r("flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4", e),
		...t
	});
}
function fn({ className: e, ...t }) {
	return /* @__PURE__ */ S(F, {
		"data-slot": "input-group-control",
		className: r("flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0", e),
		...t
	});
}
function pn({ className: e, ...t }) {
	return /* @__PURE__ */ S(on, {
		"data-slot": "input-group-control",
		className: r("flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0", e),
		...t
	});
}
// src/components/ui/command.tsx
function mn({ className: e, ...t }) {
	return /* @__PURE__ */ S(O, {
		"data-slot": "command",
		className: r("flex size-full flex-col overflow-hidden rounded-xl! bg-popover p-1 text-popover-foreground", e),
		...t
	});
}
function hn({ title: e = "Command Palette", description: t = "Search for a command to run...", children: n, className: i, showCloseButton: a = !1, ...o }) {
	return /* @__PURE__ */ C(Yt, {
		...o,
		children: [/* @__PURE__ */ C(tn, {
			className: "sr-only",
			children: [/* @__PURE__ */ S(rn, { children: e }), /* @__PURE__ */ S(an, { children: t })]
		}), /* @__PURE__ */ S(en, {
			className: r("top-1/3 translate-y-0 overflow-hidden rounded-xl! p-0", i),
			showCloseButton: a,
			children: n
		})]
	});
}
function gn({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "command-input-wrapper",
		className: "p-1 pb-0",
		children: /* @__PURE__ */ C(sn, {
			className: "h-control! rounded-lg! border-border bg-secondary shadow-none! *:data-[slot=input-group-addon]:pl-2!",
			children: [/* @__PURE__ */ S(O.Input, {
				"data-slot": "command-input",
				className: r("w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50", e),
				...t
			}), /* @__PURE__ */ S(I, { children: /* @__PURE__ */ S(we, { className: "size-4 shrink-0 opacity-50" }) })]
		})
	});
}
function _n({ className: e, ...t }) {
	return /* @__PURE__ */ S(O.List, {
		"data-slot": "command-list",
		className: r("no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none", e),
		...t
	});
}
function vn({ className: e, ...t }) {
	return /* @__PURE__ */ S(O.Empty, {
		"data-slot": "command-empty",
		className: r("py-6 text-center text-sm", e),
		...t
	});
}
function yn({ className: e, ...t }) {
	return /* @__PURE__ */ S(O.Group, {
		"data-slot": "command-group",
		className: r("overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground", e),
		...t
	});
}
function bn({ className: e, ...t }) {
	return /* @__PURE__ */ S(O.Separator, {
		"data-slot": "command-separator",
		className: r("-mx-1 h-px bg-border", e),
		...t
	});
}
function xn({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ C(O.Item, {
		"data-slot": "command-item",
		className: r("group/command-item relative flex min-h-control-sm cursor-default items-center gap-2 rounded-md px-2 py-1 text-[13px] outline-hidden select-none hover:bg-accent hover:text-accent-foreground in-data-[slot=dialog-content]:rounded-lg! data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-selected:bg-accent data-selected:bg-muted data-selected:text-accent-foreground data-selected:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-selected:*:[svg]:text-foreground", e),
		...n,
		children: [t, /* @__PURE__ */ S(w, { className: "ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" })]
	});
}
function Sn({ className: e, ...t }) {
	return /* @__PURE__ */ S("span", {
		"data-slot": "command-shortcut",
		className: r("ml-auto text-xs tracking-widest text-muted-foreground group-data-selected/command-item:text-foreground", e),
		...t
	});
}
// src/components/ui/dropdown-menu.tsx
function Cn({ ...e }) {
	return /* @__PURE__ */ S(l.Root, {
		"data-slot": "dropdown-menu",
		...e
	});
}
function wn({ ...e }) {
	return /* @__PURE__ */ S(l.Portal, {
		"data-slot": "dropdown-menu-portal",
		...e
	});
}
function Tn({ ...e }) {
	return /* @__PURE__ */ S(l.Trigger, {
		"data-slot": "dropdown-menu-trigger",
		...e
	});
}
function En({ className: e, align: t = "start", sideOffset: n = 4, ...i }) {
	return /* @__PURE__ */ S(l.Portal, { children: /* @__PURE__ */ S(l.Content, {
		"data-slot": "dropdown-menu-content",
		sideOffset: n,
		align: t,
		className: r("z-50 max-h-(--radix-dropdown-menu-content-available-height) w-(--radix-dropdown-menu-trigger-width) min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg border border-input bg-popover p-1 text-popover-foreground shadow-md duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:overflow-hidden data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
		...i
	}) });
}
function Dn({ ...e }) {
	return /* @__PURE__ */ S(l.Group, {
		"data-slot": "dropdown-menu-group",
		...e
	});
}
function On({ className: e, inset: t, variant: n = "default", ...i }) {
	return /* @__PURE__ */ S(l.Item, {
		"data-slot": "dropdown-menu-item",
		"data-inset": t,
		"data-variant": n,
		className: r("group/dropdown-menu-item relative flex min-h-control-sm cursor-default items-center gap-1.5 rounded-md px-2 py-1 text-[13px] outline-hidden select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive", e),
		...i
	});
}
function kn({ className: e, children: t, checked: n, inset: i, ...a }) {
	return /* @__PURE__ */ C(l.CheckboxItem, {
		"data-slot": "dropdown-menu-checkbox-item",
		"data-inset": i,
		className: r("relative flex min-h-control-sm cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-2 text-[13px] outline-hidden select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", e),
		checked: n,
		...a,
		children: [/* @__PURE__ */ S("span", {
			className: "pointer-events-none absolute right-2 flex items-center justify-center",
			"data-slot": "dropdown-menu-checkbox-item-indicator",
			children: /* @__PURE__ */ S(l.ItemIndicator, { children: /* @__PURE__ */ S(w, {}) })
		}), t]
	});
}
function An({ ...e }) {
	return /* @__PURE__ */ S(l.RadioGroup, {
		"data-slot": "dropdown-menu-radio-group",
		...e
	});
}
function jn({ className: e, children: t, inset: n, ...i }) {
	return /* @__PURE__ */ C(l.RadioItem, {
		"data-slot": "dropdown-menu-radio-item",
		"data-inset": n,
		className: r("relative flex min-h-control-sm cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-2 text-[13px] outline-hidden select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", e),
		...i,
		children: [/* @__PURE__ */ S("span", {
			className: "pointer-events-none absolute right-2 flex items-center justify-center",
			"data-slot": "dropdown-menu-radio-item-indicator",
			children: /* @__PURE__ */ S(l.ItemIndicator, { children: /* @__PURE__ */ S(w, {}) })
		}), t]
	});
}
function Mn({ className: e, inset: t, ...n }) {
	return /* @__PURE__ */ S(l.Label, {
		"data-slot": "dropdown-menu-label",
		"data-inset": t,
		className: r("px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7", e),
		...n
	});
}
function L({ className: e, ...t }) {
	return /* @__PURE__ */ S(l.Separator, {
		"data-slot": "dropdown-menu-separator",
		className: r("-mx-1 my-1 h-px bg-border", e),
		...t
	});
}
function Nn({ className: e, ...t }) {
	return /* @__PURE__ */ S("span", {
		"data-slot": "dropdown-menu-shortcut",
		className: r("ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground", e),
		...t
	});
}
function Pn({ ...e }) {
	return /* @__PURE__ */ S(l.Sub, {
		"data-slot": "dropdown-menu-sub",
		...e
	});
}
function Fn({ className: e, inset: t, children: n, ...i }) {
	return /* @__PURE__ */ C(l.SubTrigger, {
		"data-slot": "dropdown-menu-sub-trigger",
		"data-inset": t,
		className: r("flex min-h-control-sm cursor-default items-center gap-1.5 rounded-md px-2 py-1 text-[13px] outline-hidden select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", e),
		...i,
		children: [n, /* @__PURE__ */ S(E, { className: "ml-auto" })]
	});
}
function In({ className: e, ...t }) {
	return /* @__PURE__ */ S(l.SubContent, {
		"data-slot": "dropdown-menu-sub-content",
		className: r("z-50 min-w-[96px] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-lg border border-input bg-popover p-1 text-popover-foreground shadow-lg duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
		...t
	});
}
// src/components/ui/empty.tsx
function Ln({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "empty",
		className: r("flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-xl border-dashed p-6 text-center text-balance", e),
		...t
	});
}
function Rn({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "empty-header",
		className: r("flex max-w-sm flex-col items-center gap-2", e),
		...t
	});
}
var zn = b("mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0", {
	variants: { variant: {
		default: "bg-transparent",
		icon: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-4"
	} },
	defaultVariants: { variant: "default" }
});
function Bn({ className: e, variant: t = "default", ...n }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "empty-icon",
		"data-variant": t,
		className: r(zn({
			variant: t,
			className: e
		})),
		...n
	});
}
function Vn({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "empty-title",
		className: r("font-heading text-sm font-medium tracking-tight", e),
		...t
	});
}
function Hn({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "empty-description",
		className: r("text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary", e),
		...t
	});
}
function Un({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "empty-content",
		className: r("flex w-full max-w-sm min-w-0 flex-col items-center gap-2.5 text-sm text-balance", e),
		...t
	});
}
// src/components/ui/label.tsx
function Wn({ className: e, ...t }) {
	return /* @__PURE__ */ S(d.Root, {
		"data-slot": "label",
		className: r("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", e),
		...t
	});
}
// src/components/ui/separator.tsx
function R({ className: e, orientation: t = "horizontal", decorative: n = !0, ...i }) {
	return /* @__PURE__ */ S(g.Root, {
		"data-slot": "separator",
		decorative: n,
		orientation: t,
		className: r("shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch", e),
		...i
	});
}
// src/components/ui/field.tsx
function Gn({ className: e, ...t }) {
	return /* @__PURE__ */ S("fieldset", {
		"data-slot": "field-set",
		className: r("flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3", e),
		...t
	});
}
function Kn({ className: e, variant: t = "legend", ...n }) {
	return /* @__PURE__ */ S("legend", {
		"data-slot": "field-legend",
		"data-variant": t,
		className: r("mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base", e),
		...n
	});
}
function qn({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "field-group",
		className: r("group/field-group @container/field-group flex w-full flex-col gap-6 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4", e),
		...t
	});
}
var Jn = b("group/field flex w-full gap-1.5 data-[invalid=true]:text-destructive", {
	variants: { orientation: {
		vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
		horizontal: "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
		responsive: "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
	} },
	defaultVariants: { orientation: "vertical" }
});
function Yn({ className: e, orientation: t = "vertical", ...n }) {
	return /* @__PURE__ */ S("div", {
		role: "group",
		"data-slot": "field",
		"data-orientation": t,
		className: r(Jn({ orientation: t }), e),
		...n
	});
}
function Xn({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "field-content",
		className: r("group/field-content flex flex-1 flex-col gap-0.5 leading-snug", e),
		...t
	});
}
function Zn({ className: e, ...t }) {
	return /* @__PURE__ */ S(Wn, {
		"data-slot": "field-label",
		className: r("group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-data-checked:border-primary/30 has-data-checked:bg-primary/5 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-muted/50 has-[>[data-slot=field]]:has-[:focus-visible]:border-ring has-[>[data-slot=field]]:has-[:focus-visible]:ring-3 has-[>[data-slot=field]]:has-[:focus-visible]:ring-ring/25 *:data-[slot=field]:p-2.5", "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col", e),
		...t
	});
}
function Qn({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "field-label",
		className: r("flex w-fit items-center gap-2 text-sm font-medium text-foreground-secondary group-data-[disabled=true]/field:opacity-50", e),
		...t
	});
}
function $n({ className: e, ...t }) {
	return /* @__PURE__ */ S("p", {
		"data-slot": "field-description",
		className: r("text-left text-sm leading-normal font-normal text-muted-foreground group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5", "last:mt-0 nth-last-2:-mt-1", "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary", e),
		...t
	});
}
function er({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ C("div", {
		"data-slot": "field-separator",
		"data-content": !!e,
		className: r("relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2", t),
		...n,
		children: [/* @__PURE__ */ S(R, { className: "absolute inset-0 top-1/2" }), e && /* @__PURE__ */ S("span", {
			className: "relative mx-auto block w-fit bg-background px-2 text-muted-foreground",
			"data-slot": "field-separator-content",
			children: e
		})]
	});
}
function tr({ className: e, children: n, errors: i, ...a }) {
	let o = t(() => {
		if (n) return n;
		if (!i?.length) return null;
		let e = [...new Map(i.map((e) => [e?.message, e])).values()];
		return e?.length == 1 ? e[0]?.message : /* @__PURE__ */ S("ul", {
			className: "ml-4 flex list-disc flex-col gap-1",
			children: e.map((e, t) => e?.message && /* @__PURE__ */ S("li", { children: e.message }, t))
		});
	}, [n, i]);
	return o ? /* @__PURE__ */ S("div", {
		role: "alert",
		"data-slot": "field-error",
		className: r("text-sm font-normal text-destructive", e),
		...a,
		children: o
	}) : null;
}
// src/components/ui/hover-card.tsx
function nr({ ...e }) {
	return /* @__PURE__ */ S(u.Root, {
		"data-slot": "hover-card",
		...e
	});
}
function rr({ ...e }) {
	return /* @__PURE__ */ S(u.Trigger, {
		"data-slot": "hover-card-trigger",
		...e
	});
}
function ir({ className: e, align: t = "center", sideOffset: n = 4, ...i }) {
	return /* @__PURE__ */ S(u.Portal, {
		"data-slot": "hover-card-portal",
		children: /* @__PURE__ */ S(u.Content, {
			"data-slot": "hover-card-content",
			align: t,
			sideOffset: n,
			className: r("z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-xl border border-border bg-popover p-3 text-sm text-popover-foreground shadow-md outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
			...i
		})
	});
}
// src/components/ui/pagination.tsx
function ar({ className: e, ...t }) {
	return /* @__PURE__ */ S("nav", {
		role: "navigation",
		"aria-label": "แบ่งหน้า",
		"data-slot": "pagination",
		className: r("mx-auto flex w-full justify-center", e),
		...t
	});
}
function or({ className: e, ...t }) {
	return /* @__PURE__ */ S("ul", {
		"data-slot": "pagination-content",
		className: r("flex items-center gap-0.5", e),
		...t
	});
}
function sr({ ...e }) {
	return /* @__PURE__ */ S("li", {
		"data-slot": "pagination-item",
		...e
	});
}
function cr({ className: e, isActive: t, size: n = "icon", ...i }) {
	return /* @__PURE__ */ S(A, {
		asChild: !0,
		variant: t ? "outline" : "ghost",
		size: n,
		className: r(e),
		children: /* @__PURE__ */ S("a", {
			"aria-current": t ? "page" : void 0,
			"data-slot": "pagination-link",
			"data-active": t,
			...i
		})
	});
}
function lr({ className: e, text: t = "ก่อนหน้า", ...n }) {
	return /* @__PURE__ */ C(cr, {
		size: "default",
		className: r("pl-1.5!", e),
		...n,
		children: [/* @__PURE__ */ S(se, { "data-icon": "inline-start" }), /* @__PURE__ */ S("span", { children: t })]
	});
}
function ur({ className: e, text: t = "ถัดไป", ...n }) {
	return /* @__PURE__ */ C(cr, {
		size: "default",
		className: r("pr-1.5!", e),
		...n,
		children: [/* @__PURE__ */ S("span", { children: t }), /* @__PURE__ */ S(E, { "data-icon": "inline-end" })]
	});
}
function dr({ className: e, ...t }) {
	return /* @__PURE__ */ C("span", {
		"aria-hidden": !0,
		"data-slot": "pagination-ellipsis",
		className: r("flex size-control items-center justify-center [&_svg:not([class*='size-'])]:size-4", e),
		...t,
		children: [/* @__PURE__ */ S(ye, {}), /* @__PURE__ */ S("span", {
			className: "sr-only",
			children: "หน้าอื่น ๆ"
		})]
	});
}
// src/components/ui/popover.tsx
function z({ ...e }) {
	return /* @__PURE__ */ S(f.Root, {
		"data-slot": "popover",
		...e
	});
}
function B({ ...e }) {
	return /* @__PURE__ */ S(f.Trigger, {
		"data-slot": "popover-trigger",
		...e
	});
}
function V({ className: e, align: t = "center", sideOffset: n = 4, ...i }) {
	return /* @__PURE__ */ S(f.Portal, { children: /* @__PURE__ */ S(f.Content, {
		"data-slot": "popover-content",
		align: t,
		sideOffset: n,
		className: r("z-50 flex w-72 origin-(--radix-popover-content-transform-origin) flex-col gap-2.5 rounded-lg border border-border bg-popover p-2.5 text-sm text-popover-foreground shadow-md outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
		...i
	}) });
}
function fr({ ...e }) {
	return /* @__PURE__ */ S(f.Anchor, {
		"data-slot": "popover-anchor",
		...e
	});
}
function pr({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "popover-header",
		className: r("flex flex-col gap-0.5 text-sm", e),
		...t
	});
}
function mr({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "popover-title",
		className: r("font-medium", e),
		...t
	});
}
function hr({ className: e, ...t }) {
	return /* @__PURE__ */ S("p", {
		"data-slot": "popover-description",
		className: r("text-muted-foreground", e),
		...t
	});
}
// src/components/ui/progress.tsx
var gr = {
	default: "bg-primary",
	success: "bg-success",
	warning: "bg-warning",
	danger: "bg-danger"
};
function _r({ className: e, value: t, tone: n = "default", ...i }) {
	return /* @__PURE__ */ S(p.Root, {
		"data-slot": "progress",
		value: t,
		className: r("relative flex h-2 w-full items-center overflow-hidden rounded-full bg-border", e),
		...i,
		children: /* @__PURE__ */ S(p.Indicator, {
			"data-slot": "progress-indicator",
			className: r("size-full flex-1 transition-transform duration-300 motion-reduce:transition-none", gr[n]),
			style: { transform: `translateX(-${100 - (t || 0)}%)` }
		})
	});
}
// src/components/ui/scroll-area.tsx
function vr({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ C(m.Root, {
		"data-slot": "scroll-area",
		className: r("relative", e),
		...n,
		children: [
			/* @__PURE__ */ S(m.Viewport, {
				"data-slot": "scroll-area-viewport",
				className: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
				children: t
			}),
			/* @__PURE__ */ S(yr, {}),
			/* @__PURE__ */ S(m.Corner, {})
		]
	});
}
function yr({ className: e, orientation: t = "vertical", ...n }) {
	return /* @__PURE__ */ S(m.ScrollAreaScrollbar, {
		"data-slot": "scroll-area-scrollbar",
		"data-orientation": t,
		orientation: t,
		className: r("flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent", e),
		...n,
		children: /* @__PURE__ */ S(m.ScrollAreaThumb, {
			"data-slot": "scroll-area-thumb",
			className: "relative flex-1 rounded-full bg-border"
		})
	});
}
// src/components/ui/select.tsx
function br({ ...e }) {
	return /* @__PURE__ */ S(h.Root, {
		"data-slot": "select",
		...e
	});
}
function xr({ className: e, ...t }) {
	return /* @__PURE__ */ S(h.Group, {
		"data-slot": "select-group",
		className: r("scroll-my-1 p-1", e),
		...t
	});
}
function Sr({ ...e }) {
	return /* @__PURE__ */ S(h.Value, {
		"data-slot": "select-value",
		...e
	});
}
function Cr({ className: e, size: t = "default", children: n, ...i }) {
	return /* @__PURE__ */ C(h.Trigger, {
		"data-slot": "select-trigger",
		"data-size": t,
		className: r("group/select-trigger flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-background py-0 pr-1.5 pl-2 text-base whitespace-nowrap text-foreground transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 enabled:hover:border-muted-foreground disabled:cursor-not-allowed disabled:border-transparent disabled:bg-secondary disabled:text-muted-foreground aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/30 data-placeholder:text-foreground-secondary disabled:data-placeholder:text-muted-foreground data-[size=default]:h-control data-[size=sm]:h-control-sm data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 md:text-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", e),
		...i,
		children: [n, /* @__PURE__ */ S(h.Icon, {
			asChild: !0,
			children: /* @__PURE__ */ S(T, { className: "pointer-events-none size-4 text-foreground-secondary group-disabled/select-trigger:text-muted-foreground" })
		})]
	});
}
function wr({ className: e, children: t, position: n = "item-aligned", align: i = "center", ...a }) {
	return /* @__PURE__ */ S(h.Portal, { children: /* @__PURE__ */ C(h.Content, {
		"data-slot": "select-content",
		"data-align-trigger": n === "item-aligned",
		className: r("relative z-50 max-h-(--radix-select-content-available-height) min-w-36 origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg border border-input bg-popover text-popover-foreground shadow-md duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", n === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", e),
		position: n,
		align: i,
		...a,
		children: [
			/* @__PURE__ */ S(Or, {}),
			/* @__PURE__ */ S(h.Viewport, {
				"data-position": n,
				className: r("data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:w-full data-[position=popper]:min-w-(--radix-select-trigger-width)", n === "popper" && ""),
				children: t
			}),
			/* @__PURE__ */ S(kr, {})
		]
	}) });
}
function Tr({ className: e, ...t }) {
	return /* @__PURE__ */ S(h.Label, {
		"data-slot": "select-label",
		className: r("px-1.5 py-1 text-xs text-muted-foreground", e),
		...t
	});
}
function Er({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ C(h.Item, {
		"data-slot": "select-item",
		className: r("relative flex min-h-control-sm w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-2 text-[13px] outline-hidden select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", e),
		...n,
		children: [/* @__PURE__ */ S("span", {
			className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center",
			children: /* @__PURE__ */ S(h.ItemIndicator, { children: /* @__PURE__ */ S(w, { className: "pointer-events-none" }) })
		}), /* @__PURE__ */ S(h.ItemText, { children: t })]
	});
}
function Dr({ className: e, ...t }) {
	return /* @__PURE__ */ S(h.Separator, {
		"data-slot": "select-separator",
		className: r("pointer-events-none -mx-1 my-1 h-px bg-border", e),
		...t
	});
}
function Or({ className: e, ...t }) {
	return /* @__PURE__ */ S(h.ScrollUpButton, {
		"data-slot": "select-scroll-up-button",
		className: r("z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", e),
		...t,
		children: /* @__PURE__ */ S(ce, {})
	});
}
function kr({ className: e, ...t }) {
	return /* @__PURE__ */ S(h.ScrollDownButton, {
		"data-slot": "select-scroll-down-button",
		className: r("z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", e),
		...t,
		children: /* @__PURE__ */ S(T, {})
	});
}
// src/components/ui/sheet.tsx
function Ar({ ...e }) {
	return /* @__PURE__ */ S(c.Root, {
		"data-slot": "sheet",
		...e
	});
}
function jr({ ...e }) {
	return /* @__PURE__ */ S(c.Trigger, {
		"data-slot": "sheet-trigger",
		...e
	});
}
function Mr({ ...e }) {
	return /* @__PURE__ */ S(c.Close, {
		"data-slot": "sheet-close",
		...e
	});
}
function Nr({ ...e }) {
	return /* @__PURE__ */ S(c.Portal, {
		"data-slot": "sheet-portal",
		...e
	});
}
function Pr({ className: e, ...t }) {
	return /* @__PURE__ */ S(c.Overlay, {
		"data-slot": "sheet-overlay",
		className: r("fixed inset-0 z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", e),
		...t
	});
}
function Fr({ className: e, children: t, side: n = "right", showCloseButton: i = !0, ...a }) {
	return /* @__PURE__ */ C(Nr, { children: [/* @__PURE__ */ S(Pr, {}), /* @__PURE__ */ C(c.Content, {
		"data-slot": "sheet-content",
		"data-side": n,
		className: r("fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10", e),
		...a,
		children: [t, i && /* @__PURE__ */ S(c.Close, {
			"data-slot": "sheet-close",
			asChild: !0,
			children: /* @__PURE__ */ C(A, {
				variant: "ghost",
				className: "absolute top-3 right-3",
				size: "icon-sm",
				children: [/* @__PURE__ */ S(D, {}), /* @__PURE__ */ S("span", {
					className: "sr-only",
					children: "Close"
				})]
			})
		})]
	})] });
}
function Ir({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "sheet-header",
		className: r("flex flex-col gap-0.5 p-4", e),
		...t
	});
}
function Lr({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "sheet-footer",
		className: r("mt-auto flex flex-col gap-2 p-4", e),
		...t
	});
}
function Rr({ className: e, ...t }) {
	return /* @__PURE__ */ S(c.Title, {
		"data-slot": "sheet-title",
		className: r("font-heading type-h3 text-foreground", e),
		...t
	});
}
function zr({ className: e, ...t }) {
	return /* @__PURE__ */ S(c.Description, {
		"data-slot": "sheet-description",
		className: r("text-sm text-muted-foreground", e),
		...t
	});
}
// src/hooks/use-mobile.ts
var Br = "(max-width: 767px)";
function Vr(e) {
	let t = window.matchMedia(Br);
	return t.addEventListener("change", e), () => t.removeEventListener("change", e);
}
function Hr() {
	return e.useSyncExternalStore(Vr, () => window.matchMedia(Br).matches, () => !1);
}
// src/components/ui/skeleton.tsx
function H({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "skeleton",
		className: r("animate-pulse rounded-md bg-muted", e),
		...t
	});
}
// src/components/ui/tooltip.tsx
function Ur({ delayDuration: e = 0, ...t }) {
	return /* @__PURE__ */ S(y.Provider, {
		"data-slot": "tooltip-provider",
		delayDuration: e,
		...t
	});
}
function Wr({ ...e }) {
	return /* @__PURE__ */ S(y.Root, {
		"data-slot": "tooltip",
		...e
	});
}
function Gr({ ...e }) {
	return /* @__PURE__ */ S(y.Trigger, {
		"data-slot": "tooltip-trigger",
		...e
	});
}
function Kr({ className: e, sideOffset: t = 0, children: n, ...i }) {
	return /* @__PURE__ */ S(y.Portal, { children: /* @__PURE__ */ C(y.Content, {
		"data-slot": "tooltip-content",
		sideOffset: t,
		className: r("z-50 inline-flex w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
		...i,
		children: [n, /* @__PURE__ */ S(y.Arrow, { className: "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" })]
	}) });
}
// src/components/ui/sidebar.tsx
var qr = "sidebar_state", Jr = 604800, Yr = "16rem", Xr = "18rem", Zr = "3rem", Qr = "b", $r = e.createContext(null);
function U() {
	let t = e.useContext($r);
	if (!t) throw Error("useSidebar must be used within a SidebarProvider.");
	return t;
}
function ei({ defaultOpen: t = !0, open: n, onOpenChange: i, className: a, style: o, children: s, ...c }) {
	let l = Hr(), [u, d] = e.useState(!1), [f, p] = e.useState(t), m = n ?? f, h = e.useCallback((e) => {
		let t = typeof e == "function" ? e(m) : e;
		i ? i(t) : p(t), document.cookie = `${qr}=${t}; path=/; max-age=${Jr}`;
	}, [i, m]), g = e.useCallback(() => l ? d((e) => !e) : h((e) => !e), [
		l,
		h,
		d
	]);
	e.useEffect(() => {
		let e = (e) => {
			e.key === Qr && (e.metaKey || e.ctrlKey) && (e.preventDefault(), g());
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [g]);
	let _ = m ? "expanded" : "collapsed", v = e.useMemo(() => ({
		state: _,
		open: m,
		setOpen: h,
		isMobile: l,
		openMobile: u,
		setOpenMobile: d,
		toggleSidebar: g
	}), [
		_,
		m,
		h,
		l,
		u,
		d,
		g
	]);
	return /* @__PURE__ */ S($r.Provider, {
		value: v,
		children: /* @__PURE__ */ S("div", {
			"data-slot": "sidebar-wrapper",
			style: {
				"--sidebar-width": Yr,
				"--sidebar-width-icon": Zr,
				...o
			},
			className: r("group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar", a),
			...c,
			children: s
		})
	});
}
function ti({ side: e = "left", variant: t = "sidebar", collapsible: n = "offcanvas", className: i, children: a, dir: o, ...s }) {
	let { isMobile: c, state: l, openMobile: u, setOpenMobile: d } = U();
	return n === "none" ? /* @__PURE__ */ S("div", {
		"data-slot": "sidebar",
		className: r("flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground", i),
		...s,
		children: a
	}) : c ? /* @__PURE__ */ S(Ar, {
		open: u,
		onOpenChange: d,
		...s,
		children: /* @__PURE__ */ C(Fr, {
			dir: o,
			"data-sidebar": "sidebar",
			"data-slot": "sidebar",
			"data-mobile": "true",
			className: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
			style: { "--sidebar-width": Xr },
			side: e,
			children: [/* @__PURE__ */ C(Ir, {
				className: "sr-only",
				children: [/* @__PURE__ */ S(Rr, { children: "Sidebar" }), /* @__PURE__ */ S(zr, { children: "Displays the mobile sidebar." })]
			}), /* @__PURE__ */ S("div", {
				className: "flex h-full w-full flex-col",
				children: a
			})]
		})
	}) : /* @__PURE__ */ C("div", {
		className: "group peer hidden text-sidebar-foreground md:block",
		"data-state": l,
		"data-collapsible": l === "collapsed" ? n : "",
		"data-variant": t,
		"data-side": e,
		"data-slot": "sidebar",
		children: [/* @__PURE__ */ S("div", {
			"data-slot": "sidebar-gap",
			className: r("relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", t === "floating" || t === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)")
		}), /* @__PURE__ */ S("div", {
			"data-slot": "sidebar-container",
			"data-side": e,
			className: r("fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex", t === "floating" || t === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l", i),
			...s,
			children: /* @__PURE__ */ S("div", {
				"data-sidebar": "sidebar",
				"data-slot": "sidebar-inner",
				className: "flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border",
				children: a
			})
		})]
	});
}
function ni({ className: e, onClick: t, ...n }) {
	let { toggleSidebar: i } = U();
	return /* @__PURE__ */ C(A, {
		"data-sidebar": "trigger",
		"data-slot": "sidebar-trigger",
		variant: "ghost",
		size: "icon-sm",
		className: r(e),
		onClick: (e) => {
			t?.(e), i();
		},
		...n,
		children: [/* @__PURE__ */ S(xe, {}), /* @__PURE__ */ S("span", {
			className: "sr-only",
			children: "Toggle Sidebar"
		})]
	});
}
function ri({ className: e, ...t }) {
	let { toggleSidebar: n } = U();
	return /* @__PURE__ */ S("button", {
		"data-sidebar": "rail",
		"data-slot": "sidebar-rail",
		"aria-label": "Toggle Sidebar",
		tabIndex: -1,
		onClick: n,
		title: "Toggle Sidebar",
		className: r("absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:start-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex ltr:-translate-x-1/2 rtl:-translate-x-1/2", "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize", "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize", "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar", "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2", "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2", e),
		...t
	});
}
function ii({ className: e, ...t }) {
	return /* @__PURE__ */ S("main", {
		"data-slot": "sidebar-inset",
		className: r("relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2", e),
		...t
	});
}
function ai({ className: e, ...t }) {
	return /* @__PURE__ */ S(F, {
		"data-slot": "sidebar-input",
		"data-sidebar": "input",
		className: r("h-8 w-full bg-background shadow-none", e),
		...t
	});
}
function oi({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "sidebar-header",
		"data-sidebar": "header",
		className: r("flex flex-col gap-2 p-2", e),
		...t
	});
}
function si({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "sidebar-footer",
		"data-sidebar": "footer",
		className: r("flex flex-col gap-2 p-2", e),
		...t
	});
}
function ci({ className: e, ...t }) {
	return /* @__PURE__ */ S(R, {
		"data-slot": "sidebar-separator",
		"data-sidebar": "separator",
		className: r("mx-2 w-auto bg-sidebar-border", e),
		...t
	});
}
function li({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "sidebar-content",
		"data-sidebar": "content",
		className: r("no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden", e),
		...t
	});
}
function ui({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "sidebar-group",
		"data-sidebar": "group",
		className: r("relative flex w-full min-w-0 flex-col p-2", e),
		...t
	});
}
function di({ className: e, asChild: t = !1, ...n }) {
	let i = t ? _.Root : "div";
	return /* @__PURE__ */ S(i, {
		"data-slot": "sidebar-group-label",
		"data-sidebar": "group-label",
		className: r("flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", e),
		...n
	});
}
function fi({ className: e, asChild: t = !1, ...n }) {
	let i = t ? _.Root : "button";
	return /* @__PURE__ */ S(i, {
		"data-slot": "sidebar-group-action",
		"data-sidebar": "group-action",
		className: r("absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0", e),
		...n
	});
}
function pi({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "sidebar-group-content",
		"data-sidebar": "group-content",
		className: r("w-full text-sm", e),
		...t
	});
}
function mi({ className: e, ...t }) {
	return /* @__PURE__ */ S("ul", {
		"data-slot": "sidebar-menu",
		"data-sidebar": "menu",
		className: r("flex w-full min-w-0 flex-col gap-0", e),
		...t
	});
}
function W({ className: e, ...t }) {
	return /* @__PURE__ */ S("li", {
		"data-slot": "sidebar-menu-item",
		"data-sidebar": "menu-item",
		className: r("group/menu-item relative", e),
		...t
	});
}
var hi = b("peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate", {
	variants: {
		variant: {
			default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
			outline: "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"
		},
		size: {
			default: "h-8 text-sm",
			sm: "h-7 text-xs",
			lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function G({ asChild: e = !1, isActive: t = !1, variant: n = "default", size: i = "default", tooltip: a, className: o, ...s }) {
	let c = e ? _.Root : "button", { isMobile: l, state: u } = U(), d = /* @__PURE__ */ S(c, {
		"data-slot": "sidebar-menu-button",
		"data-sidebar": "menu-button",
		"data-size": i,
		"data-active": t,
		className: r(hi({
			variant: n,
			size: i
		}), o),
		...s
	});
	return a ? (typeof a == "string" && (a = { children: a }), /* @__PURE__ */ C(Wr, { children: [/* @__PURE__ */ S(Gr, {
		asChild: !0,
		children: d
	}), /* @__PURE__ */ S(Kr, {
		side: "right",
		align: "center",
		hidden: u !== "collapsed" || l,
		...a
	})] })) : d;
}
function gi({ className: e, asChild: t = !1, showOnHover: n = !1, ...i }) {
	let a = t ? _.Root : "button";
	return /* @__PURE__ */ S(a, {
		"data-slot": "sidebar-menu-action",
		"data-sidebar": "menu-action",
		className: r("absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0", n && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground aria-expanded:opacity-100 md:opacity-0", e),
		...i
	});
}
function _i({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "sidebar-menu-badge",
		"data-sidebar": "menu-badge",
		className: r("pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 peer-data-active/menu-button:text-sidebar-accent-foreground", e),
		...t
	});
}
function vi({ className: t, showIcon: n = !1, ...i }) {
	let [a] = e.useState(() => `${Math.floor(Math.random() * 40) + 50}%`);
	return /* @__PURE__ */ C("div", {
		"data-slot": "sidebar-menu-skeleton",
		"data-sidebar": "menu-skeleton",
		className: r("flex h-8 items-center gap-2 rounded-md px-2", t),
		...i,
		children: [n && /* @__PURE__ */ S(H, {
			className: "size-4 rounded-md",
			"data-sidebar": "menu-skeleton-icon"
		}), /* @__PURE__ */ S(H, {
			className: "h-4 max-w-(--skeleton-width) flex-1",
			"data-sidebar": "menu-skeleton-text",
			style: { "--skeleton-width": a }
		})]
	});
}
function yi({ className: e, ...t }) {
	return /* @__PURE__ */ S("ul", {
		"data-slot": "sidebar-menu-sub",
		"data-sidebar": "menu-sub",
		className: r("mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden", e),
		...t
	});
}
function bi({ className: e, ...t }) {
	return /* @__PURE__ */ S("li", {
		"data-slot": "sidebar-menu-sub-item",
		"data-sidebar": "menu-sub-item",
		className: r("group/menu-sub-item relative", e),
		...t
	});
}
function xi({ asChild: e = !1, size: t = "md", isActive: n = !1, className: i, ...a }) {
	let o = e ? _.Root : "a";
	return /* @__PURE__ */ S(o, {
		"data-slot": "sidebar-menu-sub-button",
		"data-sidebar": "menu-sub-button",
		"data-size": t,
		"data-active": n,
		className: r("flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground ring-sidebar-ring outline-hidden group-data-[collapsible=icon]:hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[size=md]:text-sm data-[size=sm]:text-xs data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground", i),
		...a
	});
}
// src/components/ui/sonner.tsx
var Si = ({ ...e }) => /* @__PURE__ */ S(Me, {
	theme: "light",
	richColors: !0,
	className: "toaster group",
	icons: {
		success: /* @__PURE__ */ S(fe, { className: "size-4" }),
		info: /* @__PURE__ */ S(he, { className: "size-4" }),
		warning: /* @__PURE__ */ S(Oe, { className: "size-4" }),
		error: /* @__PURE__ */ S(be, { className: "size-4" }),
		loading: /* @__PURE__ */ S(ge, { className: "size-4 animate-spin" })
	},
	style: {
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
		"--info-border": "var(--info-border)"
	},
	toastOptions: { classNames: { toast: "cn-toast" } },
	...e
});
// src/components/ui/spinner.tsx
function Ci({ className: e, ...t }) {
	return /* @__PURE__ */ S(ge, {
		"data-slot": "spinner",
		role: "status",
		"aria-label": "กำลังโหลด",
		className: r("size-4 animate-spin", e),
		...t
	});
}
// src/components/ui/table.tsx
function wi({ className: e, ...t }) {
	return /* @__PURE__ */ S("div", {
		"data-slot": "table-container",
		className: "relative w-full overflow-x-auto",
		children: /* @__PURE__ */ S("table", {
			"data-slot": "table",
			className: r("w-full caption-bottom type-table tabular-nums", e),
			...t
		})
	});
}
function Ti({ className: e, ...t }) {
	return /* @__PURE__ */ S("thead", {
		"data-slot": "table-header",
		className: r("bg-secondary [&_tr]:border-b [&_tr]:hover:bg-transparent", e),
		...t
	});
}
function K({ className: e, ...t }) {
	return /* @__PURE__ */ S("tbody", {
		"data-slot": "table-body",
		className: r("[&_tr:last-child]:border-0", e),
		...t
	});
}
function Ei({ className: e, ...t }) {
	return /* @__PURE__ */ S("tfoot", {
		"data-slot": "table-footer",
		className: r("border-t bg-secondary font-medium [&>tr]:last:border-b-0", e),
		...t
	});
}
function q({ className: e, ...t }) {
	return /* @__PURE__ */ S("tr", {
		"data-slot": "table-row",
		className: r("border-b transition-colors hover:bg-secondary has-aria-expanded:bg-secondary data-[state=selected]:bg-accent", e),
		...t
	});
}
function J({ className: e, ...t }) {
	return /* @__PURE__ */ S("th", {
		"data-slot": "table-head",
		className: r("h-row-head px-3 text-left align-middle font-medium whitespace-nowrap text-foreground-secondary [&:has([role=checkbox])]:w-10 [&:has([role=checkbox])]:pr-0", e),
		...t
	});
}
function Y({ className: e, ...t }) {
	return /* @__PURE__ */ S("td", {
		"data-slot": "table-cell",
		className: r("h-row px-3 py-1 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", e),
		...t
	});
}
function Di({ className: e, ...t }) {
	return /* @__PURE__ */ S("caption", {
		"data-slot": "table-caption",
		className: r("mt-4 text-sm text-muted-foreground", e),
		...t
	});
}
// src/components/ui/tabs.tsx
function Oi({ className: e, orientation: t = "horizontal", ...n }) {
	return /* @__PURE__ */ S(v.Root, {
		"data-slot": "tabs",
		"data-orientation": t,
		className: r("group/tabs flex gap-2 data-horizontal:flex-col", e),
		...n
	});
}
var ki = b("group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-control-sm group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none", {
	variants: { variant: {
		default: "bg-field",
		line: "gap-1 border-b border-border bg-transparent p-0 group-data-horizontal/tabs:w-full group-data-horizontal/tabs:justify-start"
	} },
	defaultVariants: { variant: "default" }
});
function Ai({ className: e, variant: t = "default", ...n }) {
	return /* @__PURE__ */ S(v.List, {
		"data-slot": "tabs-list",
		"data-variant": t,
		className: r(ki({ variant: t }), e),
		...n
	});
}
function ji({ className: e, ...t }) {
	return /* @__PURE__ */ S(v.Trigger, {
		"data-slot": "tabs-trigger",
		className: r("relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2.5 py-0.5 text-[13px] font-medium whitespace-nowrap text-muted-foreground transition-colors group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 group-data-[variant=default]/tabs-list:data-active:shadow-xs group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", "group-data-[variant=line]/tabs-list:flex-none group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent group-data-[variant=line]/tabs-list:data-active:text-primary", "data-active:bg-background data-active:text-foreground", "after:absolute after:bg-primary after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-1px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100", e),
		...t
	});
}
function Mi({ className: e, ...t }) {
	return /* @__PURE__ */ S(v.Content, {
		"data-slot": "tabs-content",
		className: r("flex-1 text-sm outline-none", e),
		...t
	});
}
// src/components/ui/toggle.tsx
var Ni = b("group/toggle inline-flex items-center justify-center gap-1 rounded-lg text-sm font-medium whitespace-nowrap transition-all outline-none hover:bg-secondary-hover hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-accent aria-pressed:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "bg-transparent",
			outline: "bg-field hover:bg-field-hover"
		},
		size: {
			default: "h-control min-w-control px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			sm: "h-control-sm min-w-control-sm px-2.5 text-sm has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
			lg: "h-9 min-w-9 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Pi({ className: e, variant: t = "default", size: n = "default", ...i }) {
	return /* @__PURE__ */ S(ee.Root, {
		"data-slot": "toggle",
		className: r(Ni({
			variant: t,
			size: n,
			className: e
		})),
		...i
	});
}
// src/components/ui/toggle-group.tsx
var Fi = e.createContext({
	size: "default",
	variant: "default",
	spacing: 2,
	orientation: "horizontal"
});
function Ii({ className: e, variant: t, size: n, spacing: i = 2, orientation: a = "horizontal", children: o, ...s }) {
	return /* @__PURE__ */ S(te.Root, {
		"data-slot": "toggle-group",
		"data-variant": t,
		"data-size": n,
		"data-spacing": i,
		"data-orientation": a,
		style: { "--gap": i },
		className: r("group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-lg data-[size=sm]:rounded-[min(var(--radius-md),10px)] data-vertical:flex-col data-vertical:items-stretch", e),
		...s,
		children: /* @__PURE__ */ S(Fi.Provider, {
			value: {
				variant: t,
				size: n,
				spacing: i,
				orientation: a
			},
			children: o
		})
	});
}
function Li({ className: t, children: n, variant: i = "default", size: a = "default", ...o }) {
	let s = e.useContext(Fi);
	return /* @__PURE__ */ S(te.Item, {
		"data-slot": "toggle-group-item",
		"data-variant": s.variant || i,
		"data-size": s.size || a,
		"data-spacing": s.spacing,
		className: r("shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-lg group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-lg group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t", Ni({
			variant: s.variant || i,
			size: s.size || a
		}), t),
		...o,
		children: n
	});
}
// src/components/patterns/app-shell.tsx
var Ri = "border border-transparent hover:border-muted-foreground hover:bg-background hover:text-foreground active:bg-background data-active:border-primary data-active:bg-background data-active:font-medium data-active:text-primary data-open:hover:bg-background focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40";
function zi({ header: t, nav: n, breadcrumbs: i = [], headerEnd: a, footer: o, defaultOpen: s = !0, children: c }) {
	return /* @__PURE__ */ C(ei, {
		defaultOpen: s,
		className: "min-h-svh",
		children: [/* @__PURE__ */ C(ti, {
			collapsible: "icon",
			children: [
				t && /* @__PURE__ */ S(oi, { children: t }),
				/* @__PURE__ */ S(li, { children: n.map((e, t) => /* @__PURE__ */ C(ui, { children: [e.label && /* @__PURE__ */ S(di, { children: e.label }), /* @__PURE__ */ S(pi, { children: /* @__PURE__ */ S(mi, { children: e.items.map((e) => e.children?.length ? /* @__PURE__ */ S(Kt, {
					asChild: !0,
					defaultOpen: e.active || e.children.some((e) => e.active),
					className: "group/collapsible",
					children: /* @__PURE__ */ C(W, { children: [/* @__PURE__ */ S(qt, {
						asChild: !0,
						children: /* @__PURE__ */ C(G, {
							tooltip: e.title,
							className: r(Ri, (e.active || e.children.some((e) => e.active)) && "font-semibold"),
							children: [
								/* @__PURE__ */ S(e.icon, {}),
								/* @__PURE__ */ S("span", { children: e.title }),
								/* @__PURE__ */ S(T, { className: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" })
							]
						})
					}), /* @__PURE__ */ S(Jt, { children: /* @__PURE__ */ S(yi, {
						className: "gap-0.5 py-1",
						children: e.children.map((e) => /* @__PURE__ */ C(bi, {
							className: "relative",
							children: [/* @__PURE__ */ S("span", {
								"aria-hidden": !0,
								className: r("absolute top-1/2 -left-[13.5px] size-1.5 -translate-y-1/2 rounded-full", e.active ? "bg-primary" : "bg-border")
							}), /* @__PURE__ */ S(xi, {
								asChild: !0,
								isActive: e.active,
								className: Ri,
								children: /* @__PURE__ */ C("a", {
									href: e.href,
									"aria-current": e.active ? "page" : void 0,
									children: [/* @__PURE__ */ S("span", { children: e.title }), e.count !== void 0 && /* @__PURE__ */ S("span", {
										className: "ml-auto text-xs text-muted-foreground tabular-nums",
										children: e.count.toLocaleString("th-TH")
									})]
								})
							})]
						}, e.href))
					}) })] })
				}, e.href) : /* @__PURE__ */ C(W, { children: [/* @__PURE__ */ S(G, {
					asChild: !0,
					isActive: e.active,
					tooltip: e.title,
					className: Ri,
					children: /* @__PURE__ */ C("a", {
						href: e.href,
						"aria-current": e.active ? "page" : void 0,
						children: [/* @__PURE__ */ S(e.icon, {}), /* @__PURE__ */ S("span", { children: e.title })]
					})
				}), e.badge ? /* @__PURE__ */ S(_i, {
					className: "tabular-nums",
					"aria-label": `${e.badge} รายการ`,
					children: e.badge
				}) : null] }, e.href)) }) })] }, e.label ?? t)) }),
				o && /* @__PURE__ */ S(si, { children: o }),
				/* @__PURE__ */ S(ri, {})
			]
		}), /* @__PURE__ */ C(ii, {
			className: "min-w-0 bg-background",
			children: [/* @__PURE__ */ C("header", {
				className: "sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-(--page-gutter)",
				children: [
					/* @__PURE__ */ S(ni, {
						className: "-ml-2",
						"aria-label": "เปิดหรือปิดเมนู"
					}),
					i.length > 0 && /* @__PURE__ */ C(x, { children: [/* @__PURE__ */ S(R, {
						orientation: "vertical",
						className: "mr-1 h-full"
					}), /* @__PURE__ */ S(bt, { children: /* @__PURE__ */ S(xt, { children: i.map((t, n) => /* @__PURE__ */ C(e.Fragment, { children: [n > 0 && /* @__PURE__ */ S(Tt, {}), /* @__PURE__ */ S(St, { children: t.href && n < i.length - 1 ? /* @__PURE__ */ S(Ct, {
						href: t.href,
						children: t.label
					}) : /* @__PURE__ */ S(wt, { children: t.label }) })] }, t.label)) }) })] }),
					/* @__PURE__ */ S("div", {
						className: "ml-auto flex items-center gap-2",
						children: a
					})
				]
			}), /* @__PURE__ */ S("div", {
				className: "flex min-w-0 flex-1 flex-col gap-4 p-(--page-gutter)",
				children: c
			})]
		})]
	});
}
// src/components/patterns/badge-overflow.tsx
function Bi({ items: t, max: n = 2, label: r = "ทั้งหมด" }) {
	let i = t.slice(0, n), a = t.length - i.length;
	return /* @__PURE__ */ C("div", {
		"data-slot": "badge-overflow",
		className: "flex flex-nowrap items-center gap-1",
		children: [i.map((t, n) => /* @__PURE__ */ S(e.Fragment, { children: t }, n)), a > 0 && /* @__PURE__ */ C(nr, {
			openDelay: 100,
			closeDelay: 100,
			children: [/* @__PURE__ */ S(rr, {
				asChild: !0,
				children: /* @__PURE__ */ S("button", {
					type: "button",
					"aria-label": `อีก ${a} รายการ`,
					className: "rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring",
					children: /* @__PURE__ */ S(M, {
						variant: "secondary",
						className: "cursor-default px-2",
						children: "…"
					})
				})
			}), /* @__PURE__ */ C(ir, {
				align: "start",
				className: "w-auto min-w-44 p-3",
				children: [/* @__PURE__ */ C("p", {
					className: "mb-2 text-xs text-muted-foreground",
					children: [
						r,
						" (",
						t.length,
						")"
					]
				}), /* @__PURE__ */ S("div", {
					className: "flex flex-col items-start gap-1",
					children: t.map((t, n) => /* @__PURE__ */ S(e.Fragment, { children: t }, n))
				})]
			})]
		})]
	});
}
// src/components/patterns/chart-card.tsx
function Vi({ title: t, description: n, table: r, children: i }) {
	let [a, o] = e.useState(!1), s = e.useId();
	return /* @__PURE__ */ C(Ot, {
		"data-slot": "chart-card",
		children: [/* @__PURE__ */ C(kt, { children: [
			/* @__PURE__ */ S(At, { children: t }),
			n && /* @__PURE__ */ S(jt, { children: n }),
			/* @__PURE__ */ S("div", {
				className: "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
				children: /* @__PURE__ */ C(A, {
					variant: "ghost",
					size: "sm",
					"aria-pressed": a,
					"aria-controls": s,
					onClick: () => o((e) => !e),
					children: [S(a ? oe : De, { "data-icon": "inline-start" }), a ? "ดูกราฟ" : "ดูเป็นตาราง"]
				})
			})
		] }), /* @__PURE__ */ S(Nt, {
			id: s,
			children: a ? /* @__PURE__ */ C(wi, { children: [
				/* @__PURE__ */ S("caption", {
					className: "sr-only",
					children: t
				}),
				/* @__PURE__ */ S(Ti, { children: /* @__PURE__ */ C(q, { children: [/* @__PURE__ */ S(J, { children: r.rowLabel }), r.columns.map((e) => /* @__PURE__ */ S(J, {
					className: "text-right",
					children: e.label
				}, e.key))] }) }),
				/* @__PURE__ */ S(K, { children: r.rows.map((e) => /* @__PURE__ */ C(q, { children: [/* @__PURE__ */ S(Y, { children: e[r.rowKey] }), r.columns.map((t) => /* @__PURE__ */ S(Y, {
					className: "text-right",
					children: typeof e[t.key] == "number" ? e[t.key].toLocaleString("th-TH") : e[t.key]
				}, t.key))] }, String(e[r.rowKey]))) })
			] }) : i
		})]
	});
}
// src/components/patterns/confirm-dialog.tsx
function Hi({ trigger: t, title: n, description: r, confirmLabel: i, cancelLabel: a = "ยกเลิก", tone: o = "default", onConfirm: s }) {
	let [c, l] = e.useState(!1), [u, d] = e.useState(!1);
	async function f(e) {
		e.preventDefault(), d(!0);
		try {
			await s(), l(!1);
		} catch {} finally {
			d(!1);
		}
	}
	return /* @__PURE__ */ C(Xe, {
		open: c,
		onOpenChange: (e) => !u && l(e),
		children: [/* @__PURE__ */ S(Ze, {
			asChild: !0,
			children: t
		}), /* @__PURE__ */ C(et, { children: [/* @__PURE__ */ C(tt, { children: [/* @__PURE__ */ S(it, { children: n }), /* @__PURE__ */ S(at, { children: r })] }), /* @__PURE__ */ C(nt, { children: [/* @__PURE__ */ S(st, {
			asChild: !0,
			children: /* @__PURE__ */ S(A, {
				variant: "outline",
				disabled: u,
				autoFocus: !0,
				children: a
			})
		}), /* @__PURE__ */ S(ot, {
			asChild: !0,
			children: /* @__PURE__ */ C(A, {
				variant: o === "destructive" ? "destructive" : "default",
				onClick: f,
				disabled: u,
				"aria-busy": u,
				children: [u && /* @__PURE__ */ S(Ci, { "data-icon": "inline-start" }), i]
			})
		})] })] })]
	});
}
// src/components/patterns/date-picker.tsx
var X = (e) => e.toLocaleDateString("th-TH-u-ca-gregory", {
	day: "numeric",
	month: "short",
	year: "numeric"
});
function Ui(e) {
	return {
		locale: Ne,
		captionLayout: "dropdown",
		startMonth: new Date(e[0], 0),
		endMonth: new Date(e[1], 11),
		showOutsideDays: !1,
		formatters: { formatYearDropdown: (e) => String(e.getFullYear()) },
		labels: {
			labelMonthDropdown: () => "เดือน",
			labelYearDropdown: () => "ปี",
			labelNext: () => "เดือนถัดไป",
			labelPrevious: () => "เดือนก่อนหน้า"
		}
	};
}
var Wi = [2020, 2035], Z = (e) => new Date(e.getFullYear(), e.getMonth(), e.getDate()), Q = (e, t) => new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
function Gi({ items: e }) {
	return /* @__PURE__ */ S("div", {
		role: "group",
		"aria-label": "ช่วงที่ใช้บ่อย",
		className: "flex w-0 min-w-full flex-wrap gap-1.5 border-t border-border p-3",
		children: e.map((e) => /* @__PURE__ */ S(M, {
			asChild: !0,
			variant: "secondary",
			children: /* @__PURE__ */ S("button", {
				type: "button",
				disabled: e.disabled,
				onClick: e.onPick,
				className: "h-control-sm cursor-pointer px-3 text-[13px] outline-none hover:bg-secondary-hover focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
				children: e.label
			})
		}, e.label))
	});
}
function Ki(e = /* @__PURE__ */ new Date()) {
	let t = Z(e);
	return [
		{
			label: "วันนี้",
			date: t
		},
		{
			label: "เมื่อวาน",
			date: Q(t, -1)
		},
		{
			label: "7 วันที่แล้ว",
			date: Q(t, -7)
		},
		{
			label: "30 วันที่แล้ว",
			date: Q(t, -30)
		}
	];
}
function qi({ id: t, value: n, onChange: i, placeholder: a = "เลือกวันที่", disabled: o, invalid: s, min: c, max: l, defaultMonth: u, yearRange: d = Wi, presets: f, className: p, ...m }) {
	let [h, g] = e.useState(!1), _ = [c && { before: c }, l && { after: l }].filter(Boolean);
	return /* @__PURE__ */ C(z, {
		open: h,
		onOpenChange: g,
		children: [/* @__PURE__ */ S(B, {
			asChild: !0,
			children: /* @__PURE__ */ C("button", {
				id: t,
				type: "button",
				disabled: o,
				"aria-invalid": s || void 0,
				"aria-label": m["aria-label"],
				"data-empty": !n || void 0,
				className: r("flex h-control w-full min-w-40 items-center justify-between gap-1.5 rounded-lg border border-input bg-background pr-2 pl-2 text-left text-base text-foreground transition-colors outline-none md:text-sm", "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 enabled:hover:border-muted-foreground", "disabled:cursor-not-allowed disabled:border-transparent disabled:bg-secondary disabled:text-muted-foreground", "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/30", "data-[empty]:text-foreground-secondary", p),
				children: [/* @__PURE__ */ S("span", {
					className: "truncate tabular-nums",
					children: n ? X(n) : a
				}), /* @__PURE__ */ S(ae, {
					className: "size-4 shrink-0 text-foreground-secondary",
					"aria-hidden": !0
				})]
			})
		}), /* @__PURE__ */ C(V, {
			align: "start",
			className: "w-auto p-0",
			"aria-label": m["aria-label"] ?? a,
			children: [
				/* @__PURE__ */ S(N, {
					mode: "single",
					...Ui(d),
					selected: n,
					defaultMonth: n ?? u,
					disabled: _,
					onSelect: (e) => {
						i(e), g(!1);
					}
				}),
				f && f.length > 0 && /* @__PURE__ */ S(Gi, { items: f.map((e) => ({
					label: e.label,
					disabled: !!(c && e.date < Z(c) || l && e.date > Z(l)),
					onPick: () => {
						i(e.date), g(!1);
					}
				})) }),
				n && /* @__PURE__ */ S("div", {
					className: "flex justify-end border-t border-border p-2",
					children: /* @__PURE__ */ C(A, {
						variant: "ghost",
						size: "sm",
						onClick: () => {
							i(void 0), g(!1);
						},
						children: [/* @__PURE__ */ S(D, { "data-icon": "inline-start" }), "ล้างวันที่"]
					})
				})
			]
		})]
	});
}
function Ji({ id: t, value: n, onChange: i, placeholder: a = "เลือกช่วงวันที่", min: o, max: s, defaultMonth: c, yearRange: l = Wi, today: u = /* @__PURE__ */ new Date(), className: d, ...f }) {
	let [p, m] = e.useState(!1), h = Hr(), g = [o && { before: o }, s && { after: s }].filter(Boolean), _ = n.from ? `${X(n.from)} – ${n.to ? X(n.to) : "…"}` : a, v = Z(u), ee = [
		{
			label: "วันนี้",
			range: {
				from: v,
				to: v
			}
		},
		{
			label: "7 วันล่าสุด",
			range: {
				from: Q(v, -6),
				to: v
			}
		},
		{
			label: "30 วันล่าสุด",
			range: {
				from: Q(v, -29),
				to: v
			}
		},
		{
			label: "เดือนนี้",
			range: {
				from: new Date(v.getFullYear(), v.getMonth(), 1),
				to: v
			}
		}
	];
	return /* @__PURE__ */ C(z, {
		open: p,
		onOpenChange: m,
		children: [/* @__PURE__ */ S(B, {
			asChild: !0,
			children: /* @__PURE__ */ C("button", {
				id: t,
				type: "button",
				"aria-label": f["aria-label"],
				"data-empty": !n.from || void 0,
				className: r("flex h-control w-full min-w-64 items-center justify-between gap-1.5 rounded-lg border border-input bg-background pr-2 pl-2 text-left text-base text-foreground transition-colors outline-none md:text-sm", "hover:border-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40", "data-[empty]:text-foreground-secondary", d),
				children: [/* @__PURE__ */ S("span", {
					className: "truncate tabular-nums",
					children: _
				}), /* @__PURE__ */ S(ae, {
					className: "size-4 shrink-0 text-foreground-secondary",
					"aria-hidden": !0
				})]
			})
		}), /* @__PURE__ */ C(V, {
			align: "start",
			className: "w-auto p-0",
			"aria-label": f["aria-label"] ?? a,
			children: [
				/* @__PURE__ */ S(N, {
					mode: "range",
					numberOfMonths: h ? 1 : 2,
					...Ui(l),
					selected: n.from ? {
						from: n.from,
						to: n.to
					} : void 0,
					defaultMonth: n.from ?? c,
					disabled: g,
					onSelect: (e) => {
						i({
							from: e?.from,
							to: e?.to
						}), e?.from && e?.to && m(!1);
					}
				}),
				/* @__PURE__ */ S(Gi, { items: ee.map((e) => ({
					label: e.label,
					onPick: () => {
						i(e.range), m(!1);
					}
				})) }),
				(n.from || n.to) && /* @__PURE__ */ S("div", {
					className: "flex justify-end border-t border-border p-2",
					children: /* @__PURE__ */ C(A, {
						variant: "ghost",
						size: "sm",
						onClick: () => {
							i({}), m(!1);
						},
						children: [/* @__PURE__ */ S(D, { "data-icon": "inline-start" }), "ล้างช่วงวันที่"]
					})
				})
			]
		})]
	});
}
function Yi({ value: t, onChange: n, fromLabel: i = "จากวันที่", toLabel: a = "ถึงวันที่", defaultMonth: o, yearRange: s, today: c, presets: l, className: u }) {
	let d = e.useId(), f = !!(t.from || t.to), p = l ?? Ki(c);
	return /* @__PURE__ */ C("div", {
		"data-slot": "date-range-filter",
		className: r("flex w-full max-w-2xl items-end gap-3", u),
		children: [
			/* @__PURE__ */ C(Yn, {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ S(Zn, {
					htmlFor: `${d}-from`,
					children: i
				}), /* @__PURE__ */ S(qi, {
					id: `${d}-from`,
					value: t.from,
					max: t.to,
					defaultMonth: o,
					yearRange: s,
					presets: p,
					className: "min-w-0",
					onChange: (e) => n({
						...t,
						from: e
					})
				})]
			}),
			/* @__PURE__ */ S("span", {
				"aria-hidden": !0,
				className: "flex h-control shrink-0 items-center text-muted-foreground",
				children: "–"
			}),
			/* @__PURE__ */ C(Yn, {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ S(Zn, {
					htmlFor: `${d}-to`,
					children: a
				}), /* @__PURE__ */ S(qi, {
					id: `${d}-to`,
					value: t.to,
					min: t.from,
					defaultMonth: o,
					yearRange: s,
					presets: p,
					className: "min-w-0",
					onChange: (e) => n({
						...t,
						to: e
					})
				})]
			}),
			/* @__PURE__ */ C(A, {
				variant: "ghost",
				"aria-label": "ล้างตัวกรอง",
				className: r("shrink-0", !f && "invisible"),
				onClick: () => n({}),
				children: [/* @__PURE__ */ S(D, { "data-icon": "inline-start" }), /* @__PURE__ */ S("span", {
					className: "hidden sm:inline",
					children: "ล้างตัวกรอง"
				})]
			})
		]
	});
}
// src/components/patterns/feedback-states.tsx
function Xi({ kind: e, title: t, description: n, action: r }) {
	return /* @__PURE__ */ C(Ln, {
		"data-kind": e,
		className: "py-12",
		children: [/* @__PURE__ */ C(Rn, { children: [
			/* @__PURE__ */ S(Bn, {
				variant: "icon",
				children: /* @__PURE__ */ S(e === "no-data" ? me : Te, {})
			}),
			/* @__PURE__ */ S(Vn, { children: t ?? (e === "no-data" ? "ยังไม่มีข้อมูล" : "ไม่พบรายการที่ตรงกับตัวกรอง") }),
			/* @__PURE__ */ S(Hn, { children: n ?? (e === "no-data" ? "เมื่อมีข้อมูลเข้ามา รายการจะแสดงที่นี่" : "ลองเปลี่ยนคำค้นหาหรือล้างตัวกรองเพื่อดูรายการทั้งหมด") })
		] }), r && /* @__PURE__ */ S(Un, { children: r })]
	});
}
function Zi({ title: e, description: t, reference: n, onRetry: r, retrying: i }) {
	return /* @__PURE__ */ C(Ln, {
		role: "alert",
		className: "py-12",
		children: [/* @__PURE__ */ C(Rn, { children: [
			/* @__PURE__ */ S(Bn, {
				variant: "icon",
				className: "bg-danger-subtle text-danger-foreground",
				children: /* @__PURE__ */ S(Ee, {})
			}),
			/* @__PURE__ */ S(Vn, { children: e ?? "โหลดข้อมูลไม่สำเร็จ" }),
			/* @__PURE__ */ C(Hn, { children: [t ?? "เกิดข้อผิดพลาดระหว่างดึงข้อมูล ข้อมูลของคุณไม่ได้รับผลกระทบ ลองใหม่อีกครั้ง", n && /* @__PURE__ */ C(x, { children: [/* @__PURE__ */ S("br", {}), /* @__PURE__ */ C("span", {
				className: "font-mono text-xs",
				children: ["รหัสอ้างอิง ", n]
			})] })] })
		] }), r && /* @__PURE__ */ S(Un, { children: /* @__PURE__ */ C(A, {
			variant: "outline",
			onClick: r,
			disabled: i,
			"aria-busy": i,
			children: [/* @__PURE__ */ S(Ce, {
				"data-icon": "inline-start",
				className: i ? "animate-spin" : void 0
			}), "ลองใหม่"]
		}) })]
	});
}
// src/components/patterns/page-header.tsx
function Qi({ title: e, description: t, meta: n, actions: i, className: a }) {
	return /* @__PURE__ */ C("header", {
		"data-slot": "page-header",
		className: r("flex flex-wrap items-start justify-between gap-4", a),
		children: [/* @__PURE__ */ C("div", {
			className: "flex min-w-0 flex-col gap-1",
			children: [/* @__PURE__ */ C("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ S("h1", {
					className: "type-h1 text-foreground",
					children: e
				}), n]
			}), t && /* @__PURE__ */ S("p", {
				className: "text-sm text-muted-foreground",
				children: t
			})]
		}), i && /* @__PURE__ */ S("div", {
			className: "flex flex-wrap items-center gap-2",
			children: i
		})]
	});
}
// src/components/patterns/user-menu.tsx
var $i = (e) => e.trim().split(/\s+/).slice(0, 2).map((e) => e[0]).join("").toUpperCase();
function ea({ user: e }) {
	return /* @__PURE__ */ C(x, { children: [/* @__PURE__ */ S(pt, {
		className: "size-8 rounded-lg",
		children: /* @__PURE__ */ S(j, {
			className: "rounded-lg",
			children: $i(e.name)
		})
	}), /* @__PURE__ */ C("div", {
		className: "grid flex-1 text-left text-sm leading-tight",
		children: [/* @__PURE__ */ S("span", {
			className: "truncate font-medium",
			children: e.name
		}), /* @__PURE__ */ S("span", {
			className: "truncate text-xs text-muted-foreground",
			children: e.email
		})]
	})] });
}
function ta({ user: t, onLogout: n }) {
	let [r, i] = e.useState(!1);
	async function a() {
		i(!0);
		try {
			await n();
		} finally {
			i(!1);
		}
	}
	return /* @__PURE__ */ S(mi, { children: /* @__PURE__ */ S(W, { children: /* @__PURE__ */ C(Cn, { children: [/* @__PURE__ */ S(Tn, {
		asChild: !0,
		children: /* @__PURE__ */ C(G, {
			tooltip: t.name,
			className: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
			children: [/* @__PURE__ */ S(pt, {
				className: "size-6 rounded-full",
				children: /* @__PURE__ */ S(j, {
					className: "rounded-full text-[10px]",
					children: $i(t.name)
				})
			}), /* @__PURE__ */ S("span", {
				className: "truncate",
				children: t.name
			})]
		})
	}), /* @__PURE__ */ C(En, {
		className: "min-w-56 rounded-lg",
		side: "right",
		align: "end",
		sideOffset: 8,
		children: [
			/* @__PURE__ */ S(Mn, {
				className: "flex items-center gap-2 p-1.5 font-normal",
				children: /* @__PURE__ */ S(ea, { user: t })
			}),
			/* @__PURE__ */ S(L, {}),
			/* @__PURE__ */ S(Dn, { children: /* @__PURE__ */ C(On, {
				disabled: !0,
				children: [
					/* @__PURE__ */ S(ie, {}),
					"บทบาท: ",
					t.role
				]
			}) }),
			/* @__PURE__ */ S(L, {}),
			/* @__PURE__ */ C(On, {
				onSelect: a,
				disabled: r,
				children: [/* @__PURE__ */ S(_e, {}), r ? "กำลังออกจากระบบ…" : "ออกจากระบบ"]
			})
		]
	})] }) }) });
}
// src/components/patterns/data-table/data-table.tsx
var na = "button, a, input, label, [role=checkbox], [role=menuitem]";
function ra({ table: e, caption: t, status: n = "ready", empty: i, error: a, loadingRows: o = 10, onRowClick: s, className: c }) {
	let l = e.getVisibleLeafColumns(), u = e.getRowModel().rows;
	return /* @__PURE__ */ S("div", {
		"data-slot": "data-table",
		className: r("overflow-hidden rounded-xl border border-border bg-card", c),
		children: /* @__PURE__ */ C(wi, {
			"aria-busy": n === "loading",
			children: [
				/* @__PURE__ */ S("caption", {
					className: "sr-only",
					children: t
				}),
				/* @__PURE__ */ S(Ti, {
					className: "sticky top-0 z-10",
					children: e.getHeaderGroups().map((t) => /* @__PURE__ */ S(q, { children: t.headers.map((t) => {
						let n = t.column.columnDef.meta, i = t.column.getIsSorted();
						return /* @__PURE__ */ S(J, {
							"aria-sort": i === "asc" ? "ascending" : i === "desc" ? "descending" : t.column.getCanSort() ? "none" : void 0,
							className: r(n?.align === "right" && "text-right", n?.sticky && "sticky left-0 z-10 bg-secondary"),
							children: t.isPlaceholder ? null : /* @__PURE__ */ S(e.FlexRender, { header: t })
						}, t.id);
					}) }, t.id))
				}),
				/* @__PURE__ */ C(K, { children: [
					n === "loading" && Array.from({ length: o }, (e, t) => /* @__PURE__ */ S(q, {
						className: "hover:bg-transparent",
						children: l.map((e) => /* @__PURE__ */ S(Y, { children: /* @__PURE__ */ S(H, { className: "h-4 w-full max-w-32" }) }, e.id))
					}, `skeleton-${t}`)),
					n === "error" && /* @__PURE__ */ S(q, {
						className: "hover:bg-transparent",
						children: /* @__PURE__ */ S(Y, {
							colSpan: l.length,
							className: "h-auto p-0 whitespace-normal",
							children: a
						})
					}),
					n === "ready" && u.length === 0 && /* @__PURE__ */ S(q, {
						className: "hover:bg-transparent",
						children: /* @__PURE__ */ S(Y, {
							colSpan: l.length,
							className: "h-auto p-0 whitespace-normal",
							children: i
						})
					}),
					n === "ready" && u.map((t) => /* @__PURE__ */ S(q, {
						"data-state": t.getIsSelected() ? "selected" : void 0,
						className: r(s && "cursor-pointer"),
						onClick: s ? (e) => {
							e.target.closest(na) || s(t);
						} : void 0,
						children: t.getVisibleCells().map((t) => {
							let n = t.column.columnDef.meta;
							return /* @__PURE__ */ S(Y, {
								className: r(n?.align === "right" && "text-right", n?.sticky && "sticky left-0 bg-inherit"),
								children: /* @__PURE__ */ S(e.FlexRender, { cell: t })
							}, t.id);
						})
					}, t.id))
				] })
			]
		})
	});
}
// src/components/patterns/data-table/data-table-column-header.tsx
function ia({ column: e, title: t, className: n }) {
	if (!e.getCanSort()) return /* @__PURE__ */ S("span", {
		className: n,
		children: t
	});
	let i = e.getIsSorted(), a = i === "asc" ? re : i === "desc" ? ne : de, o = e.getNextSortingOrder(), s = o === "asc" ? "เรียงจากน้อยไปมาก" : o === "desc" ? "เรียงจากมากไปน้อย" : "ยกเลิกการเรียง";
	return /* @__PURE__ */ C(A, {
		variant: "ghost",
		size: "sm",
		className: r("-mx-3 h-control-sm px-3 font-medium text-foreground-secondary data-[sorted=true]:text-primary", e.columnDef.meta?.align === "right" && "flex-row-reverse", n),
		"data-sorted": !!i,
		"aria-label": `${t}: ${s}`,
		onClick: e.getToggleSortingHandler(),
		children: [t, /* @__PURE__ */ S(a, {
			"data-icon": "inline-end",
			className: r("size-3.5", !i && "opacity-50"),
			"aria-hidden": !0
		})]
	});
}
// src/components/patterns/data-table/data-table-faceted-filter.tsx
function aa({ column: e, title: t, options: n }) {
	let i = new Set(e?.getFilterValue() ?? []);
	function a(t) {
		let n = new Set(i);
		n.has(t) ? n.delete(t) : n.add(t), e?.setFilterValue(n.size ? [...n] : void 0);
	}
	return /* @__PURE__ */ C(z, { children: [/* @__PURE__ */ S(B, {
		asChild: !0,
		children: /* @__PURE__ */ C(A, {
			variant: "outline",
			className: "border-dashed text-foreground",
			children: [
				/* @__PURE__ */ S(Se, { "data-icon": "inline-start" }),
				t,
				i.size > 0 && /* @__PURE__ */ C(x, { children: [/* @__PURE__ */ S(R, {
					orientation: "vertical",
					className: "mx-1 h-4"
				}), i.size > 2 ? /* @__PURE__ */ C(M, {
					variant: "accent",
					children: ["เลือก ", i.size]
				}) : n.filter((e) => i.has(e.value)).map((e) => /* @__PURE__ */ S(M, {
					variant: "accent",
					children: e.label
				}, e.value))] })
			]
		})
	}), /* @__PURE__ */ S(V, {
		className: "w-64 p-0",
		align: "start",
		children: /* @__PURE__ */ C(mn, { children: [/* @__PURE__ */ S(gn, { placeholder: `ค้นหา${t}` }), /* @__PURE__ */ C(_n, { children: [
			/* @__PURE__ */ S(vn, { children: "ไม่พบตัวเลือก" }),
			/* @__PURE__ */ S(yn, { children: n.map((e) => {
				let t = i.has(e.value);
				return /* @__PURE__ */ C(xn, {
					onSelect: () => a(e.value),
					"aria-selected": t,
					children: [
						/* @__PURE__ */ S("span", {
							"aria-hidden": !0,
							className: r("flex size-4 items-center justify-center rounded-sm border border-input", t && "border-primary bg-primary text-primary-foreground"),
							children: t && /* @__PURE__ */ S(w, { className: "size-3" })
						}),
						/* @__PURE__ */ S("span", {
							className: "flex-1",
							children: e.label
						}),
						e.count !== void 0 && /* @__PURE__ */ S("span", {
							className: "font-mono text-xs text-muted-foreground tabular-nums",
							children: e.count
						})
					]
				}, e.value);
			}) }),
			i.size > 0 && /* @__PURE__ */ C(x, { children: [/* @__PURE__ */ S(bn, {}), /* @__PURE__ */ S(yn, { children: /* @__PURE__ */ S(xn, {
				onSelect: () => e?.setFilterValue(void 0),
				className: "justify-center",
				children: "ล้างตัวกรองนี้"
			}) })] })
		] })] })
	})] });
}
// src/components/patterns/data-table/data-table-pagination.tsx
var $ = new Intl.NumberFormat("th-TH");
function oa({ table: t, pageSizes: n = [
	20,
	50,
	100
] }) {
	let { pageIndex: r, pageSize: i } = t.state.pagination, a = t.getRowCount(), o = a === 0 ? 0 : r * i + 1, s = Math.min(a, (r + 1) * i), c = Object.keys(t.state.rowSelection ?? {}).length, l = e.useId();
	return /* @__PURE__ */ C("nav", {
		"aria-label": "แบ่งหน้า",
		"data-slot": "data-table-pagination",
		className: "flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground",
		children: [/* @__PURE__ */ C("p", {
			"aria-live": "polite",
			className: "tabular-nums",
			children: [
				"แสดง ",
				$.format(o),
				"–",
				$.format(s),
				" จาก ",
				$.format(a),
				" รายการ",
				c > 0 && /* @__PURE__ */ C("span", {
					className: "text-foreground",
					children: [" · เลือกแล้ว ", $.format(c)]
				})
			]
		}), /* @__PURE__ */ C("div", {
			className: "flex items-center gap-4",
			children: [
				/* @__PURE__ */ C("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ S("span", {
						id: l,
						className: "hidden sm:inline",
						children: "แถวต่อหน้า"
					}), /* @__PURE__ */ C(br, {
						value: String(i),
						onValueChange: (e) => t.setPageSize(Number(e)),
						children: [/* @__PURE__ */ S(Cr, {
							className: "w-20",
							"aria-labelledby": l,
							children: /* @__PURE__ */ S(Sr, {})
						}), /* @__PURE__ */ S(wr, { children: /* @__PURE__ */ S(xr, { children: n.map((e) => /* @__PURE__ */ S(Er, {
							value: String(e),
							children: e
						}, e)) }) })]
					})]
				}),
				/* @__PURE__ */ C("span", {
					className: "tabular-nums text-foreground",
					children: [
						"หน้า ",
						$.format(r + 1),
						" / ",
						$.format(Math.max(1, t.getPageCount()))
					]
				}),
				/* @__PURE__ */ C("div", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ S(A, {
							variant: "outline",
							size: "icon",
							className: "hidden lg:inline-flex",
							"aria-label": "หน้าแรก",
							onClick: () => t.setPageIndex(0),
							disabled: !t.getCanPreviousPage(),
							children: /* @__PURE__ */ S(le, {})
						}),
						/* @__PURE__ */ S(A, {
							variant: "outline",
							size: "icon",
							"aria-label": "หน้าก่อนหน้า",
							onClick: () => t.previousPage(),
							disabled: !t.getCanPreviousPage(),
							children: /* @__PURE__ */ S(se, {})
						}),
						/* @__PURE__ */ S(A, {
							variant: "outline",
							size: "icon",
							"aria-label": "หน้าถัดไป",
							onClick: () => t.nextPage(),
							disabled: !t.getCanNextPage(),
							children: /* @__PURE__ */ S(E, {})
						}),
						/* @__PURE__ */ S(A, {
							variant: "outline",
							size: "icon",
							className: "hidden lg:inline-flex",
							"aria-label": "หน้าสุดท้าย",
							onClick: () => t.setPageIndex(t.getPageCount() - 1),
							disabled: !t.getCanNextPage(),
							children: /* @__PURE__ */ S(ue, {})
						})
					]
				})
			]
		})]
	});
}
// src/components/patterns/data-table/data-table-toolbar.tsx
function sa({ table: t, searchPlaceholder: n = "ค้นหา", debounce: r = 300, filters: i, actions: a }) {
	let o = t.state.globalFilter ?? "", [s, c] = e.useState(o), l = t.state.columnFilters.length > 0 || o !== "";
	e.useEffect(() => {
		if (s === o) return;
		let e = setTimeout(() => t.setGlobalFilter(s || void 0), r);
		return () => clearTimeout(e);
	}, [
		s,
		o,
		r,
		t
	]);
	function u() {
		c(""), t.resetColumnFilters(), t.setGlobalFilter(void 0);
	}
	return /* @__PURE__ */ C("div", {
		"data-slot": "data-table-toolbar",
		className: "flex flex-wrap items-center gap-2",
		children: [
			/* @__PURE__ */ C(sn, {
				className: "w-full sm:w-72",
				children: [
					/* @__PURE__ */ S(I, { children: /* @__PURE__ */ S(we, {}) }),
					/* @__PURE__ */ S(fn, {
						type: "search",
						"aria-label": n,
						placeholder: n,
						value: s,
						onChange: (e) => c(e.target.value)
					}),
					s && /* @__PURE__ */ S(I, {
						align: "inline-end",
						children: /* @__PURE__ */ S(un, {
							size: "icon-xs",
							"aria-label": "ล้างคำค้นหา",
							onClick: () => c(""),
							children: /* @__PURE__ */ S(D, {})
						})
					})
				]
			}),
			i,
			l && /* @__PURE__ */ C(A, {
				variant: "ghost",
				onClick: u,
				children: ["ล้างตัวกรอง", /* @__PURE__ */ S(D, { "data-icon": "inline-end" })]
			}),
			/* @__PURE__ */ C("div", {
				className: "ml-auto flex items-center gap-2",
				children: [a, /* @__PURE__ */ C(Cn, { children: [/* @__PURE__ */ S(Tn, {
					asChild: !0,
					children: /* @__PURE__ */ C(A, {
						variant: "outline",
						children: [/* @__PURE__ */ S(pe, { "data-icon": "inline-start" }), "คอลัมน์"]
					})
				}), /* @__PURE__ */ S(En, {
					align: "end",
					className: "w-52",
					children: /* @__PURE__ */ C(Dn, { children: [
						/* @__PURE__ */ S(Mn, { children: "แสดงคอลัมน์" }),
						/* @__PURE__ */ S(L, {}),
						t.getAllLeafColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ S(kn, {
							checked: e.getIsVisible(),
							onCheckedChange: (t) => e.toggleVisibility(!!t),
							onSelect: (e) => e.preventDefault(),
							children: e.columnDef.meta?.label ?? e.id
						}, e.id))
					] })
				})] })]
			})
		]
	});
}
// src/components/patterns/data-table/features.ts
var ca = Ye({
	rowSortingFeature: We,
	columnFilteringFeature: Pe,
	globalFilteringFeature: Ve,
	rowPaginationFeature: He,
	rowSelectionFeature: Ue,
	columnVisibilityFeature: Fe,
	sortedRowModel: Re(),
	filteredRowModel: Ie(),
	paginatedRowModel: Le(),
	filterFns: {
		includesString: Be,
		arrIncludesSome: ze
	},
	sortFns: {
		alphanumeric: Ge,
		text: Je,
		datetime: qe,
		basic: Ke
	},
	columnMeta: {}
});
export { lt as Alert, ft as AlertAction, dt as AlertDescription, Xe as AlertDialog, ot as AlertDialogAction, st as AlertDialogCancel, et as AlertDialogContent, at as AlertDialogDescription, nt as AlertDialogFooter, tt as AlertDialogHeader, rt as AlertDialogMedia, $e as AlertDialogOverlay, Qe as AlertDialogPortal, it as AlertDialogTitle, Ze as AlertDialogTrigger, ut as AlertTitle, zi as AppShell, pt as Avatar, ht as AvatarBadge, j as AvatarFallback, gt as AvatarGroup, _t as AvatarGroupCount, mt as AvatarImage, M as Badge, yt as BadgeDot, Bi as BadgeOverflow, bt as Breadcrumb, Et as BreadcrumbEllipsis, St as BreadcrumbItem, Ct as BreadcrumbLink, xt as BreadcrumbList, wt as BreadcrumbPage, Tt as BreadcrumbSeparator, A as Button, N as Calendar, Dt as CalendarDayButton, Ot as Card, Mt as CardAction, Nt as CardContent, jt as CardDescription, Pt as CardFooter, kt as CardHeader, At as CardTitle, Vi as ChartCard, zt as ChartContainer, Ut as ChartLegend, Wt as ChartLegendContent, Bt as ChartStyle, Vt as ChartTooltip, Ht as ChartTooltipContent, Gt as Checkbox, Kt as Collapsible, Jt as CollapsibleContent, qt as CollapsibleTrigger, mn as Command, hn as CommandDialog, vn as CommandEmpty, yn as CommandGroup, gn as CommandInput, xn as CommandItem, _n as CommandList, bn as CommandSeparator, Sn as CommandShortcut, Hi as ConfirmDialog, ra as DataTable, ia as DataTableColumnHeader, aa as DataTableFacetedFilter, oa as DataTablePagination, sa as DataTableToolbar, qi as DatePicker, Yi as DateRangeFilter, Ji as DateRangePicker, Yt as Dialog, Qt as DialogClose, en as DialogContent, an as DialogDescription, nn as DialogFooter, tn as DialogHeader, $t as DialogOverlay, Zt as DialogPortal, rn as DialogTitle, Xt as DialogTrigger, Cn as DropdownMenu, kn as DropdownMenuCheckboxItem, En as DropdownMenuContent, Dn as DropdownMenuGroup, On as DropdownMenuItem, Mn as DropdownMenuLabel, wn as DropdownMenuPortal, An as DropdownMenuRadioGroup, jn as DropdownMenuRadioItem, L as DropdownMenuSeparator, Nn as DropdownMenuShortcut, Pn as DropdownMenuSub, In as DropdownMenuSubContent, Fn as DropdownMenuSubTrigger, Tn as DropdownMenuTrigger, Ln as Empty, Un as EmptyContent, Hn as EmptyDescription, Rn as EmptyHeader, Bn as EmptyMedia, Xi as EmptyState, Vn as EmptyTitle, Zi as ErrorState, Yn as Field, Xn as FieldContent, $n as FieldDescription, tr as FieldError, qn as FieldGroup, Zn as FieldLabel, Kn as FieldLegend, er as FieldSeparator, Gn as FieldSet, Qn as FieldTitle, nr as HoverCard, ir as HoverCardContent, rr as HoverCardTrigger, F as Input, sn as InputGroup, I as InputGroupAddon, un as InputGroupButton, fn as InputGroupInput, dn as InputGroupText, pn as InputGroupTextarea, Wn as Label, Qi as PageHeader, ar as Pagination, or as PaginationContent, dr as PaginationEllipsis, sr as PaginationItem, cr as PaginationLink, ur as PaginationNext, lr as PaginationPrevious, z as Popover, fr as PopoverAnchor, V as PopoverContent, hr as PopoverDescription, pr as PopoverHeader, mr as PopoverTitle, B as PopoverTrigger, _r as Progress, vr as ScrollArea, yr as ScrollBar, br as Select, wr as SelectContent, xr as SelectGroup, Er as SelectItem, Tr as SelectLabel, kr as SelectScrollDownButton, Or as SelectScrollUpButton, Dr as SelectSeparator, Cr as SelectTrigger, Sr as SelectValue, R as Separator, Ar as Sheet, Mr as SheetClose, Fr as SheetContent, zr as SheetDescription, Lr as SheetFooter, Ir as SheetHeader, Rr as SheetTitle, jr as SheetTrigger, ti as Sidebar, li as SidebarContent, si as SidebarFooter, ui as SidebarGroup, fi as SidebarGroupAction, pi as SidebarGroupContent, di as SidebarGroupLabel, oi as SidebarHeader, ai as SidebarInput, ii as SidebarInset, mi as SidebarMenu, gi as SidebarMenuAction, _i as SidebarMenuBadge, G as SidebarMenuButton, W as SidebarMenuItem, vi as SidebarMenuSkeleton, yi as SidebarMenuSub, xi as SidebarMenuSubButton, bi as SidebarMenuSubItem, ei as SidebarProvider, ri as SidebarRail, ci as SidebarSeparator, ni as SidebarTrigger, H as Skeleton, Ci as Spinner, wi as Table, K as TableBody, Di as TableCaption, Y as TableCell, Ei as TableFooter, J as TableHead, Ti as TableHeader, q as TableRow, Oi as Tabs, Mi as TabsContent, Ai as TabsList, ji as TabsTrigger, on as Textarea, Si as Toaster, Pi as Toggle, Ii as ToggleGroup, Li as ToggleGroupItem, Wr as Tooltip, Kr as TooltipContent, Ur as TooltipProvider, Gr as TooltipTrigger, ta as UserMenu, vt as badgeVariants, k as buttonVariants, n as cn, ca as dataTableFeatures, Ki as defaultDatePresets, X as formatDate, ki as tabsListVariants, Ni as toggleVariants, Hr as useIsMobile, U as useSidebar };
