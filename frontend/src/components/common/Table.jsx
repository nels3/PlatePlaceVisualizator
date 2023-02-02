import React, { useMemo } from "react";
import { useTable, useSortBy, useFilters } from "react-table";
import { useSelector } from "react-redux";
import { ColumnFilter } from "src/components/common/ColumnFilter";
import { LoadingState } from "src/utils/constants";

import {
  BsFillCaretDownFill,
  BsFillCaretUpFill,
  BsSearch,
} from "react-icons/bs";
import LoadingSign from "src/components/common/LoadingSign";
import "src/static/table.css";

export default function Table({
  columns,
  data,
  selectedRowIndex = null,
  loadingState = null,
  onClickAction = () => {},
}) {
  const defaultColumn = useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    []
  );
  const language = useSelector((state: RootState) => state.language.language);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
      },
      useFilters,
      useSortBy
    );

  return loadingState === null || loadingState === LoadingState.fulfilled ? (
    <table style={{ width: "100%" }} {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <>
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <BsFillCaretDownFill />
                      ) : (
                        <BsFillCaretUpFill />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th style={{ padding: "5px", margin: "5px" }}>
                  {column.render("Filter")}
                  <BsSearch />
                </th>
              ))}
            </tr>
          </>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              onClick={() => onClickAction(row.original, row.index)}
              className={row.index === selectedRowIndex ? "selected" : ""}
            >
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <LoadingSign
      text={language === "en" ? "Loading table..." : "Ładowanie tabeli..."}
    />
  );
}
