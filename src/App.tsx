import { Button } from "@/components/ui/button";
import z, { ZodDiscriminatedUnion, ZodTypeAny } from "zod";
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
  // precision: z.number(),
  unit: z.string().optional(),
});

const columnSchemaSchema = columnSchemaBase.extend({
  type: z.literal("schema"),
  columns: z.array(z.lazy(getColumnSchema)),
});

const columnSchema = z.discriminatedUnion("type", [
  columnRawSchema,
  columnJsonSchema,
  columnNumberSchema,
  columnSchemaSchema,
]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getColumnSchema(): ZodDiscriminatedUnion<"type", any> {
  return columnSchema;
}

const evaluationSchema = z.object({
  columns: z.array(columnSchema),
});
type Evaluation = z.infer<typeof evaluationSchema>;

function App() {
  try {
    const data = evaluationSchema.parse(fakeSchema);
    console.debug("data:", data);
  } catch (err) {
    console.error(err instanceof Error ? err.message : err);
  }

  return (
    <Button className="px-[100px]" variant="outline">
      Hello
    </Button>
  );
}

export default App;
