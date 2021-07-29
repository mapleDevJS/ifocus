import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../App";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ProductCard } from "./ProductCard/ProductCard";
import { loadProductsList, selectTotalProducts, selectProductsByPageNumber } from "./productsSlice";
import Pagination from "rc-pagination";
import { PRODUCTS_PER_PAGE } from "../../consts";


export const Products: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  //Todo check multiple selector call
  const products = useAppSelector((state) => selectProductsByPageNumber(state, page));
  const totalProducts = useAppSelector(selectTotalProducts);

  const pageChangeHandler = (page: number) => {
    setPage(page);
  }

  useEffect(() => {
    dispatch(loadProductsList());
  }, [dispatch]);

  return (
    <>
      <Pagination
        onChange={pageChangeHandler}
        current={page}
        pageSize={PRODUCTS_PER_PAGE}
        total={totalProducts}
        hideOnSinglePage
      />
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <Link to={`${AppRoutes.PRODUCTS}/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
