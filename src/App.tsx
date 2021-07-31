import { createBrowserHistory } from "history";
import React from "react";
import {
  Redirect,  
  Route,
  Router,
  Switch,
} from "react-router-dom";
import "./App.css";
import { Products } from "./features/products/Products";
import { ProductDetails } from "./features/productDetails/ProductDetails";
import { Cart } from "./features/cart/Cart";

export const AppRoutes = {
  ROOT: '/',
  PRODUCTS: '/products',
  CART: '/cart',
}

export const history = createBrowserHistory();

const App = () => {
  return (
    <div className="App">
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
          <Route
            exact
            path={`${AppRoutes.CART}`}
            component={Cart}
          />
        </Switch>
        <Redirect exact from={AppRoutes.ROOT} to={AppRoutes.PRODUCTS} />
      </Router>
    </div>
  );
}

export default App;
