import { useAppSelector } from '../../common/hooks/hooks';
import { selectProductsInCart } from './shoppingCartSlice';
import { ItemInCart } from '../../common/components/ItemInCart/ItemInCart';
import { Notification } from '../../common/components/Notification/Notification';
import styles from './ShoppingCart.module.css';
import { Header } from '../../common/components/Header/Header';
import { ContinueShopping } from '../../common/components/ContinueShopping/ContinueShopping';

export const ShoppingCart = () => {
    const products = useAppSelector(selectProductsInCart);

    const isCartEmpty = products.length === 0;

    return (
        <>
            <Header searchDisabled />
            {isCartEmpty && <Notification message={'Cart is empty'} />}

            {!isCartEmpty && (
                <ul className={styles.itemsList}>
                    {products.map(
                        product =>
                            product && (
                                <li className={styles.item}>
                                    <ItemInCart item={product} />
                                </li>
                            ),
                    )}
                </ul>
            )}

            {/* <NavLink className={styles.continueShopping} to={AppRoutes.PRODUCTS}>
                <ContinueShoppingIcon />
                <span className={styles.continueShoppingText}>Continue shopping</span>
            </NavLink> */}
            <ContinueShopping />
        </>
    );
};
