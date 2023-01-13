import React from "react";
import { useTable } from "react-table";

import "src/static/table.css";

export default function Detail({ title, value, type }) {
  if (type === "textarea") {
    return (
      <div className="row">
        <label className="column">{title}</label>
        <textarea className="column" name={title} value={value} />
      </div>
    );
  } else {
    return (
      <div className="row">
        <label className="column">{title}</label>
        <input className="column" name={title} value={value} />
      </div>
    );
  }
}
