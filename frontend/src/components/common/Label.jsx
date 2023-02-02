import React from "react";
import "src/static/table.css";

export default function Label({ title }) {
  return <label className="column">{title}</label>;
}
