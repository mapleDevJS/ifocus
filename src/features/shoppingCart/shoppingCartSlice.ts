import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Config } from '../../config/config';
import { ShoppingCartItem, Status } from '../../app/types';
import { RootState } from '../../app/store';

export const cartActionTypes = {
    CREATE_CART: 'cart/CREATE_CART',
    LOAD_CART: 'cart/LOAD_CART',
    ADD_PRODUCT_TO_CART: 'cart/ADD_PRODUCT_TO_CART',
} as const;

export interface CartState {
    status: Status;
    cartId: number | null;
    userId: number | null;
    date: string;
    products: ShoppingCartItem[];
    total: number;
}

const initialState: CartState = {
    status: Status.IDLE,
    cartId: null,
    userId: 1,
    date: '',
    products: [],
    total: 0,
};

export const createCart = createAsyncThunk(cartActionTypes.CREATE_CART, async () => {
    const response = await fetch(`${Config.BASE_URL}/carts`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            userId: 5,
            date: new Date(),
            products: [],
        }),
    }).then(res => res.json());

    return response;
});

export const loadCart = createAsyncThunk(
    cartActionTypes.LOAD_CART,
    async (_undefined, { getState }) => {
        const { cart } = getState() as RootState;
        const response = await fetch(`${Config.BASE_URL}/carts/${cart.cartId}`).then(res =>
            res.json(),
        );

        return response;
    },
);

export const cartSlice = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        addProductToCart: (state, action: PayloadAction<{id: number, price: number}>) => {
            if (state.products.length) {
                const foundProduct = state.products.find(
                    product => product.productId === action.payload.id
                );

                if (foundProduct) {
                    foundProduct.quantity++;

                } else {
                    state.products.push({ productId: action.payload.id, quantity: 1 });

                }
            } else {
                state.products.push({ productId: action.payload.id, quantity: 1 });
            }
            state.total += action.payload.price;
        },

        removeProductFromCart: (state, action: PayloadAction<{id: number, price: number}>) => {
            const foundProduct = state.products.find(
                product => product.productId === action.payload.id,
            );

            if (foundProduct && foundProduct.quantity > 1) {
                foundProduct.quantity--;
            } else {
                state.products = state.products.filter(
                    product => product.productId !== action.payload.id,

                );
            }
            state.total -= action.payload.price;
        },
    },

    extraReducers: builder => {
        builder
            .addCase(createCart.pending, state => {
                state.status = Status.LOADING;
            })
            .addCase(loadCart.pending, state => {
                state.status = Status.LOADING;
            })
            .addCase(loadCart.fulfilled, (state, action) => {
                state.status = Status.IDLE;
                state.date = action.payload.date;
                state.products = action.payload.products;
            });
    },
});

export const { addProductToCart, removeProductFromCart } = cartSlice.actions;

export const selectProductsInCart = (state: RootState) => {
    const productsInCart = state.cart.products;
    const products = state.products.products;

    return productsInCart.map(CartItem => {
        const product = products.find(product => product.id === CartItem.productId);
        return product ? { ...product, quantity: CartItem.quantity } : undefined;
    });
};

export const selectCartId = (state: RootState) => state.cart.cartId;
export const selectTotalsItemsInCart = (state: RootState) =>
    state.cart.products.reduce((total, product) => total + product.quantity, 0);

export default cartSlice.reducer;
