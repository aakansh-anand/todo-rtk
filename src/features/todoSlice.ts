import { createSlice } from "@reduxjs/toolkit";
import { addTodo, removeTodo, toggleTodo, updateTodo } from "./reducers";
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo,
    removeTodo,
    updateTodo,
    toggleTodo,
  },
});

export const todoActions = todoSlice.actions;
export default todoSlice.reducer;

// Store type
export interface RootState {
  todo: TodoState;
}
