import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Details from "src/components/common/Details";
import Title from "src/components/common/Title";
import Table from "src/components/common/Table";
import {
  setSelectedRowIndexCities,
  updateSelectedCityField,
} from "src/store/slices/world/worldSlice";
import { fetchCitiesList, updateCity } from "src/store/slices/world/worldThunk";

const UserCityDetail = () => {
  const language = useSelector((state: RootState) => state.language.language);

  const city = useSelector((state: RootState) => state.world.selectedCity);
  const shouldUpdate = useSelector(
    (state: RootState) => state.world.shouldUpdateCity
  );

  const dispatch = useDispatch();
  const fields = [
    {
      title: language === "en" ? "City (en)" : "Kraj (ang)",
      accessor: "name",
      type: "input",
    },
    {
      title: language === "en" ? "Country (pl)" : "Kraj (pl)",
      accessor: "name_pl",
      type: "input",
    },
    {
      title: language === "en" ? "Country (en)" : "Kraj (en)",
      accessor: "country",
      type: "input",
    },
    {
      title: language === "en" ? "Country (pl)" : "Kraj (pl)",
      accessor: "country_pl",
      type: "input",
    },
    {
      title: "Region",
      accessor: "region",
      type: "input",
    },
    {
      title: language === "en" ? "Population" : "Populacja",
      accessor: "population",
      type: "input",
    },
    {
      title: "Latitude",
      accessor: "latitude",
      type: "input",
    },
    {
      title: "Longitude",
      accessor: "longitude",
      type: "input",
    },
  ];

  const updateFun = () => {
    dispatch(updateCity(city));
    dispatch(fetchCitiesList());
  };

  const deleteFun = () => {
    console.log("TODO: Delete");
  };

  // method executed when there is change on field
  const updateFieldFun = (e, field) => {
    dispatch(updateSelectedCityField({ field: field, value: e.target.value }));
  };

  return (
    <>
      {city ? (
        <div style={{ padding: "5px" }}>
          <Details
            id="city_details"
            data={city}
            fields={fields}
            title={language == "en" ? "City details" : "Dane miasta"}
            updateField={updateFieldFun}
            updateFn={updateFun}
            deleteFn={deleteFun}
            shouldUpdate={shouldUpdate}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserCityDetail;
