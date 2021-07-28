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
import { ProductPage } from "./features/productPage/ProductPage";

export const AppRoutes = {
  ROOT: '/',
  PRODUCTS: '/products',
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
            component={ProductPage}
          />
        </Switch>
        <Redirect exact from={AppRoutes.ROOT} to={AppRoutes.PRODUCTS} />
      </Router>
    </div>
  );
}

export default App;
