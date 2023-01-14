import React from "react";
import { useTable } from "react-table";

import "src/static/table.css";

export default function Detail({ title, accessor, value, type, updateField }) {
  if (type === "textarea") {
    return (
      <div className="row">
        <label className="column">{title}</label>
        <textarea
          className="column"
          name={title}
          value={value}
          onChange={(e) => updateField(e, accessor)}
        />
      </div>
    );
  } else {
    return (
      <div className="row">
        <label className="column">{title}</label>
        <input
          className="column"
          name={title}
          value={value}
          onChange={(e) => updateField(e, accessor)}
        />
      </div>
    );
  }
}
