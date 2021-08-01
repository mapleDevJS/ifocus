import React, { useEffect, useState } from 'react';
import { ProductCard } from '../../common/components/ProductCard/ProductCard';
import { Notification } from '../../common/components/Notification/Notification';
import { loadProductsList, selectProducts } from './productsSlice';
import Pagination from 'rc-pagination';
import { AppRoutes, Messages, PRODUCTS_PER_PAGE } from '../../common/consts';
import { selectProductsByPageNumber, filterProductsByName } from './utils';
import { NavLink } from 'react-router-dom';
import './Products.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import SwiperCore, { Navigation } from 'swiper/core';
import { Status } from '../../app/types';
import { useAppDispatch, useAppSelector, useDebounce } from '../../common/hooks/hooks';
// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

export const Products: React.FC = () => {
    const { status } = useAppSelector(state => state.products);
    const [page, setPage] = useState<number>(1);
    const [searchInputs, setSearchInputs] = useState<{ [k in string]: string }>(
        {
            name: '',
        },
    );
    const debouncedSearchName = useDebounce(searchInputs.name, 300);
    const dispatch = useAppDispatch();

    const products = useAppSelector(selectProducts);
    const [filteredProducts, setFilteredProducts] = useState(products);

    const pageChangeHandler = (page: number) => {
        setPage(page);
    };

    const filteredAndSlicedProducts = selectProductsByPageNumber(
        filteredProducts,
        page,
    );
    const totalProducts = filteredProducts.length;

    useEffect(() => {
        dispatch(loadProductsList());
    }, [dispatch]);

    useEffect(() => {
        if (debouncedSearchName) {
            setFilteredProducts(
                filterProductsByName(products, debouncedSearchName),
            );
        } else {
            setFilteredProducts(products);
        }
    }, [products, debouncedSearchName]);

    const inputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;

        setSearchInputs({
            ...searchInputs,
            [name]: value,
        });
    };

    return (
        <>
            <NavLink to={AppRoutes.SHOPPING_CART}>Go to Cart</NavLink>
            {status !== Status.IDLE && (
                <Notification message={Messages[status]} />
            )}
            <Pagination
                onChange={pageChangeHandler}
                current={page}
                pageSize={PRODUCTS_PER_PAGE}
                total={totalProducts}
                hideOnSinglePage
            />
            <input
                type="text"
                name="name"
                placeholder="search by name"
                onChange={inputChangeHandler}
                value={searchInputs.name}
            />

            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                slidesPerGroup={5}
                loop={true}
                loopFillGroupWithBlank={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                className="mySwiper"
            >
                {filteredAndSlicedProducts.map(product => {
                    return (
                        <SwiperSlide key={product.id}>
                            <ProductCard product={product} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            <ul>
                {filteredAndSlicedProducts.map(product => {
                    return (
                        <li key={product.id}>
                            <ProductCard product={product} />
                        </li>
                    );
                })}
            </ul>
        </>
    );
};
