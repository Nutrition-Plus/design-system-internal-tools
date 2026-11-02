import type { Column, RowData } from "@tanstack/react-table";
import type { DataTableFeatures } from "./features";
export type FacetOption = {
    label: string;
    value: string;
    count?: number;
};
type DataTableFacetedFilterProps<TData extends RowData, TValue> = {
    column?: Column<DataTableFeatures, TData, TValue>;
    title: string;
    options: FacetOption[];
};
/** Multi-select filter for enum columns (status, channel). Use filterFn "arrIncludesSome". */
declare function DataTableFacetedFilter<TData extends RowData, TValue>({ column, title, options, }: DataTableFacetedFilterProps<TData, TValue>): import("react").JSX.Element;
export { DataTableFacetedFilter };
