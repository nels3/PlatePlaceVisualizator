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
      <textarea
        className="column"
        name={title}
        value={data[accessor]}
        onChange={(e) => updateField(e, accessor)}
      />
    </div>
  );
}
