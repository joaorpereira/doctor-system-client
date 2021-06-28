/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-key */
import { PropsWithChildren, ReactElement } from "react";
import { Row, TableOptions, useTable } from "react-table";
import * as S from "./styled";

export interface TableProperties<T extends Record<string, unknown>>
  extends TableOptions<T> {
  onClick?: (row: Row<T>) => React.MouseEventHandler<HTMLElement>;
  handleRowData: (row: Record<string, unknown>) => void;
}

export function Table<T extends Record<string, unknown>>(
  props: PropsWithChildren<TableProperties<T>>
): ReactElement {
  const { columns, handleRowData } = props;

  const { getTableProps, headerGroups, getTableBodyProps, prepareRow, rows } =
    useTable<T>({
      ...props,
      columns,
    });

  return (
    <S.Container>
      <table {...getTableProps()}>
        <S.Head>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </S.Head>
        <S.Body {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() =>
                  handleRowData({ client: row.original, type: "show" })
                }
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </S.Body>
      </table>
    </S.Container>
  );
}
