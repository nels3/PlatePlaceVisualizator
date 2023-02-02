import React from "react";

import Detail from "src/components/common/detail/Detail";
import "src/static/form.css";

export default function Details({
  fields,
  data,
  title = "",
  shouldUpdate = null,
  updateField = () => {},
  updateFn = () => {},
  deleteFn = () => {},
  updateImageField = () => {},
}) {
  return (
    <div className="form-box">
      <h5>{title}</h5>
      <form>
        {fields.map((field, i) => {
          return (
            <Detail
              key={i}
              title={field.title}
              data={data}
              accessor={field.accessor}
              type={field.type}
              updateField={updateField}
            />
          );
        })}
      </form>
      <div style={{ width: "100%" }}>
        <button className="button" onClick={updateFn} disabled={!shouldUpdate}>
          Update
        </button>
        <button className="button" onClick={deleteFn} style={{ flow: "right" }}>
          Delete
        </button>
      </div>
    </div>
  );
}
