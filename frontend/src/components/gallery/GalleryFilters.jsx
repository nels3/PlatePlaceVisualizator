import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-grid";

import FilterSelect from "src/components/common/FilterSelect";
import FilterCheckbox from "src/components/common/FilterCheckbox";
import Label from "src/components/common/Label";

import {
  getDisplayText,
  getDisplayTextFromChoices,
  dictionary as dict,
} from "src/utils/languageUtil";

import {
  setSelectedRegion,
  setSelectedCountry,
  setSelectedAll,
} from "src/store/slices/gallery/gallerySlice";
import {
  getRegions,
  getCountries,
  getPlatesByRegion,
  getPlatesByCountry,
  getAllPlates,
} from "src/store/slices/gallery/galleryThunk";

import "src/static/filter.css";

export default function GalleryFilter() {
  const language = useSelector((state) => state.language.language);

  const selectedRegion = useSelector((state) => state.gallery.selectedRegion);
  const selectedCountry = useSelector((state) => state.gallery.selectedCountry);
  const selectedAll = useSelector((state) => state.gallery.selectedAll);

  const regions = useSelector((state) => state.gallery.regions);
  const countries = useSelector((state) => state.gallery.countries);

  const dispatch = useDispatch();

  useEffect(() => {
    if (regions.length === 0) {
      dispatch(getRegions());
    }
    if (countries.length === 0) {
      dispatch(getCountries());
    }
  }, []);

  // method executed when changing selected region
  const changeRegion = (e) => {
    dispatch(setSelectedRegion(e.value));
    dispatch(getPlatesByRegion(e.value));
  };

  // method executed when changing selected region
  const changeCountry = (e) => {
    dispatch(setSelectedCountry(e.value));
    dispatch(getPlatesByCountry(e.value));
  };

  // method executed when changing checkbox for all plates
  const changeAll = (e) => {
    if (!selectedAll) dispatch(getAllPlates());
    dispatch(setSelectedAll());
  };

  return (
    <>
      <Container container spacing={2} className="filter-box row">
        <Row>
          <Col>
            <h5>{getDisplayText(language, dict.gallery.filters)} </h5>
          </Col>
          <Col>
            <Label title={getDisplayText(language, dict.gallery.all)} />
          </Col>
          <Col>
            <FilterCheckbox
              value={selectedAll}
              onChange={changeAll}
              disabled={selectedAll}
            />
          </Col>
          <Col>
            <Label title={getDisplayText(language, dict.gallery.region)} />
          </Col>
          <Col>
            <FilterSelect
              options={regions}
              optionValue={"name"}
              optionLabel={getDisplayText(language, dict.gallery.regionLabel)}
              value={
                selectedRegion && selectedRegion.name ? selectedRegion.name : ""
              }
              onChange={changeRegion}
            />
          </Col>
          <Col>
            <Label title={getDisplayText(language, dict.gallery.country)} />
          </Col>
          <Col>
            <FilterSelect
              options={countries}
              optionValue={"name"}
              optionLabel={getDisplayText(language, dict.gallery.countryLabel)}
              value={
                selectedCountry && selectedCountry.name
                  ? selectedCountry.name
                  : ""
              }
              onChange={changeCountry}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
