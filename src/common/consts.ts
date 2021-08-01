import { Status } from "../app/types";

export const PRODUCTS_PER_PAGE = 5;

export const Messages  = {
    [Status.LOADING]: "Loading...",
    [Status.FAILED]: "Error. Please reload the page",
  };


  export const AppRoutes = {
    ROOT: '/',
    PRODUCTS: '/products',
    SHOPPING_CART: '/cart',
};
