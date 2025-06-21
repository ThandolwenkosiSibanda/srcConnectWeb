import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <React.Fragment>
      <header id="masthead" className="header ttm-header-style-01">
        <div className="header_main">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-sm-6 col-6 order-1">
                <div className="site-branding">
                  <h5 style={{ color: "#fff" }}>
                    Auto ECU Job Management System
                  </h5>
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
