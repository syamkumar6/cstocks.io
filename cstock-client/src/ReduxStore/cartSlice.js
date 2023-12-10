import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  totalPrice: 0
};

export const cartSlice = createSlice({
  name: "cartslice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const ItemIndex = state.carts.findIndex(
        (item) => item._id === action.payload._id
      );

      if (ItemIndex >= 0) {
        state.carts[ItemIndex].quantity += 1;
      } else {
        const temp = { ...action.payload, quantity: 1 };
        state.carts = [...state.carts, temp];
        
      }
    },

    removeToCart: (state, action) => {
      const data = state.carts.filter((item) => item._id !== action.payload);
      state.carts = data;
    },

    itemQntyDecrement: (state, action) => {
      const ItemIndex_dec = state.carts.findIndex(
        (item) => item._id === action.payload._id
      );
      if (state.carts[ItemIndex_dec].quantity >= 1) {
        state.carts[ItemIndex_dec].quantity -= 1;
      }
    },

    clearCart: (state, action) => {
      state.carts = []
    },
    
  },
});

export const { addToCart, removeToCart, itemQntyDecrement, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
