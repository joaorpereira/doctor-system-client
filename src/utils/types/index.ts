/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
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

export type BankAccount = {
  acc_user_name: string;
  acc_number: string;
  acc_type: string;
  bank_code: string;
  bank_agency: string;
  verify_digit: string;
  cpf_or_cnpj?: string;
};

export type Address = {
  country: string;
  state: string;
  city: string;
  cep: string;
  number: string;
  street: string;
};

export type OptionType = {
  value: string;
  label: string;
};

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}
