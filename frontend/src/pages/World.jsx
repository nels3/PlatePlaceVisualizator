import { useSelector, useDispatch } from "react-redux";

import UserCountries from "src/components/world/UserCountries";
import UserCountryDetail from "src/components/world/UserCountryDetail";
import UserCities from "src/components/world/UserCities";
import UserCityDetail from "src/components/world/UserCityDetail";
import NewUserCityDetail from "src/components/world/NewUserCityDetail";
import NewUserCountryDetail from "src/components/world/NewUserCountryDetail";

import { BiMessageSquareAdd } from "react-icons/bi";

import {
  setShowAddNewCity,
  setShowAddNewCountry,
} from "src/store/slices/world/worldSlice";
import { resetAllChecks } from "src/store/slices/checker/checkerSlice";

export default function World() {
  const showAddNewCity = useSelector(
    (state: RootState) => state.world.showAddNewCity
  );
  const showAddNewCountry = useSelector(
    (state: RootState) => state.world.showAddNewCountry
  );

  const dispatch = useDispatch();
  const openAddNewCity = () => {
    dispatch(setShowAddNewCity(true));
    dispatch(resetAllChecks());
  };
  const openAddNewCountry = () => {
    dispatch(setShowAddNewCountry(true));
    dispatch(resetAllChecks());
  };

  return (
    <div style={{ padding: "5px" }}>
      <UserCountries />
      {!showAddNewCountry ? (
        <>
          <BiMessageSquareAdd size="30" onClick={openAddNewCountry} />
          <UserCountryDetail />
        </>
      ) : (
        <></>
      )}
      {showAddNewCountry ? <NewUserCountryDetail /> : <></>}

      <UserCities />
      {!showAddNewCity ? (
        <>
          <BiMessageSquareAdd size="30" onClick={openAddNewCity} />
          <UserCityDetail />
        </>
      ) : (
        <></>
      )}
      {showAddNewCity ? <NewUserCityDetail /> : <></>}
    </div>
  );
}
