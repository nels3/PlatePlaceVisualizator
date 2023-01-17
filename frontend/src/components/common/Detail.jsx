import React from "react";
import { useTable } from "react-table";

import "src/static/table.css";

export default function Detail({
  title,
  accessor,
  data,
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
          value={data["accessor"]}
          onChange={(e) => updateField(e, accessor)}
        />
      </div>
    );
  } else if (type === "image") {
    console.log(data[accessor]);
    return (
      <div className="row">
        <label className="column">{title}</label>
        <input
          type="file"
          name="image_url"
          accept="image/jpeg,image/png,image/gif"
          onChange={(e) => {
            updateField(e, accessor);
          }}
        />
        {data[accessor] && (
          <div>
            <label className="column"></label>
            <img className="preview" src={data[accessor]} alt="" />
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
          value={data["accessor"]}
          onChange={(e) => updateField(e, accessor)}
        />
      </div>
    );
  }
}
