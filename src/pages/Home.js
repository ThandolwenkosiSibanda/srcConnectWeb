import React from "react";
import NavBar from "../components/navBar/NavBar";
import FooterPage from "../components/footer/FooterComponent";
import Banners from "../components/banners/Banners";
import Story from "../components/story/Story";
import Brands from "../components/brands/Brands";
import Sidebar from "../components/sidebar/Sidebar";
import Mainbar from "../components/mainbar/MainBar";

const Home = () => {
  return (
    <>
      <div className="page">
        <NavBar />

        <div className="site-main" style={{ minHeight: "80vh" }}>
          <Banners />

          <div className="sidebar ttm-sidebar-left pt-40 pb-40 clearfix"></div>
        </div>

        {/* Footer */}
        <FooterPage />
      </div>
    </>
  );
};

export default Home;
