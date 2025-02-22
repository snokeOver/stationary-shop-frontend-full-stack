import { ICartProduct } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for a single product in the cart

// Define the initial state for the cart
interface ICartState {
  items: ICartProduct[];
}

const initialState: ICartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add a product to the cart
    addToCart: (state, action: PayloadAction<ICartProduct>) => {
      const payload = action.payload;
      const purchaseQuantity = Math.min(
        payload.purchaseQuantity,
        payload.availableQuantity
      );

      const existingProduct = state.items.find(
        (product) => product._id === payload._id
      );

      if (existingProduct) {
        const newPurchaseQuantity =
          existingProduct.purchaseQuantity + purchaseQuantity;
        existingProduct.purchaseQuantity = Math.min(
          newPurchaseQuantity,
          existingProduct.availableQuantity
        );
      } else {
        state.items.push({
          ...payload,
          purchaseQuantity: purchaseQuantity,
        });
      }
    },

    // Remove a product from the cart based on _id
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (product) => product._id !== action.payload
      );
    },

    // Update the purchaseQuantity of a product in the cart
    updateQuantity: (
      state,
      action: PayloadAction<{ _id: string; purchaseQuantity: number }>
    ) => {
      const { _id, purchaseQuantity } = action.payload;
      const product = state.items.find((item) => item._id === _id);
      if (product) {
        product.purchaseQuantity = Math.min(
          purchaseQuantity,
          product.availableQuantity
        );
      }
    },

    // Clear the entire cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
