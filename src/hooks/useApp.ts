import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

// export const useAppSelector = useSelector.withTypes<RootState>();

const createSliceSelector = <T>(selector: (state: RootState) => T) => {
  return () => useSelector(selector);
};

export const useCounterSelector = createSliceSelector((state) => state.counter);
export const useTodoSelector = createSliceSelector((state) => {
  const filter = state.todo.filter;
  if (filter === "Low")
    return state.todo.todos.filter((todo) => todo.priority === "Low");
  if (filter === "Medium")
    return state.todo.todos.filter((todo) => todo.priority === "Medium");
  if (filter === "High")
    return state.todo.todos.filter((todo) => todo.priority === "High");
  return state.todo.todos;
});
export const useTodoFilterSelector = createSliceSelector(
  (state) => state.todo.filter
);

export const useUserSelector = createSliceSelector((state) => state.user);

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
