import React, { useMemo, useState } from "react";
import { useTable, useSortBy, useFilters } from "react-table";
import { ColumnFilter } from "src/components/common/ColumnFilter";

import {
  BsFillCaretDownFill,
  BsFillCaretUpFill,
  BsSearch,
} from "react-icons/bs";

import "src/static/table.css";

export default function Table({
  columns,
  data,
  selectedRowIndex = null,
  onClickAction = () => {},
}) {
  const defaultColumn = useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    []
  );

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

  return (
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
  );
}
//style: { width: column.width, textAlign: "center" },
