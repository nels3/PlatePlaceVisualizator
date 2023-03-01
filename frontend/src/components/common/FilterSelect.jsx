import React, { useEffect, useState } from "react";
import Select from "react-select";

export default function FilterSelect({
  options,
  optionValue,
  optionLabel,
  onChange,
  value,
}) {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (value === "") {
      setSelected([]);
    }
  }, [value]);

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

  const onChangeFun = (e) => {
    setSelected(setSelected(e));
    onChange(e);
  };

  return (
    <>
      <Select
        className="select column"
        options={getOptionList()}
        onChange={(e) => onChangeFun(e)}
        value={selected}
        isSearchable
      />
    </>
  );
}
