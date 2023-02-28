import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import Details from "src/components/common/Details";
import NewPlateHelper from "src/components/common/NewPlateHelper";
import { LoadingState } from "src/utils/constants";
import { getDisplayText, dictionary as dict } from "src/utils/languageUtil";

import {
  updateNewPlate,
  setLoadingDetail,
  cancelAddPlate,
} from "src/store/slices/plates/platesSlice";
import {
  addNewPlate,
  fetchPlatesList,
  fetchPlateImage,
} from "src/store/slices/plates/platesThunk";

export default function PlateDetails() {
  const [file, setFile] = useState({});

  const plate = useSelector((state) => state.plates.newPlate);
  const language = useSelector((state) => state.language.language);

  const dispatch = useDispatch();

  const fields = [
    {
      title: getDisplayText(language, dict.plateDetails.image),
      accessor: "image_url",
      type: "image",
      mandatory: "false",
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
      mandatory: "false",
    },
    {
      title: getDisplayText(language, dict.plateDetails.cityPl),
      accessor: "city_pl",
      type: "input",
      mandatory: "false",
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
      mandatory: "false",
    },
    {
      title: getDisplayText(language, dict.plateDetails.is_country_plate),
      accessor: "is_country_plate",
      type: "checkbox",
      mandatory: "false",
    },
  ];

  // method executed when add plate button is used
  const addPlateFun = () => {
    let plateEnhanced = { ...plate };
    if (file.name) plateEnhanced["file"] = file;
    dispatch(addNewPlate(plateEnhanced));
  };

  // method executed when cancel button is used
  const cancelPlateFun = () => {
    dispatch(cancelAddPlate());
  };

  // method executed when there is change on field
  const updateFieldFun = (e, field) => {
    if (field === "image_url") {
      setFile(e.target.files[0]);
      dispatch(
        updateNewPlate({
          field: field,
          value: URL.createObjectURL(e.target.files[0]),
        })
      );
    } else {
      dispatch(updateNewPlate({ field: field, value: e.target.value }));
    }
  };

  const checkIfCanAdd = () => {
    let ret = true;
    fields.map((field) => {
      if (
        (!(field.accessor in plate) || plate[field.accessor] === "") &&
        field.mandatory !== "false"
      ) {
        ret = false;
      }
    });

    return ret;
  };

  let shouldUpdate = useMemo(() => checkIfCanAdd(), [plate]);

  return (
    <>
      <div style={{ padding: "5px" }}>
        <NewPlateHelper />
        <Details
          tribe="add"
          id="new_plate_details"
          data={plate}
          data_add={file}
          fields={fields}
          title={getDisplayText(language, dict.plateDetails.newTitle)}
          updateField={updateFieldFun}
          updateFn={addPlateFun}
          cancelFn={cancelPlateFun}
          shouldUpdate={shouldUpdate}
        />
      </div>
    </>
  );
}
