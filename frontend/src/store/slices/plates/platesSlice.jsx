import { createSlice } from "@reduxjs/toolkit";
import { fetchPlatesList, fetchPlateImage, updatePlate } from "./platesThunk";

import { LoadingState } from "src/utils/constants";

export interface PlatesSlice {
  list: [];
  selectedRowIndex: Integer;
  selectedPlate: {};
  loadingImage: LoadingState;
  loadingDetail: LoadingState;
  loadingList: LoadingState;
}

const initialState: PlatesSlice = {
  list: [],
  selectedRowIndex: null,
  selectedPlate: null,
  loadingImage: LoadingState.idle,
  loadingDetail: LoadingState.idle,
  loadingList: LoadingState.idle,
};

export const platesSlice = createSlice({
  name: "plates",
  initialState,
  reducers: {
    setSelectedPlate(state, action) {
      state.selectedPlate = action.payload;
      state.loadingImage = LoadingState.pending;
      return state;
    },
    setSelectedRowIndex(state, action) {
      state.selectedRowIndex = action.payload;
      return state;
    },
    updateSelectedPlate(state, action) {
      state.selectedPlate[action.payload.field] = action.payload.value;
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
    });
    builder.addCase(fetchPlatesList.pending, (state, action) => {
      state.loadingList = LoadingState.pending;
    });
    builder.addCase(fetchPlatesList.fulfilled, (state, action) => {
      state.list = action.payload;
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
} = platesSlice.actions;

export default platesSlice.reducer;
