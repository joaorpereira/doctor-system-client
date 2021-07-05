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

export const accountsTypesOptions = [
  { value: "", label: "" },
  { value: "conta_corrente", label: "Conta Corrente" },
  { value: "conta_poupanca", label: "Conta Poupanca" },
  { value: "conta_poupanca_conjunta", label: "Conta Poupanca Conjunta" },
  { value: "conta_corrente_conjunta", label: "Conta Corrente Conjunta" },
];

export const timeOptions = [
  { value: "2021-06-05T03:30:00.000Z", label: "0:30" },
  { value: "2021-06-05T04:00:00.000Z", label: "1:00" },
  { value: "2021-06-05T04:30:00.000Z", label: "1:30" },
  { value: "2021-06-05T05:00:00.000Z", label: "2:00" },
  { value: "2021-06-05T05:30:00.000Z", label: "2:30" },
  { value: "2021-06-05T06:00:00.000Z", label: "3:00" },
  { value: "2021-06-05T06:30:00.000Z", label: "3:30" },
  { value: "2021-06-05T07:00:00.000Z", label: "4:00" },
  { value: "2021-06-05T07:30:00.000Z", label: "4:30" },
  { value: "2021-06-05T08:00:00.000Z", label: "5:00" },
  { value: "2021-06-05T08:30:00.000Z", label: "5:30" },
  { value: "2021-06-05T09:00:00.000Z", label: "6:00" },
];
// service_duration: "2021-06-05T04:30:00.000Z"

export const statusOptions = [
  { value: "ATIVO", label: "Ativo" },
  { value: "INATIVO", label: "Inativo" },
];
