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

export const operationsTypes = {
  UPDATE: "update",
  SHOW: "show",
  CREATE: "create",
};

export const genderOptions = [
  { value: "", label: "" },
  { value: "MASCULINO", label: "M" },
  { value: "FEMININO", label: "F" },
];

export const documentOptions = [
  { value: "", label: "" },
  { value: "cpf", label: "CPF" },
  { value: "cnpj", label: "CNPJ" },
];

export type BankAccount = {
  acc_user_name: string;
  acc_number: string;
  acc_type: string;
  bank_code: string;
  bank_agency: string;
  verify_digit: string;
};

export type OptionType = {
  value: string;
  label: string;
};

export const accountsTypesOptions = [
  { value: "", label: "" },
  { value: "conta_corrente", label: "Conta Corrente" },
  { value: "conta_poupanca", label: "Conta Poupanca" },
  { value: "conta_poupanca_conjunta", label: "Conta Poupanca Conjunta" },
  { value: "conta_corrente_conjunta", label: "Conta Corrente Conjunta" },
];
