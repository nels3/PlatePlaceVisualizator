import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "src/store/store";

import { fetchStatistics } from "src/store/slices/plates/platesThunk";

export default function World() {
  return <div style={{ padding: "5px" }}></div>;
}
