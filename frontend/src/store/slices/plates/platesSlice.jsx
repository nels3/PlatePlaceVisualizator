import { createSlice } from "@reduxjs/toolkit";
import { fetchPlatesList } from "./platesThunk";

export interface PlatesSlice {
  list: [];
  selectedRowIndex: Integer;
  selectedPlate: {};
  loadingList: Boolean;
}

const initialState: PlatesSlice = {
  list: [],
  selectedRowIndex: null,
  selectedPlate: null,
  loadingList: [],
};

export const platesSlice = createSlice({
  name: "plates",
  initialState,
  reducers: {
    setSelectedPlate(state, action) {
      state.selectedPlate = action.payload;
      return state;
    },
    setSelectedRowIndex(state, action) {
      state.selectedRowIndex = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlatesList.fulfilled, (state, action) => {
      state.list = action.payload;
      state.loadingList = false;
    });
  },
});

export const { setSelectedPlate, setSelectedRowIndex } = platesSlice.actions;

export default platesSlice.reducer;
