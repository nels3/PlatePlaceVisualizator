import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Marker } from "react-simple-maps";

import { setSelectedPlate } from "src/store/slices/plates/platesSlice";
import { fetchPlatesList } from "src/store/slices/plates/platesThunk";
import { setMarkersList } from "src/store/slices/map/mapSlice";

import mapGeoConfig from "src/components/map/MapConfig";

export default function Markers() {
  const [circleR, setCircleR] = useState(3);
  const [fontSize, setFontSize] = useState(0);

  const selectedPlate = useSelector(
    (state: RootState) => state.plates.selectedPlate
  );
  const platesList = useSelector((state: RootState) => state.plates.list);
  const markersList = useSelector((state: RootState) => state.map.markersList);
  const tribe = useSelector((state: RootState) => state.map.mapGeoUrl.tribe);

  const dispatch = useDispatch();

  // adjusting marker parameters according to map tribe
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

  // creating list of markers from list of plates
  const createMarkersFromMap = () => {
    let markers = [];
    platesList.map((plate) => {
      const marker = {
        markerOffset: -10,
        name: plate.city,
        coordinates: [plate.longitude, plate.latitude],
        original: plate,
      };
      markers.push(marker);
    });

    dispatch(setMarkersList(markers));
  };

  // fetching plates
  useEffect(() => {
    if (platesList.length === 0) {
      dispatch(fetchPlatesList());
    }
  }, []);

  useEffect(() => {
    if (platesList.length > 0) {
      createMarkersFromMap();
    }
  }, [platesList]);

  useEffect(() => {
    computeParams();
  }, [tribe]);

  // method executed when marker was clicked on
  const onMarkerClickEvent = (e, plate) => {
    dispatch(setSelectedPlate(plate));
  };

  return markersList.map(({ name, coordinates, markerOffset, original }) => (
    <Marker
      key={name}
      coordinates={coordinates}
      onClick={(e) => onMarkerClickEvent(e, original)}
    >
      <circle
        r={circleR}
        fill={
          selectedPlate && name === selectedPlate.city ? "#00FF00" : "#FF0000"
        }
        stroke="#fff"
        strokeWidth={2}
      />
      <text
        textAnchor="middle"
        y={markerOffset}
        fontSize={
          selectedPlate && name === selectedPlate.city
            ? fontSize + 10
            : fontSize
        }
        style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
      >
        {name}
      </text>
    </Marker>
  ));
}
