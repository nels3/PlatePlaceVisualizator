import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { LoadingState } from "src/utils/constants";
import Details from "src/components/common/Details";
import { getDisplayText, dictionary as dict } from "src/utils/languageUtil";
import {
  updateSelectedCountryField,
  setSelectedCountry,
  setSelectedRowIndexCountries,
} from "src/store/slices/world/worldSlice";
import {
  fetchCountriesList,
  updateCountry,
  deleteCountry,
} from "src/store/slices/world/worldThunk";

const UserCountryDetail = () => {
  const language = useSelector((state) => state.language.language);

  const country = useSelector((state) => state.world.selectedCountry);
  const shouldUpdate = useSelector((state) => state.world.shouldUpdateCountry);
  const loadingDetail = useSelector((state) => state.world.loadingCountries);

  const dispatch = useDispatch();
  const fields = [
    {
      title: getDisplayText(language, dict.world.countriesDetails.countryEn),
      accessor: "name",
      type: "input",
    },
    {
      title: getDisplayText(language, dict.world.countriesDetails.countryPl),
      accessor: "name_pl",
      type: "input",
    },
    {
      title: getDisplayText(language, dict.world.countriesDetails.capital),
      accessor: "capital",
      type: "input",
    },
    {
      title: getDisplayText(language, dict.world.countriesDetails.region),
      accessor: "region",
      type: "input",
    },
    {
      title: getDisplayText(language, dict.world.countriesDetails.subregion),
      accessor: "subregion",
      type: "input",
    },
    {
      title: getDisplayText(language, dict.world.countriesDetails.longitude),
      accessor: "longitude",
      type: "input",
    },
    {
      title: getDisplayText(language, dict.world.countriesDetails.latitude),
      accessor: "latitude",
      type: "input",
    },
  ];

  useEffect(() => {
    if (loadingDetail === LoadingState.pending) {
      dispatch(fetchCountriesList(language));
    }
  }, [loadingDetail]);

  const updateFun = () => {
    dispatch(updateCountry(country));
  };

  const deleteFun = () => {
    dispatch(deleteCountry(country.id));
  };

  // method executed when there is change on field
  const updateFieldFun = (e, field) => {
    dispatch(
      updateSelectedCountryField({ field: field, value: e.target.value })
    );
  };

  const cancelFun = () => {
    dispatch(setSelectedRowIndexCountries(null));
    dispatch(setSelectedCountry(null));
  };

  return (
    <>
      {country ? (
        <div style={{ padding: "5px" }}>
          <Details
            id="country_details"
            data={country}
            fields={fields}
            title={getDisplayText(language, dict.world.countriesDetails.title)}
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

export default UserCountryDetail;
