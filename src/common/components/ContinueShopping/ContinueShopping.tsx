import React from "react";
import { AppRoutes } from '../../../common/consts';
import { ContinueShoppingIcon } from '../../../common/components/Icons/Icons';
import styles from './ContinueShopping.module.css';
import { NavLink } from "react-router-dom";

export const ContinueShopping = () => {
    return (
        <NavLink className={styles.continueShopping} to={AppRoutes.PRODUCTS}>
            <ContinueShoppingIcon />
            <span className={styles.continueShoppingText}>Continue shopping</span>
        </NavLink>
    );
};
