import React from "react";
import { useTable } from "react-table";

import "src/static/table.css";

export default function Detail({
  title,
  accessor,
  value,
  value_add = null,
  type,
  updateField,
  updateImageField = () => {},
}) {
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
  } else if (type === "image") {
    return (
      <div className="row">
        <label className="column">{title}</label>
        <input
          type="file"
          name="image_url"
          accept="image/jpeg,image/png,image/gif"
          onChange={(e) => {
            updateImageField(e, accessor);
          }}
        />
        {value_add && value_add["imageUrl"] && (
          <div>
            <label className="column"></label>
            <img className="preview" src={value_add["imageUrl"]} alt="" />
          </div>
        )}
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
