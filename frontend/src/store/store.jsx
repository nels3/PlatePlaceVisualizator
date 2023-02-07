import { configureStore } from "@reduxjs/toolkit";
import platesReducer from "src/store/slices/plates/platesSlice";
import mapReducer from "src/store/slices/map/mapSlice";
import languageReducer from "src/store/slices/language/languageSlice";
import worldReducer from "src/store/slices/world/worldSlice";
import commonReducer from "src/store/slices/common/commonSlice";
import checkerReducer from "src/store/slices/checker/checkerSlice";

export const store = configureStore({
  reducer: {
    common: commonReducer,
    language: languageReducer,
    plates: platesReducer,
    map: mapReducer,
    world: worldReducer,
    checker: checkerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
