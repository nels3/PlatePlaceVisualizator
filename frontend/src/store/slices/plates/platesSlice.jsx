import { createSlice } from "@reduxjs/toolkit";
import { fetchPlatesList, fetchPlateImage, updatePlate } from "./platesThunk";

export interface PlatesSlice {
  list: [];
  selectedRowIndex: Integer;
  selectedPlate: {};
  loadingImage: String;
  loadingDetail: String;
  loadingList: Boolean;
}

const initialState: PlatesSlice = {
  list: [],
  selectedRowIndex: null,
  selectedPlate: null,
  loadingImage: "idle",
  loadingDetail: "idle",
  loadingList: false,
};

export const platesSlice = createSlice({
  name: "plates",
  initialState,
  reducers: {
    setSelectedPlate(state, action) {
      state.selectedPlate = action.payload;
      state.loadingImage = "pending";
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
      state.loadingImage = "fulfilled";
    });
    builder.addCase(updatePlate.pending, (state, action) => {
      state.loadingDetail = "pending";
    });
    builder.addCase(updatePlate.fulfilled, (state, action) => {
      state.loadingDetail = "fulfilled";
    });
    builder.addCase(fetchPlatesList.pending, (state, action) => {
      state.loadingList = true;
    });
    builder.addCase(fetchPlatesList.fulfilled, (state, action) => {
      state.list = action.payload;
      state.loadingList = false;
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
