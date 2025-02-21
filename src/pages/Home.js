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
      <div class="page">
        <NavBar />

        <div class="site-main">
          <Banners />

          <div class="sidebar ttm-sidebar-left pt-40 pb-40 clearfix">
            <div class="container">
              <div class="row">
                {/* Sidebar */}
                <Sidebar />

                {/* Main container */}

                <Mainbar />

                <Brands />

                <Story />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <FooterPage />
      </div>
    </>
  );
};

export default Home;
