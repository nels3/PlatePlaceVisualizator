import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import UserCountries from "src/components/world/UserCountries";
import UserCountryDetail from "src/components/world/UserCountryDetail";
import UserCities from "src/components/world/UserCities";
import UserCityDetail from "src/components/world/UserCityDetail";
import NewUserCityDetail from "src/components/world/NewUserCityDetail";
import NewUserCountryDetail from "src/components/world/NewUserCountryDetail";
import ErrorHandler from "src/components/common/modal/ErrorHandler";

import { BiMessageSquareAdd } from "react-icons/bi";

import {
  setCountryError,
  setCityError,
} from "src/store/slices/world/worldSlice";
import {
  setShowAddNewCity,
  setShowAddNewCountry,
} from "src/store/slices/world/worldSlice";
import { resetAllChecks } from "src/store/slices/checker/checkerSlice";
import { getDisplayText, dictionary as dict } from "src/utils/languageUtil";

export default function World() {
  const language = useSelector((state) => state.language.language);
  const showAddNewCity = useSelector((state) => state.world.showAddNewCity);
  const showAddNewCountry = useSelector(
    (state) => state.world.showAddNewCountry
  );

  const countryError = useSelector((state) => state.world.countryError);
  const cityError = useSelector((state) => state.world.cityError);

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = `World`;
  }, []);

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
      <ErrorHandler
        status={countryError}
        setStatus={setCountryError}
        modalId="country-error"
        modalText={getDisplayText(language, dict.common.errorMsg.country)}
      />
      <ErrorHandler
        status={cityError}
        setStatus={setCityError}
        modalId="city-error"
        modalText={getDisplayText(language, dict.common.errorMsg.city)}
      />
    </div>
  );
}
