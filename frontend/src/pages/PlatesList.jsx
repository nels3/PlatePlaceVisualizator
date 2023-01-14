import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Table from "src/components/common/Table";
import PlateDetails from "src/components/PlateDetails";

import { RootState } from "src/store/store";
import {
  setSelectedPlate,
  setSelectedRowIndex,
} from "src/store/slices/plates/platesSlice";
import { fetchPlatesList } from "src/store/slices/plates/platesThunk";

export default function PlatesList() {
  const platesList = useSelector((state: RootState) => state.plates.list);
  const selectedRowIndex = useSelector(
    (state: RootState) => state.plates.selectedRowIndex
  );

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = `Plates`;
    if (platesList.length === 0) {
      dispatch(fetchPlatesList());
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
      Header: "City",
      accessor: "city",
      width: 80,
    },
    {
      Header: "City pl",
      accessor: "city_pl",
      width: 80,
    },
  ];

  const onRowClickAction = (rowDetails, rowIndex) => {
    dispatch(setSelectedPlate(rowDetails));
    dispatch(setSelectedRowIndex(rowIndex));
  };

  return (
    <div style={{ padding: "5px" }}>
      <Table
        columns={columns}
        data={platesList}
        onClickAction={onRowClickAction}
        selectedRowIndex={selectedRowIndex}
      />
      <PlateDetails />
    </div>
  );
}
