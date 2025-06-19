import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../app/cartSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
