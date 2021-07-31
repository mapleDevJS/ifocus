import { useAppSelector } from "../../app/hooks";
import { selectProductsInCart } from "./cartSlice";
import { Product } from "../../components/Product/Product";
import { NavLink } from "react-router-dom";
import { AppRoutes } from "../../App";

export const Cart = () => {
  const products = useAppSelector(selectProductsInCart);

  return (
    <>
      <NavLink to={AppRoutes.PRODUCTS}>Return to product's list</NavLink>
      {products.length > 0 && (
        <ul>
          {products.map((product) => {
            return product ? (
              <li>
                <Product item={product} />
              </li>
            ) : (
              <></>
            );
          })}
        </ul>
      )}
    </>
  );
};
