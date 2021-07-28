import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Config } from "../../config/config";
import { Product, Status } from "../../app/types";

export const productActionTypes = {
  LOAD_PRODUCT: "product/LOAD_PRODUCT",
} as const;

export interface ProductState {
  product: Product | null;
  status: Status;
}

const initialState: ProductState = {
  product: null,
  status: Status.IDLE,
};

export const loadProduct = createAsyncThunk(
  productActionTypes.LOAD_PRODUCT,
  async (id: string) => {
    const response = await fetch(`${Config.BASE_URL}/products/${id}`).then((res) =>
      res.json()
    );

    return response;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    resetProduct: (state) => {
      state.product = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadProduct.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(loadProduct.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.product = action.payload;
      });
  },
});

export const { resetProduct } = productSlice.actions;
export const selectProduct = (state: RootState) => state.product.product;

export default productSlice.reducer;
