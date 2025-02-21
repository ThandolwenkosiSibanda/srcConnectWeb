import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <React.Fragment>
      <header id="masthead" class="header ttm-header-style-01">
        <div class="header_main">
          <div class="container">
            <div class="row">
              <div class="col-lg-3 col-sm-3 col-3 order-1">
                <div class="site-branding">
                  <Link to={`/`}>
                    <img
                      id="logo"
                      class="img-center"
                      src="images/white-logo.png"
                      alt="logo-img"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default NavBar;
