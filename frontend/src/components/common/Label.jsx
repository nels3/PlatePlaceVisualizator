import React from "react";
import { useTable } from "react-table";

import Dropdown from "react-dropdown";

import "src/static/table.css";

export default function Label({ title }) {
  return <label className="column">{title}</label>;
}
