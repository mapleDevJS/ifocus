export interface Product {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    title: string;
}

export enum Status {
    IDLE = 'idle',
    LOADING = 'loading',
    FAILED = 'failed',
}

export interface ShoppingCartItem {
    productId: number;
    quantity: number;
}

export interface ProductInCart extends Product {
    quantity: number;
}
