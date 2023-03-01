import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-grid";

import FilterSelect from "src/components/common/FilterSelect";
import Label from "src/components/common/Label";

import { getDisplayText, dictionary as dict } from "src/utils/languageUtil";
import { updateNewPlate } from "src/store/slices/plates/platesSlice";
import "src/static/form.css";

import {
  fetchCountriesList,
  fetchCitiesList,
} from "src/store/slices/world/worldThunk";

export default function NewPlateHelper() {
  const language = useSelector((state) => state.language.language);

  const countriesList = useSelector((state) => state.world.countries);
  const citiesList = useSelector((state) => state.world.cities);

  const dispatch = useDispatch();

  useEffect(() => {
    if (countriesList.length === 0) {
      dispatch(fetchCountriesList(language));
    }
    if (citiesList.length === 0) {
      dispatch(fetchCitiesList(language));
    }
  }, [countriesList, citiesList]);

  const changeCountry = (e) => {
    let targetCountry = {};
    const accessor = getDisplayText(language, dict.plateDetails.countryLabel);

    countriesList.map((country) => {
      if (country[accessor] === e["label"]) {
        targetCountry = country;
      }
    });

    dispatch(updateNewPlate({ field: "country", value: targetCountry.name }));
    dispatch(
      updateNewPlate({ field: "country_pl", value: targetCountry.name_pl })
    );
    dispatch(
      updateNewPlate({ field: "latitude", value: targetCountry.latitude })
    );
    dispatch(
      updateNewPlate({ field: "longitude", value: targetCountry.longitude })
    );
    dispatch(updateNewPlate({ field: "is_country_plate", value: "x" }));
  };
  const changeCity = (e) => {
    let targetCity = {};
    const accessor = getDisplayText(language, dict.plateDetails.cityLabel);

    citiesList.map((city) => {
      if (city[accessor] === e["label"]) {
        targetCity = city;
      }
    });

    dispatch(updateNewPlate({ field: "country", value: targetCity.country }));
    dispatch(
      updateNewPlate({ field: "country_pl", value: targetCity.country_pl })
    );
    dispatch(updateNewPlate({ field: "city", value: targetCity.name }));
    dispatch(updateNewPlate({ field: "city_pl", value: targetCity.name_pl }));
    dispatch(updateNewPlate({ field: "latitude", value: targetCity.latitude }));
    dispatch(
      updateNewPlate({ field: "longitude", value: targetCity.longitude })
    );
    dispatch(updateNewPlate({ field: "is_country_plate", value: "" }));
  };

  return (
    <Container
      container
      spacing={2}
      className="filter-box row"
      style={{ minWidth: "100%" }}
    >
      <Row>
        <Col>
          <h5>{getDisplayText(language, dict.plateDetails.filters)} </h5>
        </Col>
        <Col>
          <Label title={getDisplayText(language, dict.plateDetails.country)} />
        </Col>
        <Col>
          <FilterSelect
            options={countriesList}
            optionValue={"name"}
            optionLabel={getDisplayText(
              language,
              dict.plateDetails.countryLabel
            )}
            onChange={changeCountry}
          />
        </Col>
        <Col>
          <Label title={getDisplayText(language, dict.plateDetails.city)} />
        </Col>
        <Col>
          <FilterSelect
            options={citiesList}
            optionValue={"name"}
            optionLabel={getDisplayText(language, dict.plateDetails.cityLabel)}
            onChange={changeCity}
          />
        </Col>
      </Row>
    </Container>
  );
}
