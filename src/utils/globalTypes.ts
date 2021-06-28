export type AddressProps = {
  country: string;
  state: string;
  city: string;
  cep: string;
  number: string;
  street: string;
};

export type DocumentProps = {
  type: string;
  number: string;
};

export type RowInfo = {
  row: any;
  rowValues: any;
  index: number;
  viewIndex: number;
  pageSize: number;
  page: number;
  level: number;
  nestingPath: number[];
  aggregated: boolean;
  groupedByPivot: boolean;
  subRows: any[];
  original: any;
};

export const type = {
  UPDATE: "update",
  SHOW: "show",
  CREATE: "create",
};
