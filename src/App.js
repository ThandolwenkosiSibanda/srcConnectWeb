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
import NewProducts from "./pages/NewProducts";
import ProductPromotions from "./pages/ProductPromotions";
import ScrollToTop from "./components/scroll/ScrollToTop";
import BestSellers from "./pages/BestSellers";
import QueryNew from "./pages/QueryNew";
import Queries from "./pages/Queries";
import AdminProducts from "./pages/AdminProducts";
import AdminProduct from "./pages/AdminProduct";
import AdminCategories from "./pages/AdminCategories";
import AdminCategory from "./pages/AdminCategory";
import AdminCategoryNew from "./pages/AdminCategoryNew";
import AdminOrders from "./pages/AdminOrders";
import AdminOrder from "./pages/AdminOrder";
import AdminBanners from "./pages/AdminBanners";
import AdminBanner from "./pages/AdminBanner";
import AdminBannerNew from "./pages/AdminBannerNew";
import CustomerNew from "./pages/CustomerNew";
import Customers from "./pages/Customers";
import Customer from "./pages/Customer";
import Jobs from "./pages/Jobs";
import Job from "./pages/Job";
import JobEdit from "./pages/JobEdit";
import JobNew from "./pages/JobNew";

const ProtectedRoute = ({ user, loading, children }) => {
  if (loading) return null; // or a loader/spinner
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const { user, loading } = useContext(UserContext);

  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route
            path="login"
            element={
              loading ? null : user ? <Navigate to="/" replace /> : <Login />
            }
          />

          {/* Protected Routes */}
          <Route
            path="customers"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <Customers />
              </ProtectedRoute>
            }
          />
          <Route
            path="customers/:id"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <Customer />
              </ProtectedRoute>
            }
          />
          <Route
            path="newcustomer"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <CustomerNew />
              </ProtectedRoute>
            }
          />
          <Route
            path="jobs"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <Jobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="jobs/:id"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <Job />
              </ProtectedRoute>
            }
          />
          <Route
            path="jobs/:id/edit"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <JobEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="newjob"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <JobNew />
              </ProtectedRoute>
            }
          />

          {/* {!user ? (
            <>
              <Route path="/login" element={<Login />} />
            </>
          ) : (
            <>
              <Route path="/customers" element={<Customers />} />
              <Route path="/customers/:id" element={<Customer />} />
              <Route path="/newcustomer" element={<CustomerNew />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<Job />} />
              <Route path="/jobs/:id/edit" element={<JobEdit />} />
              <Route path="/newjob" element={<JobNew />} />
            </>
          )} */}
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
