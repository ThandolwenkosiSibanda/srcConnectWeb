import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/navBar/NavBar";
import FooterPage from "../components/footer/FooterComponent";
import { CartContext } from "../context/cart";
import { Link } from "react-router-dom";
import axios from "axios";
import { supabase } from "../utils/supabase";
import { UserContext } from "../context/user";

import { format } from "date-fns";
import PageTitle from "../components/titles/PageTitle";

const Home = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemsTotal,
    reduceFromCart,
  } = useContext(CartContext);

  const { user } = useContext(UserContext);

  const [orders, setOrders] = useState([]);
  const [quickViewModalStatus, setQuickViewModalStatus] = useState("");
  const [activeProduct, setActiveProduct] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user", user.id);

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data);
      }
    };

    fetchData();
  }, [user?.id]);

  return (
    <>
      <body>
        <div className="page">
          <NavBar />
          <PageTitle name={"Thank you"} />
          <div className="site-main">
            <section className="cart-section clearfix">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div style={{ marginBottom: "20px" }}>
                      Thank you, your order has been successfully submitted. Our
                      team will contact you shortly.
                    </div>

                    <Link
                      to={`/shop`}
                      style={{ marginBottom: "20px" }}
                      className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
                    >
                      <i className="ti ti-arrow-left"></i>Back To Shop
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <FooterPage />

          <div className={`wrap-modal1 js-modal1 ${quickViewModalStatus}`}>
            <div className="overlay-modal1 js-hide-modal1"></div>
            <div className="container">
              <div className="modal1-content">
                <button
                  className="close js-hide-modal1"
                  onClick={() => setQuickViewModalStatus("")}
                >
                  <i className="fa fa-close"></i>
                </button>
                <div className="row ttm-single-product-details ttm-bgcolor-white">
                  <div className="col-lg-12">
                    <div className="summary entry-summary pl-30 res-991-pl-0 res-991-pt-40">
                      <h6 className="">
                        Date:{" "}
                        {activeProduct.created_at &&
                          format(activeProduct.created_at, "dd-MMM-yyyy")}
                      </h6>

                      <div className="mt-30 mb-35">
                        <h6>Order Details</h6>
                      </div>
                      <div className="col-lg-12">
                        <table className="table cart_table shop_table_responsive">
                          <thead>
                            <tr>
                              <th className="product-subtotal">Name</th>
                              <th className="product-subtotal">Unit Cost</th>
                              <th className="product-subtotal">Quantity</th>
                              <th className="product-subtotal">Total Cost</th>
                            </tr>
                          </thead>
                          <tbody>
                            {activeProduct.items &&
                              JSON.parse(activeProduct.items)?.map(
                                (item, index) => (
                                  <tr key={index}>
                                    <th className="product-subtotal">
                                      {" "}
                                      {item.name}
                                    </th>
                                    <th className="product-subtotal">
                                      {" "}
                                      {item.guest_price}
                                    </th>
                                    <th className="product-subtotal">
                                      {" "}
                                      {item.quantity}
                                    </th>
                                    <th className="product-subtotal">
                                      {" "}
                                      {item.quantity + item.guest_price}
                                    </th>
                                  </tr>
                                )
                              )}

                            <tr>
                              <td colSpan="6" className="actions">
                                <div className="coupon">
                                  <Link
                                    to={`/shop`}
                                    className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
                                  >
                                    <i className="ti ti-arrow-left"></i>Back To
                                    Shop
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="col-lg-12">
                        <div className="cart-collaterals">
                          <div className="row">
                            <div className="col-md-6"></div>

                            <div className="col-md-6">
                              <div className="cart_totals res-767-mt-30">
                                <h5>
                                  Total Price
                                  <span>
                                    $
                                    {/* {(getCartTotal() + deliveryCharge)?.toFixed(
                                      2
                                    )} */}
                                    {activeProduct.total_price}
                                  </span>
                                </h5>

                                <h5>
                                  Delivery
                                  <span>
                                    $
                                    {/* {(getCartTotal() + deliveryCharge)?.toFixed(
                                      2
                                    )} */}
                                    {activeProduct.delivery_charge}
                                  </span>
                                </h5>

                                <h5>
                                  Total Cost
                                  <span>
                                    $
                                    {activeProduct.total_price +
                                      activeProduct.delivery_charge}
                                    {/* {(getCartTotal() + deliveryCharge)?.toFixed(
                                      2
                                    )} */}
                                  </span>
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default Home;
