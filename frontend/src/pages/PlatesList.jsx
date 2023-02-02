import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Table from "src/components/common/Table";
import PlateDetails from "src/components/PlateDetails";

import { RootState } from "src/store/store";
import { getDisplayText, dictionary as dict } from "src/utils/languageUtil";

import {
  setSelectedPlate,
  setSelectedRowIndex,
} from "src/store/slices/plates/platesSlice";
import { fetchPlatesList } from "src/store/slices/plates/platesThunk";

export default function PlatesList() {
  const platesList = useSelector((state: RootState) => state.plates.list);
  const loadingState = useSelector(
    (state: RootState) => state.plates.loadingList
  );
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
      Header: getDisplayText(language, dict.plateList.country),
      accessor: getDisplayText(language, dict.plateList.countryAccessor),
      width: 150,
    },
    {
      Header: getDisplayText(language, dict.plateList.city),
      accessor: getDisplayText(language, dict.plateList.cityAccessor),
      width: 150,
    },
    {
      Header: getDisplayText(language, dict.plateList.image),
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
        loadingState={loadingState}
      />
      <PlateDetails />
    </div>
  );
}
