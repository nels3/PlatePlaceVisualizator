import { createSlice } from "@reduxjs/toolkit";

import { LoadingState } from "src/utils/constants";

export interface MapSlice {
  markersList: [];
  continentsList: [];
  countriesList: [];
  selectedWorldTribe: Boolean;
  selectedContinent: String;
  selectedCountry: String;
  selectedRowIndex: Integer;
  selectedMarker: {};
  loadingMarkers: LoadingState;
}

const initialState: MapSlice = {
  markersList: [],
  continentsList: [],
  countriesList: [],
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
    setSelectedWorld(state, action) {
      state.selectedWorldTribe = true;
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
} = mapSlice.actions;

export default mapSlice.reducer;
