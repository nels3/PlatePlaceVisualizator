import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Details from "src/components/common/Details";
import { LoadingState } from "src/utils/constants";
import {
  updateSelectedCityField,
  setSelectedCity,
  setSelectedRowIndexCities,
} from "src/store/slices/world/worldSlice";
import {
  fetchCitiesList,
  updateCity,
  deleteCity,
} from "src/store/slices/world/worldThunk";
import { getDisplayText, dictionary as dict } from "src/utils/languageUtil";

const UserCityDetail = () => {
  const language = useSelector((state) => state.language.language);

  const city = useSelector((state) => state.world.selectedCity);
  const shouldUpdate = useSelector((state) => state.world.shouldUpdateCity);
  const loadingDetail = useSelector((state) => state.world.loadingCities);

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
      dispatch(fetchCitiesList(language));
    }
  }, [loadingDetail]);

  const updateFun = () => {
    dispatch(updateCity(city));
  };

  const deleteFun = () => {
    dispatch(deleteCity(city.id));
  };

  // method executed when there is change on field
  const updateFieldFun = (e, field) => {
    dispatch(updateSelectedCityField({ field: field, value: e.target.value }));
  };

  const cancelFun = () => {
    dispatch(setSelectedRowIndexCities(null));
    dispatch(setSelectedCity(null));
  };

  return (
    <>
      {city ? (
        <div style={{ padding: "5px" }}>
          <Details
            id="city_details"
            data={city}
            fields={fields}
            title={getDisplayText(language, dict.world.citiesDetails.title)}
            updateField={updateFieldFun}
            updateFn={updateFun}
            deleteFn={deleteFun}
            cancelFn={cancelFun}
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
