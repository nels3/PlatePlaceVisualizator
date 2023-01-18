import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";

import Table from "src/components/common/Table";
import PlateDetails from "src/components/PlateDetails";
import Map from "src/components/map/Map";

import { RootState } from "src/store/store";
import {
  setSelectedPlate,
  setSelectedRowIndex,
} from "src/store/slices/plates/platesSlice";
import { fetchPlatesList } from "src/store/slices/plates/platesThunk";

export default function PlateMap() {
  const platesList = useSelector((state: RootState) => state.plates.list);

  const dispatch = useDispatch();
  useEffect(() => {
    document.title = `Map`;
    if (platesList.length === 0) {
      dispatch(fetchPlatesList());
    }
  }, []);

  return (
    <div style={{ padding: "5px" }}>
      <Map />
    </div>
  );
}
