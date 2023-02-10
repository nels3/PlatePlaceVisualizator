import React from "react";

export default function TextAreaDetail({
  title,
  accessor,
  data,
  type,
  updateField,
  updateImageField = () => {},
}) {
  return (
    <div className="row">
      <label className="column">{title}</label>
      <input
        className="column"
        style={{ marginTop: "10px" }}
        type="checkbox"
        checked={data[accessor]}
        onChange={(e) => updateField(e, accessor)}
      />
    </div>
  );
}
