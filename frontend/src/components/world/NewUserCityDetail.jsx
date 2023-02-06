import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import Details from "src/components/common/Details";
import { LoadingState } from "src/utils/constants";
import {
  updateNewCityField,
  cancelAddCity,
} from "src/store/slices/world/worldSlice";
import {
  fetchCitiesList,
  updateCity,
  deleteCity,
  addNewCity,
} from "src/store/slices/world/worldThunk";
import { getDisplayText, dictionary as dict } from "src/utils/languageUtil";

const UserCityDetail = () => {
  const language = useSelector((state: RootState) => state.language.language);

  const city = useSelector((state: RootState) => state.world.newCity);

  const loadingDetail = useSelector(
    (state: RootState) => state.world.loadingCities
  );

  const dispatch = useDispatch();

  const fields = [
    {
      title: getDisplayText(language, dict.world.citiesDetails.cityEn),
      accessor: "name",
      type: "input",
    },
    {
      title: getDisplayText(language, dict.world.citiesDetails.cityPl),
      accessor: "name_pl",
      type: "input",
    },
    {
      title: getDisplayText(language, dict.world.citiesDetails.countryEn),
      accessor: "country",
      type: "input",
    },
    {
      title: getDisplayText(language, dict.world.citiesDetails.countryPl),
      accessor: "country_pl",
      type: "input",
    },
    {
      title: getDisplayText(language, dict.world.citiesDetails.region),
      accessor: "region",
      type: "input",
    },
    {
      title: getDisplayText(language, dict.world.citiesDetails.population),
      accessor: "population",
      type: "input",
    },
    {
      title: getDisplayText(language, dict.world.citiesDetails.latitude),
      accessor: "latitude",
      type: "input",
    },
    {
      title: getDisplayText(language, dict.world.citiesDetails.longitude),
      accessor: "longitude",
      type: "input",
    },
  ];

  useEffect(() => {
    if (loadingDetail === LoadingState.pending) {
      dispatch(fetchCitiesList());
    }
  }, [loadingDetail]);

  const updateFun = () => {
    dispatch(addNewCity(city));
  };

  const deleteFun = () => {
    dispatch(cancelAddCity());
  };

  // method executed when there is change on field
  const updateFieldFun = (e, field) => {
    dispatch(updateNewCityField({ field: field, value: e.target.value }));
  };

  const checkIfCanAdd = () => {
    let ret = true;
    fields.map((field) => {
      if (!(field.accessor in city) || city[field.accessor] === "") ret = false;
    });

    return ret;
  };

  let shouldUpdate = useMemo(() => checkIfCanAdd(), [city]);

  return (
    <>
      <div style={{ padding: "5px" }}>
        <Details
          tribe="add"
          id="city_details"
          data={city}
          fields={fields}
          title={getDisplayText(language, dict.world.citiesDetails.newTitle)}
          updateField={updateFieldFun}
          updateFn={updateFun}
          deleteFn={() => deleteFun()}
          shouldUpdate={shouldUpdate}
        />
      </div>
    </>
  );
};

export default UserCityDetail;
