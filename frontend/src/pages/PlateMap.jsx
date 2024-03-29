import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Map from "src/components/map/Map";

import { fetchPlatesList } from "src/store/slices/plates/platesThunk";

export default function PlateMap() {
  const platesList = useSelector((state) => state.plates.list);

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
