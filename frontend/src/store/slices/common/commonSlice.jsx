import { createSlice } from "@reduxjs/toolkit";
import { ModalState } from "src/utils/constants";

export interface CommonSlice {
  modalState: {};
  modalText: {};
}

const initialState: CommonSlice = {
  modalState: {},
  modalText: {},
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    openModal(state, action) {
      state.modalState[action.payload] = ModalState.open;
      return state;
    },
    closeModal(state, action) {
      state.modalState[action.payload] = ModalState.close;
      return state;
    },
    setText(state, action) {
      state.modalText[action.payload.id] = action.payload.text;
      return state;
    },
  },
  extraReducers: (builder) => {},
});

export const { openModal, closeModal, setText } = commonSlice.actions;

export default commonSlice.reducer;
