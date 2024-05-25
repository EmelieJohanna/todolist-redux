import { configureStore } from "@reduxjs/toolkit";

// importera in reducers
import todoReducer from "./slices/todo";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});
