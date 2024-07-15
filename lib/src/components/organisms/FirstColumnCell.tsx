import { DataType } from "@/types/data.type";
import { Column } from "@/types/schema.type";
import CollapseButton from "../../components/atoms/CollapseButton";
import { getCellContentFromType } from "@/utils/getCellContentFromType";

interface FirstColumnCellProps {
  column: Column;
  data: DataType | DataType[];
  name: string;
  isCollapsed: boolean;
  collapseHandler: (isCollapsed: boolean) => void;
}

const FirstColumnCell = ({
  column,
  data,
  name,
  collapseHandler,
  isCollapsed,
}: FirstColumnCellProps) => {
  return (
    <>
      <CollapseButton
        label={name}
        isOpen={isCollapsed}
        className="mr-2"
        onClick={() => collapseHandler(!isCollapsed)}
      />
      <div
        className={
          isCollapsed || column.alwaysVisible || column.type === "schema"
            ? "visible"
            : "hidden"
        }
      >
        {getCellContentFromType(column, data as DataType, isCollapsed)}
      </div>
    </>
  );
};

export default FirstColumnCell;
