import { useTheme } from "@/providers/theme.provider";
import MarkdownPreview from "@uiw/react-markdown-preview";

interface MarkdownCellContentProps {
  data: string;
}

const MarkdownCellContent = ({ data }: MarkdownCellContentProps) => {
  const { systemTheme } = useTheme();

  return (
    <MarkdownPreview
      style={{
        backgroundColor: "transparent",
        color: systemTheme === "dark" ? "#fff" : "#000",
      }}
      source={data}
    />
  );
};

export default MarkdownCellContent;
