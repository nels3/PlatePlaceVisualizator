import { configureStore } from "@reduxjs/toolkit";
import platesReducer from "src/store/slices/plates/platesSlice";
import mapReducer from "src/store/slices/map/mapSlice";
import languageReducer from "src/store/slices/language/languageSlice";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    plates: platesReducer,
    map: mapReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
