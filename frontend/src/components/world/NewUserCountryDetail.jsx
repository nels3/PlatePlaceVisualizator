import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { LoadingState } from "src/utils/constants";
import Details from "src/components/common/Details";
import ModalResultsWindow from "src/components/common/modal/ModalResultsWindow";
import { CheckState } from "src/utils/constants";
import { getDisplayText, dictionary as dict } from "src/utils/languageUtil";
import { openModal, closeModal } from "src/store/slices/common/commonSlice";
import {
  updateNewCountryField,
  cancelAddCountry,
  setNewCountry,
} from "src/store/slices/world/worldSlice";
import {
  fetchCountriesList,
  addNewCountry,
} from "src/store/slices/world/worldThunk";
import {
  setCountrySelectedRowIndexResults,
  setNewCountryTmp,
  clearCountryResults,
} from "src/store/slices/checker/checkerSlice";
import { getCountryByName } from "src/store/slices/checker/checkerThunk";

const NewUserCountryDetail = () => {
  const language = useSelector((state) => state.language.language);

  const country = useSelector((state) => state.world.newCountry);
  const countryTmp = useSelector((state) => state.checker.newCountryTmp);
  const loadingDetail = useSelector((state) => state.world.loadingCountries);
  const selectedRowIndex = useSelector(
    (state) => state.checker.countrySelectedRowIndexResults
  );
  const results = useSelector((state) => state.checker.countryCheckResults);
  const loadingState = useSelector(
    (state) => state.checker.countryLoadingResults
  );
  const showResults = useSelector((state) => state.checker.countryShowResults);

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
      dispatch(fetchCountriesList(language));
    }
  }, [loadingDetail]);

  useEffect(() => {
    if (showResults) {
      dispatch(openModal("country-results"));
    }
  }, [showResults, results]);

  useEffect(() => {
    dispatch(setNewCountry(countryTmp));
  }, [countryTmp]);

  useEffect(() => {
    return () => {
      dispatch(setNewCountryTmp({}));
    };
  }, []);

  const updateFun = () => {
    dispatch(addNewCountry(country));
  };

  const cancelFun = () => {
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

  const chooseFn = () => {
    dispatch(setNewCountry(countryTmp));
    dispatch(clearCountryResults());
    dispatch(closeModal("country-results"));
  };

  const columns = [
    {
      Header: getDisplayText(language, dict.world.countriesDetails.countryEn),
      accessor: "name",
    },
    {
      Header: getDisplayText(language, dict.world.countriesDetails.countryPl),
      accessor: "name_pl",
    },
    {
      Header: getDisplayText(language, dict.world.countriesDetails.capital),
      accessor: "capital",
    },
    {
      Header: getDisplayText(language, dict.world.countriesDetails.region),
      accessor: "region",
    },
    {
      Header: getDisplayText(language, dict.world.countriesDetails.subregion),
      accessor: "subregion",
    },
    {
      Header: getDisplayText(language, dict.world.countriesDetails.longitude),
      accessor: "longitude",
    },
    {
      Header: getDisplayText(language, dict.world.countriesDetails.latitude),
      accessor: "latitude",
    },
  ];

  const onRowClickAction = (rowDetails, rowIndex) => {
    dispatch(setCountrySelectedRowIndexResults(rowIndex));
    dispatch(setNewCountryTmp(rowDetails));
  };

  return (
    <>
      {country ? (
        <>
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
              cancelFn={cancelFun}
              shouldUpdate={shouldUpdate}
            />
          </div>
          <ModalResultsWindow
            id="country-results"
            buttonLabel={getDisplayText(language, dict.common.choose)}
            title={getDisplayText(language, dict.common.choose)}
            buttonFn={chooseFn}
            columns={columns}
            data={results}
            onRowClickAction={onRowClickAction}
            selectedRowIndex={selectedRowIndex}
            loadingState={loadingState}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default NewUserCountryDetail;
