export type ColumnBase = {
  name: string;
  alwaysVisible?: boolean;
  minWidth?: number | number;
};

export type ColumnRaw = ColumnBase & {
  type: 'raw';
};

export type ColumnJson = ColumnBase & {
  type: 'json';
  levelOpen?: number;
};

export type ColumnMarkdown = ColumnBase & {
  type: 'markdown';
};

export type ColumnNumber = ColumnBase & {
  type: 'number';
};

export type ColumnArray = ColumnBase & {
  type: 'array';
  collapsible?: boolean;
  collapseNumber?: number;
  schema: Column;
};

export type ColumnSchema = ColumnBase & {
  type: 'schema';
  schema: Column[];
};

export type Column = ColumnRaw | ColumnJson | ColumnNumber | ColumnSchema | ColumnArray | ColumnMarkdown;

export type Schema = {
  columns: Column[];
};
