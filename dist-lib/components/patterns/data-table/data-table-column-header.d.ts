import type { Column, RowData } from "@tanstack/react-table";
import type { DataTableFeatures } from "./features";
type DataTableColumnHeaderProps<TData extends RowData, TValue> = {
    column: Column<DataTableFeatures, TData, TValue>;
    title: string;
    className?: string;
};
/**
 * Sortable header. Each tap moves to the next order TanStack defines for the column:
 * text starts ascending (ก→ฮ, A→Z); numbers and dates start descending (largest/newest first).
 * The <th> carries aria-sort (set by DataTable); the button says what the next tap does.
 */
declare function DataTableColumnHeader<TData extends RowData, TValue>({ column, title, className, }: DataTableColumnHeaderProps<TData, TValue>): import("react").JSX.Element;
export { DataTableColumnHeader };
