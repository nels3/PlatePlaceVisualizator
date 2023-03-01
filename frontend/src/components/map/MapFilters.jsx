import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-grid";

import FilterSelect from "src/components/common/FilterSelect";
import FilterCheckbox from "src/components/common/FilterCheckbox";
import Label from "src/components/common/Label";

import { mapGeoConfig } from "src/components/map/MapConfig";
import {
  getDisplayText,
  getDisplayTextFromChoices,
  dictionary as dict,
} from "src/utils/languageUtil";

import {
  setSelectedContinent,
  setSelectedCountry,
  setSelectedWorld,
  setWorld,
  setWorldGeoConfig,
  setContinentsGeoConfig,
  setCountriesGeoConfig,
  setSelectedMapGeo,
  setHideNames,
} from "src/store/slices/map/mapSlice";

import "src/static/filter.css";

export default function MapFilters() {
  const language = useSelector((state) => state.language.language);
  const selectedMapGeo = useSelector((state) => state.map.selectedMapGeo);
  const world = useSelector((state) => state.map.worldGeoConfig);
  const countries = useSelector((state) => state.map.countriesGeoConfig);
  const continents = useSelector((state) => state.map.continentsGeoConfig);
  const selectedWorld = useSelector((state) => state.map.selectedWorldTribe);
  const selectedContinent = useSelector((state) => state.map.selectedContinent);
  const selectedCountry = useSelector((state) => state.map.selectedCountry);
  const hideNames = useSelector((state) => state.map.hideNames);

  const dispatch = useDispatch();

  useEffect(() => {
    if (countries.length === 0 || continents.length === 0) {
      dispatch(setCountriesGeoConfig(mapGeoConfig.countries));
      dispatch(setContinentsGeoConfig(mapGeoConfig.continents));
      dispatch(setWorldGeoConfig(mapGeoConfig.world));
    }
    dispatch(setWorld());
    let target = { ...mapGeoConfig.world };
    target.tribe = "world";
    dispatch(setSelectedMapGeo(target));
  }, []);

  // method executed when changing state of world checkbox
  const changeWorld = (e) => {
    dispatch(setSelectedWorld());
    let target = { ...world };
    target.tribe = "world";
    dispatch(setSelectedMapGeo(target));
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
    dispatch(setSelectedMapGeo(target));
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
    dispatch(setSelectedMapGeo(target));
  };

  const hideNamesFun = (e) => {
    dispatch(setHideNames());
  };

  return (
    <>
      <Container container spacing={2} className="filter-box row">
        <Row>
          <Col>
            <h5>{getDisplayText(language, dict.map.filters)} </h5>
          </Col>
          <Col>
            <Label title={getDisplayText(language, dict.map.world)} />
          </Col>
          <Col>
            <FilterCheckbox
              value={selectedWorld}
              onChange={changeWorld}
              disabled={!selectedContinent && !selectedCountry}
            />
          </Col>
          <Col>
            <Label title={getDisplayText(language, dict.map.continent)} />
          </Col>
          <Col>
            <FilterSelect
              options={continents}
              optionValue={"name"}
              optionLabel={getDisplayText(language, dict.map.continentLabel)}
              value={
                selectedContinent && selectedContinent.name
                  ? selectedContinent.name
                  : ""
              }
              onChange={changeContinent}
            />
          </Col>
          <Col>
            <Label title={getDisplayText(language, dict.map.country)} />
          </Col>
          <Col>
            <FilterSelect
              options={countries}
              optionValue={"name"}
              optionLabel={getDisplayText(language, dict.map.countryLabel)}
              value={
                selectedCountry && selectedCountry.name
                  ? selectedCountry.name
                  : ""
              }
              onChange={changeCountry}
            />
          </Col>
          <Col>
            <Label title={getDisplayText(language, dict.map.hideNames)} />
          </Col>
          <Col>
            <FilterCheckbox value={hideNames} onChange={hideNamesFun} />
          </Col>
        </Row>
        <Row style={{ paddingBottom: "0.8em" }}>
          <Col>
            <Label title={getDisplayText(language, dict.map.selected)} />
          </Col>
          <Col>
            <Label
              title={
                selectedMapGeo
                  ? getDisplayTextFromChoices(
                      language,
                      selectedMapGeo.name,
                      selectedMapGeo.namePl
                    )
                  : "---"
              }
            />
          </Col>
          <Col></Col>
          <Col></Col>
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
