import React from "react";
import { useTable } from "react-table";
import Detail from "src/components/common/Detail";

import "src/static/form.css";

export default function Details({
  fields,
  data,
  data_add = null,
  updateField = () => {},
  updatePlate = () => {},
  updatePlateImage = () => {},
  deletePlate = () => {},
  updateImageField = () => {},
}) {
  return (
    <div className="form-box">
      <h5>Plate details</h5>
      <form>
        {fields.map((field, i) => {
          return (
            <Detail
              key={i}
              title={field.title}
              value={data[field.accessor]}
              value_add={data_add}
              accessor={field.accessor}
              type={field.type}
              updateField={updateField}
              updateImageField={updateImageField}
            />
          );
        })}
      </form>
      <div style={{ width: "100%" }}>
        <button className="button" onClick={updatePlate}>
          Update
        </button>
        <button className="button" onClick={updatePlateImage}>
          Update Image
        </button>
        <button
          className="button"
          onClick={deletePlate}
          style={{ flow: "right" }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
