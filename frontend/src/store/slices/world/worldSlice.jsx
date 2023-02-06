import { createSlice } from "@reduxjs/toolkit";

import { LoadingState, CheckState } from "src/utils/constants";
import {
  fetchCountriesList,
  fetchCitiesList,
  addNewCountry,
  updateCountry,
  deleteCountry,
  addNewCity,
  updateCity,
  deleteCity,
  getCountryByName,
  getCityByName,
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
  newCityTmp: null;
  showAddNewCity: Boolean;
  newCountry: {};
  showAddNewCountry: Boolean;
  newCountryCheck: {};
  newCityCheck: {};
  checkResults: [];
  showResults: Boolean;
  selectedRowIndexCityResults: String;
  loadingResults: LoadingState;
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
  newCityTmp: null,
  showAddNewCity: false,
  newCountry: null,
  showAddNewCountry: false,
  newCountryCheck: {},
  newCityCheck: {},
  checkResults: [],
  loadingResults: LoadingState.idle,
  showResults: false,
  selectedRowIndexCityResults: null,
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
    setNewCityTmp(state, action) {
      state.newCityTmp = action.payload;
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
    setNewCountryCheck(state, action) {
      state.newCountryCheck[action.payload.field] = action.payload.value;
      return state;
    },
    setSelectedRowIndexCitiesResults(state, action) {
      state.selectedRowIndexCityResults = action.payload;
      return state;
    },
    clearResults(state, action) {
      state.checkResults = [];
      state.showResults = false;
      state.selectedRowIndexCityResults = null;
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
      state.showAddNewCountry = false;
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
    builder.addCase(getCountryByName.fulfilled, (state, action) => {
      if (action.payload.info === "error") {
        state.newCountryCheck[action.payload.field] = CheckState.error;
      } else {
        let check = {};
        check[action.payload.field] = CheckState.correct;
        state.newCountryCheck = check;
        state.newCountry = action.payload.data;
      }
    });
    builder.addCase(getCityByName.fulfilled, (state, action) => {
      if (action.payload.info === "error") {
        state.newCityCheck[action.payload.field] = CheckState.error;
      } else {
        if (action.payload.data.length === 1) {
          let check = {};
          check[action.payload.field] = CheckState.correct;
          state.newCityCheck = check;
          state.newCity = action.payload.data[0];
        } else {
          state.checkResults = action.payload.data;
          state.showResults = true;
        }
      }
    });
  },
});

export const {
  setCountries,
  setSelectedRowIndexCountries,
  setSelectedCountry,
  setNewCountry,
  updateSelectedCountryField,
  setCities,
  setSelectedRowIndexCities,
  setSelectedCity,
  updateSelectedCityField,
  setNewCity,
  setNewCityTmp,
  clearResults,
  cancelAddCity,
  updateNewCityField,
  setShowAddNewCity,
  cancelAddCountry,
  updateNewCountryField,
  setShowAddNewCountry,
  setNewCountryCheck,
  setSelectedRowIndexCitiesResults,
} = worldSlice.actions;

export default worldSlice.reducer;
