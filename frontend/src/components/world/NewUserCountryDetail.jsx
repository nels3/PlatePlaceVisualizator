import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { LoadingState } from "src/utils/constants";
import Details from "src/components/common/Details";
import { getDisplayText, dictionary as dict } from "src/utils/languageUtil";
import {
  updateNewCountryField,
  cancelAddCountry,
} from "src/store/slices/world/worldSlice";
import {
  fetchCountriesList,
  addNewCountry,
} from "src/store/slices/world/worldThunk";

const NewUserCountryDetail = () => {
  const language = useSelector((state: RootState) => state.language.language);

  const country = useSelector((state: RootState) => state.world.newCountry);
  const loadingDetail = useSelector(
    (state: RootState) => state.world.loadingCountries
  );

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
  ];

  useEffect(() => {
    if (loadingDetail === LoadingState.pending) {
      dispatch(fetchCountriesList());
    }
  }, [loadingDetail]);

  const updateFun = () => {
    dispatch(addNewCountry(country));
  };

  const deleteFun = () => {
    dispatch(cancelAddCountry());
  };

  // method executed when there is change on field
  const updateFieldFun = (e, field) => {
    dispatch(updateNewCountryField({ field: field, value: e.target.value }));
  };
  const checkIfCanAdd = () => {
    let ret = true;
    fields.map((field) => {
      if (!(field.accessor in country) || country[field.accessor] === "")
        ret = false;
    });

    return ret;
  };

  let shouldUpdate = useMemo(() => checkIfCanAdd(), [country]);

  return (
    <>
      {country ? (
        <div style={{ padding: "5px" }}>
          <Details
            tribe="add"
            id="country_details"
            data={country}
            fields={fields}
            title={getDisplayText(
              language,
              dict.world.countriesDetails.newTitle
            )}
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

export default NewUserCountryDetail;
