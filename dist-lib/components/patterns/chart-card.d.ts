import * as React from "react";
export type ChartTableColumn = {
    key: string;
    label: string;
};
type ChartCardProps = {
    title: string;
    /** One line saying what is plotted and for which period. */
    description?: string;
    /** Data twin of the chart: every value is readable here, so nothing depends on color or hover. */
    table: {
        rowKey: string;
        rowLabel: string;
        columns: ChartTableColumn[];
        rows: Record<string, string | number>[];
    };
    children: React.ReactNode;
};
/**
 * Card around a chart with a toggle to the same data as a table. Tooltips and colors only enhance:
 * the table is the accessible equivalent and the relief for series colors under 3:1 on white.
 */
declare function ChartCard({ title, description, table, children }: ChartCardProps): React.JSX.Element;
export { ChartCard };
