import ArrayCellContent from "dataviz-datatable/components/organisms/ArrayCellContent.tsx";
import JsonCellContent from "dataviz-datatable/components/organisms/JsonCellContent.tsx";
import MarkdownCellContent from "dataviz-datatable/components/organisms/MarkdownCellContent.tsx";
import SchemaCellContent from "dataviz-datatable/components/organisms/SchemaCellContent.tsx";
import { DataType } from "@/types/data.type";
import { Column, ColumnJson } from "@/types/schema.type";

export const getCellContentFromType = (
  column: Column,
  data: DataType,
  isExpanded: boolean = true
) => {
  let tag = <></>;

  switch (column.type) {
    case "raw":
    case "number":
      tag = <div>{data.data as string}</div>;
      break;
    case "json":
      tag = (
        <JsonCellContent
          levelOpen={(column as ColumnJson).levelOpen}
          data={data.data as string}
        />
      );
      break;
    case "array":
      tag = (
        <ArrayCellContent
          data={data.data as DataType[]}
          schema={column}
          collapsible={column.collapsible}
          collapseNumber={column.collapseNumber}
        />
      );
      break;
    case "schema":
      tag = (
        <SchemaCellContent
          data={data.data as DataType[]}
          schema={column.schema}
          isExpanded={isExpanded}
        />
      );
      break;
    case "markdown":
      tag = <MarkdownCellContent data={data.data as string} />;
      break;
  }

  return (
    <div
      className={
        isExpanded || column.alwaysVisible || column.type === "schema"
          ? "visible"
          : "hidden"
      }
    >
      {tag}
    </div>
  );
};
