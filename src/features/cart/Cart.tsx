import { useAppSelector } from "../../app/hooks";
import { selectProductsInCart } from "./cartSlice";
import { Product } from "../../components/Product/Product";
import { NavLink } from "react-router-dom";
import { AppRoutes } from "../../App";
import { Notification } from "../../components/Notification/Notification";

export const Cart = () => {
  const products = useAppSelector(selectProductsInCart);

  const isCartEmpty = products.length === 0;

  return (
    <>
      <NavLink to={AppRoutes.PRODUCTS}>Return to product's list</NavLink>
      
      {isCartEmpty &&  <Notification message={'Cart is empty'} />}

      {!isCartEmpty && (
        <ul>
          {products.map((product) => 
            product && (
              <li>
                <Product item={product} />
              </li>
            )
          )}
        </ul>
      )}
    </>
  );
};
