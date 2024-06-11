import { DataEntry } from "@/types/data.type";
import { Column, Schema } from "@/types/schema.type";
import { Row } from "@tanstack/react-table";

export const numberCellSortFn = (a: Row<unknown>, b: Row<unknown>, schema: Schema, column: Column) => {
  const aData = a.original as DataEntry;
  const bData = b.original as DataEntry;
  const aIdx = aData.columns.findIndex(
    (_, idx) => schema.columns[idx].name === column.name
  );
  const bIdx = bData.columns.findIndex(
    (_, idx) => schema.columns[idx].name === column.name
  );

  return (
    (aData.columns[aIdx].data as number) -
    (bData.columns[bIdx].data as number)
  );
};
