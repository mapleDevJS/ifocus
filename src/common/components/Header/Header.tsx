import { Link, NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { AppRoutes } from '../../consts';
import { ShoppingCartIcon } from '../Icons/Icons';
import styles from './Header.module.css';
import { useAppSelector } from '../../hooks/hooks';
import { selectTotalsItemsInCart } from '../../../features/shoppingCart/shoppingCartSlice';
import logo from '../../assets/img/logo.png';

interface Props {
    onChange?: (value: string) => void;
    searchDisabled?: boolean;
}

export const Header: React.FC<Props> = ({ onChange, searchDisabled = false }) => {
    const [searchInputs, setSearchInputs] = useState<{ [k in string]: string }>({
        name: '',
    });

    const totalItemsInCart = useAppSelector(selectTotalsItemsInCart);

    const inputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;

        setSearchInputs({
            ...searchInputs,
            [name]: value,
        });

        if (onChange) onChange(value);
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link to={AppRoutes.PRODUCTS}>
                    <img
                        className={styles.logoImg}
                        alt="Logotype of iFocus"
                        src={logo}
                        width="46px"
                        height="50px"
                    />
                </Link>
            </div>

            <div className={styles.headerInfo}>
                <NavLink
                    to={AppRoutes.SHOPPING_CART}
                    className={styles.shoppingCart}
                    aria-label="Navigate To Shopping Cart"
                >
                    {totalItemsInCart > 0 && (
                        <span className={styles.itemsInCart}>{totalItemsInCart}</span>
                    )}
                    <ShoppingCartIcon />
                </NavLink>

                <input
                    className={styles.search}
                    type="text"
                    name="name"
                    placeholder="search by name"
                    onChange={inputChangeHandler}
                    value={searchInputs.name}
                    disabled={searchDisabled}
                />
            </div>
        </header>
    );
};
