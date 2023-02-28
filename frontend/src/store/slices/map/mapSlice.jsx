import { createSlice } from "@reduxjs/toolkit";

import { LoadingState } from "src/utils/constants";

export interface MapSlice {
  markersList: [];
  worldList: [];
  continentsList: [];
  countriesList: [];
  mapGeoUrl: {};
  selectedWorldTribe: Boolean;
  selectedContinent: String;
  selectedCountry: String;
  selectedRowIndex: Integer;
  selectedMarker: {};
  loadingMarkers: LoadingState;
}

const initialState: MapSlice = {
  markersList: [],
  worldList: [],
  continentsList: [],
  countriesList: [],
  mapGeoUrl: {},
  selectedWorldTribe: true,
  selectedContinent: null,
  selectedCountry: null,
  selectedRowIndex: null,
  selectedMarker: null,
  loadingMarkers: LoadingState.pending,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMapGeoUrl(state, action) {
      state.mapGeoUrl = action.payload;
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
    setMarkersList(state, action) {
      state.markersList = action.payload;
      return state;
    },
    setContinentsList(state, action) {
      state.continentsList = action.payload;
      return state;
    },
    setCountriesList(state, action) {
      state.countriesList = action.payload;
      return state;
    },
    setWorldList(state, action) {
      state.worldList = action.payload;
      state.selectedWorldTribe = true;
      state.selectedContinent = "";
      state.selectedCountry = "";
      state.mapGeoUrl = action.payload;
      state.mapGeoUrl["tribe"] = "world";
      return state;
    },
    setSelectedRowIndex(state, action) {
      state.selectedRowIndex = action.payload;
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
  setSelectedWorld,
  setSelectedContinent,
  setSelectedCountry,
  setMarkersList,
  setContinentsList,
  setCountriesList,
  setSelectedRowIndex,
  setLoadingMarkers,
  setMapGeoUrl,
  setWorldList,
} = mapSlice.actions;

export default mapSlice.reducer;
