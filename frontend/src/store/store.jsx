import { configureStore } from "@reduxjs/toolkit";
import platesReducer from "src/store/slices/plates/platesSlice";
import mapReducer from "src/store/slices/map/mapSlice";

export const store = configureStore({
  reducer: {
    plates: platesReducer,
    map: mapReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
