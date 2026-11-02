import * as React from "react";
import type { ReactTable, Row, RowData } from "@tanstack/react-table";
import type { DataTableFeatures } from "./features";
export type DataTableStatus = "ready" | "loading" | "error";
type DataTableProps<TData extends RowData> = {
    table: ReactTable<DataTableFeatures, TData, any>;
    /** Accessible name of the table, read by screen readers. */
    caption: string;
    status?: DataTableStatus;
    /** Shown when there are no rows (use <DataTableEmpty />). */
    empty?: React.ReactNode;
    /** Shown when status is "error" (use <ErrorState />). */
    error?: React.ReactNode;
    /** Skeleton rows while loading; match the page size to avoid layout shift. */
    loadingRows?: number;
    /** Row tap → detail. Clicks on buttons, links and checkboxes inside the row are ignored. */
    onRowClick?: (row: Row<DataTableFeatures, TData>) => void;
    className?: string;
};
declare function DataTable<TData extends RowData>({ table, caption, status, empty, error, loadingRows, onRowClick, className, }: DataTableProps<TData>): React.JSX.Element;
export { DataTable };
