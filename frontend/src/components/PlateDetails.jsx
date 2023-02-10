import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Details from "src/components/common/Details";
import { LoadingState } from "src/utils/constants";
import { getDisplayText, dictionary as dict } from "src/utils/languageUtil";

import { RootState } from "src/store/store";

import {
  updateSelectedPlate,
  setLoadingDetail,
} from "src/store/slices/plates/platesSlice";
import {
  updatePlate,
  fetchPlatesList,
  fetchPlateImage,
  deletePlate,
} from "src/store/slices/plates/platesThunk";

export default function PlateDetails() {
  const [file, setFile] = useState(null);

  const plate = useSelector((state: RootState) => state.plates.selectedPlate);
  const shouldUpdate = useSelector(
    (state: RootState) => state.plates.shouldUpdate
  );
  const loadingImage = useSelector(
    (state: RootState) => state.plates.loadingImage
  );
  const loadingDetail = useSelector(
    (state: RootState) => state.plates.loadingDetail
  );
  const language = useSelector((state: RootState) => state.language.language);

  const dispatch = useDispatch();

  useEffect(() => {
    if (loadingDetail === LoadingState.fulfilled) {
      dispatch(fetchPlatesList());
      dispatch(setLoadingDetail(LoadingState.idle));
    }
  }, [plate, loadingDetail]);

  // fetching image for current plate
  useEffect(() => {
    if (loadingImage === LoadingState.pending && plate && plate.id) {
      dispatch(fetchPlateImage(plate.id));
    }
  }, [plate, loadingImage]);

  const fields = [
    {
      title: getDisplayText(language, dict.plateDetails.image),
      accessor: "image_url",
      type: "image",
    },
    {
      title: getDisplayText(language, dict.plateDetails.countryEn),
      accessor: "country",
      type: "input",
    },
    {
      title: getDisplayText(language, dict.plateDetails.countryPl),
      accessor: "country_pl",
      type: "input",
    },
    {
      title: getDisplayText(language, dict.plateDetails.cityEn),
      accessor: "city",
      type: "input",
    },
    {
      title: getDisplayText(language, dict.plateDetails.cityPl),
      accessor: "city_pl",
      type: "input",
    },
    {
      title: getDisplayText(language, dict.plateDetails.latitude),
      accessor: "latitude",
      type: "input",
    },
    {
      title: getDisplayText(language, dict.plateDetails.longitude),
      accessor: "longitude",
      type: "input",
    },
    {
      title: getDisplayText(language, dict.plateDetails.info),
      accessor: "info",
      type: "textarea",
    },
    {
      title: getDisplayText(language, dict.plateDetails.is_country_plate),
      accessor: "is_country_plate",
      type: "checkbox",
    },
  ];

  // method executed when update plate button is used
  const updatePlateFun = () => {
    let plateEnhanced = { ...plate };
    if (file !== null) {
      plateEnhanced["file"] = file;
    }
    dispatch(updatePlate(plateEnhanced));
    dispatch(fetchPlatesList());
    setFile(null);
  };

  // method executed when deleting plate button is used
  const deletePlateFun = () => {
    dispatch(deletePlate(plate.id));
  };

  // method executed when there is change on field
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
            title={getDisplayText(language, dict.plateDetails.title)}
            updateField={updateFieldFun}
            updateFn={updatePlateFun}
            deleteFn={deletePlateFun}
            shouldUpdate={shouldUpdate}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
