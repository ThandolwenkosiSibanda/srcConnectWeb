import { useContext, useState } from "react";
import LoginComponent from "../components/login/LoginComponent";
import FooterPage from "../components/footer/FooterComponent";
import LoginNav from "../components/navigation/LoginNav";
import { supabase } from "../utils/supabase";
import { UserContext } from "../context/user";

const Home = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useContext(UserContext);

  const handleChange = (e) => {
    setErrorMessage("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setErrorMessage("");

    if (!form.email || !form.password) {
      setErrorMessage("Email and password are required.");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      console.log("error", error);

      setErrorMessage(error.message);
    } else {
      console.log("data", data);
      if (data.user) {
        // Save user in global state and localStorage
        login(data.user);
      }
    }
  };

  return (
    <>
      <LoginNav />

      <LoginComponent
        form={form}
        setForm={setForm}
        handleChange={handleChange}
        handleLogin={handleLogin}
        errorMessage={errorMessage}
      />
      <FooterPage />
    </>
  );
};

export default Home;
