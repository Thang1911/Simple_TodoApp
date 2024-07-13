import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface TodoData {
  id: string;
  name: string;
  activated: boolean;
}

interface Todo {
  todo: TodoData[];
}

const initialState: Todo = {
  todo: [],
};

export const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ name: string }>) => {
      state.todo.push({
        id: uuidv4(),
        name: action.payload.name,
        activated: false,
      });
    },
    deleteTodo: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const filteredTodos = state.todo.filter(
        (todo) =>
          todo.id !== action.payload.id || todo.name !== action.payload.name
      );

      return { ...state, todo: filteredTodos };
    },
    activatedTodo: (
      state,
      action: PayloadAction<{ id: string; name: string; activated: boolean }>
    ) => {
      const targetIndex = state.todo.findIndex(
        (todo) =>
          todo.id === action.payload.id
      );
      const activate = action.payload.activated;
      if (targetIndex !== -1) {
        return {
          ...state,
          todo: [
            ...state.todo.slice(0, targetIndex),
            { ...state.todo[targetIndex], activated: activate },
            ...state.todo.slice(targetIndex + 1),
          ],
        };
      } else {
        console.warn("Todo item to activate not found");
        return state;
      }
    },
    editTodo: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const targetIndex = state.todo.findIndex(
        (todo) =>
          todo.id === action.payload.id
      );
      if (targetIndex !== -1) {
        return {
          ...state,
          todo: [
            ...state.todo.slice(0, targetIndex),
            { ...state.todo[targetIndex], name: action.payload.name },
            ...state.todo.slice(targetIndex + 1),
          ],
        };
      } else {
        console.warn("Todo item to edit not found");
        return state;
      }
    },
  },
});

export const { addTodo, deleteTodo, activatedTodo, editTodo } =
  TodoSlice.actions;

export default TodoSlice.reducer;
