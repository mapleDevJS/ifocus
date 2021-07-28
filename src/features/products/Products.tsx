import React, { useEffect } from "react";

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
            <ProductCard product={product} />
          </li>
        );
      })}
    </ul>
  );
};
