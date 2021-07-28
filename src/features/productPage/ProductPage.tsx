import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ProductCard } from "../products/ProductCard/ProductCard";
import { loadProduct, resetProduct, selectProduct } from "./productPageSlice";

export const ProductPage: React.FC = () => {
  const product = useAppSelector(selectProduct);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(loadProduct(id));
    return () => {
      dispatch(resetProduct());
    };
  }, [dispatch, id]);

  return <>{product && <ProductCard product={product} />}</>;
};
