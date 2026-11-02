export type DataTableColumnMeta = {
    /** Right-align numbers and amounts. */
    align?: "left" | "right";
    /** Accessible label used by the column picker and filter chips. */
    label?: string;
    /** Keep this column visible when scrolling horizontally. */
    sticky?: boolean;
};
export declare const dataTableFeatures: {
    rowSortingFeature: import("@tanstack/table-core").TableFeature;
    columnFilteringFeature: import("@tanstack/table-core").TableFeature;
    globalFilteringFeature: import("@tanstack/table-core").TableFeature;
    rowPaginationFeature: import("@tanstack/table-core").TableFeature;
    rowSelectionFeature: import("@tanstack/table-core").TableFeature;
    columnVisibilityFeature: import("@tanstack/table-core").TableFeature;
    sortedRowModel: (table: import("@tanstack/table-core").Table<any, any>) => () => import("@tanstack/table-core").RowModel<any, any>;
    filteredRowModel: (table: import("@tanstack/table-core").Table<any, any>) => () => import("@tanstack/table-core").RowModel<any, any>;
    paginatedRowModel: (table: import("@tanstack/table-core").Table<any, any>) => () => import("@tanstack/table-core").RowModel<any, any>;
    filterFns: {
        includesString: import("@tanstack/table-core").CreatedFilterFn<any, any>;
        arrIncludesSome: import("@tanstack/table-core").CreatedFilterFn<any, any>;
    };
    sortFns: {
        alphanumeric: import("@tanstack/table-core").CreatedSortFn<any, any>;
        text: import("@tanstack/table-core").CreatedSortFn<any, any>;
        datetime: import("@tanstack/table-core").CreatedSortFn<any, any>;
        basic: import("@tanstack/table-core").CreatedSortFn<any, any>;
    };
    columnMeta: DataTableColumnMeta;
};
export type DataTableFeatures = typeof dataTableFeatures;
