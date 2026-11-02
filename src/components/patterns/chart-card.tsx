"use client"

import * as React from "react"
import { ChartNoAxesColumnIcon, TableIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type ChartTableColumn = { key: string; label: string }

type ChartCardProps = {
  title: string
  /** One line saying what is plotted and for which period. */
  description?: string
  /** Data twin of the chart: every value is readable here, so nothing depends on color or hover. */
  table: {
    rowKey: string
    rowLabel: string
    columns: ChartTableColumn[]
    rows: Record<string, string | number>[]
  }
  children: React.ReactNode
}

/**
 * Card around a chart with a toggle to the same data as a table. Tooltips and colors only enhance:
 * the table is the accessible equivalent and the relief for series colors under 3:1 on white.
 */
function ChartCard({ title, description, table, children }: ChartCardProps) {
  const [asTable, setAsTable] = React.useState(false)
  const id = React.useId()

  return (
    <Card data-slot="chart-card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        <div className="col-start-2 row-span-2 row-start-1 self-start justify-self-end">
          <Button
            variant="ghost"
            size="sm"
            aria-pressed={asTable}
            aria-controls={id}
            onClick={() => setAsTable((v) => !v)}
          >
            {asTable ? (
              <ChartNoAxesColumnIcon data-icon="inline-start" />
            ) : (
              <TableIcon data-icon="inline-start" />
            )}
            {asTable ? "ดูกราฟ" : "ดูเป็นตาราง"}
          </Button>
        </div>
      </CardHeader>
      <CardContent id={id}>
        {asTable ? (
          <Table>
            <caption className="sr-only">{title}</caption>
            <TableHeader>
              <TableRow>
                <TableHead>{table.rowLabel}</TableHead>
                {table.columns.map((c) => (
                  <TableHead key={c.key} className="text-right">
                    {c.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.rows.map((row) => (
                <TableRow key={String(row[table.rowKey])}>
                  <TableCell>{row[table.rowKey]}</TableCell>
                  {table.columns.map((c) => (
                    <TableCell key={c.key} className="text-right">
                      {typeof row[c.key] === "number"
                        ? (row[c.key] as number).toLocaleString("th-TH")
                        : row[c.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  )
}

export { ChartCard }
