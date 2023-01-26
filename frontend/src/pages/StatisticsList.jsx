import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Table from "src/components/common/Table";
import PlateDetails from "src/components/PlateDetails";

import { RootState } from "src/store/store";

import { fetchStatistics } from "src/store/slices/plates/platesThunk";

export default function StatisticsList() {
  const statisticsList = useSelector(
    (state: RootState) => state.plates.statistics
  );

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = `Statistics`;
    if (statisticsList.length === 0) {
      dispatch(fetchStatistics());
    }
  }, []);

  const columns = [
    {
      Header: "Country",
      accessor: "country",
      width: 150,
    },
    {
      Header: "Country pl",
      accessor: "country_pl",
      width: 150,
    },
    {
      Header: "Count",
      accessor: "count",
      width: 80,
    },
    {
      Header: "Cities",
      accessor: "cities",
      width: 80,
    },
  ];

  return (
    <div style={{ padding: "5px" }}>
      <Table columns={columns} data={statisticsList} />
    </div>
  );
}
