import { createSlice } from "@reduxjs/toolkit";

import { LoadingState } from "src/utils/constants";
import {
  fetchCountriesList,
  fetchCitiesList,
  addNewCountry,
  updateCountry,
  deleteCountry,
  addNewCity,
  updateCity,
  deleteCity,
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
  newCity: {};
  showAddNewCity: Boolean;
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
  newCity: null,
  showAddNewCity: false,
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
    setNewCity(state, action) {
      state.newCity = action.payload;
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
    updateNewCityField(state, action) {
      state.newCity[action.payload.field] = action.payload.value;
      state.shouldUpdateCity = true;
      return state;
    },
    cancelAddCity(state, action) {
      state.showAddNewCity = false;
      state.newCity = {};
      return state;
    },
    setShowAddNewCity(state, action) {
      state.showAddNewCity = true;
      state.newCity = {};
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
      state.selectedCountry = null;
      state.selectedRowIndexCountry = null;
    });
    builder.addCase(addNewCountry.fulfilled, (state, action) => {
      state.loadingCountries = LoadingState.pending;
      state.selectedCountry = null;
      state.selectedRowIndexCountry = null;
    });
    builder.addCase(deleteCountry.fulfilled, (state, action) => {
      state.loadingCountries = LoadingState.pending;
      state.selectedCountry = null;
      state.selectedRowIndexCountry = null;
    });
    builder.addCase(updateCity.fulfilled, (state, action) => {
      state.loadingCities = LoadingState.pending;
      state.selectedCity = null;
      state.selectedRowIndexCity = null;
    });
    builder.addCase(addNewCity.fulfilled, (state, action) => {
      state.loadingCities = LoadingState.pending;
      state.selectedCity = null;
      state.selectedRowIndexCity = null;
      state.showAddNewCity = false;
    });
    builder.addCase(deleteCity.fulfilled, (state, action) => {
      state.loadingCities = LoadingState.pending;
      state.selectedCity = null;
      state.selectedRowIndexCity = null;
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
  setNewCity,
  cancelAddCity,
  updateNewCityField,
  setShowAddNewCity,
} = worldSlice.actions;

export default worldSlice.reducer;
