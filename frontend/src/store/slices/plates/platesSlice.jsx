import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPlatesList,
  fetchPlateImage,
  updatePlate,
  fetchStatistics,
} from "./platesThunk";

import { LoadingState } from "src/utils/constants";

export interface PlatesSlice {
  list: [];
  selectedRowIndex: Integer;
  selectedPlate: {};
  loadingImage: LoadingState;
  loadingDetail: LoadingState;
  loadingList: LoadingState;
  shouldUpdate: Boolean;
  loadingStatistics: LoadingState;
  statistics: [];
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
    });
    builder.addCase(fetchPlatesList.pending, (state, action) => {
      state.loadingList = LoadingState.pending;
    });
    builder.addCase(fetchPlatesList.fulfilled, (state, action) => {
      state.list = action.payload;
      state.loadingList = LoadingState.fulfilled;
    });
    builder.addCase(fetchStatistics.pending, (state, action) => {
      state.loadingList = LoadingState.pending;
    });
    builder.addCase(fetchStatistics.fulfilled, (state, action) => {
      state.statistics = action.payload;
      state.loadingList = LoadingState.fulfilled;
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
} = platesSlice.actions;

export default platesSlice.reducer;
