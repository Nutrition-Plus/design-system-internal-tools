import * as React from "react";
import type { ReactTable, RowData } from "@tanstack/react-table";
import type { DataTableFeatures } from "./features";
type DataTableToolbarProps<TData extends RowData> = {
    table: ReactTable<DataTableFeatures, TData, any>;
    searchPlaceholder?: string;
    /** Debounce for the search box (ms). Server-side search should keep ≥ 300. */
    debounce?: number;
    /** <DataTableFacetedFilter /> elements. */
    filters?: React.ReactNode;
    /** Actions on the right, e.g. Export. */
    actions?: React.ReactNode;
};
declare function DataTableToolbar<TData extends RowData>({ table, searchPlaceholder, debounce, filters, actions, }: DataTableToolbarProps<TData>): React.JSX.Element;
export { DataTableToolbar };
