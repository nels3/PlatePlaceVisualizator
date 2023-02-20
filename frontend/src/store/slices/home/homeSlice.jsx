import { createSlice } from "@reduxjs/toolkit";

import { getAllStatistics } from "./homeThunk";

export interface HomeSlice {
  platesCount: String;
  countryCount: String;
  cityCount: String;
}

const initialState: HomeSlice = {
  platesCount: null,
  countryCount: null,
  cityCount: null,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllStatistics.fulfilled, (state, action) => {
      state.platesCount = String(action.payload.count);
      state.countryCount = action.payload.country;
      state.cityCount = action.payload.cities;
    });
  },
});

export const {} = homeSlice.actions;

export default homeSlice.reducer;
