import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Config } from '../../config/config';
import { Product, Status } from '../../app/types';

export const productsActionTypes = {
    LOAD_PRODUCTS_LIST: 'products/LOAD_PRODUCTS_LIST',
} as const;

export interface ProductsState {
    products: Product[];
    status: Status;
}

const initialState: ProductsState = {
    products: [],
    status: Status.IDLE,
};

export const loadProductsList = createAsyncThunk(
    productsActionTypes.LOAD_PRODUCTS_LIST,
    async () => {
        const response = await fetch(`${Config.BASE_URL}/products`).then(res => res.json());

        return response;
    },
);

export const productsSlice = createSlice({
    name: 'products',
    initialState,

    reducers: {},

    extraReducers: builder => {
        builder
            .addCase(loadProductsList.pending, state => {
                state.status = Status.LOADING;
            })
            .addCase(loadProductsList.fulfilled, (state, action) => {
                state.status = Status.IDLE;
                state.products = action.payload;
            });
    },
});

export const selectProducts = (state: RootState) => state.products.products;

export default productsSlice.reducer;
