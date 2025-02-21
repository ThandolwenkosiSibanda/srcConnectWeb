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
                      <h1 class="title">Cart</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="site-main">
            <section class="cart-section clearfix">
              <div class="container">
                <div class="row">
                  <div class="col-lg-12">
                    <table class="table cart_table shop_table_responsive">
                      <thead>
                        <tr>
                          <th class="product-thumbnail">&nbsp;</th>
                          <th class="product-name">Product</th>
                          <th class="product-price">Price</th>
                          <th class="product-quantity">Quantity</th>
                          <th class="product-subtotal">Total</th>
                          <th class="product-remove">&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems?.map((item, index) => (
                          <tr class="cart_item" key={index}>
                            <td class="product-thumbnail">
                              <a href="product-layout1.html">
                                {/* <img
                                  class="img-fluid"
                                  src={item.images[0]}
                                  alt="product-img"
                                /> */}
                              </a>
                            </td>
                            <td class="product-name" data-title="Product">
                              <a href="product-layout1.html">{item.name}</a>
                              <span>{item.shortDescription}</span>
                            </td>
                            <td class="product-price" data-title="Price">
                              <span class="Price-amount">
                                <span class="Price-currencySymbol">$</span>
                                {item.guest_price}
                              </span>
                            </td>
                            <td class="product-quantity" data-title="Quantity">
                              <div class="quantity">
                                <input
                                  type="text"
                                  value={item.quantity}
                                  name="quantity-number"
                                  class="qty"
                                  size="4"
                                />
                                <span
                                  class="inc quantity-button"
                                  onClick={() => addToCart(item, 1)}
                                >
                                  +
                                </span>
                                <span
                                  class="dec quantity-button"
                                  onClick={() => reduceFromCart(item, 1)}
                                >
                                  -
                                </span>
                              </div>
                            </td>
                            <td class="product-subtotal" data-title="Total">
                              <span class="Price-amount">
                                <span class="Price-currencySymbol">$</span>
                                {item.quantity * item.guest_price}
                              </span>
                            </td>
                            <td
                              class="product-remove"
                              onClick={() => removeFromCart(item)}
                            >
                              <span class="product-remove-span"> × </span>
                            </td>
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

                            <div
                              class="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
                              onClick={() => clearCart()}
                            >
                              <i class="ti ti-close"></i>Clear All
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
                              Order Summary
                              <span>${getCartTotal()?.toFixed(2)}</span>
                            </h5>
                            <h5>Delivery</h5>
                            <p class="text-input">
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

                            {/* <div class="payments">
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
                            <div class="proceed-to-checkout">
                              <a
                                onClick={handleSendOrder}
                                class="checkout-button button"
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
