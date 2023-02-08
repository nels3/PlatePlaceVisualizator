import { createSlice } from "@reduxjs/toolkit";

import { LoadingState } from "src/utils/constants";
import {
  getCountries,
  getRegions,
  getPlatesByCountry,
  getPlatesByRegion,
} from "./galleryThunk";

export interface GallerySlice {
  selectedCountry: String;
  selectedRegion: String;
  countries: [];
  regions: [];
  plates: [];
}

const initialState: GallerySlice = {
  selectedCountry: null,
  selectedRegion: null,
  countries: [],
  regions: [],
  plates: [],
};

export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setSelectedRegion(state, action) {
      state.selectedCountry = null;
      state.selectedRegion = { name: action.payload };
      return state;
    },
    setSelectedCountry(state, action) {
      state.selectedCountry = { name: action.payload };
      state.selectedRegion = null;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.countries = action.payload;
    });
    builder.addCase(getRegions.fulfilled, (state, action) => {
      state.regions = action.payload;
    });
    builder.addCase(getPlatesByCountry.fulfilled, (state, action) => {
      state.plates = action.payload;
    });
    builder.addCase(getPlatesByRegion.fulfilled, (state, action) => {
      state.plates = action.payload;
    });
  },
});

export const { setSelectedRegion, setSelectedCountry } = gallerySlice.actions;

export default gallerySlice.reducer;
