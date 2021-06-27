import React from "react";

export type ColumnsProps = {
  Header: string | React.Component | (() => any);
  accessor: string;
  sortType: string;
  show: boolean;
  Cell?:
    | React.Component
    | ((row: any) => any)
    | ((row: any) => React.ReactNode);
};

export const clientColumns: ColumnsProps[] = [
  {
    Header: "Nome",
    accessor: "name",
    sortType: "basic",
    show: true,
  },
  {
    Header: "Email",
    accessor: "email",
    sortType: "basic",
    show: true,
  },
  {
    Header: "Telefone",
    accessor: "phone_number",
    sortType: "basic",
    show: true,
  },
  {
    Header: "Sexo",
    accessor: "gender",
    sortType: "basic",
    show: true,
  },
  {
    Header: "Data de Cadastro",
    accessor: "updated_at",
    sortType: "basic",
    show: true,
  },
  {
    Header: "Ações",
    accessor: "actions",
    sortType: "basic",
    show: true,
  },
];
