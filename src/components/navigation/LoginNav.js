import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <React.Fragment>
      <header id="masthead" className="header ttm-header-style-01">
        <div className="header_main">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-sm-3 col-3 order-1">
                <div className="site-branding">
                  <Link to={`/`}>
                    <img
                      id="logo"
                      className="img-center"
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
