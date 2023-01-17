import React from "react";

import TextAreaDetail from "src/components/common/detail/TextAreaDetail";
import ImageDetail from "src/components/common/detail/ImageDetail";
import InputDetail from "src/components/common/detail/InputDetail";

import "src/static/table.css";

export default function Detail({
  title,
  accessor,
  data,
  type,
  updateField,
  updateImageField = () => {},
}) {
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
  } else {
    return (
      <InputDetail
        title={title}
        accessor={accessor}
        data={data}
        type={type}
        updateField={updateField}
      />
    );
  }
}
