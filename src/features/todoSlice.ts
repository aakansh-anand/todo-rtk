import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}
export interface TodoState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
  todos: Todo[];
}

const initialState: TodoState = {
  status: "idle",
  error: null,
  todos: [],
};

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAync",
  async (text: string) => {
    return new Promise<Todo>((resolve) => {
      setTimeout(() => {
        const todo = {
          id: nanoid(),
          text,
          completed: false,
        };
        resolve(todo);
      }, 3000);
    });
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(addTodoAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos.push(action.payload);
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { addTodo, removeTodo, updateTodo, toggleTodo } =
  todoSlice.actions;
export default todoSlice.reducer;

// Store type
export type RootState = ReturnType<typeof todoSlice.reducer>;
