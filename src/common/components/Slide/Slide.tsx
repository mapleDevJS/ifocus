import { Link } from 'react-router-dom';
import { Product } from '../../../app/types';
import { AppRoutes } from '../../consts';
import styles from './Slide.module.css';

interface Props {
    product: Product;
}

export const Slide: React.FC<Props> = ({ product }) => {
    const { id, title, category, image } = product;

    return (
        <div className={styles.productCard}>
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
            </div>
        </div>
    );
};
