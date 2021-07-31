import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import {
  loadProduct,
  resetProduct,
  selectProduct,
} from "./productDetailsSlice";
import { Notification } from "../../components/Notification/Notification";
import { AppRoutes } from "../../App";
import { Status } from "../../app/types";
import { Messages } from "../../consts";

export const ProductDetails: React.FC = () => {
  const product = useAppSelector(selectProduct);
  const { status } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(loadProduct(id));
    return () => {
      dispatch(resetProduct());
    };
  }, [dispatch, id]);

  return (
    <>
      <NavLink to={AppRoutes.PRODUCTS}>Return to product's list</NavLink>
      {status !== Status.IDLE && <Notification message={Messages[status]} />}
      {product && <ProductCard product={product} />}
    </>
  );
};
