import React, { useEffect, useState } from "react";
import { useTable } from "react-table";

export default function FilterCheckbox({ onChange, value, disabled = false }) {
  return (
    <>
      <input
        type="checkbox"
        disabled={disabled}
        checked={value}
        onChange={(e) => onChange(e)}
      />
    </>
  );
}
