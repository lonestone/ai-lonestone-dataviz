import { Layout } from "@/components/templates/Layout";
import DataTable from "@/components/organisms/DataTable";
import { useJson } from "@/providers/json.provider";

export const Home = () => {
  const { schema, data } = useJson();
  return (
    <Layout>
      <DataTable schema={schema} data={data} />
    </Layout>
  );
};
