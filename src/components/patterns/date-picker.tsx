"use client"

import * as React from "react"
import { CalendarIcon, XIcon } from "lucide-react"
import { th } from "react-day-picker/locale"
import { cn } from "cn"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useIsMobile } from "@/hooks/use-mobile"

/** Thai month names, Gregorian (CE) year: "30 ต.ค. 2026". th-TH alone would print the Buddhist year. */
export const formatDate = (date: Date) =>
  date.toLocaleDateString("th-TH-u-ca-gregory", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

/** Calendar props shared by every picker: month + year dropdowns, Thai labels, CE years. */
function calendarProps(yearRange: [number, number]) {
  return {
    locale: th,
    captionLayout: "dropdown" as const,
    startMonth: new Date(yearRange[0], 0),
    endMonth: new Date(yearRange[1], 11),
    showOutsideDays: false,
    formatters: {
      // th-TH alone prints the Buddhist year; the project shows CE.
      formatYearDropdown: (date: Date) => String(date.getFullYear()),
    },
    labels: {
      labelMonthDropdown: () => "เดือน",
      labelYearDropdown: () => "ปี",
      labelNext: () => "เดือนถัดไป",
      labelPrevious: () => "เดือนก่อนหน้า",
    },
  }
}

const DEFAULT_YEARS: [number, number] = [2020, 2035]

const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate())
const addDays = (d: Date, n: number) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)

type PresetBadgesProps = {
  items: { label: string; disabled?: boolean; onPick: () => void }[]
}

/**
 * Quick picks as tappable badges, placed under the calendar. `w-0 min-w-full` makes the row follow
 * the calendar's width instead of stretching the popover; the badges wrap onto more lines.
 */
function PresetBadges({ items }: PresetBadgesProps) {
  return (
    <div
      role="group"
      aria-label="ช่วงที่ใช้บ่อย"
      className="flex w-0 min-w-full flex-wrap gap-1.5 border-t border-border p-3"
    >
      {items.map((item) => (
        <Badge key={item.label} asChild variant="secondary">
          <button
            type="button"
            disabled={item.disabled}
            onClick={item.onPick}
            className="h-control-sm cursor-pointer px-3 text-[13px] outline-none hover:bg-secondary-hover focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            {item.label}
          </button>
        </Badge>
      ))}
    </div>
  )
}

export type DatePreset = { label: string; date: Date }

/** Presets people reach for most, relative to `today`. Pass them to `presets` to show the row. */
export function defaultDatePresets(today: Date = new Date()): DatePreset[] {
  const base = startOfDay(today)
  return [
    { label: "วันนี้", date: base },
    { label: "เมื่อวาน", date: addDays(base, -1) },
    { label: "7 วันที่แล้ว", date: addDays(base, -7) },
    { label: "30 วันที่แล้ว", date: addDays(base, -30) },
  ]
}

type DatePickerProps = {
  id?: string
  value?: Date
  onChange: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  /** Earliest selectable day. */
  min?: Date
  /** Latest selectable day. */
  max?: Date
  /** Month shown when nothing is selected. */
  defaultMonth?: Date
  /** First and last year offered in the year dropdown. */
  yearRange?: [number, number]
  /** Quick picks above the calendar, e.g. `defaultDatePresets()`. A preset outside min/max is disabled. */
  presets?: DatePreset[]
  className?: string
  "aria-label"?: string
}

/**
 * Single date field. The trigger uses the same box as Input (white, 1px border, same height and padding);
 * the calendar opens in a popover and closes when a day is picked.
 */
function DatePicker({
  id,
  value,
  onChange,
  placeholder = "เลือกวันที่",
  disabled,
  invalid,
  min,
  max,
  defaultMonth,
  yearRange = DEFAULT_YEARS,
  presets,
  className,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const matchers = [min && { before: min }, max && { after: max }].filter(
    Boolean
  ) as ({ before: Date } | { after: Date })[]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-label={props["aria-label"]}
          data-empty={!value || undefined}
          className={cn(
            "flex h-control w-full min-w-40 items-center justify-between gap-1.5 rounded-lg border border-input bg-background pr-2 pl-2 text-left text-base text-foreground transition-colors outline-none md:text-sm",
            "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 enabled:hover:border-muted-foreground",
            "disabled:cursor-not-allowed disabled:border-transparent disabled:bg-secondary disabled:text-muted-foreground",
            "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/30",
            "data-[empty]:text-foreground-secondary",
            className
          )}
        >
          <span className="truncate tabular-nums">
            {value ? formatDate(value) : placeholder}
          </span>
          <CalendarIcon
            className="size-4 shrink-0 text-foreground-secondary"
            aria-hidden
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto p-0"
        aria-label={props["aria-label"] ?? placeholder}
      >
        <Calendar
          mode="single"
          {...calendarProps(yearRange)}
          selected={value}
          defaultMonth={value ?? defaultMonth}
          disabled={matchers}
          onSelect={(date) => {
            onChange(date)
            setOpen(false)
          }}
        />
        {presets && presets.length > 0 && (
          <PresetBadges
            items={presets.map((preset) => ({
              label: preset.label,
              disabled: Boolean(
                (min && preset.date < startOfDay(min)) ||
                (max && preset.date > startOfDay(max))
              ),
              onPick: () => {
                onChange(preset.date)
                setOpen(false)
              },
            }))}
          />
        )}
        {value && (
          <div className="flex justify-end border-t border-border p-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onChange(undefined)
                setOpen(false)
              }}
            >
              <XIcon data-icon="inline-start" />
              ล้างวันที่
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export type DateRange = { from?: Date; to?: Date }

type DateRangePickerProps = {
  id?: string
  value: DateRange
  onChange: (range: DateRange) => void
  placeholder?: string
  min?: Date
  max?: Date
  defaultMonth?: Date
  yearRange?: [number, number]
  /** "Today" for the preset buttons. Pass a fixed date in tests and stories. */
  today?: Date
  className?: string
  "aria-label"?: string
}

/**
 * One field that opens a **range calendar** (two months): click a start day, then an end day.
 * Preset buttons cover the periods people pick most, so they are not hunted for in the calendar.
 */
function DateRangePicker({
  id,
  value,
  onChange,
  placeholder = "เลือกช่วงวันที่",
  min,
  max,
  defaultMonth,
  yearRange = DEFAULT_YEARS,
  today = new Date(),
  className,
  ...props
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)
  // Two months sit side by side when there is room; on narrow screens show one month, never stacked.
  const isNarrow = useIsMobile()
  const matchers = [min && { before: min }, max && { after: max }].filter(
    Boolean
  ) as ({ before: Date } | { after: Date })[]
  const label = value.from
    ? `${formatDate(value.from)} – ${value.to ? formatDate(value.to) : "…"}`
    : placeholder
  const base = startOfDay(today)
  const presets = [
    { label: "วันนี้", range: { from: base, to: base } },
    { label: "7 วันล่าสุด", range: { from: addDays(base, -6), to: base } },
    { label: "30 วันล่าสุด", range: { from: addDays(base, -29), to: base } },
    {
      label: "เดือนนี้",
      range: {
        from: new Date(base.getFullYear(), base.getMonth(), 1),
        to: base,
      },
    },
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          aria-label={props["aria-label"]}
          data-empty={!value.from || undefined}
          className={cn(
            "flex h-control w-full min-w-64 items-center justify-between gap-1.5 rounded-lg border border-input bg-background pr-2 pl-2 text-left text-base text-foreground transition-colors outline-none md:text-sm",
            "hover:border-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40",
            "data-[empty]:text-foreground-secondary",
            className
          )}
        >
          <span className="truncate tabular-nums">{label}</span>
          <CalendarIcon
            className="size-4 shrink-0 text-foreground-secondary"
            aria-hidden
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto p-0"
        aria-label={props["aria-label"] ?? placeholder}
      >
        <Calendar
          mode="range"
          numberOfMonths={isNarrow ? 1 : 2}
          {...calendarProps(yearRange)}
          selected={value.from ? { from: value.from, to: value.to } : undefined}
          defaultMonth={value.from ?? defaultMonth}
          disabled={matchers}
          onSelect={(range) => {
            onChange({ from: range?.from, to: range?.to })
            // Close once both ends are chosen (the first click only sets the start).
            if (range?.from && range?.to) setOpen(false)
          }}
        />
        <PresetBadges
          items={presets.map((preset) => ({
            label: preset.label,
            onPick: () => {
              onChange(preset.range)
              setOpen(false)
            },
          }))}
        />
        {(value.from || value.to) && (
          <div className="flex justify-end border-t border-border p-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onChange({})
                setOpen(false)
              }}
            >
              <XIcon data-icon="inline-start" />
              ล้างช่วงวันที่
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

type DateRangeFilterProps = {
  value: DateRange
  onChange: (range: DateRange) => void
  fromLabel?: string
  toLabel?: string
  defaultMonth?: Date
  yearRange?: [number, number]
  /** "Today" for the preset badges. Pass a fixed date in tests and stories. */
  today?: Date
  /** Quick picks in both calendars. Defaults to `defaultDatePresets(today)`; pass `[]` to hide them. */
  presets?: DatePreset[]
  className?: string
}

/**
 * The standard list filter for a period: two date pickers side by side, start on the left and end
 * on the right (never stacked). The end cannot be before the start and the start cannot be after the
 * end, so the range can never be inverted. Either side may stay empty (open-ended range).
 */
function DateRangeFilter({
  value,
  onChange,
  fromLabel = "จากวันที่",
  toLabel = "ถึงวันที่",
  defaultMonth,
  yearRange,
  today,
  presets,
  className,
}: DateRangeFilterProps) {
  const uid = React.useId()
  const hasValue = Boolean(value.from || value.to)
  const quickPicks = presets ?? defaultDatePresets(today)

  return (
    <div
      data-slot="date-range-filter"
      className={cn("flex w-full max-w-2xl items-end gap-3", className)}
    >
      <Field className="min-w-0 flex-1">
        <FieldLabel htmlFor={`${uid}-from`}>{fromLabel}</FieldLabel>
        <DatePicker
          id={`${uid}-from`}
          value={value.from}
          max={value.to}
          defaultMonth={defaultMonth}
          yearRange={yearRange}
          presets={quickPicks}
          className="min-w-0"
          onChange={(from) => onChange({ ...value, from })}
        />
      </Field>
      {/* same height as the fields so the dash sits on their vertical center */}
      <span
        aria-hidden
        className="flex h-control shrink-0 items-center text-muted-foreground"
      >
        –
      </span>
      <Field className="min-w-0 flex-1">
        <FieldLabel htmlFor={`${uid}-to`}>{toLabel}</FieldLabel>
        <DatePicker
          id={`${uid}-to`}
          value={value.to}
          min={value.from}
          defaultMonth={defaultMonth}
          yearRange={yearRange}
          presets={quickPicks}
          className="min-w-0"
          onChange={(to) => onChange({ ...value, to })}
        />
      </Field>
      {/* Always in the layout (invisible when empty) so the fields do not jump when a date is picked.
          Text hides below 640px; the accessible name stays. */}
      <Button
        variant="ghost"
        aria-label="ล้างตัวกรอง"
        className={cn("shrink-0", !hasValue && "invisible")}
        onClick={() => onChange({})}
      >
        <XIcon data-icon="inline-start" />
        <span className="hidden sm:inline">ล้างตัวกรอง</span>
      </Button>
    </div>
  )
}

export { DatePicker, DateRangeFilter, DateRangePicker }
