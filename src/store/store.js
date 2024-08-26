import { configureStore } from "@reduxjs/toolkit";
import movioReducer from "./movieoSlice";

export const store = configureStore({
  reducer: {
    moviosData: movioReducer,
  },
});
