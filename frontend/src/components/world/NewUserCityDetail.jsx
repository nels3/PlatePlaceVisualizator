import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import Details from "src/components/common/Details";
import ModalResultsWindow from "src/components/common/modal/ModalResultsWindow";
import { LoadingState } from "src/utils/constants";
import { CheckState } from "src/utils/constants";
import { openModal, closeModal } from "src/store/slices/common/commonSlice";
import {
  updateNewCityField,
  cancelAddCity,
  setNewCity,
} from "src/store/slices/world/worldSlice";
import {
  fetchCitiesList,
  updateCity,
  deleteCity,
  addNewCity,
} from "src/store/slices/world/worldThunk";
import {
  setCitySelectedRowIndexResults,
  setNewCityTmp,
  clearCityResults,
} from "src/store/slices/checker/checkerSlice";
import { getCityByName } from "src/store/slices/checker/checkerThunk";
import { getDisplayText, dictionary as dict } from "src/utils/languageUtil";

const NewUserCityDetail = () => {
  const language = useSelector((state) => state.language.language);

  const city = useSelector((state) => state.world.newCity);
  const loadingDetail = useSelector((state) => state.world.loadingCities);

  const cityTmp = useSelector((state) => state.checker.newCityTmp);
  const selectedRowIndex = useSelector(
    (state) => state.checker.citySelectedRowIndexResults
  );
  const results = useSelector((state) => state.checker.cityCheckResults);
  const loadingState = useSelector((state) => state.checker.cityLoadingResults);
  const showResults = useSelector((state) => state.checker.cityShowResults);
  const checkState = useSelector((state) => state.checker.newCityCheck);

  const checkName = (arg) => {
    dispatch(
      getCityByName({
        name: city.name,
        name_pl: city.name_pl,
        country: city.country,
        country_pl: city.country_pl,
        id: arg,
      })
    );
  };

  const dispatch = useDispatch();

  const fields = [
    {
      title: getDisplayText(language, dict.world.citiesDetails.cityEn),
      accessor: "name",
      type: "check",
      checkState: checkState.name ? checkState.name : CheckState.notChecked,
      checkFn: () => {
        checkName("name");
      },
    },
    {
      title: getDisplayText(language, dict.world.citiesDetails.cityPl),
      accessor: "name_pl",
      type: "check",
      checkState: checkState.name_pl
        ? checkState.name_pl
        : CheckState.notChecked,
      checkFn: () => {
        checkName("name_pl");
      },
    },
    {
      title: getDisplayText(language, dict.world.citiesDetails.countryEn),
      accessor: "country",
      type: "check",
      checkState: checkState.country
        ? checkState.country
        : CheckState.notChecked,
      checkFn: () => {
        checkName("country");
      },
    },
    {
      title: getDisplayText(language, dict.world.citiesDetails.countryPl),
      accessor: "country_pl",
      type: "check",
      checkState: checkState.country_pl
        ? checkState.country_pl
        : CheckState.notChecked,
      checkFn: () => {
        checkName("country_pl");
      },
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

  useEffect(() => {
    if (showResults) {
      dispatch(openModal("city-results"));
    }
  }, [showResults, results]);

  const updateFun = () => {
    dispatch(addNewCity(city));
  };

  const cancelFun = () => {
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

  const chooseFn = () => {
    dispatch(setNewCity(cityTmp));
    dispatch(clearCityResults());
    dispatch(closeModal("city-results"));
  };

  const columns = [
    {
      Header: getDisplayText(language, dict.world.citiesDetails.cityEn),
      accessor: "name",
    },
    {
      Header: getDisplayText(language, dict.world.citiesDetails.cityPl),
      accessor: "name_pl",
    },
    {
      Header: getDisplayText(language, dict.world.citiesDetails.countryEn),
      accessor: "country",
    },
    {
      Header: getDisplayText(language, dict.world.citiesDetails.countryPl),
      accessor: "country_pl",
    },
    {
      Header: getDisplayText(language, dict.world.citiesDetails.region),
      accessor: "region",
    },
    {
      Header: getDisplayText(language, dict.world.citiesDetails.population),
      accessor: "population",
    },
    {
      Header: getDisplayText(language, dict.world.citiesDetails.longitude),
      accessor: "longitude",
    },
    {
      Header: getDisplayText(language, dict.world.citiesDetails.latitude),
      accessor: "latitude",
    },
  ];

  const onRowClickAction = (rowDetails, rowIndex) => {
    dispatch(setCitySelectedRowIndexResults(rowIndex));
    dispatch(setNewCityTmp(rowDetails));
  };

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
          cancelFn={() => cancelFun()}
          shouldUpdate={shouldUpdate}
        />
      </div>
      <ModalResultsWindow
        id="city-results"
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
  );
};

export default NewUserCityDetail;
