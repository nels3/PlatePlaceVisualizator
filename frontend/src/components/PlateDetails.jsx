import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Details from "src/components/common/Details";

import { RootState } from "src/store/store";

import {
  updateSelectedPlate,
  setLoadingDetail,
} from "src/store/slices/plates/platesSlice";
import {
  updatePlate,
  fetchPlatesList,
} from "src/store/slices/plates/platesThunk";

export default function PlateDetails() {
  const plate = useSelector((state: RootState) => state.plates.selectedPlate);
  const loadingDetail = useSelector(
    (state: RootState) => state.plates.loadingDetail
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (loadingDetail == "fulfilled") {
      dispatch(fetchPlatesList());
      dispatch(setLoadingDetail("idle"));
    }
  }, [loadingDetail]);

  const fields = [
    {
      title: "Country",
      accessor: "country",
      type: "label",
    },
    {
      title: "Country pl",
      accessor: "country_pl",
      type: "label",
    },
    {
      title: "City",
      accessor: "city",
      type: "label",
    },
    {
      title: "City pl",
      accessor: "city_pl",
      type: "label",
    },
    {
      title: "Longitude",
      accessor: "longitude",
      type: "label",
    },
    {
      title: "Latitude",
      accessor: "latitude",
      type: "label",
    },
    {
      title: "Info",
      accessor: "info",
      type: "textarea",
    },
  ];

  const updatePlateFun = () => {
    dispatch(updatePlate(plate));
    dispatch(fetchPlatesList(plate));
  };
  const deletePlateFun = () => {
    console.log("TODO: Delete plate");
  };
  const updateFieldFun = (e, field) => {
    dispatch(updateSelectedPlate({ field: field, value: e.target.value }));
  };

  return (
    <>
      {plate ? (
        <div style={{ padding: "5px" }}>
          <Details
            id="plate_details"
            data={plate}
            fields={fields}
            updateField={updateFieldFun}
            updatePlate={updatePlateFun}
            deletePlate={deletePlateFun}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
