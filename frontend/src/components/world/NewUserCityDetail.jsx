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
  setSelectedRowIndexCitiesResults,
  setNewCity,
  setNewCityTmp,
  clearResults,
} from "src/store/slices/world/worldSlice";
import {
  fetchCitiesList,
  updateCity,
  deleteCity,
  addNewCity,
  getCityByName,
} from "src/store/slices/world/worldThunk";
import { getDisplayText, dictionary as dict } from "src/utils/languageUtil";

const NewUserCityDetail = () => {
  const language = useSelector((state: RootState) => state.language.language);

  const city = useSelector((state: RootState) => state.world.newCity);
  const cityTmp = useSelector((state: RootState) => state.world.newCityTmp);
  const selectedRowIndex = useSelector(
    (state: RootState) => state.world.selectedRowIndexCityResults
  );
  const results = useSelector((state: RootState) => state.world.checkResults);
  const loadingState = useSelector(
    (state: RootState) => state.world.loadingReulsts
  );
  const showResults = useSelector(
    (state: RootState) => state.world.showResults
  );

  const loadingDetail = useSelector(
    (state: RootState) => state.world.loadingCities
  );
  const checkState = useSelector(
    (state: RootState) => state.world.newCityCheck
  );
  const checkName = (args) => {
    dispatch(getCityByName(args));
  };

  const dispatch = useDispatch();

  const fields = [
    {
      title: getDisplayText(language, dict.world.citiesDetails.cityEn),
      accessor: "name",
      type: "check",
      checkState: checkState.name ? checkState.name : CheckState.notChecked,
      checkFn: () => {
        checkName({ name: city.name, id: "name" });
      },
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

  useEffect(() => {
    if (showResults) {
      dispatch(openModal("city-results"));
    }
  }, [showResults]);

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

  const chooseFn = () => {
    dispatch(setNewCity(cityTmp));
    dispatch(clearResults());
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
    dispatch(setSelectedRowIndexCitiesResults(rowIndex));
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
          deleteFn={() => deleteFun()}
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
