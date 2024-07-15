import { DataType } from "@/types/data.type";
import { Column } from "@/types/schema.type";
import { getCellContentFromType } from "@/utils/getCellContentFromType";

interface DataCellProps {
  column: Column;
  data: DataType | DataType[];
  isCollapsed: boolean;
}

const DataCell = ({ column, data, isCollapsed }: DataCellProps) => {
  return (
    <div
      className={
        isCollapsed || column.alwaysVisible || column.type === "schema"
          ? "visible"
          : "hidden"
      }
    >
      {getCellContentFromType(column, data as DataType, isCollapsed)}
    </div>
  );
};

export default DataCell;
