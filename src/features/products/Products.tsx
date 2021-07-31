import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, useDebounce } from "../../app/hooks";
import { ProductCard } from "./ProductCard/ProductCard";
import {
  loadProductsList,
  selectProducts,
} from "./productsSlice";
import Pagination from "rc-pagination";
import { PRODUCTS_PER_PAGE } from "../../consts";
import { selectProductsByPageNumber, filterProductsByName } from './utils';
import { createCart } from "../cart/cartSlice";
import { NavLink } from "react-router-dom";
import { AppRoutes } from "../../App";


export const Products: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [searchInputs, setSearchInputs] = useState<{ [k in string]: string }>({
    name: "",
  });
  const debouncedSearchName = useDebounce(searchInputs.name, 300);
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const pageChangeHandler = (page: number) => {
    setPage(page);
  };

  const filteredAndSlicedProducts = selectProductsByPageNumber(filteredProducts, page);
  const totalProducts = filteredProducts.length;

  useEffect(() => {
    dispatch(loadProductsList());
    dispatch(createCart());
  }, [dispatch]);

  useEffect(() => {
    if (debouncedSearchName) {
      setFilteredProducts(filterProductsByName(products, debouncedSearchName));
    } else {
      setFilteredProducts(products);
    }
  }, [products, debouncedSearchName]);

  const inputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    setSearchInputs({
      ...searchInputs,
      [name]: value,
    });
  };

  return (
    <>
      <NavLink to={AppRoutes.CART}>Go to Cart</NavLink>
      <Pagination
        onChange={pageChangeHandler}
        current={page}
        pageSize={PRODUCTS_PER_PAGE}
        total={totalProducts}
        hideOnSinglePage
      />
      <input
        type="text"
        name="name"
        placeholder="search by name"
        onChange={inputChangeHandler}
        value={searchInputs.name}
      />
      <ul>
        {filteredAndSlicedProducts.map((product) => {
          return (
            <li key={product.id}>
                <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </>
  );
};
