import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Title from "src/components/common/Title";
import Table from "src/components/common/Table";
import { getDisplayText, dictionary as dict } from "src/utils/languageUtil";

import {
  setSelectedCountry,
  setNewCountry,
  setSelectedRowIndexCountries,
} from "src/store/slices/world/worldSlice";
import { fetchCountriesList } from "src/store/slices/world/worldThunk";

const UserCountries = () => {
  const language = useSelector((state: RootState) => state.language.language);

  const countriesList = useSelector(
    (state: RootState) => state.world.countries
  );
  const showAddNewCountry = useSelector(
    (state: RootState) => state.world.showAddNewCountry
  );
  const selectedRowIndex = useSelector(
    (state: RootState) => state.world.selectedRowIndexCountry
  );
  const loadingState = useSelector(
    (state: RootState) => state.world.loadingCountries
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (countriesList.length === 0) {
      dispatch(fetchCountriesList());
    }
  }, []);

  const columns = [
    {
      Header: getDisplayText(language, dict.world.countries.country),
      accessor: getDisplayText(language, dict.world.countries.countryAccessor),
      width: 150,
    },
    {
      Header: getDisplayText(language, dict.world.countries.capital),
      accessor: "capital",
      width: 150,
    },
    {
      Header: getDisplayText(language, dict.world.countries.region),
      accessor: "region",
      width: 150,
    },
    {
      Header: getDisplayText(language, dict.world.countries.subregion),
      accessor: "subregion",
      width: 150,
    },
  ];

  const onRowClickAction = (rowDetails, rowIndex) => {
    if (selectedRowIndex === rowIndex) {
      dispatch(setSelectedRowIndexCountries(null));
      if (!showAddNewCountry) dispatch(setSelectedCountry(null));
    } else {
      dispatch(setSelectedRowIndexCountries(rowIndex));
      if (!showAddNewCountry) dispatch(setSelectedCountry(rowDetails));
      else dispatch(setNewCountry(rowDetails));
    }
  };

  return (
    <div style={{ padding: "5px" }}>
      <Title title={getDisplayText(language, dict.world.countries.title)} />
      <Table
        columns={columns}
        data={countriesList}
        onClickAction={onRowClickAction}
        selectedRowIndex={selectedRowIndex}
        loadingState={loadingState}
      />
    </div>
  );
};

export default UserCountries;
