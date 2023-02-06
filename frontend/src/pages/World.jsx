import { useSelector, useDispatch } from "react-redux";

import UserCountries from "src/components/world/UserCountries";
import UserCountryDetail from "src/components/world/UserCountryDetail";
import UserCities from "src/components/world/UserCities";
import UserCityDetail from "src/components/world/UserCityDetail";
import NewUserCityDetail from "src/components/world/NewUserCityDetail";

import { BiMessageSquareAdd } from "react-icons/bi";

import { setShowAddNewCity } from "src/store/slices/world/worldSlice";

export default function World() {
  const showAddNewCity = useSelector(
    (state: RootState) => state.world.showAddNewCity
  );

  const dispatch = useDispatch();
  const openAddNewCity = () => {
    dispatch(setShowAddNewCity(true));
  };

  return (
    <div style={{ padding: "5px" }}>
      <UserCountries />
      <UserCountryDetail />
      <UserCities />
      {!showAddNewCity ? (
        <>
          <BiMessageSquareAdd size="20" onClick={openAddNewCity} />
          <UserCityDetail />
        </>
      ) : (
        <></>
      )}
      {showAddNewCity ? <NewUserCityDetail /> : <></>}
    </div>
  );
}
