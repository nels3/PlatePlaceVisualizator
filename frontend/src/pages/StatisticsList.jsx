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

  const language = useSelector((state: RootState) => state.language.language);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = `Statistics`;
  }, []);
  useEffect(() => {
    dispatch(fetchStatistics(language));
  }, [language]);

  const columns = [
    {
      Header: language === "en" ? "Country" : "Kraj",
      accessor: "country",
      width: 150,
    },
    {
      Header: language === "en" ? "Count" : "Liczba",
      accessor: "count",
      width: 80,
    },
    {
      Header: language === "en" ? "Cities" : "Kraje",
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
