import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { LoadingState } from "src/utils/constants";
import Details from "src/components/common/Details";
import { updateSelectedCountryField } from "src/store/slices/world/worldSlice";
import {
  fetchCountriesList,
  updateCountry,
} from "src/store/slices/world/worldThunk";

const UserCountryDetail = () => {
  const language = useSelector((state: RootState) => state.language.language);

  const country = useSelector(
    (state: RootState) => state.world.selectedCountry
  );
  const shouldUpdate = useSelector(
    (state: RootState) => state.world.shouldUpdateCountry
  );
  const loadingDetail = useSelector(
    (state: RootState) => state.world.loadingCountries
  );

  const dispatch = useDispatch();
  const fields = [
    {
      title: language === "en" ? "Country (en)" : "Kraj (ang)",
      accessor: "name",
      type: "input",
    },
    {
      title: language === "en" ? "Country (pl)" : "Kraj (pl)",
      accessor: "name_pl",
      type: "input",
    },
    {
      title: language === "en" ? "Capital" : "Stolica",
      accessor: "capital",
      type: "input",
    },
    {
      title: "Region",
      accessor: "region",
      type: "input",
    },
    {
      title: "Subregion",
      accessor: "subregion",
      type: "input",
    },
  ];

  useEffect(() => {
    if (loadingDetail === LoadingState.pending) {
      dispatch(fetchCountriesList());
    }
  }, [loadingDetail]);

  const updateFun = () => {
    dispatch(updateCountry(country));
  };

  const deleteFun = () => {
    console.log("TODO: Delete");
  };

  // method executed when there is change on field
  const updateFieldFun = (e, field) => {
    dispatch(
      updateSelectedCountryField({ field: field, value: e.target.value })
    );
  };

  return (
    <>
      {country ? (
        <div style={{ padding: "5px" }}>
          <Details
            id="country_details"
            data={country}
            fields={fields}
            title={language === "en" ? "Country details" : "Dane kraju"}
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

export default UserCountryDetail;
