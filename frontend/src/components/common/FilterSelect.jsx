import React, { useEffect, useState } from "react";
import Select from "react-select";

import "src/static/table.css";
import "bootstrap/dist/css/bootstrap.css";

export default function FilterSelect({
  options,
  optionValue,
  optionLabel,
  onChange,
  value,
}) {
  const [selected, setSelected] = useState([]);

  const getOptionList = () => {
    let ret = [];

    options.map((option) =>
      ret.push({
        value: option[optionValue],
        label: option[optionLabel],
      })
    );
    ret.push({
      value: null,
      label: "",
    });
    return ret;
  };

  const optionsList = getOptionList();

  const onChangeFun = (e) => {
    setSelected(setSelected(e));
    onChange(e);
  };

  useEffect(() => {
    if (value === "") {
      setSelected([]);
    }
  }, [value]);

  return (
    <>
      <Select
        className="select column"
        options={optionsList}
        onChange={(e) => onChangeFun(e)}
        value={selected}
        isSearchable
      />
    </>
  );
}
