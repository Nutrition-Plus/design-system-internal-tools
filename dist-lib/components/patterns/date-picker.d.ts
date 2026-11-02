import * as React from "react";
/** Thai month names, Gregorian (CE) year: "30 ต.ค. 2026". th-TH alone would print the Buddhist year. */
export declare const formatDate: (date: Date) => string;
export type DatePreset = {
    label: string;
    date: Date;
};
/** Presets people reach for most, relative to `today`. Pass them to `presets` to show the row. */
export declare function defaultDatePresets(today?: Date): DatePreset[];
type DatePickerProps = {
    id?: string;
    value?: Date;
    onChange: (date: Date | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    invalid?: boolean;
    /** Earliest selectable day. */
    min?: Date;
    /** Latest selectable day. */
    max?: Date;
    /** Month shown when nothing is selected. */
    defaultMonth?: Date;
    /** First and last year offered in the year dropdown. */
    yearRange?: [number, number];
    /** Quick picks above the calendar, e.g. `defaultDatePresets()`. A preset outside min/max is disabled. */
    presets?: DatePreset[];
    className?: string;
    "aria-label"?: string;
};
/**
 * Single date field. The trigger uses the same box as Input (white, 1px border, same height and padding);
 * the calendar opens in a popover and closes when a day is picked.
 */
declare function DatePicker({ id, value, onChange, placeholder, disabled, invalid, min, max, defaultMonth, yearRange, presets, className, ...props }: DatePickerProps): React.JSX.Element;
export type DateRange = {
    from?: Date;
    to?: Date;
};
type DateRangePickerProps = {
    id?: string;
    value: DateRange;
    onChange: (range: DateRange) => void;
    placeholder?: string;
    min?: Date;
    max?: Date;
    defaultMonth?: Date;
    yearRange?: [number, number];
    /** "Today" for the preset buttons. Pass a fixed date in tests and stories. */
    today?: Date;
    className?: string;
    "aria-label"?: string;
};
/**
 * One field that opens a **range calendar** (two months): click a start day, then an end day.
 * Preset buttons cover the periods people pick most, so they are not hunted for in the calendar.
 */
declare function DateRangePicker({ id, value, onChange, placeholder, min, max, defaultMonth, yearRange, today, className, ...props }: DateRangePickerProps): React.JSX.Element;
type DateRangeFilterProps = {
    value: DateRange;
    onChange: (range: DateRange) => void;
    fromLabel?: string;
    toLabel?: string;
    defaultMonth?: Date;
    yearRange?: [number, number];
    /** "Today" for the preset badges. Pass a fixed date in tests and stories. */
    today?: Date;
    /** Quick picks in both calendars. Defaults to `defaultDatePresets(today)`; pass `[]` to hide them. */
    presets?: DatePreset[];
    className?: string;
};
/**
 * The standard list filter for a period: two date pickers side by side, start on the left and end
 * on the right (never stacked). The end cannot be before the start and the start cannot be after the
 * end, so the range can never be inverted. Either side may stay empty (open-ended range).
 */
declare function DateRangeFilter({ value, onChange, fromLabel, toLabel, defaultMonth, yearRange, today, presets, className, }: DateRangeFilterProps): React.JSX.Element;
export { DatePicker, DateRangeFilter, DateRangePicker };
