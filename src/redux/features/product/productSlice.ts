import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "@/types";

interface ProductState {
  product: IProduct | null;
}

const initialState: ProductState = {
  product: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    storeProduct: (state, action: PayloadAction<IProduct>) => {
      state.product = action.payload;
    },
    clearProduct: (state) => {
      state.product = null;
    },
    clearImageUrl: (state) => {
      if (state.product) {
        state.product.imageUrl = "";
      }
    },
  },
});

export const { storeProduct, clearProduct, clearImageUrl } =
  productSlice.actions;
export default productSlice.reducer;
