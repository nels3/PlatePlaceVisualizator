import React from "react";

import {
  BsFillQuestionCircleFill,
  BsBookmarkCheckFill,
  BsBookmarkXFill,
} from "react-icons/bs";

import { CheckState } from "src/utils/constants";

export default function CheckDetail({
  title,
  accessor,
  data,
  type,
  updateField,
  updateImageField = () => {},
  checkFn = () => {},
  checkState = CheckState.notChecked,
}) {
  return (
    <div className="row">
      <label className="column">{title}</label>
      <input
        className="column"
        name={title}
        value={data[accessor]}
        onChange={(e) => updateField(e, accessor)}
      />
      <div style={{ marginTop: "25px" }}>
        {data[accessor] && data[accessor] !== "" ? (
          <BsFillQuestionCircleFill
            size="20"
            onClick={checkFn}
            disabled={data[accessor]}
          />
        ) : (
          <></>
        )}
        {checkState === CheckState.correct ? (
          <BsBookmarkCheckFill size="20" color="green" />
        ) : (
          <></>
        )}
        {checkState === CheckState.error ? (
          <BsBookmarkXFill size="20" color="red" />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
