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

const Queries = () => {
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
        .from("queries")
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

      if (!acc[category?.name]) {
        acc[category?.name] = {
          items: [],
          total: 0,
        };
      }

      acc[category?.name].items.push(product);
      acc[category?.name].total +=
        (category?.delivery_rate / 100) *
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
        <div className="page">
          <NavBar />

          <PageTitle name={"Queries"} />

          <div className="site-main">
            <section className="cart-section clearfix">
              <div className="container">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Link
                    to={`/shop`}
                    style={{ marginBottom: "20px" }}
                    className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
                  >
                    <i className="ti ti-arrow-left"></i>Back To Shop
                  </Link>

                  <Link
                    to={`/newquery`}
                    style={{ marginBottom: "20px" }}
                    className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
                  >
                    New Query
                  </Link>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <table className="table cart_table shop_table_responsive">
                      <thead>
                        <tr>
                          <th className="product-subtotal">Date</th>
                          <th className="product-subtotal">Message</th>

                          <th className="product-subtotal"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders?.map((item, index) => (
                          <tr key={index}>
                            <th className="product-subtotal">
                              {" "}
                              {format(item.created_at, "dd-MMM-yyyy")}
                            </th>
                            <th className="product-subtotal">
                              {" "}
                              {item.message}
                            </th>

                            <th className="product-subtotal">
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
                          <td colSpan="6" className="actions">
                            <div className="coupon">
                              <Link
                                to={`/shop`}
                                className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
                              >
                                <i className="ti ti-arrow-left"></i>Back To Shop
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
                        <h6>Query Details</h6>
                      </div>
                      <div className="col-lg-12">
                        <p>{activeProduct.message}</p>

                        <div className="row col-lg-12">
                          {activeProduct?.documents?.map((image, index) => (
                            <div
                              key={index}
                              style={{
                                padding: "4px",
                                borderRadius: "10px",
                                marginBottom: "10px",
                              }}
                            >
                              {image && (
                                <img
                                  src={image}
                                  alt={image.message}
                                  style={{ maxHeight: "400px" }}
                                />
                              )}
                            </div>
                          ))}
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

export default Queries;
