import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Title from "src/components/common/Title";
import Table from "src/components/common/Table";
import { getDisplayText, dictionary as dict } from "src/utils/languageUtil";

import {
  setSelectedCity,
  setNewCity,
  setSelectedRowIndexCities,
} from "src/store/slices/world/worldSlice";
import { fetchCitiesList } from "src/store/slices/world/worldThunk";

const UserCities = () => {
  const language = useSelector((state: RootState) => state.language.language);

  const citiesList = useSelector((state: RootState) => state.world.cities);
  const showAddNewCity = useSelector(
    (state: RootState) => state.world.showAddNewCity
  );
  const selectedRowIndex = useSelector(
    (state: RootState) => state.world.selectedRowIndexCity
  );

  const loadingState = useSelector(
    (state: RootState) => state.world.loadingCities
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (citiesList.length === 0) {
      dispatch(fetchCitiesList());
    }
  }, []);

  const columns = [
    {
      Header: getDisplayText(language, dict.world.cities.city),
      accessor: getDisplayText(language, dict.world.cities.cityAccessor),
    },
    {
      Header: getDisplayText(language, dict.world.cities.country),
      accessor: getDisplayText(language, dict.world.cities.countryAccessor),
    },
    {
      Header: getDisplayText(language, dict.world.cities.region),
      accessor: getDisplayText(language, dict.world.cities.regionAccessor),
    },
    {
      Header: getDisplayText(language, dict.world.cities.population),
      accessor: getDisplayText(language, dict.world.cities.populationAccessor),
    },
  ];

  const onRowClickAction = (rowDetails, rowIndex) => {
    dispatch(setSelectedRowIndexCities(rowIndex));
    if (!showAddNewCity) dispatch(setSelectedCity(rowDetails));
    else dispatch(setNewCity(rowDetails));
  };

  return (
    <div style={{ padding: "5px" }}>
      <Title title={getDisplayText(language, dict.world.cities.title)} />
      <Table
        columns={columns}
        data={citiesList}
        onClickAction={onRowClickAction}
        selectedRowIndex={selectedRowIndex}
        loadingState={loadingState}
      />
    </div>
  );
};

export default UserCities;
