import { configureStore } from "@reduxjs/toolkit";
import platesReducer from "src/store/slices/plates/platesSlice";
import mapReducer from "src/store/slices/map/mapSlice";
import languageReducer from "src/store/slices/language/languageSlice";
import worldReducer from "src/store/slices/world/worldSlice";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    plates: platesReducer,
    map: mapReducer,
    world: worldReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
