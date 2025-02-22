import { ICartProduct } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICartState {
  items: ICartProduct[];
  totalPrice: number;
}

const initialState: ICartState = {
  items: [],
  totalPrice: 0,
};

const calculateTotalPrice = (items: ICartProduct[]): number =>
  items.reduce((acc, item) => acc + item.price * item.purchaseQuantity, 0);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add a product to the cart and update totalPrice accordingly
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
      state.totalPrice = calculateTotalPrice(state.items);
    },

    // Remove a product from the cart and update totalPrice
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (product) => product._id !== action.payload
      );
      state.totalPrice = calculateTotalPrice(state.items);
    },

    // Update the purchaseQuantity of a product in the cart and recalc totalPrice
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
      state.totalPrice = calculateTotalPrice(state.items);
    },

    // Clear the entire cart and reset totalPrice to 0
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
