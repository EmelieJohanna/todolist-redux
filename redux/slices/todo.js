import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    inputValue: "",
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.done = !todo.done;
      }
    },
    updateInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
  },
});

export const { addTodo, removeTodo, toggleTodo, updateInputValue } =
  todoSlice.actions;

export default todoSlice.reducer;
