import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItem: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems: (state, action) => {
      state.cartItem.push(action.payload);
    },
    removeItems: (state, action) => {},
    clearItems: (state, action) => {
        state.cartItem = []
    },
  },
});
export const { addItems, removeItems, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
