export type DataType = {
  data: string | number | string[] | number[] | DataType[];
};

export type DataEntry = {
  name: string;
  columns: DataType[];
}

export type Data = DataEntry[];
