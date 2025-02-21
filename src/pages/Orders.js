import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/navBar/NavBar";
import FooterPage from "../components/footer/FooterComponent";
import { CartContext } from "../context/cart";
import { Link } from "react-router-dom";
import axios from "axios";
import { supabase } from "../utils/supabase";
import { UserContext } from "../context/user";

import { format } from "date-fns";

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

  console.log("user", user);

  const [distance, setDistance] = useState(null);
  const [deliveryCharge, setDeliveryCharge] = useState(0);

  const handleSendOrder = async () => {
    const orderData = {
      user: user.id,
      items: JSON.stringify(cartItems),
      total_price: getCartTotal(),
      delivery_charge: deliveryCharge,
    };

    const { data, error } = await supabase.from("orders").insert([orderData]);

    if (error) {
      console.error("Error saving order:", error);
    } else {
      console.log("Order saved successfully:", data);
    }
  };

  const fetchData = async () => {
    const groupedByCategory = cartItems.reduce((acc, product) => {
      const { category } = product;

      if (!acc[category.name]) {
        acc[category.name] = {
          items: [],
          total: 0,
        };
      }

      acc[category.name].items.push(product);
      acc[category.name].total +=
        (category.delivery_rate / 100) *
        (product.guest_price * product.quantity);

      return acc;
    }, {});

    // Calculate total for all categories
    const grandTotal = Object.values(groupedByCategory).reduce(
      (sum, category) => sum + category.total,
      0
    );

    setDeliveryCharge(grandTotal);
  };

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData("products");
    };

    getData();
  }, [cartItems]);

  return (
    <>
      <body>
        <div class="page">
          <NavBar />

          <div class="ttm-page-title-row">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="page-title-heading">
                      <h1 class="title">Orders</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="site-main">
            <section class="cart-section clearfix">
              <div class="container">
                <Link
                  to={`/shop`}
                  style={{ marginBottom: "20px" }}
                  className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
                >
                  <i class="ti ti-arrow-left"></i>Back To Shop
                </Link>
                <div class="row">
                  <div class="col-lg-12">
                    <table class="table cart_table shop_table_responsive">
                      <thead>
                        <tr>
                          <th class="product-subtotal">Date</th>
                          <th class="product-subtotal">Total Price</th>
                          <th class="product-subtotal">Delivery Cost</th>
                          <th class="product-subtotal">Total Cost</th>
                          <th class="product-subtotal">Status</th>
                          <th class="product-subtotal"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders?.map((item, index) => (
                          <tr key={index}>
                            <th class="product-subtotal">
                              {" "}
                              {format(item.created_at, "dd-MMM-yyyy")}
                            </th>
                            <th class="product-subtotal">
                              {" "}
                              {item.total_price}
                            </th>
                            <th class="product-subtotal">
                              {" "}
                              {item.delivery_charge}
                            </th>
                            <th class="product-subtotal">
                              {" "}
                              {item.delivery_charge + item.total_price}
                            </th>

                            <th class="product-subtotal"> {item.status}</th>
                            <th class="product-subtotal">
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={() => (
                                  setActiveProduct(item),
                                  setQuickViewModalStatus("show-modal1")
                                )}
                              >
                                View
                              </span>
                            </th>
                          </tr>
                        ))}

                        <tr>
                          <td colSpan="6" class="actions">
                            <div class="coupon">
                              <Link
                                to={`/shop`}
                                className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
                              >
                                <i class="ti ti-arrow-left"></i>Back To Shop
                              </Link>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
                      <div class="col-lg-12">
                        <table class="table cart_table shop_table_responsive">
                          <thead>
                            <tr>
                              <th class="product-subtotal">Name</th>
                              <th class="product-subtotal">Unit Cost</th>
                              <th class="product-subtotal">Quantity</th>
                              <th class="product-subtotal">Total Cost</th>
                            </tr>
                          </thead>
                          <tbody>
                            {activeProduct.items &&
                              JSON.parse(activeProduct.items)?.map(
                                (item, index) => (
                                  <tr key={index}>
                                    <th class="product-subtotal">
                                      {" "}
                                      {item.name}
                                    </th>
                                    <th class="product-subtotal">
                                      {" "}
                                      {item.guest_price}
                                    </th>
                                    <th class="product-subtotal">
                                      {" "}
                                      {item.quantity}
                                    </th>
                                    <th class="product-subtotal">
                                      {" "}
                                      {item.quantity + item.guest_price}
                                    </th>
                                  </tr>
                                )
                              )}

                            <tr>
                              <td colSpan="6" class="actions">
                                <div class="coupon">
                                  <Link
                                    to={`/shop`}
                                    className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
                                  >
                                    <i class="ti ti-arrow-left"></i>Back To Shop
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div class="col-lg-12">
                        <div class="cart-collaterals">
                          <div class="row">
                            <div class="col-md-6"></div>

                            <div class="col-md-6">
                              <div class="cart_totals res-767-mt-30">
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
