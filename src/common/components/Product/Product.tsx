import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../common/hooks/hooks';
import { ProductInCart } from '../../../app/types';
import { addProductToCart, removeProductFromCart } from '../../../features/shoppingCart/shoppingCartSlice';
import { AppRoutes } from '../../consts';

interface Props {
    item: ProductInCart;
}

export const Product: React.FC<Props> = ({ item }) => {
    const dispatch = useAppDispatch();
    const { id, title, description, price, category, image, quantity } = item;

    const addToCartClickHandler = (id: number) => {
        dispatch(addProductToCart(id));
    };

    const removeClickHandler = (id: number) => {
        dispatch(removeProductFromCart(id));
    };

    return (
        <article>
            <Link to={`${AppRoutes.PRODUCTS}/${id}`}>
                <img alt={title} src={image} width="80" height="80" />
            </Link>
            <Link to={`${AppRoutes.PRODUCTS}/${id}`}>
                <h3>{title}</h3>
            </Link>
            <span>{category}</span>
            <p>{description}</p>
            <span>{price} $</span>
            <span>Qty.</span>
            <span>{quantity}</span>
            <button aria-label="add to cart" onClick={() => addToCartClickHandler(id)}>
                Add to cart
            </button>
            <button aria-label="add to cart" onClick={() => removeClickHandler(id)}>
                Remove from cart
            </button>
        </article>
    );
};
