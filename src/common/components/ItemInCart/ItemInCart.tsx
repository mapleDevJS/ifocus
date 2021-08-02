import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { ProductInCart } from '../../../app/types';
import {
    addProductToCart,
    removeProductFromCart,
} from '../../../features/shoppingCart/shoppingCartSlice';
import { AppRoutes } from '../../consts';
import styles from './ItemInCart.module.css';
import { DecrementIcon, IncrementIcon } from '../Icons/Icons';

interface Props {
    item: ProductInCart;
}

export const ItemInCart: React.FC<Props> = ({ item }) => {
    const dispatch = useAppDispatch();
    const { id, title, price, category, image, quantity } = item;

    const addToCartClickHandler = (id: number) => {
        dispatch(addProductToCart(id));
    };

    const removeClickHandler = (id: number) => {
        dispatch(removeProductFromCart(id));
    };

    return (
        <article className={styles.cartItem}>


                <div className={styles.itemImgBox}>
                    <Link to={`${AppRoutes.PRODUCTS}/${id}`} className={styles.imgLink}>
                        <img className={styles.itemImg} alt={title} src={image} />
                    </Link>
                </div>
                <div>
                    <Link to={`${AppRoutes.PRODUCTS}/${id}`}>
                        <h3>{title}</h3>
                    </Link>
                    <span className={styles.category}>{category}</span>
                </div>
                <div>
                    <span className={styles.price}>${price}</span>
                </div>
                <div>
                    <span className={styles.quantity}>
                        <button
                            className={styles.decrementButton}
                            aria-label="remove from cart"
                            onClick={() => removeClickHandler(id)}
                        >
                            <DecrementIcon />
                        </button>
                        {quantity}
                        <button
                            className={styles.incrementButton}
                            aria-label="add to cart"
                            onClick={() => addToCartClickHandler(id)}
                        >
                            <IncrementIcon />
                        </button>
                    </span>
                </div>
                <div>
                <span className={styles.price}>Total: ${(quantity * price).toFixed(2)}</span>
                </div>
        </article>
    );
};
