import React, { useContext } from "react";
import "./index.css";

import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Orders from "./pages/Orders";
import OrderThanks from "./pages/OrderThanks";
import { UserContext } from "./context/user";
import ProductNew from "./pages/ProductNew";

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/category/:id" element={<Shop />} />
          <Route path="/ordersucess" element={<OrderThanks />} />
          <Route path="/newproduct" element={<ProductNew />} />

          {!user ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/register" element={<Navigate to="/" />} />
              <Route path="/forgotpassword" element={<Navigate to="/" />} />
            </>
          )}
        </Route>
      </Routes>
    </div>
  );
};

export default App;

const Layout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
