import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoadingState } from "src/utils/constants";

import Table from "src/components/common/Table";
import PlateDetails from "src/components/PlateDetails";
import NewPlateDetails from "src/components/NewPlateDetails";

import { BiMessageSquareAdd } from "react-icons/bi";
import { RootState } from "src/store/store";
import { getDisplayText, dictionary as dict } from "src/utils/languageUtil";

import {
  setSelectedPlate,
  setSelectedRowIndex,
  setShowNewPlate,
  setNewPlate,
} from "src/store/slices/plates/platesSlice";
import { fetchPlatesList } from "src/store/slices/plates/platesThunk";

export default function PlatesList() {
  const language = useSelector((state) => state.language.language);
  const platesList = useSelector((state) => state.plates.list);
  const loadingState = useSelector((state) => state.plates.loadingList);
  const selectedRowIndex = useSelector(
    (state) => state.plates.selectedRowIndex
  );

  const showNewPlate = useSelector((state) => state.plates.showNewPlate);

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = `Plates`;
    if (platesList.length === 0) {
      dispatch(fetchPlatesList());
    }
  }, []);

  useEffect(() => {
    if (loadingState === LoadingState.pending) {
      dispatch(fetchPlatesList());
    }
  }, [loadingState]);

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
    {
      Header: getDisplayText(language, dict.plateList.is_country_plate),
      accessor: "is_country_plate",
      width: 80,
    },
  ];

  const onRowClickAction = (rowDetails, rowIndex) => {
    if (selectedRowIndex === rowIndex) {
      dispatch(setSelectedRowIndex(null));
      dispatch(setSelectedPlate(null));
    } else {
      dispatch(setSelectedRowIndex(rowIndex));
      if (showNewPlate) {
        dispatch(setNewPlate(rowDetails));
      } else {
        dispatch(setSelectedPlate(rowDetails));
      }
    }
  };

  const openAddNewPlate = () => {
    dispatch(setShowNewPlate(true));
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
      {!showNewPlate ? (
        <>
          <BiMessageSquareAdd size="30" onClick={openAddNewPlate} />
          <PlateDetails />
        </>
      ) : (
        <NewPlateDetails />
      )}
    </div>
  );
}
