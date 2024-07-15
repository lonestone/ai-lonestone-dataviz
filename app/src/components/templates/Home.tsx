import { Layout } from "@/components/templates/Layout";
import { Data } from "@/types/data.type";
import JSONDATA from "../../../fakeData.json";
import JSONSCHEMA from "../../../fakeSchema.json";
import { Schema } from "@/types/schema.type";
import DataTable from "dataviz-datatable/components/organisms/DataTable.tsx";

export const Home = () => {
  return (
    <Layout>
      <DataTable schema={JSONSCHEMA as Schema} data={JSONDATA as Data} />
    </Layout>
  );
};
