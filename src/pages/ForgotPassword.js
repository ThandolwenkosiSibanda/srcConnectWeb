import React, { useState } from "react";
import BestSellers from "../components/product/BestSellers";
import Brands from "../components/product/Brands";
import Story from "../components/product/Story";
import Hero from "../components/hero/Hero";
import SmallBanner from "../components/smallBanner/SmallBanner";
import NavBannerTop from "../components/navBannerTop/NavBannerTop";
import NavBar from "../components/navBar/NavBar";
import LoginComponent from "../components/login/LoginComponent";
import FooterPage from "../components/footer/FooterComponent";

import LoginNav from "../components/navigation/LoginNav";
import ForgotPasswordComponent from "../components/login/ForgotPasswordComponent";

const ForgotPassword = () => {
  const [form, setForm] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setErrorMessage("");

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <LoginNav />
      <ForgotPasswordComponent
        form={form}
        setForm={setForm}
        handleChange={handleChange}
        errorMessage={errorMessage}
      />

      <FooterPage />
    </>
  );
};

export default ForgotPassword;
