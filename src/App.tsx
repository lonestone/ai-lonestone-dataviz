import { Button } from "@/components/ui/button";
import z from "zod";
import fakeSchema from "./fakeSchema.json";

// const Data = {
//   name: string;
//   type: 'schema' | 'metric' | ...;
//   ...
// } as const;

const columnSchemaBase = z.object({
  // order: z.number(), maybe...
  name: z.string(),
});

const columnRawSchema = columnSchemaBase.extend({
  type: z.literal("raw"),
});

const columnJsonSchema = columnSchemaBase.extend({
  type: z.literal("json"),
});

const columnNumberSchema = columnSchemaBase.extend({
  type: z.literal("number"),
  data: z.number(),
  // precision: z.number(),
  unit: z.string().optional(),
});

// type SchemaType = z.infer<typeof columnSchemaSchema> & {
//   data: SchemaType[];
// };

const columnSchemaSchema = columnSchemaBase.extend({
  type: z.literal("schema"),
  // data: z.array(z.lazy(() => columnSchema)),
});

const columnSchema = z.discriminatedUnion("type", [
  columnRawSchema,
  columnJsonSchema,
  columnNumberSchema,
  columnSchemaSchema,
]);

const evaluationResultSchema = z.object({
  columns: z.array(columnSchema),
});

type ColumnType = z.infer<typeof columnSchema>["type"];

function App() {
  console.log("FakeSchema:", fakeSchema);
  const data = evaluationResultSchema.safeParse(fakeSchema);
  if (!data.success) console.debug("dynamicShema:", data.error);

  return (
    <Button className="px-[100px]" variant="outline">
      Hello
    </Button>
  );
}

export default App;
