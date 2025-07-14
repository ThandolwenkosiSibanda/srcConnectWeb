import React, { useContext } from "react";
import "./index.css";

import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { UserContext } from "./context/user";
import ScrollToTop from "./components/scroll/ScrollToTop";
import CustomerNew from "./pages/CustomerNew";
import Customers from "./pages/Clients";
import JobEdit from "./pages/JobEdit";
import Policies from "./pages/Policies";
import PolicyNew from "./pages/PolicyNew";
import Policy from "./pages/Policy";
import Client from "./pages/Client";
import Subscriptions from "./pages/Subscriptions";
import Claims from "./pages/Claims";
import SubscriptionNew from "./pages/SubscriptionNew";
import ClaimNew from "./pages/ClaimNew";
import Claim from "./pages/Claim";
import Subscription from "./pages/Subscription";
import Users from "./pages/Users";
import UserNew from "./pages/UserNew";

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
            path="clients"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <Customers />
              </ProtectedRoute>
            }
          />
          <Route
            path="clients/:id"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <Client />
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
            path="policies"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <Policies />
              </ProtectedRoute>
            }
          />
          <Route
            path="policies/:id"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <Policy />
              </ProtectedRoute>
            }
          />

          <Route
            path="subscriptions"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <Subscriptions />
              </ProtectedRoute>
            }
          />

          <Route
            path="subscriptions/:id"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <Subscription />
              </ProtectedRoute>
            }
          />

          <Route
            path="newsubscription"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <SubscriptionNew />
              </ProtectedRoute>
            }
          />

          <Route
            path="claims"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <Claims />
              </ProtectedRoute>
            }
          />

          <Route
            path="claims/:id"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <Claim />
              </ProtectedRoute>
            }
          />

          <Route
            path="newclaim"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <ClaimNew />
              </ProtectedRoute>
            }
          />

          <Route
            path="users"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <Users />
              </ProtectedRoute>
            }
          />

          <Route
            path="newuser"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <UserNew />
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
            path="newpolicy"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <PolicyNew />
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
