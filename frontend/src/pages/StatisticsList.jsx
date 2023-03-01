import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Table from "src/components/common/Table";
import Export from "src/components/Export";
import { getDisplayText, dictionary as dict } from "src/utils/languageUtil";

import { fetchStatistics } from "src/store/slices/plates/platesThunk";

export default function StatisticsList() {
  const language = useSelector((state) => state.language.language);
  const statisticsList = useSelector((state) => state.plates.statistics);
  const loadingState = useSelector((state) => state.plates.loadingStatistics);

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = `Statistics`;
  }, []);

  useEffect(() => {
    dispatch(fetchStatistics(language));
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

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
      <Export />
    </div>
  );
}
