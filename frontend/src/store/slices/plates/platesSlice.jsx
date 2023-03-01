import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPlatesList,
  fetchPlateImage,
  updatePlate,
  fetchStatistics,
  addNewPlate,
  deletePlate,
} from "./platesThunk";

import { LoadingState } from "src/utils/constants";

export interface PlatesSlice {
  list: []; // all plates
  selectedRowIndex: Integer; // selected row index in plates list
  selectedPlate: {}; // selected plate data that will be displayed in details
  loadingImage: LoadingState; // loading state of fetching image from database for currently selected plate
  loadingDetail: LoadingState; // loading state of fetching data for currently selected plate
  loadingList: LoadingState; // loading state of fetching plates list
  shouldUpdate: Boolean; // flag that enables update plate button in details
  loadingStatistics: LoadingState; // loading state of fetching statistics for plates
  statistics: []; // statistics data
  showNewPlate: Boolean; // flag that enables showing new plate component
  newPlate: {}; // dictionary with entered data for new plate
}

const initialState: PlatesSlice = {
  list: [],
  selectedRowIndex: null,
  selectedPlate: null,
  loadingImage: LoadingState.idle,
  loadingDetail: LoadingState.idle,
  loadingList: LoadingState.idle,
  shouldUpdate: false,
  loadingStatistics: LoadingState.idle,
  statistics: [],
  showNewPlate: false,
  newPlate: {},
  selectedCountry: null,
  selectedCity: null,
};

export const platesSlice = createSlice({
  name: "plates",
  initialState,
  reducers: {
    setSelectedPlate(state, action) {
      state.selectedPlate = action.payload;
      state.loadingImage = LoadingState.pending;
      state.shouldUpdate = false;
      return state;
    },
    setSelectedRowIndex(state, action) {
      state.selectedRowIndex = action.payload;
      return state;
    },
    updateSelectedPlate(state, action) {
      state.selectedPlate[action.payload.field] = action.payload.value;
      state.shouldUpdate = true;
      return state;
    },
    updateNewPlate(state, action) {
      state.newPlate[action.payload.field] = action.payload.value;
      return state;
    },
    setLoadingDetail(state, action) {
      state.loadingDetail = action.payload;
      return state;
    },
    setLoadingImage(state, action) {
      state.loadingImage = action.payload;
      return state;
    },
    setShouldUpdate(state, action) {
      state.shouldUpdate = action.payload;
      return state;
    },
    setShowNewPlate(state, action) {
      state.showNewPlate = action.payload;
      return state;
    },
    setNewPlate(state, action) {
      state.newPlate = action.payload;
      return state;
    },
    cancelAddPlate(state, action) {
      state.showNewPlate = false;
      state.newPlate = {};
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlateImage.fulfilled, (state, action) => {
      state.selectedPlate.image_url = action.payload;
      state.loadingImage = LoadingState.fulfilled;
    });
    builder.addCase(updatePlate.pending, (state, action) => {
      state.loadingDetail = LoadingState.pending;
    });
    builder.addCase(updatePlate.fulfilled, (state, action) => {
      state.loadingDetail = LoadingState.fulfilled;
      state.shouldUpdate = false;
      state.selectedPlate = null;
      state.selectedRowIndex = null;
    });
    builder.addCase(fetchPlatesList.pending, (state, action) => {
      state.loadingList = LoadingState.pending;
    });
    builder.addCase(fetchPlatesList.fulfilled, (state, action) => {
      state.list = action.payload;
      state.loadingList = LoadingState.fulfilled;
    });
    builder.addCase(fetchStatistics.pending, (state, action) => {
      state.loadingStatistics = LoadingState.pending;
    });
    builder.addCase(fetchStatistics.fulfilled, (state, action) => {
      state.statistics = action.payload;
      state.loadingStatistics = LoadingState.fulfilled;
    });
    builder.addCase(addNewPlate.fulfilled, (state, action) => {
      state.loadingList = LoadingState.pending;
      state.newPlate = {};
      state.selectedPlate = null;
      state.selectedRowIndex = null;
      state.showNewPlate = false;
    });
    builder.addCase(deletePlate.fulfilled, (state, action) => {
      state.loadingList = LoadingState.pending;
      state.selectedPlate = null;
      state.selectedRowIndex = null;
    });
  },
});

export const {
  setSelectedPlate,
  setLoadingDetail,
  setSelectedRowIndex,
  updateSelectedPlate,
  setLoadingImage,
  setShouldUpdate,
  setShowNewPlate,
  cancelAddPlate,
  updateNewPlate,
  setNewPlate,
} = platesSlice.actions;

export default platesSlice.reducer;
