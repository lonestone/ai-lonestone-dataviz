import { useTheme } from "@/providers/theme.provider";
import { useCallback, useEffect, useState } from "react";
import {
  JsonView,
  allExpanded,
  darkStyles,
  defaultStyles,
} from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

interface JsonCellContentProps {
  data: string;
  levelOpen?: number;
}

const JsonCellContent = ({ data, levelOpen = -1 }: JsonCellContentProps) => {
  const { systemTheme } = useTheme();
  const [content, setContent] = useState(null);

  useEffect(() => {
    try {
      setContent(JSON.parse(data));
    } catch (e) {
      console.error("Could not parse JSON data:", data);
      console.error("Error", e);
    }
  }, [data]);

  const levelCallback = useCallback(
    (level: number) => {
      if (levelOpen === -1) {
        return allExpanded();
      }

      return level < levelOpen;
    },
    [levelOpen]
  );

  if (!content) {
    return <div>Invalid JSON, check console for details</div>;
  }

  return (
    <JsonView
      data={content}
      shouldExpandNode={levelCallback}
      style={
        systemTheme === "dark"
          ? {
              ...darkStyles,
              container: darkStyles.container + " bg-transparent",
            }
          : {
              ...defaultStyles,
              container: defaultStyles.container + " bg-transparent",
            }
      }
    />
  );
};

export default JsonCellContent;
