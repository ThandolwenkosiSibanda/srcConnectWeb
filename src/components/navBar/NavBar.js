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
  const [cartStatus, setCartStatus] = useState("");
  const [shopByCategoryStatus, setShopByCategoryStatus] = useState("off");
  const [signinStatus, setSigninStatus] = useState("");

  const [menuBarStatus, setMenuBarStatus] = useState("");

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*, category(*)")
        .eq("status", "active");

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
      const result = await fetchData("products");

      const groupedByCategory = result?.reduce((acc, product) => {
        const categoryName = product.category?.name || "Uncategorized";
        const categoryImage = product.category?.image || "";
        const id = product.category?.id;

        let categoryGroup = acc.find(
          (group) => group.categoryName === categoryName
        );

        if (!categoryGroup) {
          categoryGroup = { categoryName, categoryImage, id, products: [] };
          acc.push(categoryGroup);
        }

        categoryGroup.products.push(product);

        return acc;
      }, []);

      if (result) setCategories(groupedByCategory);
      setLoading(false);
    };

    getData();
  }, []);

  const { cartItems, getCartTotal, getCartItemsTotal } =
    useContext(CartContext);
  const { login, user, logout } = useContext(UserContext);

  const chunkArray = (array, size) => {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size)
    );
  };

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
              <div className="col-lg-6 col-12 order-lg-2 order-3 text-lg-left text-right">
                <div className="header_search">
                  <div className="header_search_content">
                    <div id="search_block_top" className="search_block_top">
                      <div id="searchbox">
                        <input
                          className="search_query form-control"
                          type="text"
                          id="search_query_top"
                          name="s"
                          placeholder="Lets build your home...."
                          value=""
                          readOnly
                        />
                        <div className="categories-block">
                          <select
                            id="search_category"
                            name="search_category"
                            className="form-control"
                          >
                            {categories.map((category, index) => (
                              <option key={index} value={category.categoryName}>
                                {category?.categoryName?.substring(0, 15)}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button
                          type="submit"
                          name="submit_search"
                          className="btn btn-default button-search"
                        >
                          <i className="fa fa-search"></i>
                        </button>
                      </div>
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
                  <Link to={`/newquery`} style={{ color: "#ffa500" }}>
                    CLICK HERE
                  </Link>{" "}
                  AND SEND YOUR QUERY THROUGH CALL /APP NOW: +263 778 091 005 |
                  MON - FRI 7:00AM to 5:00PM
                </p>
              </div>
              <div className="col-lg-3 col-9 order-lg-3 order-2 text-lg-left text-right">
                <div className="header_extra d-flex flex-row align-items-center justify-content-end">
                  <div className={`account dropdown ${signinStatus}`}>
                    <div className="d-flex flex-row align-items-center justify-content-start">
                      <div className="account_icon">
                        <i className="fa fa-user"></i>
                      </div>
                      <div className="account_content">
                        <div className="account_text">
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
                            <li>
                              <i className="fa fa-sign-in mr-2"></i>
                              <Link to={`/orders`}>Orders</Link>{" "}
                            </li>
                            <li>
                              <i className="fa fa-sign-in mr-2"></i>
                              <Link to={`/queries`}>Queries</Link>
                            </li>
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
                            <li>
                              <i className="fa fa-sign-in mr-2"></i>
                              <Link to={`/register`}>Register</Link>
                            </li>
                          </ul>
                        )}
                      </div>
                    </aside>
                  </div>
                  <div className={`cart dropdown ${cartStatus}`}>
                    <div
                      className="dropdown_link d-flex flex-row align-items-center justify-content-end"
                      data-toggle="dropdown"
                    >
                      <div
                        className="cart_icon"
                        onClick={() =>
                          cartStatus === "show"
                            ? setCartStatus("")
                            : setCartStatus("show")
                        }
                      >
                        <i className="fa fa-shopping-cart"></i>
                        <div className="cart_count">{getCartItemsTotal()}</div>
                      </div>
                      <div className="cart_content">
                        <div
                          className="cart_text"
                          onClick={() =>
                            cartStatus === "show"
                              ? setCartStatus("")
                              : setCartStatus("show")
                          }
                        >
                          My Cart
                        </div>
                        <div
                          className="cart_price"
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
                    <aside
                      className="widget_shopping_cart dropdown_content"
                      style={{ zIndex: 100000 }}
                    >
                      <ul className="cart-list">
                        {cartItems?.map((item, index) => (
                          <li key={index}>
                            <Link
                              to={`/products/${item?.id}`}
                              className="photo"
                            >
                              <img
                                src={
                                  item?.images?.length > 0 &&
                                  JSON.parse(JSON.stringify(item.images))[0]
                                }
                                className="cart-thumb"
                                alt=""
                              />
                            </Link>
                            <h6>
                              <Link to={`/products/${item?.id}`}>
                                {item.name}{" "}
                              </Link>
                            </h6>

                            <p>
                              {item.quantity} x -{" "}
                              <span className="price">${item.guest_price}</span>
                            </p>
                          </li>
                        ))}

                        <li className="total">
                          <span className="pull-right">
                            <strong>Total</strong>: $
                            {getCartTotal()?.toFixed(2)}
                          </span>
                          <Link
                            to={`/cart`}
                            className="btn btn-default btn-cart"
                            style={{ zIndex: 100000 }}
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
                          <span>Shop by</span>
                          <h4>Categories</h4>
                        </div>
                      </div>
                      <ul
                        className={`cat_menu_list menu-vertical ${shopByCategoryStatus}`}
                      >
                        {categories.map((category, index) => (
                          <li key={index}>
                            <Link to={`/category/${category._id}`}>
                              {category.categoryName}
                            </Link>
                          </li>
                        ))}
                      </ul>
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
                          {categories.map((category, index) => (
                            <li
                              className="mega-menu-item megamenu-fw"
                              style={{ zIndex: 1000 }}
                              key={index}
                            >
                              <Link
                                to={`/category/${category.id}`}
                                className="mega-menu-link"
                              >
                                {category.categoryName}
                              </Link>
                              <ul
                                className="mega-submenu megamenu-content"
                                role="menu"
                              >
                                <li>
                                  <div className="row d-flex justify-content-between">
                                    {category?.products &&
                                      chunkArray(
                                        category.products.slice(0, 12),
                                        4
                                      ).map((productChunk, index) => (
                                        <div
                                          key={index}
                                          className="col-menu col-md-3"
                                        >
                                          <div className="content">
                                            <ul className="menu-col">
                                              {productChunk.map((product) => (
                                                <li key={product.id}>
                                                  <Link
                                                    to={`/products/${product?.id}`}
                                                  >
                                                    {product.name}
                                                  </Link>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        </div>
                                      ))}

                                    <div className="col-menu col-md-3">
                                      <div className="content">
                                        <ul className="menu-col">
                                          <li>
                                            <Link
                                              to={`/categories/${category?.id}`}
                                            >
                                              {category.categoryImage && (
                                                <img
                                                  className="img-fluid"
                                                  src={category.categoryImage}
                                                  alt={category.categoryName}
                                                />
                                              )}
                                            </Link>
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
