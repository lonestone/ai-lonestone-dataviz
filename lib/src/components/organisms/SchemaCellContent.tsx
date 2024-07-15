import { DataType } from "@/types/data.type";
import { Column } from "@/types/schema.type";
import { getCellContentFromType } from "@/utils/getCellContentFromType";

interface SchemaCellContentProps {
  data: DataType[];
  schema: Column[];
  isExpanded: boolean;
}

const SchemaCellContent = ({
  data,
  schema,
  isExpanded,
}: SchemaCellContentProps) => {
  return (
    <div className="mt-4">
      {schema.map((column, cIdx) => {
        const displayClass =
          isExpanded || column.alwaysVisible ? "visible" : "hidden";

        return (
          <div
            key={column.name}
            className={
              cIdx !== schema.length - 1 ? `mb-6 ${displayClass}` : displayClass
            }
          >
            <h3>
              <b>{column.name}</b>
            </h3>
            {getCellContentFromType(column, data[cIdx])}
          </div>
        );
      })}
    </div>
  );
};

export default SchemaCellContent;
