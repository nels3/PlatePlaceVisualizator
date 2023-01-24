import mapGeoConfig from "src/components/map/MapConfig";
import { Marker } from "react-simple-maps";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { fetchPlatesList } from "src/store/slices/plates/platesThunk";
import { setMarkersList } from "src/store/slices/map/mapSlice";

export default function Markers() {
  const [circleR, setCircleR] = useState(5);
  const [fontSize, setFontSize] = useState(16);

  const platesList = useSelector((state: RootState) => state.plates.list);
  const markersList = useSelector((state: RootState) => state.map.markersList);
  const tribe = useSelector((state: RootState) => state.map.mapGeoUrl.tribe);
  const dispatch = useDispatch();

  const computeParams = () => {
    if (tribe == "world") {
      setCircleR(3);
      setFontSize(0);
    } else if (tribe == "continent") {
      setCircleR(5);
      setFontSize(10);
    } else if (tribe == "country") {
      setCircleR(8);
      setFontSize(15);
    }
  };

  const createMarkersFromMap = () => {
    let markers = [];
    platesList.map((plate) => {
      const marker = {
        markerOffset: -5,
        name: plate.city,
        coordinates: [plate.longitude, plate.latitude],
      };
      markers.push(marker);
    });

    dispatch(setMarkersList(markers));
  };

  useEffect(() => {
    if (platesList.length === 0) {
      dispatch(fetchPlatesList());
    } else {
      createMarkersFromMap();
    }
  }, []);

  useEffect(() => {
    computeParams();
  }, [tribe]);

  useEffect(() => {
    if (platesList.length > 0) {
      createMarkersFromMap();
    }
  }, [platesList]);

  return markersList.map(({ name, coordinates, markerOffset }) => (
    <Marker key={name} coordinates={coordinates}>
      <circle r={circleR} fill="#F00" stroke="#fff" strokeWidth={2} />
      <text
        textAnchor="middle"
        y={markerOffset}
        fontSize={fontSize}
        style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
      >
        {name}
      </text>
    </Marker>
  ));
}
