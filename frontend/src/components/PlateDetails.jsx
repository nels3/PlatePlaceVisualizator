import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Details from "src/components/common/Details";
import React, { useState } from "react";
import { LoadingState } from "src/utils/constants";
import { RootState } from "src/store/store";

import {
  updateSelectedPlate,
  setLoadingDetail,
} from "src/store/slices/plates/platesSlice";
import {
  updatePlate,
  fetchPlatesList,
  fetchPlateImage,
} from "src/store/slices/plates/platesThunk";

export default function PlateDetails() {
  const plate = useSelector((state: RootState) => state.plates.selectedPlate);

  const [file, setFile] = useState({});

  const loadingImage = useSelector(
    (state: RootState) => state.plates.loadingImage
  );
  const loadingDetail = useSelector(
    (state: RootState) => state.plates.loadingDetail
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (loadingImage === LoadingState.pending) {
      dispatch(fetchPlateImage(plate.id));
    }
  }, [loadingImage]);

  useEffect(() => {
    if (loadingDetail === LoadingState.fulfilled) {
      dispatch(fetchPlatesList());
      dispatch(setLoadingDetail(LoadingState.idle));
    }
  }, [plate, loadingDetail]);

  const fields = [
    {
      title: "Country",
      accessor: "country",
      type: "input",
    },
    {
      title: "Country pl",
      accessor: "country_pl",
      type: "input",
    },
    {
      title: "City",
      accessor: "city",
      type: "input",
    },
    {
      title: "City pl",
      accessor: "city_pl",
      type: "input",
    },
    {
      title: "Longitude",
      accessor: "longitude",
      type: "input",
    },
    {
      title: "Latitude",
      accessor: "latitude",
      type: "input",
    },
    {
      title: "Info",
      accessor: "info",
      type: "textarea",
    },
    {
      title: "Image",
      accessor: "image_url",
      type: "image",
    },
  ];

  const updatePlateFun = () => {
    let plateEnhanced = { ...plate };
    plateEnhanced["file"] = file;
    dispatch(updatePlate(plateEnhanced));
    dispatch(fetchPlatesList());
  };

  const deletePlateFun = () => {
    console.log("TODO: Delete plate");
  };
  const updateFieldFun = (e, field) => {
    if (field === "image_url") {
      setFile(e.target.files[0]);
      dispatch(
        updateSelectedPlate({
          field: field,
          value: URL.createObjectURL(e.target.files[0]),
        })
      );
    } else {
      dispatch(updateSelectedPlate({ field: field, value: e.target.value }));
    }
  };

  return (
    <>
      {plate ? (
        <div style={{ padding: "5px" }}>
          <Details
            id="plate_details"
            data={plate}
            data_add={file}
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
