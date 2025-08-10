import React, { useContext } from "react";
import "./index.css";

import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import ScrollToTop from "./components/scroll/ScrollToTop";
import EmailVerification from "./pages/EmailVerification";
import PasswordReset from "./pages/PasswordReset";

const App = () => {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="email-verification" element={<EmailVerification />} />
          <Route path="password-reset" element={<PasswordReset />} />
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
