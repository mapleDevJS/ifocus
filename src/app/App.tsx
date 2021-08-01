import { createBrowserHistory } from 'history';
import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import './App.css';
import { Products } from '../features/products/Products';
import { ProductDetails } from '../features/productDetails/ProductDetails';
import { ShoppingCart } from '../features/shoppingCart/ShoppingCart';
import { AppRoutes } from '../common/consts';

export const history = createBrowserHistory();

const App = () => {
    return (
        <div className="container">
            <Router history={history}>
                <Switch>
                    <Route
                        exact
                        path={AppRoutes.PRODUCTS}
                        component={Products}
                    />
                    <Route
                        exact
                        path={`${AppRoutes.PRODUCTS}/:id`}
                        component={ProductDetails}
                    />
                    <Route exact path={`${AppRoutes.SHOPPING_CART}`} component={ShoppingCart} />
                </Switch>
                <Redirect exact from={AppRoutes.ROOT} to={AppRoutes.PRODUCTS} />
            </Router>
        </div>
    );
};

export default App;
