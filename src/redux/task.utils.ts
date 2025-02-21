import { nanoid } from "@reduxjs/toolkit";
import { ITodo, TTodo } from "./taskSlice";

export const createTodo = (todo: TTodo): ITodo => {
  return {
    id: nanoid(),
    isComplete: false,
    ...todo,
  };
};
