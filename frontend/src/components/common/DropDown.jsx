import React from "react";
import { useTable } from "react-table";

import Dropdown from "react-dropdown";

import "src/static/table.css";

export default function DropDown({
  options,
  optionValue,
  optionLabel,
  onChange,
  value,
}) {
  const getOptionList = () => {
    let ret = [];

    options.map((option) =>
      ret.push({
        value: option[optionValue],
        label: option[optionLabel],
      })
    );
    return ret;
  };

  const optionsList = getOptionList();

  return (
    <>
      <Dropdown
        options={optionsList}
        onChange={(e) => onChange(e)}
        value={value}
      />
    </>
  );
}
