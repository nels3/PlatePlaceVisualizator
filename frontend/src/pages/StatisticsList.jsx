import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getDisplayText, dictionary as dict } from "src/utils/languageUtil";
import Table from "src/components/common/Table";

import { RootState } from "src/store/store";

import { fetchStatistics } from "src/store/slices/plates/platesThunk";

export default function StatisticsList() {
  const statisticsList = useSelector(
    (state: RootState) => state.plates.statistics
  );

  const loadingState = useSelector(
    (state: RootState) => state.plates.loadingStatistics
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
      Header: getDisplayText(language, dict.statistics.country),
      accessor: "country",
      width: 150,
    },
    {
      Header: getDisplayText(language, dict.statistics.count),
      accessor: "count",
      width: 80,
    },
    {
      Header: getDisplayText(language, dict.statistics.cities),
      accessor: "cities",
      width: 80,
    },
  ];

  return (
    <div style={{ padding: "5px" }}>
      <Table
        columns={columns}
        data={statisticsList}
        loadingState={loadingState}
      />
    </div>
  );
}
