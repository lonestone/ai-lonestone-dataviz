import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useJson } from "@/providers/json.provider";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Braces } from "lucide-react";
import { useState } from "react";

const JsonEdit = () => {
  const { data, schema, setData, setSchema } = useJson();
  const [schemaValue, setSchemaValue] = useState(
    JSON.stringify(schema, null, 2)
  );
  const [dataValue, setDataValue] = useState(JSON.stringify(data, null, 2));
  const [schemaError, setSchemaError] = useState("");
  const [dataError, setDataError] = useState("");

  const onSave = () => {
    try {
      setSchema(JSON.parse(schemaValue));
      setSchemaError("");
    } catch (e) {
      setSchemaError("Invalid Json");
    }

    try {
      setData(JSON.parse(dataValue));
      setDataError("");
    } catch (e) {
      setDataError("Invalid Json");
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon" variant="outline">
            <Braces />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-6xl p-6">
          <DialogTitle className="text-lg font-bold">Edit JSON</DialogTitle>
          <div className="flex flex-col gap-2">
            <DialogDescription>Schema</DialogDescription>
            <Textarea
              rows={10}
              defaultValue={schemaValue}
              onChange={(e) => setSchemaValue(e.target.value)}
            />
            {schemaError && <p className="text-red-500">{schemaError}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <DialogDescription>Data</DialogDescription>
            <Textarea
              rows={10}
              defaultValue={dataValue}
              onChange={(e) => setDataValue(e.target.value)}
            />
            {dataError && <p className="text-red-500">{dataError}</p>}
          </div>
          <DialogFooter>
            <Button onClick={onSave} disabled={!schema || !data}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JsonEdit;
