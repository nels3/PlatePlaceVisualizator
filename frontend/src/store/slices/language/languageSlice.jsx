import { createSlice } from "@reduxjs/toolkit";

import { LoadingState } from "src/utils/constants";

export interface LanguageSlice {
  language: String;
}

const availableLanguages = ["pl", "en"];

const initialState: LanguageSlice = {
  language: availableLanguages[0],
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {},
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
