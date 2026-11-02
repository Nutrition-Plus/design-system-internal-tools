import * as React from "react";
import type { ReactTable, RowData } from "@tanstack/react-table";
import type { DataTableFeatures } from "./features";
type DataTablePaginationProps<TData extends RowData> = {
    table: ReactTable<DataTableFeatures, TData, any>;
    pageSizes?: number[];
};
declare function DataTablePagination<TData extends RowData>({ table, pageSizes, }: DataTablePaginationProps<TData>): React.JSX.Element;
export { DataTablePagination };
