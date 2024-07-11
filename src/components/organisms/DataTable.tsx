import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Schema } from "@/types/schema.type";
import { Data, DataEntry } from "@/types/data.type";
import {
  createColumnHelper,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import TableNumberFooter from "@/components/organisms/TableNumberFooter";
import FirstColumnCell from "@/components/organisms/FirstColumnCell";
import DataCell from "@/components/organisms/DataCell";
import { numberCellSortFn } from "@/utils/numberCellSortFn";
import { SortingIcon } from "@/components/atoms/SortingIcon";

interface DataTableProps {
  schema: Schema;
  data: Data;
}

const columnHelper = createColumnHelper();

const createColumns = (schema: Schema, data: Data) => {
  return schema.columns.map((column, cIdx) => {
    return columnHelper.accessor(column.name, {
      header: column.name,
      enableSorting: column.type === "number",
      size: column.minWidth ?? 200,
      sortingFn:
        column.type === "number"
          ? (a, b) => numberCellSortFn(a, b, schema, column)
          : undefined,
      cell: ({ row }) => {
        const rowData = row.original as DataEntry;
        return cIdx === 0 ? (
          <FirstColumnCell
            column={schema.columns[cIdx]}
            data={rowData.columns[cIdx]}
            name={rowData.name}
            isCollapsed={row.getIsExpanded()}
            collapseHandler={row.toggleExpanded}
          />
        ) : (
          <DataCell
            column={schema.columns[cIdx]}
            data={rowData.columns[cIdx]}
            isCollapsed={row.getIsExpanded()}
          />
        );
      },
      footer:
        column.type === "number"
          ? () => (
              <TableNumberFooter
                columnName={column.name}
                schema={schema}
                data={data}
              />
            )
          : undefined,
    });
  });
};

const DataTable = ({ schema, data }: DataTableProps) => {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const columns = useMemo(() => createColumns(schema, data), [schema, data]);
  const table = useReactTable({
    // @ts-expect-error - Data will be validated by the schema
    columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSorting: true,
    enableExpanding: true,
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      expanded,
      sorting,
    },
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    enableColumnResizing: true,
    enableMultiSort: true,
    columnResizeMode: "onChange",
  });

  return (
    <div className="rounded-md border block">
      <Table
        style={{
          width: table.getCenterTotalSize(),
        }}
        className="w-full overflow-y-auto overflow-x-auto relative"
      >
        <TableHeader className="w-full overflow-y-auto overflow-x-auto relative">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  style={{ position: "relative", width: header.getSize() }}
                  className={
                    header.column.getCanSort()
                      ? "cursor-pointer select-none"
                      : ""
                  }
                >
                  <div
                    className="flex items-center"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    <SortingIcon
                      sorting={header.column.getIsSorted() as string}
                    />
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`bg-primary resizer ${
                        header.column.getIsResizing() ? "isResizing" : ""
                      }`}
                    ></div>
                  </div>
                </TableHead>
              ))}
            </tr>
          ))}
        </TableHeader>
        <TableBody className="overflow-y-auto">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    style={{ width: cell.column.getSize() }}
                    key={cell.id}
                    className="align-baseline"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center">No results.</TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter className="w-full overflow-y-auto relative">
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((footer) => (
                <TableHead key={footer.id}>
                  {flexRender(
                    footer.column.columnDef.footer,
                    footer.getContext()
                  )}
                </TableHead>
              ))}
            </tr>
          ))}
        </TableFooter>
      </Table>
    </div>
  );
};

export default DataTable;
