import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface TodoData {
  id: string;
  name: string;
  activated: boolean;
}


// interface nen dat ten dang I+ten, eg: ITodo
interface ITodo {

  // array thi dat ten so nhieu
  // todo: TodoData[];
  todos: TodoData[];
}

const initialState: ITodo = {
  todos: [],
};

export const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ name: string }>) => {
      state.todos.push({
        id: uuidv4(),
        name: action.payload.name,
        activated: false,
      });
    },
    deleteTodo: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const filteredTodos = state.todos.filter(
        (todo) =>
          todo.id !== action.payload.id || todo.name !== action.payload.name
      );

      return { ...state, todo: filteredTodos };
    },
    activatedTodo: (
      state,
      action: PayloadAction<{ id: string; name: string; activated: boolean }>
    ) => {
      const targetIndex = state.todos.findIndex(
        (todo) =>
          todo.id === action.payload.id
      );
      const activate = action.payload.activated;
      if (targetIndex !== -1) {
        return {
          ...state,
          todos: [
            ...state.todos.slice(0, targetIndex),
            { ...state.todos[targetIndex], activated: activate },
            ...state.todos.slice(targetIndex + 1),
          ],
        };
      } else {
        console.warn("Todo item to activate not found");
        return state;
      }
    },
    editTodo: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const targetIndex = state.todos.findIndex(
        (todo) =>
          todo.id === action.payload.id
      );
      if (targetIndex !== -1) {
        return {
          ...state,
          todo: [
            ...state.todos.slice(0, targetIndex),
            { ...state.todos[targetIndex], name: action.payload.name },
            ...state.todos.slice(targetIndex + 1),
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
