import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Table from "src/components/common/Table";
import Details from "src/components/common/Details";

import { RootState } from "src/store/store";

export default function PlateDetails() {
  const plate = useSelector((state: RootState) => state.plates.selectedPlate);

  const dispatch = useDispatch();
  console.log(plate);

  const fields = [
    {
      title: "Country",
      accessor: "country",
      type: "label",
    },
    {
      title: "Country pl",
      accessor: "country_pl",
      type: "label",
    },
    {
      title: "City",
      accessor: "city",
      type: "label",
    },
    {
      title: "City pl",
      accessor: "city_pl",
      type: "label",
    },
    {
      title: "Longitude",
      accessor: "longitude",
      type: "label",
    },
    {
      title: "Latitude",
      accessor: "latitude",
      type: "label",
    },
    {
      title: "Info",
      accessor: "info",
      type: "textarea",
    },
  ];

  return (
    <>
      {plate ? (
        <div style={{ padding: "5px" }}>
          <Details data={plate} fields={fields} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
