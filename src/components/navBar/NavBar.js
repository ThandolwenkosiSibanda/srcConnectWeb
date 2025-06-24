import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../context/user";

const NavBar = () => {
  const [shopByCategoryStatus, setShopByCategoryStatus] = useState("off");
  const [signinStatus, setSigninStatus] = useState("");

  const [menuBarStatus, setMenuBarStatus] = useState("");

  const { user, logout } = useContext(UserContext);

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

              <div className="col-lg-6 col-6 order-lg-6 order-2 text-lg-left text-right">
                <div className="header_extra d-flex flex-row align-items-center justify-content-end">
                  <div className={`account dropdown ${signinStatus}`}>
                    <div className="d-flex flex-row align-items-center justify-content-start">
                      <div className="account_icon">
                        <i className="fa fa-user"></i>
                      </div>
                      <div className="account_content">
                        <div className="account_text">
                          {user ? `${user?.email}` : "Signin"}
                        </div>
                      </div>
                    </div>
                    <div
                      className="account_extra dropdown_link"
                      data-toggle="dropdown"
                      onClick={() =>
                        signinStatus === "show"
                          ? setSigninStatus("")
                          : setSigninStatus("show")
                      }
                    >
                      Account
                    </div>
                    <aside className="widget_account dropdown_content">
                      <div
                        className="widget_account_content"
                        style={{ zIndex: "1000000" }}
                      >
                        {user ? (
                          <ul>
                            <li
                              onClick={logout}
                              style={{
                                cursor: "pointer",
                                // marginTop: "20px",
                                color: "red",
                              }}
                            >
                              <i className="fa fa-sign-out mr-2"></i>
                              Logout
                            </li>
                          </ul>
                        ) : (
                          <ul>
                            <li>
                              <i className="fa fa-sign-in mr-2"></i>{" "}
                              <Link to={`/login`}>Login</Link>{" "}
                            </li>
                          </ul>
                        )}
                      </div>
                    </aside>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="site-header-menu"
          className="site-header-menu ttm-bgcolor-white clearfix"
        >
          <div className="site-header-menu-inner stickable-header">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="main_nav_content d-flex flex-row">
                    <div className="cat_menu_container">
                      <div
                        className="cat_menu d-flex flex-row align-items-center "
                        onClick={() =>
                          shopByCategoryStatus === "on"
                            ? setShopByCategoryStatus("")
                            : setShopByCategoryStatus("on")
                        }
                      >
                        <div className="cat_icon">
                          <i className="fa fa-bars"></i>
                        </div>
                        <div className="cat_text">
                          <span>Sections</span>
                        </div>
                      </div>
                    </div>

                    <div id="site-navigation" className="site-navigation">
                      <div
                        className={`btn-show-menu-mobile menubar menubar--squeeze ${
                          menuBarStatus ? "is-active" : ""
                        }`}
                      >
                        <span
                          className="menubar-box"
                          onClick={() => {
                            menuBarStatus === "block"
                              ? setMenuBarStatus("")
                              : setMenuBarStatus("block");
                          }}
                        >
                          <span className="menubar-inner"></span>
                        </span>
                      </div>
                      <nav
                        className="menu menu-mobile"
                        id="menu"
                        style={{ display: menuBarStatus, zIndex: 1000 }}
                      >
                        <ul className="nav">
                          <li className="" style={{ zIndex: 1000 }}>
                            <Link to={`/customers`} className="mega-menu-link">
                              Customers
                            </Link>
                          </li>

                          <li className="" style={{ zIndex: 1000 }}>
                            <Link to={`/jobs`} className="mega-menu-link">
                              Jobs
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
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
