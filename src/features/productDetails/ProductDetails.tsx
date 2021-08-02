import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { ProductCard } from '../../common/components/ProductCard/ProductCard';
import { loadProduct, resetProduct, selectProduct } from './productDetailsSlice';
import { Notification } from '../../common/components/Notification/Notification';
import { Status } from '../../app/types';
import { Messages } from '../../common/consts';
import styles from './ProductDetails.module.css';
import { Header } from '../../common/components/Header/Header';
import { ContinueShopping } from '../../common/components/ContinueShopping/ContinueShopping';

export const ProductDetails: React.FC = () => {
    const product = useAppSelector(selectProduct);
    const { status } = useAppSelector(state => state.product);
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
            <Header searchDisabled />
            {status !== Status.IDLE && <Notification message={Messages[status]} />}

            {product && (
                <div className={styles.productDetails}>
                    <ProductCard product={product} />
                </div>
            )}

            <ContinueShopping />
        </>
    );
};
