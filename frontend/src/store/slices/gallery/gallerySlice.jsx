import { createSlice } from "@reduxjs/toolkit";

import { LoadingState } from "src/utils/constants";
import {
  getCountries,
  getRegions,
  getPlatesByCountry,
  getPlatesByRegion,
  fetchPlateImage,
  fetchAllPhotosDataForMap,
  getAllPlates,
} from "./galleryThunk";

export interface GallerySlice {
  selectedCountry: String; // country select value
  selectedRegion: String; // region select value
  selectedAll: Boolean; // selected all plates
  countries: []; // available countries for select
  regions: []; // available regions for select
  plates: []; // plates that match selected values for country or region
  photos: {}; // photos that matches plates
  allPhotos: []; // all plates' photos with external information (export purposes)
  chosen: String; // chosen region or plate for gallery
  photosLoading: LoadingState; // loading state of fetching photos for gallery
}

const initialState: GallerySlice = {
  selectedCountry: null,
  selectedRegion: null,
  selectedAll: false,
  countries: [],
  regions: [],
  plates: [],
  photos: {},
  allPhotos: [],
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
      state.selectedAll = false;
      return state;
    },
    setSelectedCountry(state, action) {
      state.selectedCountry = { name: action.payload };
      state.selectedRegion = null;
      state.selectedAll = false;
      return state;
    },
    setSelectedAll(state, action) {
      state.selectedCountry = null;
      state.selectedRegion = null;
      state.selectedAll = !state.selectedAll;
      return state;
    },
    setPhotosLoading(state, action) {
      state.photosLoading = action.payload;
      return state;
    },
    clearChosen(state, action) {
      state.chosen = {};
      state.photos = {};
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
    builder.addCase(getAllPlates.fulfilled, (state, action) => {
      state.plates = action.payload.data;
      state.chosen = "all";
      let photosTmp = { ...state.photos };
      photosTmp["all"] = [];
      state.photos = photosTmp;
      state.photosLoading = LoadingState.pending;
    });
    builder.addCase(fetchPlateImage.fulfilled, (state, action) => {
      state.photos[state.chosen].push(action.payload);
    });
    builder.addCase(fetchAllPhotosDataForMap.fulfilled, (state, action) => {
      state.allPhotos = action.payload;
    });
  },
});

export const {
  setSelectedRegion,
  setSelectedCountry,
  setSelectedAll,
  setPhotosLoading,
  clearChosen,
} = gallerySlice.actions;

export default gallerySlice.reducer;
