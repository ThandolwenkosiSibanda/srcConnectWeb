import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/navBar/NavBar";
import FooterPage from "../components/footer/FooterComponent";
import { CartContext } from "../context/cart";
import { json, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { supabase } from "../utils/supabase";
import { UserContext } from "../context/user";

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
  const navigate = useNavigate();

  const [distance, setDistance] = useState(null);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSendOrder = async () => {
    setLoading(true);

    try {
      const orderData = {
        items: JSON.stringify(cartItems),
        total_price: getCartTotal(),
        delivery_charge: deliveryCharge,
        created_at: new Date().toISOString(),
        user: user.id,
      };

      const { data, error } = await supabase.from("orders").insert([orderData]);

      if (error) {
        throw new Error(error.message);
      }
      clearCart();
      navigate("/ordersucess");
    } catch (error) {
      console.error("Error saving order:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    const groupedByCategory = cartItems?.reduce((acc, product) => {
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

          <div className="ttm-page-title-row">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="page-title-heading">
                      <h1 className="title">Cart</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="site-main">
            <section className="cart-section clearfix">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <table className="table cart_table shop_table_responsive">
                      <thead>
                        <tr>
                          <th className="product-thumbnail">&nbsp;</th>
                          <th className="product-name">Product</th>
                          <th className="product-price">Price</th>
                          <th className="product-quantity">Quantity</th>
                          <th className="product-subtotal">Total</th>
                          <th className="product-remove">&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems?.map((item, index) => (
                          <tr className="cart_item" key={index}>
                            <td className="product-thumbnail">
                              <Link to={`/products/${item?.id}`}>
                                <img
                                  className="img-fluid"
                                  src={
                                    item?.images?.length > 0 &&
                                    JSON.parse(JSON.stringify(item.images))[0]
                                  }
                                  alt="product-img"
                                />
                              </Link>
                            </td>
                            <td className="product-name" data-title="Product">
                              <Link
                                className="product-title"
                                to={`/products/${item?.id}`}
                              >
                                {item?.name}
                              </Link>
                              <span>{item.shortDescription}</span>
                            </td>
                            <td className="product-price" data-title="Price">
                              <span className="Price-amount">
                                <span className="Price-currencySymbol">$</span>
                                {item.guest_price}
                              </span>
                            </td>
                            <td
                              className="product-quantity"
                              data-title="Quantity"
                            >
                              <div className="quantity">
                                <input
                                  type="text"
                                  value={item.quantity}
                                  name="quantity-number"
                                  className="qty"
                                  size="4"
                                />
                                <span
                                  className="inc quantity-button"
                                  onClick={() => addToCart(item, 1)}
                                >
                                  +
                                </span>
                                <span
                                  className="dec quantity-button"
                                  onClick={() => reduceFromCart(item, 1)}
                                >
                                  -
                                </span>
                              </div>
                            </td>
                            <td className="product-subtotal" data-title="Total">
                              <span className="Price-amount">
                                <span className="Price-currencySymbol">$</span>
                                {item.quantity * item.guest_price}
                              </span>
                            </td>
                            <td
                              className="product-remove"
                              onClick={() => removeFromCart(item)}
                            >
                              <span className="product-remove-span"> × </span>
                            </td>
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

                            <div
                              className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
                              onClick={() => clearCart()}
                            >
                              <i className="ti ti-close"></i>Clear All
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
                              Order Summary
                              <span>${getCartTotal()?.toFixed(2)}</span>
                            </h5>
                            <h5>Delivery</h5>
                            <p className="text-input">
                              <input
                                type="radio"
                                name="grpShipping"
                                value="standard"
                                checked
                              />
                              Standard
                              <span>+ ${deliveryCharge?.toFixed(2)}</span>
                            </p>

                            <h5>
                              Total
                              <span>
                                ${(getCartTotal() + deliveryCharge)?.toFixed(2)}
                              </span>
                            </h5>

                            {/* <div className="payments">
                              <p>Pay With</p>
                              <img
                                src="images/supported_card/card-2.png"
                                alt="paypal"
                              />
                              <img
                                src="images/supported_card/card-3.png"
                                alt="western union"
                              />
                              <img
                                src="images/supported_card/card-4.png"
                                alt="visa"
                              />
                            </div> */}
                          </div>

                          {cartItems.length > 0 && user && (
                            <div className="proceed-to-checkout">
                              <a
                                onClick={handleSendOrder}
                                className="checkout-button button"
                                style={{ cursor: "pointer" }}
                              >
                                Send Order
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <FooterPage />
        </div>
      </body>
    </>
  );
};

export default Home;
