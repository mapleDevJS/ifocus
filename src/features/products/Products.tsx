import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../App";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ProductCard } from "./ProductCard/ProductCard";
import { loadProductsList, selectProducts } from "./productsSlice";

export const Products: React.FC = () => {
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadProductsList());
  }, [dispatch]);

  return (
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
  );
};
