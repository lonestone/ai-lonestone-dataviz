import { DataType } from "@/types/data.type";
import { getCellContentFromType } from "@/utils/getCellContentFromType";
import { ColumnArray } from "@/types/schema.type";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ArrayCellContentProps {
  data: DataType[];
  schema: ColumnArray;
  collapsible?: boolean;
  collapseNumber?: number;
}

const ArrayCellContent = ({
  data,
  schema,
  collapsible = false,
  collapseNumber = 0,
}: ArrayCellContentProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <Collapsible
      onOpenChange={(isOpen) => {
        setIsCollapsed(!isOpen);
      }}
      defaultOpen={!collapsible}
    >
      {collapsible &&
        collapseNumber > 0 &&
        [...data].splice(0, collapseNumber).map((column, idx) => {
          return (
            <div
              key={schema.name + idx}
              className="p-2 mt-4 border-2 rounded-md backdrop-brightness-150"
            >
              {getCellContentFromType(schema.schema, column)}
            </div>
          );
        })}
      <CollapsibleContent>
        <div className="mt-4">
          {collapsible &&
            collapseNumber > 0 &&
            [...data].splice(collapseNumber, data.length).map((column, idx) => {
              return (
                <div
                  key={schema.name + idx}
                  className="p-2 mt-4 border-2 rounded-md backdrop-brightness-150"
                >
                  {getCellContentFromType(schema.schema, column)}
                </div>
              );
            })}
        </div>
      </CollapsibleContent>
      {collapsible && (
        <div className="flex w-full justify-center mt-2">
          <CollapsibleTrigger asChild className="text-center">
            <Button className="rounded-full px-6" size="sm">
              {isCollapsed ? "Show More" : "Show Less"}
            </Button>
          </CollapsibleTrigger>
        </div>
      )}
    </Collapsible>
  );
};

export default ArrayCellContent;
