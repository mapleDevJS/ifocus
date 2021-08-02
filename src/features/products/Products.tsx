import React, { useEffect, useState } from 'react';
import { ProductCard } from '../../common/components/ProductCard/ProductCard';
import { Slide } from '../../common/components/Slide/Slide';
import { Notification } from '../../common/components/Notification/Notification';
import { Header } from '../../common/components/Header/Header';
import { loadProductsList, selectProducts } from './productsSlice';
import Pagination from 'rc-pagination';
import { Messages, PRODUCTS_PER_PAGE } from '../../common/consts';
import { selectProductsByPageNumber, filterProductsByName } from './utils';
import styles from './Products.module.css';
// import Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import { Status } from '../../app/types';
import { useAppDispatch, useAppSelector, useDebounce } from '../../common/hooks/hooks';

export const Products: React.FC = () => {
    // install Swiper modules
    SwiperCore.use([Pagination, Navigation]);
    const dispatch = useAppDispatch();
    const { status } = useAppSelector(state => state.products);
    const products = useAppSelector(selectProducts);

    const [searchedProduct, setSearchedProduct] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [filteredProducts, setFilteredProducts] = useState(products);

    const debouncedSearchName = useDebounce(searchedProduct, 300);

    const pageChangeHandler = (page: number) => {
        setPage(page);
    };

    const filteredAndSlicedProducts = selectProductsByPageNumber(filteredProducts, page);
    const totalProducts = filteredProducts.length;

    useEffect(() => {
        dispatch(loadProductsList());
    }, [dispatch]);

    useEffect(() => {
        if (debouncedSearchName) {
            setFilteredProducts(filterProductsByName(products, debouncedSearchName));
        } else {
            setFilteredProducts(products);
        }
    }, [products, debouncedSearchName]);

    const inputChangeHandler = (searchedProduct: string) => {
        setSearchedProduct(searchedProduct);
    };

    return (
        <section className={styles.products}>
            <Header onChange={inputChangeHandler} />

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
                {products.map(product => (
                    <SwiperSlide key={product.id}>
                        <Slide product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {status !== Status.IDLE && <Notification message={Messages[status]} />}

            <ul className={styles.productsList}>
                {filteredAndSlicedProducts.map(product => {
                    return (
                        <li key={product.id} className={styles.productsListItem}>
                            <ProductCard product={product} />
                        </li>
                    );
                })}
            </ul>

            <Pagination
                onChange={pageChangeHandler}
                current={page}
                pageSize={PRODUCTS_PER_PAGE}
                total={totalProducts}
                hideOnSinglePage
            />
        </section>
    );
};
