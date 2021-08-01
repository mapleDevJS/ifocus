import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { ProductCard } from '../../common/components/ProductCard/ProductCard';
import { loadProduct, resetProduct, selectProduct } from './productDetailsSlice';
import { Notification } from '../../common/components/Notification/Notification';
import { Status } from '../../app/types';
import { AppRoutes, Messages } from '../../common/consts';

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
            <NavLink to={AppRoutes.PRODUCTS}>Return to product's list</NavLink>
            {status !== Status.IDLE && <Notification message={Messages[status]} />}
            {product && <ProductCard product={product} />}
        </>
    );
};
