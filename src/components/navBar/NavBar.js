import React, { useContext, useEffect, useState } from "react";
import { CATEGORIES_QUERY } from "../../gql/Query";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import SmallCart from "../cart/SmallCart";
import { CartContext } from "../../context/cart";
import { supabase } from "../../utils/supabase";
import { UserContext } from "../../context/user";

const NavBar = (props) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (tableName) => {
    try {
      const { data, error } = await supabase.from(tableName).select("*");

      if (error) {
        console.error("Error fetching data:", error.message);
        return null;
      }

      return data;
    } catch (err) {
      console.error("Unexpected error:", err);
      return null;
    }
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const result = await fetchData("categories");
      if (result) setCategories(result);
      setLoading(false);
    };

    getData();
  }, []);

  const [cartStatus, setCartStatus] = useState("");
  const [shopByCategoryStatus, setShopByCategoryStatus] = useState("off");
  const [signinStatus, setSigninStatus] = useState("");

  const { cartItems, getCartTotal, getCartItemsTotal } =
    useContext(CartContext);
  const { login, user, logout } = useContext(UserContext);

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
              <div class="col-lg-6 col-12 order-lg-2 order-3 text-lg-left text-right">
                <div class="header_search">
                  <div class="header_search_content">
                    <div id="search_block_top" class="search_block_top">
                      <form id="searchbox" method="get" action="#">
                        <input
                          class="search_query form-control"
                          type="text"
                          id="search_query_top"
                          name="s"
                          placeholder="Lets build your home...."
                          value=""
                        />
                        <div class="categories-block">
                          <select
                            id="search_category"
                            name="search_category"
                            class="form-control"
                          >
                            <option value="all">All Categories</option>

                            {categories.map((category, index) => (
                              <option key={index} value={category.name}>
                                {category?.name?.substring(0, 15)}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button
                          type="submit"
                          name="submit_search"
                          class="btn btn-default button-search"
                        >
                          <i class="fa fa-search"></i>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: "600",
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  ISSUE WITH MATERIALS ESTIMATES ? or a SPECIFIC REQUIREMENT?{" "}
                  <a href="/html" style={{ color: "#ffa500" }}>
                    CLICK HERE
                  </a>{" "}
                  AND SEND YOUR QUERY THROUGH CALL /APP NOW: +263 778 091 005 |
                  MON - FRI 7:00AM to 5:00PM
                </p>
              </div>
              <div class="col-lg-3 col-9 order-lg-3 order-2 text-lg-left text-right">
                <div class="header_extra d-flex flex-row align-items-center justify-content-end">
                  <div class={`account dropdown ${signinStatus}`}>
                    <div class="d-flex flex-row align-items-center justify-content-start">
                      <div class="account_icon">
                        <i class="fa fa-user"></i>
                      </div>
                      <div class="account_content">
                        <div class="account_text">
                          {user
                            ? `${
                                user.user_metadata.name
                              } ${user.user_metadata.surname
                                .charAt(0)
                                .toUpperCase()}`
                            : "Signin"}
                        </div>
                      </div>
                    </div>
                    <div
                      class="account_extra dropdown_link"
                      data-toggle="dropdown"
                      onClick={() =>
                        signinStatus === "show"
                          ? setSigninStatus("")
                          : setSigninStatus("show")
                      }
                    >
                      Account
                    </div>
                    <aside class="widget_account dropdown_content">
                      <div class="widget_account_content">
                        {user ? (
                          <ul>
                            <li>
                              <i class="fa fa-sign-in mr-2"></i>
                              <Link to={`/orders`}>Orders</Link>{" "}
                            </li>
                            <li>
                              <i class="fa fa-sign-in mr-2"></i>
                              <Link to={`/queries`}>Queries</Link>
                            </li>
                            <li
                              onClick={logout}
                              style={{
                                cursor: "pointer",
                                marginTop: "20px",
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
                              <i class="fa fa-sign-in mr-2"></i>{" "}
                              <Link to={`/login`}>Login</Link>{" "}
                            </li>
                            <li>
                              <i class="fa fa-sign-in mr-2"></i>
                              <Link to={`/register`}>Register</Link>
                            </li>
                          </ul>
                        )}
                      </div>
                    </aside>
                  </div>
                  <div class={`cart dropdown ${cartStatus}`}>
                    <div
                      class="dropdown_link d-flex flex-row align-items-center justify-content-end"
                      data-toggle="dropdown"
                    >
                      <div
                        class="cart_icon"
                        onClick={() =>
                          cartStatus === "show"
                            ? setCartStatus("")
                            : setCartStatus("show")
                        }
                      >
                        <i class="fa fa-shopping-cart"></i>
                        <div class="cart_count">{getCartItemsTotal()}</div>
                      </div>
                      <div class="cart_content">
                        <div
                          class="cart_text"
                          onClick={() =>
                            cartStatus === "show"
                              ? setCartStatus("")
                              : setCartStatus("show")
                          }
                        >
                          My Cart
                        </div>
                        <div
                          class="cart_price"
                          onClick={() =>
                            cartStatus === "show"
                              ? setCartStatus("")
                              : setCartStatus("show")
                          }
                        >
                          ${getCartTotal()?.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <aside class="widget_shopping_cart dropdown_content">
                      <ul class="cart-list">
                        {cartItems?.map((item, index) => (
                          <li key={index}>
                            <a href="/html" class="photo">
                              <img
                                src="images/product/pro-front-02.png"
                                class="cart-thumb"
                                alt=""
                              />
                            </a>
                            <h6>
                              <a href="/html">{item.name}</a>
                            </h6>

                            <p>
                              {item.quantity} x -{" "}
                              <span class="price">${item.guest_price}</span>
                            </p>
                          </li>
                        ))}

                        <li class="total">
                          <span class="pull-right">
                            <strong>Total</strong>: $
                            {getCartTotal()?.toFixed(2)}
                          </span>
                          <Link
                            to={`/cart`}
                            className="btn btn-default btn-cart"
                          >
                            Cart
                          </Link>
                        </li>
                      </ul>
                    </aside>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="site-header-menu"
          class="site-header-menu ttm-bgcolor-white clearfix"
        >
          <div class="site-header-menu-inner stickable-header">
            <div class="container">
              <div class="row">
                <div class="col-lg-12">
                  <div class="main_nav_content d-flex flex-row">
                    <div class="cat_menu_container">
                      <div
                        class="cat_menu d-flex flex-row align-items-center "
                        onClick={() =>
                          shopByCategoryStatus === "on"
                            ? setShopByCategoryStatus("")
                            : setShopByCategoryStatus("on")
                        }
                      >
                        <div class="cat_icon">
                          <i class="fa fa-bars"></i>
                        </div>
                        <div class="cat_text">
                          <span>Shop by</span>
                          <h4>Categories</h4>
                        </div>
                      </div>
                      <ul
                        class={`cat_menu_list menu-vertical ${shopByCategoryStatus}`}
                      >
                        {categories.map((category, index) => (
                          <li key={index}>
                            <Link to={`/category/${category._id}`}>
                              {category.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div id="site-navigation" class="site-navigation">
                      <div class="btn-show-menu-mobile menubar menubar--squeeze">
                        <span class="menubar-box">
                          <span class="menubar-inner"></span>
                        </span>
                      </div>
                      <nav class="menu menu-mobile" id="menu">
                        <ul class="nav">
                          {categories.map((category, index) => (
                            <li class="mega-menu-item megamenu-fw" key={index}>
                              <Link
                                to={`/category/${category.id}`}
                                className="mega-menu-link"
                              >
                                {category.name}
                              </Link>
                              <ul
                                class="mega-submenu megamenu-content"
                                role="menu"
                              >
                                <li>
                                  <div class="row">
                                    {category?.subCategories?.map(
                                      (subCategory) => (
                                        <div class="col-menu col-md-3">
                                          <h6 class="title">
                                            {subCategory.name}
                                          </h6>
                                          <div class="content">
                                            <ul class="menu-col">
                                              <li>
                                                <a href="shop.html">
                                                  Shop Default
                                                </a>
                                              </li>
                                              <li>
                                                <a href="left-sidebar.html">
                                                  Shop Left Sidebar
                                                </a>
                                              </li>
                                              <li>
                                                <a href="right-sidebar.html">
                                                  Shop Right Sidebar
                                                </a>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      )
                                    )}

                                    <div class="col-menu col-md-3">
                                      <div class="content">
                                        <ul class="menu-col">
                                          <li>
                                            <a href="shop.html">
                                              <img
                                                class="img-fluid"
                                                src="images/menu-item-banner.jpg"
                                                alt="bimg"
                                              />
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </li>
                          ))}
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
