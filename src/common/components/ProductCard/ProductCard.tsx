import { useAppDispatch } from '../../../common/hooks/hooks';
import { Link } from 'react-router-dom';
import { Product } from '../../../app/types';
import { addProductToCart } from '../../../features/shoppingCart/shoppingCartSlice';
import { AppRoutes } from '../../consts';
import styles from './ProductCard.module.css';

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
            <div className={styles.productImgBox}>
                <Link to={`${AppRoutes.PRODUCTS}/${id}`}>
                    <img
                        className={styles.productImg}
                        alt={title}
                        src={image}
                        width="100%"
                        height="260px"
                    />
                </Link>
            </div>

            <div className={styles.productDescription}>
                <div className={styles.titleBox}>
                    <Link to={`${AppRoutes.PRODUCTS}/${id}`} className={styles.link}>
                        <h3>{title}</h3>
                    </Link>
                    <span className={styles.category}>{category}</span>
                </div>
                <div className={styles.descriptionBox}>
                    <p>{description}</p>
                </div>

                <div className={styles.cardControls}>
                    <span className={styles.price}>${price}</span>
                    <button
                        className={styles.addToCartButton}
                        aria-label="add to cart"
                        onClick={() => addToCartClickHandler(id)}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </article>
    );
};
