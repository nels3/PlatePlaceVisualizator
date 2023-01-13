import React from "react";
import { useTable } from "react-table";
import Detail from "src/components/common/Detail";

import "src/static/form.css";

export default function Details({ fields, data }) {
  console.log(data);
  console.log(fields);
  return (
    <div className="form-box">
      <h5>Plate details</h5>
      <form>
        {fields.map((field, i) => {
          return (
            <Detail
              title={field.title}
              value={data[field.accessor]}
              type={field.type}
            />
          );
        })}
      </form>
      <div style={{ width: "100%" }}>
        <button className="button"> Update</button>
        <button className="button" style={{ flow: "right" }}>
          {" "}
          Delete
        </button>
      </div>
    </div>
  );
}
