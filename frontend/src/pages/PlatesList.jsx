import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

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
  const language = useSelector((state: RootState) => state.language.language);

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = `Plates`;
    if (platesList.length === 0) {
      dispatch(fetchPlatesList());
    }
  }, []);

  const columns = [
    {
      Header: language === "pl" ? "Kraj" : "Country",
      accessor: language === "pl" ? "country_pl" : "country",
      width: 150,
    },
    {
      Header: language === "pl" ? "Miasto" : "City",
      accessor: language === "pl" ? "city_pl" : "city",
      width: 150,
    },
    {
      Header: language === "pl" ? "Zdjęcie?" : "Image?",
      accessor: "image_present",
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
