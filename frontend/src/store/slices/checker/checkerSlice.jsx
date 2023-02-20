import { createSlice } from "@reduxjs/toolkit";

import { LoadingState, CheckState } from "src/utils/constants";
import { getCountryByName, getCityByName } from "./checkerThunk";

export interface CheckerSlice {
  newCountryCheck: {};
  newCountryTmp: {};

  newCityCheck: {};
  newCityTmp: null;
  cityCheckResults: [];
  cityShowResults: Boolean;
  citySelectedRowIndexResults: String;
  cityLoadingResults: LoadingState;
}

const initialState: CheckerSlice = {
  newCountryCheck: {},
  newCountryTmp: {},

  newCityCheck: {},
  newCityTmp: null,
  cityCheckResults: [],
  cityShowResults: false,
  citySelectedRowIndexResults: null,
  cityLoadingResults: LoadingState.idle,
};

export const checkerSlice = createSlice({
  name: "checker",
  initialState,
  reducers: {
    resetAllChecks(state, action) {
      state.newCountryCheck = {};
      state.newCityCheck = {};
      return state;
    },

    setNewCountryCheck(state, action) {
      state.newCountryCheck[action.payload.field] = action.payload.value;
      return state;
    },

    setNewCityCheck(state, action) {
      state.newCityCheck[action.payload.field] = action.payload.value;
      return state;
    },
    setNewCityTmp(state, action) {
      state.newCityTmp = action.payload;
      return state;
    },
    setNewCountryTmp(state, action) {
      state.newCountryTmp = action.payload;
      return state;
    },
    setCitySelectedRowIndexResults(state, action) {
      state.citySelectedRowIndexResults = action.payload;
      return state;
    },
    clearCityResults(state, action) {
      state.cityCheckResults = [];
      state.cityShowResults = false;
      state.citySelectedRowIndexResults = null;
      state.cityLoadingResults = LoadingState.idle;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCountryByName.fulfilled, (state, action) => {
      if (action.payload.info === "error") {
        state.newCountryCheck[action.payload.field] = CheckState.error;
      } else {
        let check = {};
        check[action.payload.field] = CheckState.correct;
        state.newCountryCheck = check;
        state.newCountryTmp = action.payload.data;
      }
    });
    builder.addCase(getCityByName.fulfilled, (state, action) => {
      if (action.payload.info === "error") {
        state.newCityCheck[action.payload.field] = CheckState.error;
      } else {
        let check = {};
        check[action.payload.field] = CheckState.correct;
        state.newCityCheck = check;
        state.cityCheckResults = action.payload.data;
        state.cityShowResults = true;
        state.cityLoadingResults = LoadingState.fulfilled;
      }
    });
  },
});

export const {
  setNewCountryCheck,
  setNewCityCheck,
  setNewCityTmp,
  setCitySelectedRowIndexResults,
  clearCityResults,
  resetAllChecks,
  setNewCountryTmp,
} = checkerSlice.actions;

export default checkerSlice.reducer;
