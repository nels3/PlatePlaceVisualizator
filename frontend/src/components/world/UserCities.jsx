import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Title from "src/components/common/Title";
import Table from "src/components/common/Table";
import { setSelectedRowIndexCities } from "src/store/slices/world/worldSlice";
import { fetchCitiesList } from "src/store/slices/world/worldThunk";

const UserCities = () => {
  const language = useSelector((state: RootState) => state.language.language);

  const citiesList = useSelector((state: RootState) => state.world.cities);
  const selectedRowIndex = useSelector(
    (state: RootState) => state.world.selectedRowIndexCity
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (citiesList.length === 0) {
      dispatch(fetchCitiesList());
    }
  }, []);

  const columns = [
    {
      Header: language === "pl" ? "Miasto" : "City",
      accessor: language === "pl" ? "name_pl" : "name",
    },
    {
      Header: language === "pl" ? "Kraj" : "Country",
      accessor: language === "pl" ? "country_pl" : "country",
    },
    {
      Header: "Region",
      accessor: "region",
    },
    {
      Header: language === "pl" ? "Populacja" : "Population",
      accessor: "population",
    },
  ];

  const onRowClickAction = (rowDetails, rowIndex) => {
    dispatch(setSelectedRowIndexCities(rowIndex));
  };

  return (
    <div style={{ padding: "5px" }}>
      <Title title={language === "en" ? "Cities:" : "Miasta:"} />
      <Table
        columns={columns}
        data={citiesList}
        onClickAction={onRowClickAction}
        selectedRowIndex={selectedRowIndex}
      />
    </div>
  );
};

export default UserCities;
