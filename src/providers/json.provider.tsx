import { Data } from "@/types/data.type";
import { Schema } from "@/types/schema.type";
import { createContext, useContext, useEffect, useState } from "react";
import JSONDATA from "../fakeData.json";
import JSONSCHEMA from "../fakeSchema.json";

type JsonProviderState = {
  schema: Schema;
  data: Data;
  setSchema: (schema: Schema) => void;
  setData: (data: Data) => void;
};

const initialState: JsonProviderState = {
  schema: JSONSCHEMA as Schema,
  data: JSONDATA as Data,
  setSchema: () => null,
  setData: () => null,
};

const JsonProviderContext = createContext<JsonProviderState>(initialState);

const schemaKey = "schema";
const dataKey = "data";

export function JsonProvider({ children }: { children: React.ReactNode }) {
  const [schema, setSchema] = useState<Schema>(JSONSCHEMA as Schema);
  const [data, setData] = useState<Data>(JSONDATA as Data);

  useEffect(() => {
    const schema = localStorage.getItem(schemaKey);
    const data = localStorage.getItem(dataKey);
    if (schema) {
      setSchema(JSON.parse(schema));
    }

    if (data) {
      setData(JSON.parse(data));
    }
  }, []);

  const saveSchema = (schema: Schema) => {
    setSchema(schema);
    localStorage.setItem(schemaKey, JSON.stringify(schema));
  };

  const saveData = (data: Data) => {
    setData(data);
    localStorage.setItem(dataKey, JSON.stringify(data));
  };

  const value = { schema, data, setSchema: saveSchema, setData: saveData };

  return (
    <JsonProviderContext.Provider value={value}>
      {children}
    </JsonProviderContext.Provider>
  );
}

export const useJson = () => {
  const context = useContext(JsonProviderContext);

  if (context === undefined)
    throw new Error("useJson must be used within a JsonProvider");

  return context;
};
