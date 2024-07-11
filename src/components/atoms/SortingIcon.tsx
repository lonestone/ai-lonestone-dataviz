import { ArrowUpNarrowWide } from "lucide-react";
import { useMemo } from "react";

interface SortingIconProps {
  sorting?: string;
}

export const SortingIcon = ({ sorting }: SortingIconProps) => {
  const classes = useMemo(() => {
    return sorting ? (sorting === "asc" ? "rotate-180" : "") : "opacity-0";
  }, [sorting]);

  return (
    <ArrowUpNarrowWide className={`transition-all transform ${classes}`} />
  );
};
