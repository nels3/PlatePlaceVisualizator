import { createSlice } from "@reduxjs/toolkit";

import { LoadingState, ErrorState } from "src/utils/constants";
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
  countries: []; // list of all countries currently saved in database
  selectedCountry: {}; // selected country that will be shown in details
  loadingCountries: LoadingState; // loading state of fetching countries from backend
  selectedRowIndexCountry: Integer; // selected row index from countries list
  shouldUpdateCountry: Boolean; // flag that enables updating country button, activated after any field change in country details
  cities: []; // list of all cities currently saved in database
  selectedCity: {}; // selected city that will be shown in details
  loadingCities: LoadingState; // loading state of fetching cities from backend
  selectedRowIndexCity: Integer; // selected row index from cities list
  shouldUpdateCity: Boolean; // flag that enables updating city button, activated after any field change in country details
  newCity: {}; // dictionary with entered data for new city
  showAddNewCity: Boolean; // flag that enables showing new city component
  newCountry: {}; // dictionary with entered data for new country
  showAddNewCountry: Boolean; // flag that enables showing new country component
  countryError: ErrorState; // state of country details update/creation
  cityError: ErrorState; // state of city details update/creation
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
  newCountry: null,
  showAddNewCountry: false,
  countryError: ErrorState.correct,
  cityError: ErrorState.correct,
};

export const worldSlice = createSlice({
  name: "world",
  initialState,
  reducers: {
    // COUNTRIES
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
    setNewCountry(state, action) {
      state.newCountry = action.payload;
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
    updateNewCountryField(state, action) {
      state.newCountry[action.payload.field] = action.payload.value;
      state.shouldUpdateCountry = true;
      return state;
    },
    cancelAddCountry(state, action) {
      state.showAddNewCountry = false;
      state.newCountry = {};
      return state;
    },
    setShowAddNewCountry(state, action) {
      state.showAddNewCountry = true;
      state.newCountry = {};
      return state;
    },
    setCountryError(state, action) {
      state.countryError = action.payload;
      return state;
    },

    // CITIES
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
    setCityError(state, action) {
      state.cityError = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountriesList.fulfilled, (state, action) => {
      state.countries = action.payload;
      state.loadingCountries = LoadingState.fulfilled;
    });
    builder.addCase(updateCountry.fulfilled, (state, action) => {
      state.loadingCountries = LoadingState.pending;
      state.selectedCountry = null;
      state.selectedRowIndexCountry = null;
      state.countryError = ErrorState.correct;
    });
    builder.addCase(updateCountry.rejected, (state, action) => {
      state.countryError = ErrorState.error;
    });
    builder.addCase(addNewCountry.fulfilled, (state, action) => {
      state.loadingCountries = LoadingState.pending;
      state.selectedCountry = null;
      state.selectedRowIndexCountry = null;
      state.showAddNewCountry = false;
      state.countryError = ErrorState.correct;
    });
    builder.addCase(addNewCountry.rejected, (state, action) => {
      state.countryError = ErrorState.error;
    });
    builder.addCase(deleteCountry.fulfilled, (state, action) => {
      state.loadingCountries = LoadingState.pending;
      state.selectedCountry = null;
      state.selectedRowIndexCountry = null;
    });
    builder.addCase(fetchCitiesList.fulfilled, (state, action) => {
      state.cities = action.payload;
      state.loadingCities = LoadingState.fulfilled;
    });
    builder.addCase(updateCity.fulfilled, (state, action) => {
      state.loadingCities = LoadingState.pending;
      state.selectedCity = null;
      state.selectedRowIndexCity = null;
      state.cityError = ErrorState.correct;
    });
    builder.addCase(updateCity.rejected, (state, action) => {
      state.cityError = ErrorState.error;
    });
    builder.addCase(addNewCity.fulfilled, (state, action) => {
      state.loadingCities = LoadingState.pending;
      state.loadingCountries = LoadingState.pending;
      state.selectedCity = null;
      state.selectedRowIndexCity = null;
      state.showAddNewCity = false;
      state.cityError = ErrorState.correct;
    });
    builder.addCase(addNewCity.rejected, (state, action) => {
      state.cityError = ErrorState.error;
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
  setNewCountry,
  updateSelectedCountryField,
  cancelAddCountry,
  updateNewCountryField,
  setShowAddNewCountry,
  setCountryError,
  setCities,
  setSelectedRowIndexCities,
  setSelectedCity,
  updateSelectedCityField,
  setNewCity,
  cancelAddCity,
  updateNewCityField,
  setShowAddNewCity,
  setCityError,
} = worldSlice.actions;

export default worldSlice.reducer;
