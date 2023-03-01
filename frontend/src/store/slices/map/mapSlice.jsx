import { createSlice } from "@reduxjs/toolkit";

import { LoadingState } from "src/utils/constants";

export interface MapSlice {
  markersList: []; // list of markers created from plates
  worldGeoConfig: {}; // dictionary with geo config for world map
  continentsGeoConfig: []; // list with geo configs for continent maps
  countriesGeoConfig: []; // list with geo configs for countries maps
  selectedMapGeo: {}; // selected url for map
  selectedWorldTribe: Boolean; // world checkbox value
  selectedContinent: String; // continent select value
  selectedCountry: String; // country select value
  selectedMarker: {}; // selected marker on map
  loadingMarkers: LoadingState; // loading state of creating markers
}

const initialState: MapSlice = {
  markersList: [],
  worldGeoConfig: [],
  continentsGeoConfig: [],
  countriesGeoConfig: [],
  selectedMapGeo: {},
  selectedWorldTribe: true,
  selectedContinent: null,
  selectedCountry: null,
  selectedMarker: null,
  loadingMarkers: LoadingState.pending,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMarkersList(state, action) {
      state.markersList = action.payload;
      return state;
    },
    setSelectedMapGeo(state, action) {
      state.selectedMapGeo = action.payload;
      return state;
    },
    setSelectedWorld(state, action) {
      state.selectedWorldTribe = !state.selectedWorldTribe;
      state.selectedContinent = "";
      state.selectedCountry = "";
      return state;
    },
    setSelectedContinent(state, action) {
      state.selectedWorldTribe = false;
      state.selectedContinent = action.payload;
      state.selectedCountry = "";
      return state;
    },
    setSelectedCountry(state, action) {
      state.selectedWorldTribe = false;
      state.selectedContinent = "";
      state.selectedCountry = action.payload;
      return state;
    },
    setContinentsGeoConfig(state, action) {
      state.continentsGeoConfig = action.payload;
      return state;
    },
    setCountriesGeoConfig(state, action) {
      state.countriesGeoConfig = action.payload;
      return state;
    },
    setWorldGeoConfig(state, action) {
      state.worldGeoConfig = action.payload;
      state.selectedWorldTribe = true;
      state.selectedContinent = "";
      state.selectedCountry = "";
      state.mapGeoUrl = action.payload;
      state.mapGeoUrl["tribe"] = "world";
      return state;
    },
    setLoadingMarkers(state, action) {
      state.loadingMarkers = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setMarkersList,
  setSelectedMapGeo,
  setSelectedWorld,
  setSelectedContinent,
  setSelectedCountry,
  setWorldGeoConfig,
  setContinentsGeoConfig,
  setCountriesGeoConfig,
  setLoadingMarkers,
} = mapSlice.actions;

export default mapSlice.reducer;
