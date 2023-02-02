import React from "react";

import { useSelector } from "react-redux";
import Detail from "src/components/common/detail/Detail";
import { getDisplayText, dictionary as dict } from "src/utils/languageUtil";
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
  const language = useSelector((state: RootState) => state.language.language);

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
          {getDisplayText(language, dict.common.update)}
        </button>
        <button className="button" onClick={deleteFn} style={{ flow: "right" }}>
          {getDisplayText(language, dict.common.delete)}
        </button>
      </div>
    </div>
  );
}
