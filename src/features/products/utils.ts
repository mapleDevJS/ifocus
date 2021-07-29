import { PRODUCTS_PER_PAGE } from "../../consts";
import { Product } from "../../app/types";

export const filterProductsByName = (products: Product[], name: string) => {
  return products && name.length !== 0
    ? products.filter((product) =>
        product.title.trim().toLowerCase().includes(name)
      )
    : products;
};

export const selectProductsByPageNumber = (products: Product[], page: number) =>
  products.slice(
    PRODUCTS_PER_PAGE * page - PRODUCTS_PER_PAGE,
    PRODUCTS_PER_PAGE * page
  );
