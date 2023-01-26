import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Title from "src/components/common/Title";
import Table from "src/components/common/Table";
import { setSelectedRowIndexCountries } from "src/store/slices/world/worldSlice";
import { fetchCountriesList } from "src/store/slices/world/worldThunk";

const UserCountries = () => {
  const language = useSelector((state: RootState) => state.language.language);

  const countriesList = useSelector(
    (state: RootState) => state.world.countries
  );
  const selectedRowIndex = useSelector(
    (state: RootState) => state.world.selectedRowIndexCountry
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (countriesList.length === 0) {
      dispatch(fetchCountriesList());
    }
  }, []);

  const columns = [
    {
      Header: language === "pl" ? "Kraj" : "Country",
      accessor: language === "pl" ? "name_pl" : "name",
      width: 150,
    },
    {
      Header: language === "pl" ? "Stolica" : "Capital",
      accessor: "capital",
      width: 150,
    },
    {
      Header: "Region",
      accessor: "region",
      width: 150,
    },
    {
      Header: "Subregion",
      accessor: "subregion",
      width: 150,
    },
  ];

  const onRowClickAction = (rowDetails, rowIndex) => {
    dispatch(setSelectedRowIndexCountries(rowIndex));
  };

  return (
    <div style={{ padding: "5px" }}>
      <Title title={language === "en" ? "Countries:" : "Kraje:"} />
      <Table
        columns={columns}
        data={countriesList}
        onClickAction={onRowClickAction}
        selectedRowIndex={selectedRowIndex}
      />
    </div>
  );
};

export default UserCountries;
