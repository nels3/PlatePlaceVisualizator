import React from "react";

import TextAreaDetail from "src/components/common/detail/TextAreaDetail";
import ImageDetail from "src/components/common/detail/ImageDetail";
import InputDetail from "src/components/common/detail/InputDetail";
import CheckDetail from "src/components/common/detail/CheckDetail";
import CheckboxDetail from "src/components/common/detail/CheckboxDetail";

import "src/static/table.css";

export default function Detail({
  title,
  accessor,
  data,
  type,
  updateField,
  updateImageField = () => {},
  checkState = null,
  checkFn = () => {},
}) {
  const updateCheckboxField = (e, accessor) => {
    if (data[accessor] === "") {
      let e = {};
      e["target"] = {};
      e["target"]["value"] = "x";
      updateField(e, accessor);
    } else {
      let e = {};
      e["target"] = {};
      e["target"]["value"] = "";
      updateField(e, accessor);
    }
  };

  if (type === "textarea") {
    return (
      <TextAreaDetail
        title={title}
        accessor={accessor}
        data={data}
        type={type}
        updateField={updateField}
      />
    );
  } else if (type === "image") {
    return (
      <ImageDetail
        title={title}
        accessor={accessor}
        data={data}
        type={type}
        updateField={updateField}
        updateImageField={updateImageField}
      />
    );
  } else if (type === "input") {
    return (
      <InputDetail
        title={title}
        accessor={accessor}
        data={data}
        type={type}
        updateField={updateField}
      />
    );
  } else if (type === "check") {
    return (
      <CheckDetail
        title={title}
        accessor={accessor}
        data={data}
        type={type}
        updateField={updateField}
        checkState={checkState}
        checkFn={checkFn}
      />
    );
  } else if (type === "checkbox") {
    return (
      <CheckboxDetail
        title={title}
        accessor={accessor}
        data={data}
        type={type}
        updateField={updateCheckboxField}
      />
    );
  } else {
    return <></>;
  }
}
