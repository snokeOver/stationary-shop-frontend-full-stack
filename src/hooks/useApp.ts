import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

// export const useAppSelector = useSelector.withTypes<RootState>();

const createSliceSelector = <T>(selector: (state: RootState) => T) => {
  return () => useSelector(selector);
};
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAuthSelector = createSliceSelector((state) => state.auth);
export const useCartSelector = createSliceSelector((state) => state.cart);
export const useProductSelector = createSliceSelector((state) => state.product);
