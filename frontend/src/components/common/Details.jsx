import React from "react";
import { useTable } from "react-table";
import Detail from "src/components/common/Detail";

import "src/static/form.css";

export default function Details({
  fields,
  data,
  updateField = () => {},
  updatePlate = () => {},
  deletePlate = () => {},
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
              accessor={field.accessor}
              type={field.type}
              updateField={updateField}
            />
          );
        })}
      </form>
      <div style={{ width: "100%" }}>
        <button className="button" onClick={updatePlate}>
          Update
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
