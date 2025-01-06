import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
export interface Todo {
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
    addTodo: (state: TodoState, action: PayloadAction<{ text: string }>) => {
      const todo = {
        id: nanoid(),
        text: action.payload.text,
        completed: false,
      };
      state.todos.push(todo);
    },
    removeTodo: (state: TodoState, action: PayloadAction<{ id: string }>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    updateTodo: (
      state: TodoState,
      action: PayloadAction<{ id: string; text: string }>
    ) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
      }
    },
    toggleTodo: (state: TodoState, action: PayloadAction<{ id: string }>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, removeTodo, updateTodo, toggleTodo } =
  todoSlice.actions;
export default todoSlice.reducer;

// Store type
export type RootState = ReturnType<typeof todoSlice.reducer>;

