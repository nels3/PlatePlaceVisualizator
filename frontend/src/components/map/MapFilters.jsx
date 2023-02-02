import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-grid";

import FilterSelect from "src/components/common/FilterSelect";
import FilterCheckbox from "src/components/common/FilterCheckbox";
import Label from "src/components/common/Label";

import { mapGeoConfig } from "src/components/map/MapConfig";

import {
  setSelectedContinent,
  setSelectedCountry,
  setSelectedWorld,
  setContinentsList,
  setCountriesList,
  setWorldList,
  setMapGeoUrl,
} from "src/store/slices/map/mapSlice";

import "src/static/filter.css";

export default function MapFilters() {
  const selectedMapGeo = useSelector((state: RootState) => state.map.mapGeoUrl);
  const world = useSelector((state: RootState) => state.map.worldList);
  const countries = useSelector((state: RootState) => state.map.countriesList);
  const continents = useSelector(
    (state: RootState) => state.map.continentsList
  );
  const selectedWorld = useSelector(
    (state: RootState) => state.map.selectedWorldTribe
  );
  const selectedContinent = useSelector(
    (state: RootState) => state.map.selectedContinent
  );
  const selectedCountry = useSelector(
    (state: RootState) => state.map.selectedCountry
  );

  const language = useSelector((state: RootState) => state.language.language);

  const dispatch = useDispatch();

  useEffect(() => {
    if (countries.length === 0 || continents.length === 0) {
      dispatch(setCountriesList(mapGeoConfig.countries));
      dispatch(setContinentsList(mapGeoConfig.continents));
      dispatch(setWorldList(mapGeoConfig.world));
    }
  }, []);

  // method executed when changing state of world checkbox
  const changeWorld = (e) => {
    dispatch(setSelectedWorld());
    let target = { ...world };
    target.tribe = "world";
    dispatch(setMapGeoUrl(target));
  };

  // method executed when changing selected continent
  const changeContinent = (e) => {
    let targetContinent = {};

    // handling clearable event
    if (!e) {
      targetContinent = "";
    } else {
      let targetName = e.value;
      continents.map((continent) =>
        continent["name"] === targetName ? (targetContinent = continent) : ""
      );
    }

    dispatch(setSelectedContinent(targetContinent));
    let target = { ...targetContinent };
    target.tribe = "continent";
    dispatch(setMapGeoUrl(target));
  };

  // method executed when changing selected country
  const changeCountry = (e) => {
    let targetCountry = {};

    // handling clearable event
    if (!e) {
      targetCountry = "";
    } else {
      let targetName = e.value;
      countries.map((country) =>
        country["name"] === targetName ? (targetCountry = country) : ""
      );
    }

    dispatch(setSelectedCountry(targetCountry));
    let target = { ...targetCountry };
    target.tribe = "country";
    dispatch(setMapGeoUrl(target));
  };

  return (
    <>
      <Container container spacing={2} className="filter-box row">
        <Row>
          <Col>
            <h5>{language === "en" ? "Filters" : "Filtry"} </h5>
          </Col>
          <Col>
            <Label title={language === "en" ? "World:" : "Świat:"} />
          </Col>
          <Col>
            <FilterCheckbox
              value={selectedWorld}
              onChange={changeWorld}
              disabled={!selectedContinent && !selectedCountry}
            />
          </Col>
          <Col>
            <Label title={language === "en" ? "Continent:" : "Kontynent:"} />
          </Col>
          <Col>
            <FilterSelect
              options={continents}
              optionValue={"name"}
              optionLabel={language === "en" ? "name" : "namePl"}
              value={
                selectedContinent && selectedContinent.name
                  ? selectedContinent.name
                  : ""
              }
              onChange={changeContinent}
            />
          </Col>
          <Col>
            <Label title={language === "en" ? "Country:" : "Kraj:"} />
          </Col>
          <Col>
            <FilterSelect
              options={countries}
              optionValue={"name"}
              optionLabel={language === "en" ? "name" : "namePl"}
              value={
                selectedCountry && selectedCountry.name
                  ? selectedCountry.name
                  : ""
              }
              onChange={changeCountry}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Label title={language === "en" ? "Selected:" : "Wybrane:"} />
          </Col>
          <Col>
            <Label
              title={
                selectedMapGeo
                  ? language === "en"
                    ? selectedMapGeo.name
                    : selectedMapGeo.namePl
                  : "---"
              }
            />
          </Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}
