import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import Details from "src/components/common/Details";
import { LoadingState } from "src/utils/constants";
import { getDisplayText, dictionary as dict } from "src/utils/languageUtil";

import { fetchPlatesList } from "src/store/slices/plates/platesThunk";
import { getAllStatistics } from "src/store/slices/home/homeThunk";
import { RootState } from "src/store/store";
import {
  getRegions,
  getCountries,
  fetchAllPhotosDataForMap,
} from "src/store/slices/gallery/galleryThunk";
import { fetchStatistics } from "src/store/slices/plates/platesThunk";

export default function Export() {
  const language = useSelector((state: RootState) => state.language.language);

  // HOME
  const platesCount = useSelector((state) => state.home.platesCount);
  const countryCount = useSelector((state) => state.home.countryCount);
  const cityCount = useSelector((state) => state.home.cityCount);

  // PLATES
  const platesList = useSelector((state) => state.plates.list);

  // GALLERY
  const regions = useSelector((state) => state.gallery.regions);
  const countries = useSelector((state) => state.gallery.countries);
  const allPhotos = useSelector((state) => state.gallery.allPhotos);

  // STATISTICS
  const statisticsList = useSelector((state) => state.plates.statistics);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStatistics());

    if (regions.length === 0) {
      dispatch(getRegions());
    }
    if (countries.length === 0) {
      dispatch(getCountries());
    }
    if (platesList.length === 0) {
      dispatch(fetchPlatesList());
    }
    if (statisticsList.length === 0) {
      dispatch(fetchStatistics(language));
    }
    if (allPhotos.length === 0) {
      dispatch(fetchAllPhotosDataForMap());
    }
  }, []);

  let homeData = useMemo(() => {
    return [
      {
        plates: platesCount,
        countries: countryCount,
        cities: cityCount,
      },
    ];
  }, [platesCount, countryCount, cityCount]);

  const exportData = (sourceData, name) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(sourceData)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = name + ".json";

    link.click();
  };

  return (
    <>
      <button
        className="button-modal"
        style={{ margin: "10px" }}
        onClick={() => {
          exportData(homeData, "home");
        }}
      >
        Export Home Data
      </button>
      <button
        className="button-modal"
        style={{ margin: "10px" }}
        onClick={() => {
          exportData(platesList, "plates");
        }}
      >
        Export Plates Data
      </button>
      <button
        className="button-modal"
        style={{ margin: "10px" }}
        onClick={() => {
          exportData(allPhotos, "gallery");
        }}
      >
        Export Gallery Data
      </button>
      <button
        className="button-modal"
        style={{ margin: "10px" }}
        onClick={() => {
          exportData(regions, "regions");
        }}
      >
        Export Regions (gallery)
      </button>
      <button
        className="button-modal"
        style={{ margin: "10px" }}
        onClick={() => {
          exportData(countries, "countries");
        }}
      >
        Export Countries (gallery)
      </button>
      <button
        className="button-modal"
        style={{ margin: "10px" }}
        onClick={() => {
          exportData(statisticsList, "statistics");
        }}
      >
        Export Statistics
      </button>
    </>
  );
}
