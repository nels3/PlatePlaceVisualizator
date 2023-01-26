import { createSlice } from "@reduxjs/toolkit";

import { LoadingState } from "src/utils/constants";
import { fetchCountriesList, fetchCitiesList } from "./worldThunk";

export interface WorldSlice {
  countries: [];
  loadingCountries: LoadingState;
  selectedRowIndexCountry: Integer;
}

const initialState: WorldSlice = {
  countries: [],
  loadingCountries: LoadingState.idle,
  selectedRowIndexCountry: null,
  cities: [],
  loadingCities: LoadingState.idle,
  selectedRowIndexCity: null,
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
    setSelectedRowIndexCountries(state, action) {
      state.selectedRowIndexCountry = action.payload;
      return state;
    },
    setCities(state, action) {
      state.cities = action.payload;
      state.loadingCities = LoadingState.pending;
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
  },
});

export const {
  setCountries,
  setSelectedRowIndexCountries,
  setCities,
  setSelectedRowIndexCities,
} = worldSlice.actions;

export default worldSlice.reducer;
