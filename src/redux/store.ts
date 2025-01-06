import todoReducer from "@/features/todoSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: todoReducer,
} as never);
