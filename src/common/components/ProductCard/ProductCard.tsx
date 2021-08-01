import { useAppDispatch } from '../../../common/hooks/hooks';
import { Link } from 'react-router-dom';
import { Product } from '../../../app/types';
import { addProductToCart } from '../../../features/shoppingCart/shoppingCartSlice';
import { AppRoutes } from '../../consts';

interface Props {
    product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
    const dispatch = useAppDispatch();
    const { id, title, description, price, category, image } = product;

    const addToCartClickHandler = (id: number) => {
        dispatch(addProductToCart(id));
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
            <button aria-label="add to cart" onClick={() => addToCartClickHandler(id)}>
                Add to cart
            </button>
        </article>
    );
};
