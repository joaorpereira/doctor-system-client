// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/jsx-key */
import { PropsWithChildren, ReactElement } from "react";
import { Row, TableOptions, useTable, usePagination } from "react-table";
import Spinner from "../Spinner";
import * as S from "./styled";

import ChevronLeft from "../../assets/chevron-left.svg";
import ChevronRight from "../../assets/chevron-right.svg";
import ChevronsLeft from "../../assets/chevrons-left.svg";
import ChevronsRight from "../../assets/chevrons-right.svg";

export interface TableProperties<T extends Record<string, unknown>>
  extends TableOptions<T> {
  onClick?: (row: Row<T>) => React.MouseEventHandler<HTMLElement>;
  loading?: boolean;
}

function Table<T extends Record<string, unknown>>(
  props: PropsWithChildren<TableProperties<T>>
): ReactElement {
  const { columns, loading } = props;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      ...props,
      columns,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

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
            {page.map((row) => {
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
            size="45px"
            style={{
              position: "absolute",
              top: "42vh",
              left: "50%",
            }}
          />
        )}
      </table>
      <S.Footer>
        <span>
          Página{" "}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{" "}
        </span>
        <div>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            <img src={ChevronsLeft} alt="ChevronsLeft" />
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            <img src={ChevronLeft} alt="ChevronLeft" />
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            <img src={ChevronRight} alt="ChevronRight" />
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <img src={ChevronsRight} alt="ChevronsRight" />
          </button>
        </div>
        <span>
          Ir para a página:
          <S.Input
            type="text"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
          />
        </span>
      </S.Footer>
    </S.Container>
  );
}

export default Table;
