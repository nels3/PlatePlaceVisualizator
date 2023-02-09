import { createSlice } from "@reduxjs/toolkit";

import { LoadingState } from "src/utils/constants";
import {
  getCountries,
  getRegions,
  getPlatesByCountry,
  getPlatesByRegion,
  fetchPlateImage,
} from "./galleryThunk";

export interface GallerySlice {
  selectedCountry: String;
  selectedRegion: String;
  countries: [];
  regions: [];
  plates: [];
  photos: {};
  chosen: String;
  photosLoading: LoadingState;
}

const initialState: GallerySlice = {
  selectedCountry: null,
  selectedRegion: null,
  countries: [],
  regions: [],
  plates: [],
  photos: {},
  chosen: null,
  photosLoading: LoadingState.idle,
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
    setPhotosLoading(state, action) {
      state.photosLoading = action.payload;
      return state;
    },
    clearChosen(state, action) {
      state.chosen = {};
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
      state.plates = action.payload.data;
      state.chosen = action.payload.accessor;
      let photosTmp = { ...state.photos };
      photosTmp[action.payload.accessor] = [];
      state.photos = photosTmp;
      state.photosLoading = LoadingState.pending;
    });
    builder.addCase(getPlatesByRegion.fulfilled, (state, action) => {
      state.plates = action.payload.data;
      state.chosen = action.payload.accessor;
      let photosTmp = { ...state.photos };
      photosTmp[action.payload.accessor] = [];
      state.photos = photosTmp;
      state.photosLoading = LoadingState.pending;
    });
    builder.addCase(fetchPlateImage.fulfilled, (state, action) => {
      state.photos[state.chosen].push(action.payload);
    });
  },
});

export const {
  setSelectedRegion,
  setSelectedCountry,
  setPhotosLoading,
  clearChosen,
} = gallerySlice.actions;

export default gallerySlice.reducer;
