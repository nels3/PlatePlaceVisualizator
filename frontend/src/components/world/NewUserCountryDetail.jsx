import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { LoadingState } from "src/utils/constants";
import Details from "src/components/common/Details";
import { CheckState } from "src/utils/constants";
import { getDisplayText, dictionary as dict } from "src/utils/languageUtil";
import {
  updateNewCountryField,
  cancelAddCountry,
  setNewCountry,
  setNewCountryCheck,
} from "src/store/slices/world/worldSlice";
import {
  fetchCountriesList,
  addNewCountry,
} from "src/store/slices/world/worldThunk";
import { getCountryByName } from "src/store/slices/checker/checkerThunk";

const NewUserCountryDetail = () => {
  const language = useSelector((state) => state.language.language);

  const country = useSelector((state) => state.world.newCountry);
  const countryTmp = useSelector((state) => state.checker.newCountryTmp);
  const loadingDetail = useSelector((state) => state.world.loadingCountries);

  const checkState = useSelector((state) => state.checker.newCountryCheck);

  const dispatch = useDispatch();

  const checkName = (args) => {
    dispatch(getCountryByName(args));
  };

  const fields = [
    {
      title: getDisplayText(language, dict.world.countriesDetails.countryEn),
      accessor: "name",
      type: "check",
      checkState: checkState.name ? checkState.name : CheckState.notChecked,
      checkFn: () => {
        checkName({ name: country.name, language: "eng", id: "name" });
      },
    },
    {
      title: getDisplayText(language, dict.world.countriesDetails.countryPl),
      accessor: "name_pl",
      type: "check",
      checkState: checkState.name_pl
        ? checkState.name_pl
        : CheckState.notChecked,
      checkFn: () => {
        checkName({ name: country.name_pl, language: "pl", id: "name_pl" });
      },
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
      dispatch(fetchCountriesList());
    }
  }, [loadingDetail]);

  useEffect(() => {
    dispatch(setNewCountry(countryTmp));
  }, [countryTmp]);

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
