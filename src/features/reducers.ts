import { nanoid, PayloadAction } from "@reduxjs/toolkit";
import { TodoState } from "./todoSlice";
export const addTodo = (
  state: TodoState,
  action: PayloadAction<{ text: string }>
) => {
  const todo = {
    id: nanoid(),
    text: action.payload.text,
    completed: false,
  };
  state.todos.push(todo);
};

export const removeTodo = (
  state: TodoState,
  action: PayloadAction<{ id: string }>
) => {
  state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
};

export const updateTodo = (
  state: TodoState,
  action: PayloadAction<{ id: string; text: string }>
) => {
  const { id, text } = action.payload;
  const todo = state.todos.find((todo) => todo.id === id);
  if (todo) {
    todo.text = text;
  }
};

export const toggleTodo = (
  state: TodoState,
  action: PayloadAction<{ id: string }>
) => {
  const todo = state.todos.find((todo) => todo.id === action.payload.id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};