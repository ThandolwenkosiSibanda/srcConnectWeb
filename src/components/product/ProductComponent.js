import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCartAction } from "../../actions/cart";
import { CartContext } from "../../context/cart";

const ProductComponent = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemsTotal,
  } = useContext(CartContext);

  const updateQuantity = (type) => {
    if (type === "Add") {
      setQuantity(quantity + 1);
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };
  return (
    <>
      <div className="container">
        <section className="single-product-section layout-1 clearfix">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="ttm-single-product-details">
                  <div className="ttm-single-product-info clearfix">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12 ml-auto mr-auto">
                        <div className="product-box">
                          <div className="product-box-inner">
                            <div className="product-image-box">
                              <img
                                className="img-fluid pro-image-front"
                                src={
                                  product?.images?.length > 0 &&
                                  JSON.parse(JSON.stringify(product.images))[0]
                                }
                                alt=""
                              />
                              <img
                                className="img-fluid pro-image-back"
                                src={
                                  product?.images?.length > 0 &&
                                  JSON.parse(JSON.stringify(product.images))[1]
                                }
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="summary entry-summary pl-30 res-991-pl-0 res-991-pt-40">
                          <h2 className="product_title entry-title">
                            {product.name}
                          </h2>

                          <span className="price">
                            <ins>
                              <span className="product-Price-amount">
                                <span className="product-Price-currencySymbol">
                                  $
                                </span>
                                {product.trade_account_price}
                              </span>
                            </ins>
                            <del>
                              <span className="product-Price-amount">
                                <span className="product-Price-currencySymbol">
                                  $
                                </span>
                                {product.guest_price}
                              </span>
                            </del>
                          </span>
                          <div className="product-details__short-description">
                            {product.short_description}
                          </div>
                          <div className="mt-15 mb-25">
                            <div className="quantity">
                              <label>Quantity: </label>
                              <input
                                type="text"
                                value={quantity}
                                name="quantity-number"
                                className="qty"
                              />
                              <span
                                className="inc quantity-button"
                                onClick={() => updateQuantity("Add")}
                              >
                                +
                              </span>
                              <span
                                className="dec quantity-button"
                                onClick={() => updateQuantity("Minus")}
                              >
                                -
                              </span>
                            </div>
                          </div>
                          <div className="actions">
                            <div className="add-to-cart">
                              <span
                                className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-btn-color-skincolor"
                                style={{ cursor: "pointer" }}
                                onClick={() => addToCart(product, quantity)}
                              >
                                Add to cart
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="ttm-tabs tabs-for-single-products"
                    data-effect="fadeIn"
                  >
                    <ul className="tabs clearfix">
                      <li className="tab active">
                        <a href="#">Product description</a>
                      </li>
                    </ul>
                    <div className="content-tab">
                      <div
                        className="content-inner active"
                        style={{ display: "block" }}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: product.content,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="pt-35 related products">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="content-sec-head-style">
                      <div className="content-area-sec-title">
                        <h5>Our Top Selling Products</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div
                      className="slick_slider slick-initialized slick-slider"
                      data-slick='{"slidesToShow": 4, "slidesToScroll": 4, "arrows":true, "autoplay":true, "infinite":false}'
                    >
                      <button
                        className="slick-prev slick-arrow"
                        aria-label="Previous"
                        type="button"
                        aria-disabled="false"
                      >
                        Previous
                      </button>
                      <div className="slick-list draggable">
                        <div
                          className="slick-track"
                          style={{
                            opacity: 1,
                            width: "2400px",
                            transform: "translate3d(-1200px, 0px, 0px)",
                          }}
                        >
                          <div
                            className="slick-slide"
                            data-slick-index="0"
                            aria-hidden="true"
                            tabIndex="-1"
                            style={{ width: "300px" }}
                          >
                            <div>
                              <div
                                className="product"
                                style={{
                                  width: "100%",
                                  display: "inline-block",
                                }}
                              >
                                <div className="product-box">
                                  <div className="product-box-inner">
                                    <div className="product-image-box">
                                      <img
                                        className="img-fluid pro-image-front"
                                        src="images/product/pro-front-01.png"
                                        alt=""
                                      />
                                      <img
                                        className="img-fluid pro-image-back"
                                        src="images/product/pro-back-01.png"
                                        alt=""
                                      />
                                    </div>
                                    <div className="product-btn-links-wrapper">
                                      <div className="product-btn">
                                        <a
                                          href="#"
                                          className="add-to-cart-btn tooltip-top"
                                          data-tooltip="Add To Cart"
                                          tabIndex="-1"
                                        >
                                          <i className="ti ti-shopping-cart"></i>
                                        </a>
                                      </div>
                                      <div className="product-btn">
                                        <a
                                          href="#"
                                          className="quick-view-btn js-show-modal1 tooltip-top"
                                          data-tooltip="Quick View"
                                          tabIndex="-1"
                                        >
                                          <i className="ti ti-search"></i>
                                        </a>
                                      </div>
                                      <div className="product-btn">
                                        <a
                                          href="#"
                                          className="wishlist-btn tooltip-top"
                                          data-tooltip="Add To Wishlist"
                                          tabIndex="-1"
                                        >
                                          <i className="ti ti-heart"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="product-content-box">
                                    <a
                                      className="product-title"
                                      href="product-layout1.html"
                                      tabIndex="-1"
                                    >
                                      <h2>Reel Fiberglass Tape</h2>
                                    </a>
                                    <div className="star-ratings">
                                      <ul className="rating">
                                        <li>
                                          <i className="fa fa-star"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star-o"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star-o"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star-o"></i>
                                        </li>
                                      </ul>
                                    </div>
                                    <span className="price">
                                      <span className="product-Price-amount">
                                        <span className="product-Price-currencySymbol">
                                          $
                                        </span>
                                        40.00
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="slick-slide"
                            data-slick-index="1"
                            aria-hidden="true"
                            tabIndex="-1"
                            style={{ width: "300px" }}
                          >
                            <div>
                              <div
                                className="product"
                                style={{
                                  width: "100%",
                                  display: "inline-block",
                                }}
                              >
                                <div className="product-box">
                                  <div className="product-box-inner">
                                    <div className="product-image-box">
                                      <div className="onsale">Sale!</div>
                                      <img
                                        className="img-fluid pro-image-front"
                                        src="images/product/pro-front-02.png"
                                        alt=""
                                      />
                                      <img
                                        className="img-fluid pro-image-back"
                                        src="images/product/pro-back-02.png"
                                        alt=""
                                      />
                                    </div>
                                    <div className="product-btn-links-wrapper">
                                      <div className="product-btn">
                                        <a
                                          href="#"
                                          className="add-to-cart-btn tooltip-top"
                                          data-tooltip="Add To Cart"
                                          tabIndex="-1"
                                        >
                                          <i className="ti ti-shopping-cart"></i>
                                        </a>
                                      </div>
                                      <div className="product-btn">
                                        <a
                                          href="#"
                                          className="quick-view-btn js-show-modal1 tooltip-top"
                                          data-tooltip="Quick View"
                                          tabIndex="-1"
                                        >
                                          <i className="ti ti-search"></i>
                                        </a>
                                      </div>
                                      <div className="product-btn">
                                        <a
                                          href="#"
                                          className="wishlist-btn tooltip-top"
                                          data-tooltip="Add To Wishlist"
                                          tabIndex="-1"
                                        >
                                          <i className="ti ti-heart"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="product-content-box">
                                    <a
                                      className="product-title"
                                      href="product-layout1.html"
                                      tabIndex="-1"
                                    >
                                      <h2>Impact Wrench</h2>
                                    </a>
                                    <div className="star-ratings">
                                      <ul className="rating">
                                        <li>
                                          <i className="fa fa-star"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star-o"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star-o"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star-o"></i>
                                        </li>
                                      </ul>
                                    </div>
                                    <span className="price">
                                      <ins>
                                        <span className="product-Price-amount">
                                          <span className="product-Price-currencySymbol">
                                            $
                                          </span>
                                          110.00
                                        </span>
                                      </ins>
                                      <del>
                                        <span className="product-Price-amount">
                                          <span className="product-Price-currencySymbol">
                                            $
                                          </span>
                                          123.00
                                        </span>
                                      </del>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="slick-slide"
                            data-slick-index="2"
                            aria-hidden="true"
                            tabIndex="-1"
                            style={{ width: "300px" }}
                          >
                            <div>
                              <div
                                className="product"
                                style={{
                                  width: "100%",
                                  display: "inline-block",
                                }}
                              >
                                <div className="product-box">
                                  <div className="product-box-inner">
                                    <div className="product-image-box">
                                      <img
                                        className="img-fluid pro-image-front"
                                        src="images/product/pro-front-03.png"
                                        alt=""
                                      />
                                      <img
                                        className="img-fluid pro-image-back"
                                        src="images/product/pro-back-03.png"
                                        alt=""
                                      />
                                    </div>
                                    <div className="product-btn-links-wrapper">
                                      <div className="product-btn">
                                        <a
                                          href="#"
                                          className="add-to-cart-btn tooltip-top"
                                          data-tooltip="Add To Cart"
                                          tabIndex="-1"
                                        >
                                          <i className="ti ti-shopping-cart"></i>
                                        </a>
                                      </div>
                                      <div className="product-btn">
                                        <a
                                          href="#"
                                          className="quick-view-btn js-show-modal1 tooltip-top"
                                          data-tooltip="Quick View"
                                          tabIndex="-1"
                                        >
                                          <i className="ti ti-search"></i>
                                        </a>
                                      </div>
                                      <div className="product-btn">
                                        <a
                                          href="#"
                                          className="wishlist-btn tooltip-top"
                                          data-tooltip="Add To Wishlist"
                                          tabIndex="-1"
                                        >
                                          <i className="ti ti-heart"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="product-content-box">
                                    <a
                                      className="product-title"
                                      href="product-layout1.html"
                                      tabIndex="-1"
                                    >
                                      <h2>Demolition Breaker</h2>
                                    </a>
                                    <div className="star-ratings">
                                      <ul className="rating">
                                        <li>
                                          <i className="fa fa-star"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star-o"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star-o"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star-o"></i>
                                        </li>
                                      </ul>
                                    </div>
                                    <span className="price">
                                      <span className="product-Price-amount">
                                        <span className="product-Price-currencySymbol">
                                          $
                                        </span>
                                        38.00
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="slick-slide"
                            data-slick-index="3"
                            aria-hidden="true"
                            tabIndex="-1"
                            style={{ width: "300px" }}
                          >
                            <div>
                              <div
                                className="product"
                                style={{
                                  width: "100%",
                                  display: "inline-block",
                                }}
                              >
                                <div className="product-box">
                                  <div className="product-box-inner">
                                    <div className="product-image-box">
                                      <div className="onsale">Sale!</div>
                                      <img
                                        className="img-fluid pro-image-front"
                                        src="images/product/pro-front-04.png"
                                        alt=""
                                      />
                                      <img
                                        className="img-fluid pro-image-back"
                                        src="images/product/pro-back-04.png"
                                        alt=""
                                      />
                                    </div>
                                    <div className="product-btn-links-wrapper">
                                      <div className="product-btn">
                                        <a
                                          href="#"
                                          className="add-to-cart-btn tooltip-top"
                                          data-tooltip="Add To Cart"
                                          tabIndex="-1"
                                        >
                                          <i className="ti ti-shopping-cart"></i>
                                        </a>
                                      </div>
                                      <div className="product-btn">
                                        <a
                                          href="#"
                                          className="quick-view-btn js-show-modal1 tooltip-top"
                                          data-tooltip="Quick View"
                                          tabIndex="-1"
                                        >
                                          <i className="ti ti-search"></i>
                                        </a>
                                      </div>
                                      <div className="product-btn">
                                        <a
                                          href="#"
                                          className="wishlist-btn tooltip-top"
                                          data-tooltip="Add To Wishlist"
                                          tabIndex="-1"
                                        >
                                          <i className="ti ti-heart"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="product-content-box">
                                    <a
                                      className="product-title"
                                      href="product-layout1.html"
                                      tabIndex="-1"
                                    >
                                      <h2>Cordless Drywall Cutter</h2>
                                    </a>
                                    <div className="star-ratings">
                                      <ul className="rating">
                                        <li>
                                          <i className="fa fa-star"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star-o"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star-o"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star-o"></i>
                                        </li>
                                      </ul>
                                    </div>
                                    <span className="price">
                                      <ins>
                                        <span className="product-Price-amount">
                                          <span className="product-Price-currencySymbol">
                                            $
                                          </span>
                                          99.00
                                        </span>
                                      </ins>
                                      <del>
                                        <span className="product-Price-amount">
                                          <span className="product-Price-currencySymbol">
                                            $
                                          </span>
                                          82.00
                                        </span>
                                      </del>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="slick-slide slick-current slick-active"
                            data-slick-index="4"
                            aria-hidden="false"
                            tabIndex="0"
                            style={{ width: "300px" }}
                          >
                            <div>
                              <div
                                className="product"
                                style={{
                                  width: "100%",
                                  display: "inline-block",
                                }}
                              >
                                <div className="product-box">
                                  <div className="product-box-inner">
                                    <div className="product-image-box">
                                      <img
                                        className="img-fluid pro-image-front"
                                        src="images/product/pro-front-05.png"
                                        alt=""
                                      />
                                      <img
                                        className="img-fluid pro-image-back"
                                        src="images/product/pro-back-05.png"
                                        alt=""
                                      />
                                    </div>
                                    <div className="product-btn-links-wrapper">
                                      <div className="product-btn">
                                        <a
                                          href="#"
                                          className="add-to-cart-btn tooltip-top"
                                          data-tooltip="Add To Cart"
                                          tabIndex="0"
                                        >
                                          <i className="ti ti-shopping-cart"></i>
                                        </a>
                                      </div>
                                      <div className="product-btn">
                                        <a
                                          href="#"
                                          className="quick-view-btn js-show-modal1 tooltip-top"
                                          data-tooltip="Quick View"
                                          tabIndex="0"
                                        >
                                          <i className="ti ti-search"></i>
                                        </a>
                                      </div>
                                      <div className="product-btn">
                                        <a
                                          href="#"
                                          className="wishlist-btn tooltip-top"
                                          data-tooltip="Add To Wishlist"
                                          tabIndex="0"
                                        >
                                          <i className="ti ti-heart"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="product-content-box">
                                    <a
                                      className="product-title"
                                      href="product-layout1.html"
                                      tabIndex="0"
                                    >
                                      <h2>Folding Hex Key Set</h2>
                                    </a>
                                    <div className="star-ratings">
                                      <ul className="rating">
                                        <li>
                                          <i className="fa fa-star"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star-o"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star-o"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star-o"></i>
                                        </li>
                                      </ul>
                                    </div>
                                    <span className="price">
                                      <span className="product-Price-amount">
                                        <span className="product-Price-currencySymbol">
                                          $
                                        </span>
                                        62.00
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="slick-slide slick-active"
                            data-slick-index="5"
                            aria-hidden="false"
                            tabIndex="0"
                            style={{ width: "300px" }}
                          >
                            <div>
                              <div
                                className="product"
                                style={{
                                  width: "100%",
                                  display: "inline-block",
                                }}
                              >
                                <div className="product-box">
                                  <div className="product-box-inner">
                                    <div className="onsale">Sale!</div>
                                    <div className="product-image-box">
                                      <img
                                        className="img-fluid pro-image-front"
                                        src="images/product/pro-front-06.png"
                                        alt=""
                                      />
                                      <img
                                        className="img-fluid pro-image-back"
                                        src="images/product/pro-back-06.png"
                                        alt=""
                                      />
                                    </div>
                                    <div className="product-btn-links-wrapper">
                                      <div className="product-btn">
                                        <a
                                          href="#"
                                          className="add-to-cart-btn tooltip-top"
                                          data-tooltip="Add To Cart"
                                          tabIndex="0"
                                        >
                                          <i className="ti ti-shopping-cart"></i>
                                        </a>
                                      </div>
                                      <div className="product-btn">
                                        <a
                                          href="#"
                                          className="quick-view-btn js-show-modal1 tooltip-top"
                                          data-tooltip="Quick View"
                                          tabIndex="0"
                                        >
                                          <i className="ti ti-search"></i>
                                        </a>
                                      </div>
                                      <div className="product-btn">
                                        <a
                                          href="#"
                                          className="wishlist-btn tooltip-top"
                                          data-tooltip="Add To Wishlist"
                                          tabIndex="0"
                                        >
                                          <i className="ti ti-heart"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="product-content-box">
                                    <a
                                      className="product-title"
                                      href="product-layout1.html"
                                      tabIndex="0"
                                    >
                                      <h2>Circular Saw</h2>
                                    </a>
                                    <div className="star-ratings">
                                      <ul className="rating">
                                        <li>
                                          <i className="fa fa-star"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star-o"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star-o"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star-o"></i>
                                        </li>
                                      </ul>
                                    </div>
                                    <span className="price">
                                      <ins>
                                        <span className="product-Price-amount">
                                          <span className="product-Price-currencySymbol">
                                            $
                                          </span>
                                          124.00
                                        </span>
                                      </ins>
                                      <del>
                                        <span className="product-Price-amount">
                                          <span className="product-Price-currencySymbol">
                                            $
                                          </span>
                                          111.00
                                        </span>
                                      </del>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="slick-slide slick-active"
                            data-slick-index="6"
                            aria-hidden="false"
                            tabIndex="0"
                            style={{ width: "300px" }}
                          >
                            <div>
                              <div
                                className="product"
                                style={{
                                  width: "100%",
                                  display: "inline-block",
                                }}
                              >
                                <div className="product-box">
                                  <div className="product-box-inner">
                                    <div className="product-image-box">
                                      <img
                                        className="img-fluid pro-image-front"
                                        src="images/product/pro-front-07.png"
                                        alt=""
                                      />
                                      <img
                                        className="img-fluid pro-image-back"
                                        src="images/product/pro-back-07.png"
                                        alt=""
                                      />
                                    </div>
                                    <div className="product-btn-links-wrapper">
                                      <div className="product-btn">
                                        <a
                                          href="#"
                                          className="add-to-cart-btn tooltip-top"
                                          data-tooltip="Add To Cart"
                                          tabIndex="0"
                                        >
                                          <i className="ti ti-shopping-cart"></i>
                                        </a>
                                      </div>
                                      <div className="product-btn">
                                        <a
                                          href="#"
                                          className="quick-view-btn js-show-modal1 tooltip-top"
                                          data-tooltip="Quick View"
                                          tabIndex="0"
                                        >
                                          <i className="ti ti-search"></i>
                                        </a>
                                      </div>
                                      <div className="product-btn">
                                        <a
                                          href="#"
                                          className="wishlist-btn tooltip-top"
                                          data-tooltip="Add To Wishlist"
                                          tabIndex="0"
                                        >
                                          <i className="ti ti-heart"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="product-content-box">
                                    <a
                                      className="product-title"
                                      href="product-layout1.html"
                                      tabIndex="0"
                                    >
                                      <h2>Impact Driver Kit</h2>
                                    </a>
                                    <div className="star-ratings">
                                      <ul className="rating">
                                        <li>
                                          <i className="fa fa-star"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star-o"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star-o"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star-o"></i>
                                        </li>
                                      </ul>
                                    </div>
                                    <span className="price">
                                      <span className="product-Price-amount">
                                        <span className="product-Price-currencySymbol">
                                          $
                                        </span>
                                        149.00
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="slick-slide slick-active"
                            data-slick-index="7"
                            aria-hidden="false"
                            tabIndex="0"
                            style={{ width: "300px" }}
                          >
                            <div>
                              <div
                                className="product"
                                style={{
                                  width: "100%",
                                  display: "inline-block",
                                }}
                              >
                                <div className="product-box">
                                  <div className="product-box-inner">
                                    <div className="product-image-box">
                                      <img
                                        className="img-fluid pro-image-front"
                                        src="images/product/pro-front-08.png"
                                        alt=""
                                      />
                                      <img
                                        className="img-fluid pro-image-back"
                                        src="images/product/pro-back-08.png"
                                        alt=""
                                      />
                                    </div>
                                    <div className="product-btn-links-wrapper">
                                      <div className="product-btn">
                                        <a
                                          href="#"
                                          className="add-to-cart-btn tooltip-top"
                                          data-tooltip="Add To Cart"
                                          tabIndex="0"
                                        >
                                          <i className="ti ti-shopping-cart"></i>
                                        </a>
                                      </div>
                                      <div className="product-btn">
                                        <a
                                          href="#"
                                          className="quick-view-btn js-show-modal1 tooltip-top"
                                          data-tooltip="Quick View"
                                          tabIndex="0"
                                        >
                                          <i className="ti ti-search"></i>
                                        </a>
                                      </div>
                                      <div className="product-btn">
                                        <a
                                          href="#"
                                          className="wishlist-btn tooltip-top"
                                          data-tooltip="Add To Wishlist"
                                          tabIndex="0"
                                        >
                                          <i className="ti ti-heart"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="product-content-box">
                                    <a
                                      className="product-title"
                                      href="product-layout1.html"
                                      tabIndex="0"
                                    >
                                      <h2>Tape Measure</h2>
                                    </a>
                                    <div className="star-ratings">
                                      <ul className="rating">
                                        <li>
                                          <i className="fa fa-star"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star-o"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star-o"></i>
                                        </li>
                                        <li>
                                          <i className="fa fa-star-o"></i>
                                        </li>
                                      </ul>
                                    </div>
                                    <span className="price">
                                      <span className="product-Price-amount">
                                        <span className="product-Price-currencySymbol">
                                          $
                                        </span>
                                        24.00
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        className="slick-next slick-arrow slick-disabled"
                        aria-label="Next"
                        type="button"
                        aria-disabled="true"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductComponent;
