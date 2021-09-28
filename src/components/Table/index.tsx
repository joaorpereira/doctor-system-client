/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-key */
import { PropsWithChildren, ReactElement } from "react";
import { Row, TableOptions, useTable } from "react-table";
import Spinner from "../Spinner";
import * as S from "./styled";

export interface TableProperties<T extends Record<string, unknown>>
  extends TableOptions<T> {
  onClick?: (row: Row<T>) => React.MouseEventHandler<HTMLElement>;
  loading?: boolean;
}

function Table<T extends Record<string, unknown>>(
  props: PropsWithChildren<TableProperties<T>>
): ReactElement {
  const { columns, loading } = props;

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
        {!loading ? (
          <S.Body {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </S.Body>
        ) : (
          <Spinner
            size="65px"
            style={{
              position: "absolute",
              top: "42vh",
              left: "50%",
            }}
          />
        )}
      </table>
    </S.Container>
  );
}

export default Table;
