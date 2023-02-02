import { createSlice } from "@reduxjs/toolkit";

import { LoadingState } from "src/utils/constants";
import {
  fetchCountriesList,
  fetchCitiesList,
  addNewCountry,
  updateCountry,
} from "./worldThunk";

export interface WorldSlice {
  countries: [];
  selectedCountry: {};
  loadingCountries: LoadingState;
  selectedRowIndexCountry: Integer;
  shouldUpdateCountry: Boolean;
  cities: [];
  selectedCity: {};
  loadingCities: LoadingState;
  selectedRowIndexCity: Integer;
  shouldUpdateCity: Boolean;
}

const initialState: WorldSlice = {
  countries: [],
  selectedCountry: null,
  loadingCountries: LoadingState.idle,
  selectedRowIndexCountry: null,
  shouldUpdateCountry: false,
  cities: [],
  selectedCity: null,
  loadingCities: LoadingState.idle,
  selectedRowIndexCity: null,
  shouldUpdateCity: false,
};

export const worldSlice = createSlice({
  name: "world",
  initialState,
  reducers: {
    setCountries(state, action) {
      state.countries = action.payload;
      state.loadingCountries = LoadingState.pending;
      return state;
    },
    setSelectedCountry(state, action) {
      state.selectedCountry = action.payload;
      state.shouldUpdateCountry = false;
      return state;
    },
    updateSelectedCountryField(state, action) {
      state.selectedCountry[action.payload.field] = action.payload.value;
      state.shouldUpdateCountry = true;
      return state;
    },
    setSelectedRowIndexCountries(state, action) {
      state.selectedRowIndexCountry = action.payload;
      return state;
    },
    setCities(state, action) {
      state.cities = action.payload;
      state.loadingCities = LoadingState.pending;
      return state;
    },
    setSelectedCity(state, action) {
      state.selectedCity = action.payload;
      return state;
    },
    updateSelectedCityField(state, action) {
      state.selectedCity[action.payload.field] = action.payload.value;
      state.shouldUpdateCity = true;
      return state;
    },
    setSelectedRowIndexCities(state, action) {
      state.selectedRowIndexCity = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountriesList.fulfilled, (state, action) => {
      state.countries = action.payload;
      state.loadingCountries = LoadingState.fulfilled;
    });
    builder.addCase(fetchCitiesList.fulfilled, (state, action) => {
      state.cities = action.payload;
      state.loadingCities = LoadingState.fulfilled;
    });
    builder.addCase(updateCountry.fulfilled, (state, action) => {
      state.loadingCountries = LoadingState.pending;
    });
    builder.addCase(addNewCountry.fulfilled, (state, action) => {
      state.loadingCountries = LoadingState.pending;
    });
  },
});

export const {
  setCountries,
  setSelectedRowIndexCountries,
  setSelectedCountry,
  updateSelectedCountryField,
  setCities,
  setSelectedRowIndexCities,
  setSelectedCity,
  updateSelectedCityField,
} = worldSlice.actions;

export default worldSlice.reducer;
