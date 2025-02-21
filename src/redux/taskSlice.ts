import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { createTodo } from "./task.utils";
import { deleteUser } from "./userSlice";

export interface ITodo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  isComplete: boolean;
  priority: "High" | "Medium" | "Low";
  assignedUser: string | null;
}

interface IInitialState {
  todos: ITodo[];
  filter: "High" | "Medium" | "Low" | "All";
}

export type TTodo = Pick<
  ITodo,
  "description" | "dueDate" | "priority" | "title"
>;

const initialState: IInitialState = {
  todos: [],
  filter: "All",
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TTodo>) => {
      state.todos.push(createTodo(action.payload));
    },
    toggleCompleteTodo: (state, action: PayloadAction<string>) => {
      state.todos.forEach((todo) =>
        todo.id === action.payload ? (todo.isComplete = !todo.isComplete) : todo
      );
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    updateFilter: (
      state,
      action: PayloadAction<"High" | "Medium" | "Low" | "All">
    ) => {
      state.filter = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(deleteUser, (state, action) => {
      state.todos.forEach((todo) =>
        todo.assignedUser === action.payload ? (todo.assignedUser = null) : todo
      );
    });
  },
});

export const { addTask, toggleCompleteTodo, deleteTodo, updateFilter } =
  taskSlice.actions;

export default taskSlice.reducer;
