import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import productReducer from "../features/productDetails/productDetailsSlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
