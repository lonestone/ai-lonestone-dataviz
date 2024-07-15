import { DataEntry } from "@/types/data.type";
import { Column } from "@/types/schema.type";

export type TableColumn = DataEntry & Column;

export type TableColumns = TableColumn[];
