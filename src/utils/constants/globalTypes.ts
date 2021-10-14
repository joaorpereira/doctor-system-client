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

export const actionsTypes = {
  UPDATE: "update",
  CREATE: "create",
  SHOW: "show",
};

export const weekDaysOptions = [
  { value: 0, label: "Domingo" },
  { value: 1, label: "Segunda-Feira" },
  { value: 2, label: "Terça-Feira" },
  { value: 3, label: "Quarta-Feira" },
  { value: 4, label: "Quinta-Feira" },
  { value: 5, label: "Sexta-Feira" },
  { value: 6, label: "Sábado" },
];

export const timeDayOptions = [
  { value: "2021-06-05T00:00:00.000Z", label: "0:00" },
  { value: "2021-06-05T00:30:00.000Z", label: "0:30" },
  { value: "2021-06-05T01:00:00.000Z", label: "1:00" },
  { value: "2021-06-05T01:30:00.000Z", label: "1:30" },
  { value: "2021-06-05T02:00:00.000Z", label: "2:00" },
  { value: "2021-06-05T02:30:00.000Z", label: "2:30" },
  { value: "2021-06-05T03:00:00.000Z", label: "3:00" },
  { value: "2021-06-05T03:30:00.000Z", label: "3:30" },
  { value: "2021-06-05T04:00:00.000Z", label: "4:00" },
  { value: "2021-06-05T04:30:00.000Z", label: "4:30" },
  { value: "2021-06-05T05:00:00.000Z", label: "5:00" },
  { value: "2021-06-05T05:30:00.000Z", label: "5:30" },
  { value: "2021-06-05T06:00:00.000Z", label: "6:00" },
  { value: "2021-06-05T06:30:00.000Z", label: "6:30" },
  { value: "2021-06-05T07:00:00.000Z", label: "7:00" },
  { value: "2021-06-05T07:30:00.000Z", label: "7:30" },
  { value: "2021-06-05T08:00:00.000Z", label: "8:00" },
  { value: "2021-06-05T08:30:00.000Z", label: "8:30" },
  { value: "2021-06-05T09:00:00.000Z", label: "9:00" },
  { value: "2021-06-05T09:30:00.000Z", label: "9:30" },
  { value: "2021-06-05T10:00:00.000Z", label: "10:00" },
  { value: "2021-06-05T10:30:00.000Z", label: "10:30" },
  { value: "2021-06-05T11:00:00.000Z", label: "11:00" },
  { value: "2021-06-05T11:30:00.000Z", label: "11:30" },
  { value: "2021-06-05T12:00:00.000Z", label: "12:00" },
  { value: "2021-06-05T12:30:00.000Z", label: "12:30" },
  { value: "2021-06-05T13:00:00.000Z", label: "13:00" },
  { value: "2021-06-05T13:30:00.000Z", label: "13:30" },
  { value: "2021-06-05T14:00:00.000Z", label: "14:00" },
  { value: "2021-06-05T14:30:00.000Z", label: "14:30" },
  { value: "2021-06-05T15:00:00.000Z", label: "15:00" },
  { value: "2021-06-05T15:30:00.000Z", label: "15:30" },
  { value: "2021-06-05T16:00:00.000Z", label: "16:00" },
  { value: "2021-06-05T16:30:00.000Z", label: "16:30" },
  { value: "2021-06-05T17:00:00.000Z", label: "17:00" },
  { value: "2021-06-05T17:00:00.000Z", label: "17:30" },
  { value: "2021-06-05T18:00:00.000Z", label: "18:00" },
  { value: "2021-06-05T18:30:00.000Z", label: "18:30" },
  { value: "2021-06-05T19:00:00.000Z", label: "19:00" },
  { value: "2021-06-05T19:30:00.000Z", label: "19:30" },
  { value: "2021-06-05T20:00:00.000Z", label: "20:00" },
  { value: "2021-06-05T20:30:00.000Z", label: "20:30" },
  { value: "2021-06-05T21:00:00.000Z", label: "21:00" },
  { value: "2021-06-05T21:30:00.000Z", label: "21:30" },
  { value: "2021-06-05T22:00:00.000Z", label: "22:00" },
  { value: "2021-06-05T22:30:00.000Z", label: "22:30" },
  { value: "2021-06-05T23:00:00.000Z", label: "23:00" },
  { value: "2021-06-05T23:30:00.000Z", label: "23:30" },
];
