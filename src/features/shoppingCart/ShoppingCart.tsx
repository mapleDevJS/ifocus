import { useAppSelector } from '../../common/hooks/hooks';
import { selectProductsInCart } from './shoppingCartSlice';
import { Product } from '../../common/components/Product/Product';
import { NavLink } from 'react-router-dom';
import { AppRoutes } from '../../common/consts';
import { Notification } from '../../common/components/Notification/Notification';

export const ShoppingCart = () => {
    const products = useAppSelector(selectProductsInCart);

    const isCartEmpty = products.length === 0;

    return (
        <>
            <NavLink to={AppRoutes.PRODUCTS}>Return to product's list</NavLink>

            {isCartEmpty && <Notification message={'Cart is empty'} />}

            {!isCartEmpty && (
                <ul>
                    {products.map(
                        product =>
                            product && (
                                <li>
                                    <Product item={product} />
                                </li>
                            ),
                    )}
                </ul>
            )}
        </>
    );
};
