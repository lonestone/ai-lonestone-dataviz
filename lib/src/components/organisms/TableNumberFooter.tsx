import { Data } from "@/types/data.type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCallback, useState } from "react";
import { Schema } from "@/types/schema.type";

interface TableNumberFooterProps {
  columnName: string;
  schema: Schema;
  data: Data;
}

enum Modes {
  Average = "average",
  Total = "total",
  Min = "min",
  Max = "max",
  Median = "median",
}

const TableNumberFooter = ({
  columnName,
  data,
  schema,
}: TableNumberFooterProps) => {
  const [mode, setMode] = useState<Modes>(Modes.Average);

  const getFooterValue = useCallback(() => {
    const datas = data.map((entry) => {
      const columnIdx = entry.columns.findIndex(
        (_, idx) => schema.columns[idx].name === columnName
      );
      return entry.columns[columnIdx].data as number;
    });

    switch (mode) {
      case Modes.Average:
        return datas.reduce((acc, curr) => acc + curr, 0) / datas.length;
      case Modes.Total:
        return datas.reduce((acc, curr) => acc + curr, 0);
      case Modes.Min:
        return Math.min(...datas);
      case Modes.Max:
        return Math.max(...datas);
      case Modes.Median: {
        const sorted = datas.sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);

        return sorted.length % 2 !== 0
          ? sorted[middle]
          : (sorted[middle - 1] + sorted[middle]) / 2;
      }
    }
  }, [data, schema, columnName, mode]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          {mode === Modes.Average && "Avg"}
          {mode === Modes.Total && "Tot"}
          {mode === Modes.Min && "Min"}
          {mode === Modes.Median && "Med"}
          {mode === Modes.Max && "Max"} {getFooterValue()}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => setMode(Modes.Average)}>
          Average
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setMode(Modes.Max)}>
          Max
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setMode(Modes.Median)}>
          Median
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setMode(Modes.Min)}>
          Min
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setMode(Modes.Total)}>
          Total
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableNumberFooter;
