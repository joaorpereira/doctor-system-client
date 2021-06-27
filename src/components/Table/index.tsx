import { useTable } from "react-table";
import * as S from "./styled";

export function Table({ columns, data }: any) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <S.Container>
      <table {...getTableProps()}>
        <S.Head>
          {headerGroups.map((headerGroup: any, index: number) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any, index: any) => (
                <th key={index} {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </S.Head>
        <S.Body {...getTableBodyProps()}>
          {rows.map((row: any, i: any) => {
            prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell: any, index: any) => {
                  return (
                    <td key={index} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
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
