import React from "react";

import LoadingIcons from "react-loading-icons";

export default function LoadingSign({ text = "" }) {
  return (
    <div style={{ padding: "5px", display: "flex" }}>
      <LoadingIcons.Oval stroke="#000000" />
      <div style={{ padding: "15px" }}>{text}</div>
    </div>
  );
}
