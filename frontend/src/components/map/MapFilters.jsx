import DropDown from "src/components/common/DropDown";
import Label from "src/components/common/Label";
import { mapGeoConfig } from "src/components/map/MapConfig";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  setSelectedContinent,
  setSelectedCountry,
  setContinentsList,
  setCountriesList,
} from "src/store/slices/map/mapSlice";

export default function MapFilters() {
  const countries = useSelector((state: RootState) => state.map.countriesList);
  const continents = useSelector(
    (state: RootState) => state.map.continentsList
  );
  const selectedContinent = useSelector(
    (state: RootState) => state.map.selectedContinent
  );
  const selectedCountry = useSelector(
    (state: RootState) => state.map.selectedCountry
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (countries.length === 0 || continents.length === 0) {
      dispatch(setCountriesList(mapGeoConfig.countries));
      dispatch(setContinentsList(mapGeoConfig.continents));
    }
  }, []);

  const changeContinent = (e) => {
    let targetContinent = {};

    let targetName = e.value;
    continents.map((continent) =>
      continent["name"] === targetName ? (targetContinent = continent) : ""
    );

    dispatch(setSelectedContinent(targetContinent));
  };

  const changeCountry = (e) => {
    let targetCountry = {};

    let targetName = e.value;
    countries.map((country) =>
      country["name"] === targetName ? (targetCountry = country) : ""
    );

    dispatch(setSelectedCountry(targetCountry));
  };

  return (
    <>
      <Label title="Continent" />
      <DropDown
        options={continents}
        optionValue={"name"}
        optionLabel={"namePl"}
        value={
          selectedContinent && selectedContinent.name
            ? selectedContinent.name
            : ""
        }
        onChange={changeContinent}
      />
      <Label title="Country" />
      <DropDown
        options={countries}
        optionValue={"name"}
        optionLabel={"namePl"}
        value={
          selectedCountry && selectedCountry.name ? selectedCountry.name : ""
        }
        onChange={changeCountry}
      />
    </>
  );
}
