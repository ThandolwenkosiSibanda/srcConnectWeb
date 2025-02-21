import React, { useContext, useState } from "react";
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
import SignupComponent from "../components/login/SignupComponent";
import { supabase } from "../utils/supabase";
import { UserContext } from "../context/user";

const Home = () => {
  const [form, setForm] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [laoding, setLoading] = useState(false);

  const { login } = useContext(UserContext);

  const handleChange = (e) => {
    setErrorMessage("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerUser = async () => {
    setLoading(true);

    if (!form.email || !form.password || !form.name || !form.surname) {
      setLoading(false);
      setErrorMessage("Email, password , name and surname are required.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            name: form.name,
            surname: form.surname,
            email: form.email,
            phone: form.phone,
            company_name: form.company_name,
          },
        },
      });

      if (data.user) {
        login(data.user);
      }
    } catch (error) {
      console.log("error", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoginNav />
      <SignupComponent
        form={form}
        setForm={setForm}
        handleChange={handleChange}
        errorMessage={errorMessage}
        registerUser={registerUser}
      />

      <FooterPage />
    </>
  );
};

export default Home;
