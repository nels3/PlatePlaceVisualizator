import { configureStore } from "@reduxjs/toolkit";
import platesReducer from "src/store/slices/plates/platesSlice";

export const store = configureStore({
  reducer: {
    plates: platesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
