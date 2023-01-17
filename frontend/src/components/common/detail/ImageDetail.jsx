import React from "react";

export default function ImageDetail({
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
}
